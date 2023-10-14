import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Navbar/Header'
import { Providers } from '@/redux/Providers/storeprovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digit Ecommerce App',
  description: 'Get creative, make sales!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
          <Header />
          {children}
          <Footer />
      </body>
      </Providers>
    </html>
  )
}
