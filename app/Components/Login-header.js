"use client";

import { useState, useEffect } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ShoppingBag } from 'lucide-react';
import Link from "next/link";
import GoogleTranslate from '../Components/GoogleTranslate'; // Adjust import path as needed

export default function LoginHeader({ user, setSidebarOpen }) {
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3); // Example notification count
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserDropdown]);

  const handleCartClick = () => {
    // Add cart functionality here
    console.log('Cart clicked');
  };

  const handleNotificationClick = () => {
    // Add notification functionality here
    console.log('Notifications clicked');
  };

  const handleUserProfileClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    // Add logout functionality here
    console.log('Logout clicked');
    setShowUserDropdown(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6">
        {/* Left Side - Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center" aria-label="Home">
            <img
              src="/images/m_logo.png"
              alt="Meu Deliver Logo"
              className=""
              width={110}
              height={110}
            />
          </Link>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon - Desktop */}
          <button
            onClick={handleCartClick}
            className="hidden lg:block p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 relative"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-[#00b1a5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {/* Google Translate - Desktop */}
          <div className="hidden lg:block">
            <GoogleTranslate variant="compact" />
          </div>

          {/* Notification Bell */}
          <button 
            onClick={handleNotificationClick}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Notifications"
          >
            <div className="w-5 h-5 text-gray-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            )}
          </button>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Google Translate - Icon only */}
            <div className="lg:hidden">
              <GoogleTranslate variant="icon-only" />
            </div>

            {/* Cart Icon - Mobile */}
            <button
              onClick={handleCartClick}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-[#00b1a5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Open menu"
            >
              <Bars3Icon className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* User Profile - Desktop only */}
          <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-gray-200">
            {user ? (
              <div className="relative user-dropdown-container">
                <button
                  onClick={handleUserProfileClick}
                  className="flex items-center space-x-3 group cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  aria-label="User menu"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow duration-200">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                      {user.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">{user.email || 'user@example.com'}</p>
                  </div>
                  <div className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                    <svg 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      className={`transform transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email || 'user@example.com'}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Your Profile</span>
                      </div>
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign out</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gray-300 animate-pulse" />
                <div className="hidden sm:block space-y-1">
                  <div className="w-20 h-3 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-24 h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}