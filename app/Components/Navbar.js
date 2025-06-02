'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, UserPlus, LogIn, Store, Car } from 'lucide-react'
import GoogleTranslate from './GoogleTranslate'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navLinks = [
    { 
      name: 'Vendors', 
      path: '/Vendors', 
      icon: Store,
      description: 'Browse local vendors'
    },
    { 
      name: 'Ride', 
      path: '/Ride', 
      icon: Car,
      description: 'Become a delivery partner'
    },
  ]

  const authLinks = [
    { 
      name: 'Register', 
      path: '/Auth/Register', 
      icon: UserPlus,
      style: 'secondary'
    },
    { 
      name: 'Login', 
      path: '/Auth/Login', 
      icon: LogIn,
      style: 'primary'
    },
  ]

  return (
    <nav className={`
      fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
      ${scrolled 
        ? 'bg-white/98 backdrop-blur-lg shadow-lg border-gray-200' 
        : 'bg-white/95 backdrop-blur-md shadow-md border-gray-100'
      }
    `}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18 lg:h-20">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center space-x-1 group flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-[#00b1a5] group-hover:scale-105 transition-transform duration-300">
              Meu
            </span>
            <div className="relative">
              <img 
                src="/images/logo.png" 
                alt="Meu Deliver Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto group-hover:rotate-12 transition-transform duration-500"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-[#00b1a5] group-hover:scale-105 transition-transform duration-300">
              Deliver
            </span>
          </Link>

          {/* Desktop Menu - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-4 xl:space-x-6">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="group relative flex items-center space-x-2 text-gray-700 hover:text-[#00b1a5] transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-[#00b1a5]/5"
                    title={link.description}
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="whitespace-nowrap">{link.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00b1a5] group-hover:w-full transition-all duration-300"></div>
                  </Link>
                )
              })}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Auth Links */}
            <div className="flex items-center space-x-3">
              {authLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`
                      flex items-center space-x-2 font-semibold px-4 xl:px-5 py-2 xl:py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm xl:text-base
                      ${link.style === 'primary' 
                        ? 'bg-[#00b1a5] text-white hover:bg-[#008a80] shadow-lg hover:shadow-xl' 
                        : 'border-2 border-[#00b1a5] text-[#00b1a5] hover:bg-[#00b1a5] hover:text-white'
                      }
                    `}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Google Translate */}
            <div className="pl-3 border-l border-gray-200">
              <GoogleTranslate />
            </div>
          </div>

          {/* Tablet Menu - Visible on medium screens */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            {/* Compact Nav Links */}
            <div className="flex items-center space-x-3">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="flex items-center space-x-1 text-gray-700 hover:text-[#00b1a5] transition-all duration-300 font-medium py-2 px-2 rounded-lg hover:bg-[#00b1a5]/5"
                    title={link.description}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Compact Auth */}
            <div className="flex items-center space-x-2">
              <Link
                href="/Auth/Register"
                className="text-[#00b1a5] hover:bg-[#00b1a5]/10 px-3 py-1 rounded-full text-sm font-medium transition-all"
              >
                Register
              </Link>
              <Link
                href="/Auth/Login"
                className="bg-[#00b1a5] text-white hover:bg-[#008a80] px-3 py-1 rounded-full text-sm font-medium transition-all"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#00b1a5] focus:outline-none p-2 rounded-lg hover:bg-[#00b1a5]/5 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? 
                <X className="w-6 h-6 transform rotate-180 transition-transform duration-300" /> : 
                <Menu className="w-6 h-6 transition-transform duration-300" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Only visible on small screens */}
      <div className={`
        md:hidden bg-white/98 backdrop-blur-lg shadow-xl border-t border-gray-100 
        transform transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'max-h-screen translate-y-0 opacity-100' : 'max-h-0 -translate-y-4 opacity-0 pointer-events-none'}
      `}>
        <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Navigation Links */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 pb-2">
              Services
            </h3>
            {navLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className="flex items-center space-x-3 text-gray-700 hover:text-[#00b1a5] transition-colors duration-300 font-medium py-3 px-4 rounded-xl hover:bg-[#00b1a5]/5 group active:bg-[#00b1a5]/10"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{link.name}</div>
                    <div className="text-sm text-gray-500 truncate">{link.description}</div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Auth Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 pb-2">
              Account
            </h3>
            {authLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`
                    flex items-center justify-center space-x-2 font-semibold py-3 px-6 rounded-xl transition-all duration-300 w-full active:scale-95
                    ${link.style === 'primary' 
                      ? 'bg-[#00b1a5] text-white hover:bg-[#008a80] shadow-lg active:shadow-md' 
                      : 'border-2 border-[#00b1a5] text-[#00b1a5] hover:bg-[#00b1a5] hover:text-white active:bg-[#00b1a5]/90'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Google Translate */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 pb-3">
              Language
            </h3>
            <div className="flex justify-center">
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}