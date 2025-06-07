import React, { useContext } from 'react'; 
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; 

const Navbar = () => {
    const {user, setShowLogin, logout, credit} = useContext(AppContext);
  const navigate = useNavigate();
  return (  
      <div className='flex items-center justify-between py-4'> 
        <Link to='/'>
          <img 
            src={assets.Logo} 
            alt="Logo"
            className='h-10 sm:h-12 lg:h-14 w-auto object-contain cursor-pointer'
          />
        </Link>

      <div> 
        { user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <button onClick={()=>navigate('/buy-credits')} className='flex items-center gap-2 bg-orange-900 text-white px-4 sm:px-6 py-1.5 sm:py-3 rounded-full
            hover:scale-105 transition-all duration-700
            '>
                <img className='w-5' src={assets.credit_star} alt="" />
                <p className='text-xs sm:text-sm font-medium text-gray-200'>Credits left: {credit}</p>
            </button>
            <p className='text-orange-900 max-sm:hidden pl-4'>Hi, {user.name}</p>
            <div className='relative group'>
                <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
                <div className='absolute hidden group-hover:block top-full
                 right-0 z-10 text-orange-900 rounded px-4 py-2 '>
                    <ul className='list-none m-0 p-2 bg-amber-100 rounded-full border text-sm'>

                        <li onClick={logout} className='py-1 px-2 cursor-pointer'>Logout</li>
                    </ul>

                </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={()=>navigate('/buy-credits')} className='cursor-pointer text-orange-900 
            text-lg font-medium'>Pricing</p>
            <button onClick={()=>setShowLogin(true)} className='bg-orange-900 text-white px-6 py-2 sm:px-12 text-lg font-normal rounded-full'>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
