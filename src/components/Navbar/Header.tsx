"use client";

"use client";

import Link from "next/link";
import React, { useState } from "react";
import "./header.css";
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import Navlinks from "../../../public/data/navlinks.json";
import UserCart from "../Cart/UserCart";
import NavLinks from "./NavLinks";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [cartCount, setCartCount] = useState(2);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-white mb-3 pt-3 md:pt-0">
        <div className="container mx-auto px-5 md:px-28">
          <div className="flex flex-row justify-between items-center pb-3">
            <div className="logo-container flex pt-5 flex-col items-start justify-start">
              <Link href="/">
                <h2 className="font-bold text-[#072F5F]">SOFANA</h2>
              </Link>
              <div className="brush-underline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 10"
                  width="100%"
                  height="10"
                >
                  <path
                    d="M0 0 C 20 10 40 10 60 0"
                    stroke="#000"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            <div className="hidden md:flex flex-row justify-center align-center gap-5">
              {Navlinks.map((link) => {
                const isActive = link.url === activeLink;
                return (
                  <div
                    key={link.id}
                    className={`font-normal text-[#072F5F] cursor-pointer pt-5 pb-2 px-1 ${
                      isActive ? "bg-[#F4DFB6]" : "hover:bg-[#F4DFB6]"
                    }`}
                    onClick={() => setActiveLink(link.url)}
                  >
                    <NavLinks navlink={link} />
                    {/* <Link href={link.url}>{link.title}</Link> */}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-row justify-between items-center gap-3 pt-5">
              <div className="text-xl cursor-pointer">
                <Link href="/search">
                  <AiOutlineSearch />
                </Link>
              </div>
              <div className="text-xl cursor-pointer">
                <Link href="/profile">
                  <AiOutlineUser />
                </Link>
              </div>
              <div className="cursor-pointer">
                <Link href="/cart">
                  <UserCart count={cartCount} />
                </Link>
              </div>

              {/* toggle mobile menu */}
              <button
                className="md:hidden text-2xl cursor-pointer ml-3 z-50"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`mobile-menu pt-20 z-50 ${isMobileMenuOpen ? "open" : ""}`}
        >
          {Navlinks.map((link) => (
            <div
              key={link.id}
              className={`font-normal cursor-pointer pt-5 pb-2 px-1 flex flex-col justify-between items-center gap-5`}
              onClick={() => {
                setActiveLink(link.url);
                toggleMobileMenu();
              }}
            >
              <Link href={link.url}>{link.title}</Link>
            </div>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;
