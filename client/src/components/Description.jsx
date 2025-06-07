import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'

const Description = () => {
  return (
    <motion.div 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>

      <p className='text-stone-600 mb-8'>Turn your imagination into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>\
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg' />
        <div>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
            <p className='text-stone-600 mb-4'>Bring your ideas to life effortlessly with our free AI image generator. 
                Whether you’re after bold visuals or one-of-a-kind imagery, 
                just type it out — and watch your words transform into eye-catching art in seconds. 
                Imagine it, describe it, see it!
            </p>
            <p className='text-stone-600'> 
                Simply type in a text prompt, and our cutting-edge 
                AI will generate high-quality images in 
                seconds. From product visuals to character designs and portraits, 
                even concepts that don't yet exist can be visualized effortlessly. 
                Powered by advanced AI technology, the creative possibilities are limitless!
            </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
