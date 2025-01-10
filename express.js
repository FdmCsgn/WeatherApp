// express.js
import express from 'express';
import sql from 'mssql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3002;

app.use(cors());

// SQL Server bağlantı ayarları
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

app.use(bodyParser.json());

// Veri çekme endpoint'i
app.get('/api/data', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT MainID,GroupID,LocalTemperature,LocalHumidity,ItemDate FROM DailyItemEND WHERE CAST(ItemDate AS DATE) = CAST(GETDATE() AS DATE) ORDER BY ItemDate ASC');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Veri çekme hatası');
    }
});

app.listen(port, () => {
    console.log(`Express server ${port} portunda çalışıyor`);
});
