'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, UserPlus, LogIn, Store, Car, ShoppingBag } from 'lucide-react'
import GoogleTranslate from './GoogleTranslate'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [handleScroll, handleResize])

  const navLinks = [
    { name: 'Vendor', path: '/Portal/Vendor', icon: Store, description: 'Browse local vendors' },
    { name: 'Ride', path: '/Portal/Ride', icon: Car, description: 'Become a delivery partner' },
  ]

  const authLinks = [
    { name: 'Register', path: '/Auth/Register', icon: UserPlus, style: 'secondary' },
    { name: 'Login', path: '/Auth/Login', icon: LogIn, style: 'primary' },
  ]

  const isActive = (path) => pathname.startsWith(path)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('.menu-button')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  if (!isMounted) return null

  return (
    <>
      <nav className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-white shadow-sm' : 'bg-white'}
        border-b border-gray-100
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center ">
            {/* Logo - Bigger size */}
            <Link href="/" className="flex items-center" aria-label="Home">
              <img 
                src="/images/m_logo.png" 
                alt="Meu Deliver Logo" 
                className=" w-auto " 
                width={120}
                // height={au}
              />
            </Link>

            {/* Desktop Menu - Bigger and more legible */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`group flex items-center space-x-2 transition-all duration-200 font-medium py-2 px-4 rounded-lg ${
                      active ? 'text-black' : 'text-gray-600 hover:text-black'
                    }`}
                    title={link.description}
                    aria-label={link.description}
                  >
                    <IconComponent className={`w-6 h-6 ${active ? 'text-[#00b1a5]' : 'text-gray-500 group-hover:text-[#00b1a5]'}`} />
                    <span className="whitespace-nowrap text-base">{link.name}</span>
                  </Link>
                )
              })}
            </div>

            

            {/* Right Side Controls */}
            <div className="flex items-center space-x-6">
               {/* Cart Icon - Desktop */}
            <button 
              className="hidden lg:block p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-[#00b1a5]" />
              <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                0
              </span>
            </button>
              {/* Auth Buttons - Desktop - Moved before Google Translate */}
              <div className="hidden lg:flex items-center space-x-4">
                {authLinks.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`flex items-center space-x-2 font-medium px-5 py-2.5 rounded-lg transition-all duration-200 text-base whitespace-nowrap ${
                        link.style === 'primary'
                          ? 'bg-[#00b1a5] text-white hover:bg-[#008a80]'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      aria-label={link.name}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Google Translate - Desktop - Moved to end */}
              <div className="hidden lg:block ml-2">
                <GoogleTranslate variant="compact" />
              </div>

              {/* Mobile Controls - Simplified */}
              <div className="lg:hidden flex items-center space-x-4">
                {/* Mobile Google Translate - Just icon */}
                <div className="lg:hidden">
                  <GoogleTranslate variant="icon-only" />
                </div>

                {/* Cart Icon */}
                <button 
                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-[#00b1a5]" />
                  <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    0
                  </span>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-600 hover:text-black focus:outline-none p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden bg-white shadow-lg transform transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[500px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col p-4 space-y-4">
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => {
              const IconComponent = link.icon
              const active = isActive(link.path)
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`flex items-center space-x-3 font-medium px-4 py-3 rounded-lg transition-all duration-200 text-base ${
                    active ? 'text-black bg-gray-50' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className={`w-6 h-6 ${active ? 'text-[#00b1a5]' : 'text-gray-500'}`} />
                  <span>{link.name}</span>
                </Link>
              )
            })}

            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Mobile Auth Links */}
            <div className="flex flex-col space-y-3">
              {authLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`flex items-center justify-center space-x-3 font-medium px-4 py-3 rounded-lg transition-all duration-200 text-base ${
                      link.style === 'primary'
                        ? 'bg-[#00b1a5] text-white hover:bg-[#008a80]'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-19"></div>
    </>
  )
}