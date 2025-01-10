


import { useState } from "react";
import { Link } from "react-router-dom";

const Button = () => {

  const [click, setClick] = useState(false);

  return (
    <div className="flex items-start">
      <button onClick={() => setClick(!click)} className={`bg-white shadow-lg rounded-full p-2 ms-[-20px] mt-4 transition-all duration-300 ${click && 'transform rotate-180'}`}>
        <Link to={`/Map`}><img src={location} alt="" className='location'/></Link>
        
      </button>
      
    </div>
  );
};

export default Button;


