import React from 'react'
import adress from '../assets/images/adress.png'
import email from '../assets/images/mail.png'
import phone from '../assets/images/phone.png'
import web from '../assets/images/web.png'
import linkedin from '../assets/images/linkedin.png'
import faecbook from '../assets/images/facebook.png'
import nisvin from '../assets/images/nisvin.png'




const Communication = () => {
    const phoneNumber = '+90 242 316 0 565';
    const adres = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x14c39019fa444b2d:0xdef2bde9efe81ff9?sa=X&ved=1t:8290&ictx=111';
    const mail='info@nisvin.com'
    const nweb='https://www.nisvin.com/'
    const linked='https://www.linkedin.com/company/nisvin-yazilim-teknoloji/?originalSubdomain=tr'
    const facebk='https://www.facebook.com/NisvinTechnology'

    return(
        <div className='Side-by-side CommunacationCard'>
            <img src={nisvin} alt="" className=' mr-5' />
         < div className="card">
             <a className="socialContainer containerOne" href={`tel:${phoneNumber}`}><img src={phone} alt="Phone" /></a>
             <a className="socialContainer containerOne" href={adres} target="_blank" rel="noopener noreferrer"><img src={adress} alt="" /></a>
             <a className="socialContainer containerOne"  href={`mailto:${mail}`}><img src={email} alt="" /></a>
             <a className="socialContainer containerOne" href={nweb} target="_blank" rel="noopener noreferrer"><img src={web} alt="" /></a>
             <a className="socialContainer containerOne"  href={facebk} target="_blank" rel="noopener noreferrer"><img src={faecbook} alt="" /></a>
             <a className="socialContainer containerOne" href={linked} target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="" /></a>
         </div>
      </div>

    )
}

export default Communication;