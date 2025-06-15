'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, UserPlus, LogIn, Store, Car, MapPin, Search, User, ShoppingBag } from 'lucide-react'
import GoogleTranslate from './GoogleTranslate'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
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

    const throttledScroll = () => {
      let ticking = false
      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }
    }

    const scrollListener = throttledScroll()
    window.addEventListener('scroll', scrollListener)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', scrollListener)
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
        ${scrolled ? 'bg-white shadow-md' : 'bg-white'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1 group" aria-label="Home">
              
              <div className="relative">
                <img
                  src="/images/logo.jpg"
                  alt="Meu Deliver Logo"
                  className="h-8 sm:h-10 md:h-12 w-auto group-hover:rotate-12 transition-transform duration-500"
                  width={48}
                  height={48}
                  loading="eager"
                />
              </div>
              
            </Link>

            {/* Location Selector - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <button
                onClick={() => setShowLocationModal(true)}
                className="flex items-center space-x-2 w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200"
              >
                <MapPin className="w-5 h-5 text-gray-600" />
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-black">Deliver to</div>
                  <div className="text-sm text-gray-600 truncate">Current location • Now</div>
                </div>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`group flex items-center space-x-2 transition-all duration-200 font-medium py-2 px-4 rounded-full hover:bg-gray-100 ${
                      active ? 'text-black bg-gray-100' : 'text-gray-700 hover:text-black'
                    }`}
                    title={link.description}
                    aria-label={link.description}
                  >
                    <IconComponent className={`w-5 h-5 ${active ? 'scale-110' : ''}`} aria-hidden="true" />
                    <span className="whitespace-nowrap text-sm">{link.name}</span>
                  </Link>
                )
              })}

              {/* Cart Icon */}
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  0
                </span>
              </button>

              {/* Divider */}
              <div className="h-8 w-px bg-gray-300 mx-2"></div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                {authLinks.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`flex items-center space-x-2 font-medium px-4 py-2 rounded-full transition-all duration-200 text-sm whitespace-nowrap ${
                        link.style === 'primary'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      aria-label={link.name}
                    >
                      <IconComponent className="w-4 h-4" aria-hidden="true" />
                      <span>{link.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Google Translate */}
              <div className="ml-4">
                <GoogleTranslate />
              </div>
            </div>

            {/* Mobile Right Section */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Cart */}
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 relative">
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  0
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="menu-button text-gray-700 hover:text-black focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Location Bar */}
          <div className="lg:hidden pb-3">
            <button
              onClick={() => setShowLocationModal(true)}
              className="flex items-center space-x-2 w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200"
            >
              <MapPin className="w-5 h-5 text-gray-600" />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-black">Deliver to</div>
                <div className="text-sm text-gray-600 truncate">Current location • Now</div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`mobile-menu-container lg:hidden bg-white shadow-lg border-t border-gray-100 transform transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col p-4 space-y-3">
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => {
              const IconComponent = link.icon
              const active = isActive(link.path)
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`flex items-center space-x-3 font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                    active ? 'text-black bg-gray-100' : 'text-gray-700 hover:text-black hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              )
            })}

            {/* Divider */}
            <div className="border-t border-gray-200 my-3"></div>

            {/* Mobile Auth Links */}
            <div className="flex flex-col space-y-3">
              {authLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`flex items-center space-x-3 font-medium px-4 py-3 rounded-lg transition-all duration-200 ${
                      link.style === 'primary'
                        ? 'bg-black text-white hover:bg-gray-800'
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

            {/* Mobile Google Translate */}
            <div className="pt-4 border-t border-gray-200">
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </nav>

      {/* Location Modal Backdrop */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Enter your address</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter delivery address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b1a5] focus:border-transparent"
                />
              </div>
              <button className="w-full bg-[#00b1a5] text-white py-3 rounded-lg font-medium hover:bg-[#008a80] transition-colors duration-200">
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}