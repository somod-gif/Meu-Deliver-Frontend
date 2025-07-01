"use client";

import { useState, useEffect, useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";
import Sidebar from "./sideabar";
import { useIsTablet } from "../hooks/media-hook";
import { AuthContext } from "../hooks/authContext";
import { UserPlus, LogIn, ShoppingBag } from "lucide-react";

export default function NavBar({ user }) {
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState();
  const isTablet = useIsTablet();
  const { isLoggedIn, verifiedUser } = useContext(AuthContext);

  const navigation = [
    // 🛍️ Shopping
    {
      name: "Categories",
      key: "categories",
      icon: ({ className }) => (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
      ),
    },
    {
      name: "Products",
      key: "products",
      icon: ({ className }) => (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4M4 6h16M4 18h16"
          />
        </svg>
      ),
    },

    // 📦 Orders
    {
      name: "Orders",
      key: "orders",
      icon: ({ className }) => (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m0 0v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2m6 0H9"
          />
        </svg>
      ),
    },
    {
      name: "Track Order",
      key: "track-order",
      icon: ({ className }) => (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c1.104 0 2 .672 2 1.5S13.104 11 12 11s-2-.672-2-1.5S10.896 8 12 8zm0 0v10m-8-2a8 8 0 1116 0 8 8 0 01-16 0z"
          />
        </svg>
      ),
    },
    {
      name: "FAQ",
      key: "faq",
      icon: ({ className }) => (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 14h.01M16 10h.01..."
          />
        </svg>
      ),
    },
  ];
  const authLinks = [
    {
      name: "Register",
      path: "/Auth/Register",
      icon: UserPlus,
      style: "secondary",
    },
    { name: "Login", path: "/Auth/Login", icon: LogIn, style: "primary" },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showUserDropdown &&
        !event.target.closest(".user-dropdown-container")
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserDropdown]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen & !event.target.closest("aside") &&
        !event.target.closest('[aria-label="Open menu"]')
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const handleCartClick = () => {
    // Add cart functionality here
    console.log("Cart clicked");
  };

  const handleNotificationClick = () => {
    // Add notification functionality here
    console.log("Notifications clicked");
  };

  const handleUserProfileClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    // Add logout functionality here
    console.log("Logout clicked");
    setShowUserDropdown(false);
  };
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <>
      {isTablet && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          user={verifiedUser}
        />
      )}

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

          {/* Center Nav Buttons */}
          {!isTablet && (
            <nav className="flex flex-wrap justify-center gap-4 px-4 py-2">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setCurrentSection(item.key)}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentSection === item.key
                      ? "bg-teal-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-teal-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          )}

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
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

            {/* Cart Icon - Desktop */}
            <button
              onClick={handleCartClick}
              className="hidden lg:block p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6 text-gray-600 hover:text-[#00b1a5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
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
                    {cartCount > 99 ? "99+" : cartCount}
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
            {isLoggedIn ? (
              <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-gray-200">
                {user ? (
                  <div className="relative user-dropdown-container">
                    <button
                      onClick={handleUserProfileClick}
                      className="flex items-center space-x-3 group cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      aria-label="User menu"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow duration-200">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.email || "user@example.com"}
                        </p>
                      </div>
                      <div className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          className={`transform transition-transform duration-200 ${showUserDropdown ? "rotate-180" : ""}`}
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
                          <p className="text-sm font-medium text-gray-900">
                            {user.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.email || "user@example.com"}
                          </p>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
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
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>Settings</span>
                          </div>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
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
            ) : (
              <div className="flex items-center space-x-4">
                {/* Desktop Auth Buttons */}
                <div className="hidden lg:flex items-center space-x-3">
                  {authLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                        link.style === "primary"
                          ? "bg-[#00b1a5] text-white hover:bg-[#008a80]"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
