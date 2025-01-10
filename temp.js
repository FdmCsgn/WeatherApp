const axios = require('axios');
const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');



const config = {
  user: 'sa',
  password: 'Troya963+-',
  server: 'localhost',
  database: 'temperature',
  options: {
    encrypt: false,
    enableArithAbort: true
  }
};

// Express uygulamaları oluşturma
const app = express();
const appy = express();
const appHistorical = express();
const appAPI = express();
const appSign = express();
const appLogin = express();
const appF = express();


const port = 3001;
const port2 = 3002;
const port3 = 3003;
const portSign = 5174;
const portLogin = 5175;
const portF = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
appy.use(cors());
appy.use(bodyParser.json());
appHistorical.use(cors());
appHistorical.use(bodyParser.json());
appAPI.use(cors());
appAPI.use(bodyParser.json());
appSign.use(cors());
appSign.use(bodyParser.json());
appLogin.use(cors());
appLogin.use(bodyParser.json());
appF.use(cors());
appF.use(bodyParser.json());

// Verileri SQL Server'a kaydetme fonksiyonu
const saveDataToDatabase = async (localData, localData2, localData3, externalData) => {
  try {
    await sql.connect(config);

    const request = new sql.Request();
    const query = `
      INSERT INTO DailyItemEND (
         MainID
        ,ItemID
        ,GroupID
        ,LocalTemperature
        ,LocalHumidity
        ,LocalTempChange
        ,LocalHumChange
        ,ExtarnalTemperature
        ,ExtarnalPressure
        ,ExtarnalHumidity
        ,ExtarnalWind
        ,Weather
        ,ItemDate
        ,ProvinceName
        ,CountryName
      ) VALUES (
         '7001'
        ,'701'
        ,'1'
        ,@localTemperature1
        ,@localHumidity1
        ,@localTempChange1
        ,@localHumChange1
        ,@externalTemperature
        ,@externalPressure
        ,@externalHumidity
        ,@externalWind
        ,@weather
        ,GETDATE()
        ,@provinceName
        ,@country
      ),(
         '7002'
        ,'702'
        ,'2'
        ,@localTemperature2
        ,@localHumidity2
        ,@localTempChange2
        ,@localHumChange2
        ,@externalTemperature
        ,@externalPressure
        ,@externalHumidity
        ,@externalWind
        ,@weather
        ,GETDATE()
        ,@provinceName
        ,@country
      ),
      (
         '7003'
        ,'703'
        ,'3'
        ,@localTemperature3
        ,@localHumidity3
        ,@localTempChange3
        ,@localHumChange3
        ,@externalTemperature
        ,@externalPressure
        ,@externalHumidity
        ,@externalWind
        ,@weather
        ,GETDATE()
        ,@provinceName
        ,@country
      )
    `;

    request.input('localTemperature1', sql.Float, localData.temperature);
    request.input('localHumidity1', sql.Int, localData.humidity);
    request.input('localTempChange1', sql.Float, localData.tempChange);
    request.input('localHumChange1', sql.Float, localData.humChange);

    request.input('localTemperature2', sql.Float, localData2.temperature);
    request.input('localHumidity2', sql.Int, localData2.humidity);
    request.input('localTempChange2', sql.Float, localData2.tempChange);
    request.input('localHumChange2', sql.Float, localData2.humChange);

    request.input('localTemperature3', sql.Float, localData3.temperature);
    request.input('localHumidity3', sql.Int, localData3.humidity);
    request.input('localTempChange3', sql.Float, localData3.tempChange);
    request.input('localHumChange3', sql.Float, localData3.humChange);

    request.input('externalTemperature', sql.Float, externalData.temp_c);
    request.input('externalPressure', sql.Float, externalData.pressure_in);
    request.input('externalHumidity', sql.Int, externalData.humidity);
    request.input('externalWind', sql.Int, externalData.wind_kph);
    request.input('weather', sql.NVarChar, externalData.condition.text);
    request.input('provinceName', sql.NVarChar, 'Antalya'); // Sabit değer, gerekirse dinamik hale getirin
    request.input('country', sql.NVarChar, 'Türkiye');

    await request.query(query);
    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data to database:', error);
  }
};

// Ana fonksiyon
const main = async () => {
  const localData = await getLocalData();
  const localData2 = await getLocalData2();
  const localData3 = await getLocalData3();
  const externalData = await getExternalData();

  if (localData && localData2 && localData3 && externalData) {
    await saveDataToDatabase(localData, localData2, localData3, externalData);
  }
};

// Verileri alma fonksiyonları
const getLocalData = async () => {
  try {
    const response = await axios.get('http://192.168.1.244:8090/');
    return response.data;
  } catch (error) {
    console.error('Error fetching local data:', error);
    return null;
  }
};

const getLocalData2 = async () => {
  try {
    const response2 = await axios.get('http://192.168.1.106:8080/');
    return response2.data;
  } catch (error) {
    console.error('Error fetching local data 2:', error);
    return null;
  }
};

const getLocalData3 = async () => {
  try {
    const response3 = await axios.get('http://192.168.1.153:8085/');
    return response3.data;
  } catch (error) {
    console.error('Error fetching local data 3:', error);
    return null;
  }
};

const getExternalData = async () => {
  try {
    const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
      params: {
        key: '992d9f2e574041738ac151304241707',
        q: 'Antalya',
        aqi: 'no'
      }
    });
    return response.data.current;
  } catch (error) {
    console.error('Error fetching external data:', error);
    return null;
  }
};

// Veri çekme endpoint'leri
app.get('/api/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT TOP(3) * FROM DailyItemEND WHERE GroupID IN (1, 2, 3) ORDER BY ItemDate DESC');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veri çekme hatası');
  }
});

app.listen(port, () => {
  console.log(`Express server ${port} portunda çalışıyor`);
});

appy.get('/api/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT MainID, GroupID, LocalTemperature, LocalHumidity, ItemDate FROM DailyItemEND WHERE CAST(ItemDate AS DATE) = CAST(GETDATE() AS DATE) ORDER BY ItemDate ASC');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veri çekme hatası');
  }
});

appy.listen(port2, () => {
  console.log(`Express server ${port2} portunda çalışıyor`);
});

appHistorical.get('/api/data', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT MainID, GroupID, AvgLocalTemperature, AvgLocalHumidity, ItemDate FROM DailyItemAvg ');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Veri çekme hatası');
  }
});

appHistorical.listen(port3, () => {
  console.log(`Express server ${port3} portunda çalışıyor`);
});

appAPI.get('/weather', async (req, res) => {
  const location = req.query.q || 'Antalya';
  const apiKey = '992d9f2e574041738ac151304241707';

  try {
    const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
      params: {
        key: apiKey,
        q: location,
        aqi: 'no'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

appAPI.listen(3000, () => {
  console.log('API server running on port 3000');
});

// Kayıt rotası
appSign.post('/signup', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  if (!username || !password || !email || !firstName || !lastName) {
    return res.status(400).json({ error: 'Lütfen tüm alanları doldurun.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await sql.connect(config);

    const request = new sql.Request(pool);
    await request
      .input('Username', sql.NVarChar, username)
      .input('PasswordHash', sql.NVarChar, hashedPassword)
      .input('Email', sql.NVarChar, email)
      .input('FirstName', sql.NVarChar, firstName)
      .input('LastName', sql.NVarChar, lastName)
      .query(`
        INSERT INTO Users (Username, PasswordHash, Email, FirstName, LastName)
        VALUES (@Username, @PasswordHash, @Email, @FirstName, @LastName)
      `);

    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
  } catch (err) {
    console.error('Kayıt işlemi sırasında hata:', err);
    res.status(500).json({ error: 'Kayıt işlemi sırasında hata meydana geldi' });
  }
});

appSign.listen(portSign, () => {
  console.log(`Sign Up server is running on port ${portSign}`);
});

// Giriş rotası
appLogin.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT PasswordHash FROM Users WHERE Email = @Email');

    if (result.recordset.length > 0) {
      const hashedPassword = result.recordset[0].PasswordHash;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        res.status(200).json({ message: 'Login successful!' });
      } else {
        res.status(401).json({ message: 'Invalid credentials. Password does not match.' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials. Email not found.' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});
appLogin.listen(portLogin, () => {
  console.log(`Login server is running on port ${portLogin}`);
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fadimecosgun146@gmail.com', // Gönderen e-posta adresi
    pass: 'serd hahr zaot jecq'   // E-posta şifresi (Güvenlik açısından uygulama şifresi kullanmanız tavsiye edilir)
  }
});

const crypto = require('crypto');

function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}


// POST endpoint for forgot-password
appF.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Veritabanına bağlanma
    await sql.connect(config);

    // E-posta adresini users tablosunda kontrol etme
    const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;

    if (result.recordset.length > 0) {
      // Token oluşturma 
      const resetToken = generateResetToken();

      // Token'ı veritabanında kaydedin
      await sql.query`INSERT INTO PasswordResetTokens (Email, Token) VALUES (${email}, ${resetToken})`;

      // E-posta gönderme
      const mailOptions = {
        from: 'fadimecosgun146@gmail.com',
        to: email,
        subject: 'Şifre Sıfırlama Talebi',
        html: `
          <p>Merhaba,</p>
          <p>Şifrenizi sıfırlamak için <a href="http://localhost:5173/ResetPassword?token=${resetToken}">buraya</a> tıklayın.</p>
          <p>İyi günler!</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).send('E-posta gönderildi.');
    } else {
      res.status(404).send('E-mail not found.');
    }

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal server error.');
  } finally {
    // Bağlantıyı kapat
    sql.close();
  }
});

appF.post('/api/verify-token', async (req, res) => {
  const { token } = req.body;

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT * FROM PasswordResetTokens
      WHERE Token = ${token} AND ProcessTime > DATEADD(HOUR, -1, GETDATE())`;

    if (result.recordset.length > 0) {
      res.status(200).send({ valid: true });
    } else {
      res.status(400).send({ valid: false });
    }
  } catch (err) {
    console.error('Token doğrulama hatası:', err);
    res.status(500).send('Token doğrulama hatası.');
  } finally {
    sql.close();
  }
});

// Şifre güncelleme endpoint'i
appF.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    await sql.connect(config);

    // Token'ı doğrulama
    const tokenResult = await sql.query`
      SELECT * FROM PasswordResetTokens
      WHERE Token = ${token} AND ProcessTime > DATEADD(HOUR, -1, GETDATE())`;

    if (tokenResult.recordset.length === 0) {
      return res.status(400).send('Geçersiz veya süresi dolmuş token.');
    }

    // Token'ı geçersiz kıl
    await sql.query`DELETE FROM PasswordResetTokens WHERE Token = ${token}`;

    // Kullanıcının e-posta adresini almak
    const email = tokenResult.recordset[0].Email;

    // Yeni şifreyi güncelle
    const hashedPassword = bcrypt.hashSync(newPassword, 10); // Şifreyi hashleyin
    await sql.query`
      UPDATE Users SET PasswordHash = ${hashedPassword} WHERE Email = ${email}`;

    res.status(200).send('Şifre başarıyla güncellendi.');
  } catch (err) {
    console.error('Şifre güncelleme hatası:', err);
    res.status(500).send('Şifre güncelleme hatası.');
  } finally {
    sql.close();
  }
});


appF.listen(portF, () => {
  console.log(`Server running at http://localhost:${portF}`);
});

// 5 dakikada bir (300000 ms) main fonksiyonunu çağır
setInterval(main, 300000);
