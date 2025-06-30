"use client";

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  Bars3Icon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleTranslate from '../Components/GoogleTranslate';

export default function LoginHeader({ 
  user, 
  setSidebarOpen,
  onLogout,
  cartCount = 0,
  notificationCount = 0,
  onCartClick,
  onNotificationClick
}) {
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

  const handleUserProfileClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogoutClick = () => {
    toast.info('Logging out...', {
      position: "top-right",
      autoClose: 2000
    });
    onLogout();
    setShowUserDropdown(false);
  };

  const handleCartNotification = () => {
    onCartClick();
    toast.success(`Cart updated! ${cartCount} items`, {
      position: "top-right"
    });
  };

  const handleNotificationClick = () => {
    onNotificationClick();
    toast.info(`You have ${notificationCount} new notifications`, {
      position: "top-right"
    });
  };

  const userMenuItems = [
    { 
      label: 'Your Profile', 
      icon: <UserIcon className="w-4 h-4" />,
      href: '/profile',
      onClick: () => toast.info('Loading profile...')
    },
    { 
      label: 'Settings', 
      icon: <CogIcon className="w-4 h-4" />,
      href: '/settings',
      onClick: () => toast.info('Loading settings...')
    },
    { 
      label: 'Sign out', 
      icon: <ArrowRightOnRectangleIcon className="w-4 h-4" />,
      action: handleLogoutClick,
      isDestructive: true 
    }
  ];

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
              onClick={handleCartNotification}
              className="hidden lg:block p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBagIcon className="w-6 h-6 text-gray-600 hover:text-[#00b1a5]" />
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
              <BellIcon className="w-6 h-6 text-gray-600" />
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
                onClick={handleCartNotification}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 relative"
                aria-label="Shopping cart"
              >
                <ShoppingBagIcon className="w-6 h-6 text-gray-600 hover:text-[#00b1a5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  setSidebarOpen(true);
                  toast.info('Opening menu...', { autoClose: 1500 });
                }}
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
                      {userMenuItems.map((item) => (
                        item.href ? (
                          <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm ${item.isDestructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'}`}
                            onClick={() => {
                              setShowUserDropdown(false);
                              if (item.onClick) item.onClick();
                            }}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ) : (
                          <button
                            key={item.label}
                            onClick={() => {
                              item.action();
                              if (item.onClick) item.onClick();
                            }}
                            className={`w-full text-left flex items-center space-x-2 px-4 py-2 text-sm ${item.isDestructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </button>
                        )
                      ))}
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
    </>
  );
}

LoginHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  setSidebarOpen: PropTypes.func.isRequired,
  onLogout: PropTypes.func,
  cartCount: PropTypes.number,
  notificationCount: PropTypes.number,
  onCartClick: PropTypes.func,
  onNotificationClick: PropTypes.func
};

LoginHeader.defaultProps = {
  onLogout: () => toast.info('Logout initiated'),
  onCartClick: () => toast.info('Cart clicked'),
  onNotificationClick: () => toast.info('Notifications clicked'),
  cartCount: 0,
  notificationCount: 0
};