'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, UserPlus, LogIn, Store, Car } from 'lucide-react'
import GoogleTranslate from './GoogleTranslate'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 group">
            <span className="text-2xl font-bold text-[#00b1a5] group-hover:scale-105 transition-transform duration-300">
              Meu
            </span>
            <div className="relative">
              <img 
                src="/images/logo.png" 
                alt="Meu Deliver Logo" 
                className="h-12 w-auto group-hover:rotate-12 transition-transform duration-500"
              />
            </div>
            <span className="text-2xl font-bold text-[#00b1a5] group-hover:scale-105 transition-transform duration-300">
              Deliver
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
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
                    <span>{link.name}</span>
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
                      flex items-center space-x-2 font-semibold px-5 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
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

      {/* Mobile Menu Dropdown */}
      <div className={`
        lg:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100 
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}
      `}>
        <div className="px-4 py-6 space-y-4">
          {/* Navigation Links */}
          <div className="space-y-3">
            {navLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className="flex items-center space-x-3 text-gray-700 hover:text-[#00b1a5] transition-colors duration-300 font-medium py-3 px-4 rounded-xl hover:bg-[#00b1a5]/5 group"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold">{link.name}</div>
                    <div className="text-sm text-gray-500">{link.description}</div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Auth Links */}
          <div className="space-y-3">
            {authLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`
                    flex items-center justify-center space-x-2 font-semibold py-3 px-6 rounded-full transition-all duration-300 w-full
                    ${link.style === 'primary' 
                      ? 'bg-[#00b1a5] text-white hover:bg-[#008a80] shadow-lg' 
                      : 'border-2 border-[#00b1a5] text-[#00b1a5] hover:bg-[#00b1a5] hover:text-white'
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
          <div className="pt-4 border-t border-gray-200 flex justify-center">
            <GoogleTranslate />
          </div>
        </div>
      </div>
    </nav>
  )
}