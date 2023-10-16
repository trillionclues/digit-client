import Footer from '@/components/Footer/Footer'
import JustArrived from '@/components/Hero/Arrived'
import Hero from '@/components/Hero/Hero'
import MoreProducts from '@/components/Hero/MoreProducts'
import MobileMenuOverlay from '@/components/MobileMenu/MobileMenuOverlay'
import Header from '@/components/Navbar/Header'


{/* className="dark:invert"
priority
/> */}

export default function Home() {
  return (
    <>
    <main className='w-full h-full'>
      <Header/>
      <Hero/>
      <MoreProducts/>
      <JustArrived/>
      {/* overlay on mobile */}
      <MobileMenuOverlay/>
      <Footer/>
    </main>
    </>
  )
}
