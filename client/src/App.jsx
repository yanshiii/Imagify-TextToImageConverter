import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredits from './pages/BuyCredits';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';
import ResetPassword from './pages/ResetPassword';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const {showLogin} = useContext(AppContext);
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28
    min-h-screen bg-gradient-to-b from-orange-100 to-orange-900/10
    '>  
    <ToastContainer position='bottom-right'/>
    <Navbar />
    {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy-credits' element={<BuyCredits />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
      
    </div>  
  )
}

export default App;
