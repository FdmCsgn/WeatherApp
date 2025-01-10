import React, { useState } from 'react'; 
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import swot from '../assets/images/swot.png'
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import Communication from './Communication';

const HomePage = () => {
    const [open, setOpen] = useState(1); // Accordion için gerekli
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return(
   <div>
        <div className='Side-by-side mt-5'>
                <div className="Side-by-sideHome rounded">
                  <div className="text-center">
                    <h1 className="HappyTEMP Side-by-side">HappyTemp</h1>
                    <h2 className="Climate Side-by-side">CLIMATE MONITORING SOLUTIONS</h2>
                    <div className="text-xl pl-2 pr-2">
                      <p>Evler, ofisler, otel odaları, soğuk odalar, personel lojmanları, ve diğer tüm bağımsız birimlerin enerji tüketimlerini tek bir noktadan takip edin, yönetin.</p>
                      <p className="mt-3">Nisvin enerji analizörleri ile gerçek zamanlı voltaj, amper, watt ve kWh takibi yapın. Aşırı yüklenmeleri önleyerek, cihazlarınızı optimize edin. Bu sayede enerji tasarrufu yapın ve bütçenizi etkili şekilde yönetin</p>
                    </div>
                    <div className='flex justify-center'>
                      <Link to="/" className="GetStartedButton hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5">
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div >
                <Accordion open={open === 1} >
                  <AccordionHeader onClick={() => handleOpen(1)} className='Side-by-side text-2xl'>VOLTAJ</AccordionHeader>
                  <AccordionBody className='Side-by-side text-xl'>
                    Voltajın gücünü hissedin! Voltajı ölçerek sisteminizin sorunsuz çalışmasını sağlar. Bu sayede elektrikli ekipmanlarınızın mükemmel durumda kalmasını ve ilk günkü gibi çalışmasını destekler.
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                  <AccordionHeader onClick={() => handleOpen(2)} className='Side-by-side text-2xl'>AMPER</AccordionHeader>
                  <AccordionBody className='Side-by-side text-xl'>
                    Önde kalın, enerji analizörümüzle GÜVENDE olun! Akımı anlık olarak izleyerek sisteminizi aşırı yüklenmelere karşı korur ve kesintisiz, güvenli bir işleyiş sağlar.
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                  <AccordionHeader onClick={() => handleOpen(3)} className='Side-by-side text-2xl'>WATT</AccordionHeader>
                  <AccordionBody className='Side-by-side text-xl'>
                    Enerji kullanımızın takibini maksimuma çıkarın! Enerji analizörümüz anlık olarak gücü ölçerek elektrikli cihazlarınızın verimliliğini takip etmenize ve optimize etmenize yardımcı olur.
                  </AccordionBody>
                </Accordion>
                <Accordion open={open === 4}>
                  <AccordionHeader onClick={() => handleOpen(4)} className='Side-by-side text-2xl'>KWH(Kilowatt-Saat)</AccordionHeader>
                  <AccordionBody className='Side-by-side text-xl'>
                    Enerji tüketiminizi kontrol altına alın! Enerji analizörümüz kilowatt-saat takibi yaparak enerji kullanımınızı anlamanıza yardımcı olurken, maliyetlerinizi düşürerek maksimum elektrik tasarrufu yapmanızı da sağlar.
                  </AccordionBody>
                </Accordion>
              </div>
              <div className='Side-by-sideSwotCard mt-12'>
                 <Card className="mt-6 w-96 swotCardColor">
                      <CardBody >
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                               Gelişmiş Kullanıcı Arayüzü/ Deneyimi
                        </Typography>
                        <Typography>
                            Yapay zeka destekli kullanıcı arayüzümüz ile gerçek zamanlı enerji takibini yaparken, aynı zamanda sizin için belirlenen en uygun tarifeyi de görebilirsiniz.
                        </Typography>
                      </CardBody>
                  </Card>
                  <Card className="mt-6 w-96 swotCardColor2">
                      <CardBody className='mb-5'>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                               Karbon Ayak İzi Azaltma
                        </Typography>
                        <Typography > 
                            Daha yeşil bir gezegene katkıda bulunun. Enerji analizörümüz, enerji kullanımınızı optimize ederek karbon ayak izinizi azaltmanıza yardımcı olur.
                        </Typography>
                      </CardBody>
                  </Card>
              </div>
              <div className='Side-by-sideSwot'>
                <img src={swot} alt="" className='Swot'  />
              </div>
              <div className='Side-by-sideSwotCard'>
                 <Card className="mt-6 w-96 mb-12 swotCardColor2">
                      <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                               Veri Kayıt Geçmişşi
                        </Typography>
                        <Typography>
                            Hiçbir detayı kaçırmadan, kapsamlı veri kayıt geçmişi ile enerji kullanım detaylarınızı (saatlik, günlük, haftalık, aylık, vb.) izleyerek, gelecekle ilgili bilinçli kararlar alın.
                        </Typography>
                      </CardBody>
                  </Card>
                  <Card className="mt-6 w-96 mb-12 swotCardColor">
                      <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                               Maliyet Tasarrufu
                        </Typography>
                        <Typography>
                            Gereksiz elektrik tüketimini belirleyip ortadan kaldırarak para tasarrufu sağlayın. Gelişmiş izleme sistemimiz, sadece ihtiyacınız kadar olan enerjiyi kullanmanızı sağlar.
                        </Typography>
                      </CardBody>
                  </Card>
              </div>

              <div><Communication/></div>
   </div>
    )
}

export default HomePage;