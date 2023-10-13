import Hero from '@/components/Hero/Hero'
import MoreProducts from '@/components/Hero/MoreProducts'
import Image from 'next/image'
import Link from 'next/link'
import {BsArrowRight} from 'react-icons/bs'


{/* <Image
src="/vercel.svg"
alt="Vercel Logo"
className="dark:invert"
width={100}
height={24}
priority
/> */}

export default function Home() {
  
  return (
    <main className=' w-full' style={{ position: 'relative' }}>
      <Hero/>
      <MoreProducts/>
      {/* <div style={{ position: 'absolute', marginTop: '450px', right: '0', top: '0', width: '20%' }}>
        <Image
          src='/images/image-outdoor.jpg'
          width={200}
          height={250}
          alt='image outdoor'
          className='border-2 border-white'
        />
      </div> */}
    </main>
  )
}
