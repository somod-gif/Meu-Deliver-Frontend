'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import GoogleTranslate from './GoogleTranslate'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Vendors', path: '/Vendors' },
    { name: 'Ride', path: '/Ride' },
    { name: 'Register', path: '/Auth/Register' },
    { name: 'Login', path: '/Auth/Login' },
  ]

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            MeuDeliver
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                {link.name}
              </Link>
            ))}
            <GoogleTranslate />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-2">
            <GoogleTranslate />
          </div>
        </div>
      )}
    </nav>
  )
}
