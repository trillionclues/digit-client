"use client"

"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import './header.css';
import { AiOutlineUser, AiOutlineSearch, AiOutlineMenu  } from 'react-icons/ai';
import Navlinks from '../../../public/data/navlinks.json';
import UserCart from '../Cart/UserCart';


const Header:React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('');
  const [cartCount, setCartCount] = useState(2);


  const toggleMobileMenu  = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className="bg-white mb-3">
        <div className="container mx-auto px-10 md:px-28">
          <div className="flex flex-row justify-between items-center pb-3">
            <div className="logo-container pt-5">
              <Link href='/'>
                <h2 className='font-bold'>
                  SOFANA
                </h2>
              </Link>
              <div className="brush-underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 10"
                  width="100%"
                  height="10"
                >
                  <path d="M0 0 C 20 10 40 10 60 0" stroke="#000" stroke-width="2" fill="none" />
                </svg>
              </div>
            </div>


            <div className='hidden md:flex flex-row justify-center align-center gap-5'>
              {Navlinks.map((link, index) => {
                const isActive = link.url === activeLink;
                return (
                  <div
                    key={index}
                    className={`font-normal cursor-pointer pt-5 pb-2 px-1 ${
                      isActive ? 'bg-[#F4DFB6]' : 'hover:bg-[#F4DFB6]'
                    }`}
                    onClick={() => setActiveLink(link.url)}
                  >
                    <Link href={link.url}>{link.title}</Link>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row justify-between items-center gap-3 pt-5">
              <div className='text-xl cursor-pointer'>
                <AiOutlineSearch />
              </div>
              <div className="text-xl cursor-pointer">
                <AiOutlineUser />
              </div>
              <UserCart count={cartCount} />
              
              {/* toggle mobile menu */}
              <button className="md:hidden text-2xl cursor-pointer ml-3" onClick={toggleMobileMenu}>
                <AiOutlineMenu />
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white">
            {Navlinks.map((link, idx) => (
              <div key={link.index} className={`font-normal cursor-pointer pt-5 pb-2 px-1`}
              onClick={() => {
                setActiveLink(link.url)
                toggleMobileMenu();
              }}
              >
                <Link href={link.url}>{link.title}</Link>
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

