import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Login')
    const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');


    const handleForgotPassword = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, {
                email: resetEmail,
            });

            if (data.success) {
                toast.success('Reset link sent to your email');
                setShowForgotPassword(false);
                setResetEmail('');
            } else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error('Something went wrong');
        }
    };


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/user/login',
                    { email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            } else {
              if (password.length < 6) {
                toast.error('Password must be at least 6 characters');
                return;
              }

                const { data } = await axios.post(backendUrl + '/api/user/register',
                    { name, email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }
        }
        catch (error) {
            toast.error('An error occurred during authentication.');
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10  backdrop-blur-sm w-full h-full bg-black/30
    flex justify-center items-center'>
            <motion.form onSubmit={onSubmitHandler}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='relative bg-white px-8 py-6 rounded-2xl text-slate-500 w-[90%] max-w-sm shadow-md'>

                <h1 className='text-center text-2xl text-stone-800 font-semibold mb-1'>
                    {showForgotPassword ? 'Forgot Password' : state}
                </h1>
                <p className='text-sm text-center mb-5 text-orange-900'>
                    {showForgotPassword ? 'Enter your email to reset your password.' : 'Welcome back! Please sign in to continue.'}
                </p>

                {showForgotPassword ? (
                    <div className='mb-4'>
                        <div className='border border-stone-400 px-4 py-2 flex items-center gap-4 rounded-full mb-3'>
                            <img src={assets.email_icon} alt="email" className='w-5 h-5 opacity-60' />
                            <input
                                type='email'
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className='flex-1 text-sm outline-none placeholder:text-stone-400'
                                placeholder='Enter your registered email'
                                required
                            />
                        </div>
                        <button
                            type='button'
                            onClick={handleForgotPassword}
                            className='bg-orange-900 w-full text-white py-2 rounded-full'
                        >
                            Send Reset Link
                        </button>
                        <p
                            className='text-sm text-center text-amber-900 mt-3 cursor-pointer'
                            onClick={() => setShowForgotPassword(false)}
                        >
                            Back to Login
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
  {state !== 'Login' && (
    <div className='border border-stone-400 px-4 py-2 flex items-center gap-4 rounded-full'>
      <img src={assets.profile_icon} alt="user" className='w-5 h-5 opacity-60' />
      <input
        onChange={e => setName(e.target.value)} value={name}
        type="text"
        className='flex-1 text-sm outline-none placeholder:text-stone-400'
        placeholder='Full Name'
        required
      />
    </div>
  )}

  <div className='border border-stone-400 px-4 py-2 flex items-center gap-4 rounded-full'>
    <img src={assets.email_icon} alt="email" className='w-5 h-5 opacity-60' />
    <input
      onChange={e => setEmail(e.target.value)} value={email}
      type="email"
      className='flex-1 text-sm outline-none placeholder:text-stone-400'
      placeholder='Email Id'
      required
    />
  </div>

  <div className='border border-stone-400 px-4 py-2 flex items-center gap-4 rounded-full'>
    <img src={assets.lock_icon} alt="lock" className='w-5 h-5 opacity-60' />
    <input
      onChange={e => setPassword(e.target.value)} value={password}
      type="password"
      className='flex-1 text-sm outline-none placeholder:text-stone-400'
      placeholder='Password'
      required
    />
  </div>

  {state === 'Login' && (
    <p
      className='text-sm text-amber-900 text-center cursor-pointer'
      onClick={() => setShowForgotPassword(true)}
    >
      Forgot Password?
    </p>
  )}

  <button type='submit' className='bg-orange-900 w-full text-white py-2 rounded-full mt-2'>
    {state === 'Login' ? 'Login' : 'Create Account'}
  </button>
</div>


                        {state === 'Login' ?
                            <p className='mt-5 text-center'>Don't have an account?
                                <span className='text-amber-900 cursor-pointer'
                                    onClick={() => setState('Sign Up')}> Sign Up</span></p>
                            :
                            <p className='mt-5 text-center'>Already have an account?
                                <span className='text-amber-900 cursor-pointer'
                                    onClick={() => setState('Login')}> Login</span></p>}
                    </>
                )}

                <img onClick={() => setShowLogin(false)} src={assets.cross_icon}
                    alt="close" className='absolute top-5 right-5 cursor-pointer' />
            </motion.form>
        </div>
    )
}

export default Login