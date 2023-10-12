import Link from 'next/link'
import React from 'react'
import './header.css'
import {BsSearch} from 'react-icons/bs'
import Image from 'next/image'

const Header = () => {
  return (
    <>
    <header className="py-3 header-top-strip">
      <div className="container mx-auto">
        <div className="row">
          <div className="col-6">
          <p className='text-white mb-0'>Free Shipping Over $100 and Free Returns</p>
          </div>
          <div className="col-6">
            <div className="text-end text-white mb-0">
              Hotline{' '}
              <Link href='tel:+2349032942903'>+234 9032 942 903</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header


