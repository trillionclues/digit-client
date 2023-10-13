"use client"
import React from 'react'
import CustomButton from '../customButton'
import Image from 'next/image'
import {FiArrowUpRight} from 'react-icons/fi'

const Hero = () => {
    const handleClick = () => {
        // handle button click here
    }
  
  return (
    <div className="flex md:flex-row flex-col justify-between items-center min-h-full">
    <div className="flex-1 pr-8">
        <h1 className='font-bold text-5xl leading-snug py-5 tracking-wide' style={{ wordSpacing: '0.3em' }}>Wingrove <br /> Storage Desk, <br /> French Oak</h1>
        
        <p className='font-normal text-gray-500 mb-8 md:w-3/4 w-full'>Warm summers evening? Take it outside with Jonah. Made from durable polyrattan, this retro-inspired armchair has a single seat cushion (great for lounging) and angled metal legs.</p>
        
        <CustomButton
        text='Read More' href='/'
        icon={<FiArrowUpRight className="text-white text-xl"/>}
        className='bg-[#419197] flex flex-row justify-between gap-1 px-5 py-2 rounded-sm text-white' handleClick={() => handleClick}
        />
    </div>

    <div className="flex-1 -ml-24 relative">
        <div className='overlay-left absolute top-0 bottom-0 left-0 w-1/2' style={{ backgroundColor: 'rgba(244, 223, 182, 0.2)' }} />
        <div className="overlay-right absolute top-0 bottom-0 right-0 w-1/2" style={{ backgroundColor: 'rgba(65, 145, 151, 0.5)' }} />

        <Image
        src="/images/herochair.png"
        alt="hero images"
        width={100}
        height={100}
        layout='responsive'
        />
    </div>
  </div>
  )
}

export default Hero