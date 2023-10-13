import Hero from '@/components/Hero/Hero'
import CustomButton from '@/components/customButton'


{/* <Image
src="/vercel.svg"
alt="Vercel Logo"
className="dark:invert"
width={100}
height={24}
priority
/> */}

export default function Home() {
  const handleClick = () => {

  }

  return (
    <main className='container mx-auto md:px-28 px-10'>
      <Hero/>
    </main>
  )
}
