import React from 'react'
import { assets } from '../assets/assets'

export default function () {
  return (
<div className='flex flex-col sm:flex-row border border-gray-400'>
  {/* Hero left side */}
  <div className='w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0 text-center sm:text-left'>
    <div className='text-[#414141] mb-3'>
      <p className='w-8 md:w-11 h-[2px] bg-[#414141] mb-1'></p> 
      <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
    </div>
    <h1 className='text-3xl sm:text-4xl lg:text-5xl leading-relaxed mb-4'>Latest Arrivals</h1>
    <div className='flex items-center gap-2 justify-center sm:justify-start'>
      <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
      <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
    </div>
  </div>

  {/* Hero right side */}
  <div className='w-full sm:w-1/2 flex items-center justify-center'>
    <img className='w-full h-auto object-cover' src={assets.hero_img} alt="Hero" />
  </div>
</div>

  )
}
