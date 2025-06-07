import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between
    gap-4 py-3 mt-20'>

      <img src={assets.Logo} alt="" width={150}/>

      <p className='flex-1 border-l border-stone-400 pl-4 text-sm
       text-stone-600 max-sm:hidden'>Copyight @YanshiSharma | All rights reserved.</p>

      <div className='flex gap-2.5'>
        <a href="https://github.com/yanshiii" target="_blank" rel="noopener noreferrer">
  <img src={assets.github_icon} alt="GitHub" width={35} />
</a>
<a href="https://www.linkedin.com/in/yanshii/" target="_blank" rel="noopener noreferrer">
  <img src={assets.linkedin_icon} alt="LinkedIn" width={35} />
</a>

      </div>
    </div>
  )
}

export default Footer
