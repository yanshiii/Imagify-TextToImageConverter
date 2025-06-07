// src/pages/ResetPassword.jsx
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { backendUrl, setShowLogin } = useContext(AppContext);

  const [password, setPassword]       = useState('');
  const [confirm, setConfirm]         = useState('');
  const [loading,  setLoading]        = useState(false);
  const [showPwd1, setShowPwd1]       = useState(false);
  const [showPwd2, setShowPwd2]       = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password.length < 6)       return toast.error('Password must be at least 6 characters');
    if (password !== confirm)      return toast.error('Passwords do not match');

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/reset-password/${token}`,
        { password }
      );

      if (data.success) {
        toast.success('Password updated! Please log in.');
        setTimeout(() => {
          // If you prefer opening the Login modal instead, use setShowLogin(true)
          navigate('/');
          setShowLogin(true);
        }, 1200);
      } else {
        toast.error(data.message || 'Error resetting password');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  console.log('backendUrl:', backendUrl);
  
  return (
    <div className='flex justify-center items-center min-h-[70vh]'>
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0.1, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className='bg-white w-[90%] max-w-md mx-auto rounded-2xl shadow-md px-8 py-8 text-gray-600'
      >
        <h1 className='text-center text-2xl font-semibold text-stone-800 mb-1'>
          Reset Password
        </h1>
        <p className='text-sm text-center mb-6 text-orange-900'>
          Create a new password for your account.
        </p>

        {/* New Password */}
        <div className='border border-stone-400 px-4 py-2 flex items-center gap-3 rounded-full mb-4'>
          <img src={assets.lock_icon} alt='lock' className='w-5 h-5 opacity-60' />
          <input
            type={showPwd1 ? 'text' : 'password'}
            className='flex-1 text-sm outline-none placeholder:text-stone-400'
            placeholder='New password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPwd1(!showPwd1)}
            className='cursor-pointer text-xs select-none'
          >
            {showPwd1 ? 'Hide' : 'Show'}
          </span>
        </div>

        {/* Confirm Password */}
        <div className='border border-stone-400 px-4 py-2 flex items-center gap-3 rounded-full mb-6'>
          <img src={assets.lock_icon} alt='lock' className='w-5 h-5 opacity-60' />
          <input
            type={showPwd2 ? 'text' : 'password'}
            className='flex-1 text-sm outline-none placeholder:text-stone-400'
            placeholder='Confirm password'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPwd2(!showPwd2)}
            className='cursor-pointer text-xs select-none'
          >
            {showPwd2 ? 'Hide' : 'Show'}
          </span>
        </div>

        <button
          type='submit'
          disabled={loading}
          className='bg-orange-900 w-full text-white py-2 rounded-full disabled:opacity-60'
        >
          {loading ? 'Updating...' : 'Reset Password'}
        </button>
      </motion.form>
    </div>
  );
};

export default ResetPassword;
