"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function LoginHeader({ user, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-0 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          {/* Logo - Bigger size */}
          <Link href="/" className="flex items-center" aria-label="Home">
            <img
              src="/images/m_logo.png"
              alt="Meu Deliver Logo"
              className=" "
              width={110}
              height={110}
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
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
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Open menu"
            >
              <Bars3Icon className="w-6 h-6 text-gray-600" />
            </button>

            
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
}
