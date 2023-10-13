import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {BsArrowRight} from 'react-icons/bs'

const MoreProducts = () => {
  return (
    <div className="flex md:flex-row flex-col justify-between items-center md:relative md:-mt-[150px]" style={{ zIndex: 1 }}>
    <div className="flex-1 pr-8" style={{ flex: '60%' }}>
    <Image
      src="/images/floor-walking.jpg"
      alt="floor walking"
      width={100}
      height={100}
      layout='responsive'
    />
    </div>
  
    <div className="flex-1"  style={{ flex: '40%', display: 'flex', flexDirection: 'column' }}>
      <div style={{  marginTop: '-150px', marginLeft:'300px' }}>
    <Image
      src='/images/image-outdoor.jpg'
      width={200}
      height={250}
      alt='image outdoor'
      className='border-2 border-white'
    />
  </div>

      <aside className='mt-5'>
      <p className='font-normal text-[15px] text-gray-500 md:w-3/4 w-full py-5'>Warm summers evening? Take it outside with Jonah. Made from durable polyrattan, this retro-inspired armchair has a single seat cushion (great for lounging) and angled metal legs.
      <br /> 
      <br /> 
      Connects you with the greatest creative people from around the world in the fashion business.
      </p>
      </aside>

      
      <div className="bg-[#F4DFB6] md:absolute" style={{height: '30%', width: '40%', marginTop: '200px'}}>
        <div className="flex flex-row justify-center items-center h-full gap-5">
          <div className='flex flex-row'>
            <Image 
            src='/images/chair-avatar1.jpg'
            alt='image chair'
            width={80}
            height={80}
            className='rounded-full border-2 border-white'
            />
            <Image 
            src='/images/chair-avatar1.jpg'
            alt='image chair'
            width={80}
            height={80}
            className='rounded-full border-2 border-white -ml-5'
            />
          </div>
          <Link href='/products'>
          <h3 className='text-gray-400 text-lg'>More Products</h3>
          </Link>
          <Link href='/products' className='flex justify-center items-center w-[10%] h-[30%] border-2 border-[#419197]'>
          <BsArrowRight className="cursor-pointer"/>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MoreProducts