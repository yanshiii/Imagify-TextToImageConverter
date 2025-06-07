import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [progress, setProgress] = useState(0);

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (input) {
      setLoading(true);
      setIsImageLoaded(false);
      const generatedImg = await generateImage(input);
      if (generatedImg) {
        setImage(generatedImg);
        setIsImageLoaded(true);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      return;
    }

    let start = null;
    const duration = 10000;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);

    return () => setProgress(0);
  }, [loading]);

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] items-center justify-center'
    >
      <div>
        <div className='relative'>
          <img src={image} alt="Generated" className='max-w-sm rounded' />
          {loading && (
            <span
              className='absolute bottom-0 left-0 h-1 bg-black transition-all duration-300'
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading.....</p>
      </div>

      {!isImageLoaded &&
        <div className='flex w-full max-w-xl bg-zinc-900/20 text-sm p-0.5 mt-10 rounded-full'>
          <input
            onChange={e => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none text-orange-900 ml-8 max-sm:w-20 placeholder-orange-900'
            disabled={loading}
          />
          <button
            type='submit'
            className='bg-black/90 px-10 sm:px-16 py-3 rounded-full text-white'
            disabled={loading}
          >
            Generate
          </button>
        </div>
      }

      {isImageLoaded &&
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0,5 mt-10 rounded-full'>
          <p onClick={() => (setIsImageLoaded(false))} className='bg-transparent border border-black text-amber-900 px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
          <a href={image} download className='bg-orange-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
        </div>
      }
    </motion.form>
  )
}

export default Result;