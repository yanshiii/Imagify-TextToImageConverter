import React from 'react'
import { stepsData } from '../assets/assets'
import { delay, motion } from "motion/react"

const Steps = () => {
  return (
    <motion.div 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='flex flex-col items-center justify-center my-32'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>How It Works</h1>

      <p className='text-stone-600 mb-8'>Turn Words Into Vivid Visuals</p>


      <div className='space-y-4 w-full max-w-3xl text-sm '>
        {stepsData.map((item, index) => (
            <div className='flex items-center gap-4 p-5 px-8 bg-orange-100/20 shadow-md
            border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'
            key={index}>
                <img width={40} src={item.icon} alt="" />
                <div>
                    <h2 className='text-xl font-medium'>{item.title}</h2>
                    <p className='text-stone-600'>{item.description}</p>
                </div>
            </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps
