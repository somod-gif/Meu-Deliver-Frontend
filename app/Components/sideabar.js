"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const navigation = [
  // 🏠 Home & Discovery
  {
    name: "Home",
    key: "home",
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
          d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0H5a2 2 0 01-2-2v-4a2 2 0 012-2h1"
        />
      </svg>
    ),
  },

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

  // ⭐ Reviews
  {
    name: "Reviews",
    key: "reviews",
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
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.338 4.126a1 1 0 00.95.69h4.36c.969 0 1.371 1.24.588 1.81l-3.53 2.57a1 1 0 00-.364 1.118l1.338 4.127c.3.921-.755 1.688-1.538 1.118l-3.53-2.57a1 1 0 00-1.176 0l-3.53 2.57c-.783.57-1.838-.197-1.538-1.118l1.338-4.127a1 1 0 00-.364-1.118L2.174 9.553c-.783-.57-.38-1.81.588-1.81h4.36a1 1 0 00.95-.69l1.338-4.126z"
        />
      </svg>
    ),
  },

  // 🧾 Profile & Settings
  {
    name: "Profile",
    key: "profile",
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
          d="M5.121 17.804A7.5 7.5 0 0112 15a7.5 7.5 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    name: "Settings",
    key: "settings",
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
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066..."
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },

  // ❓ Help & Support
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
  {
    name: "Contact",
    key: "contact",
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
          d="M21 10c0 6.627-9 12-9 12S3 16.627 3 10a9 9 0 1118 0z"
        />
      </svg>
    ),
  },

  // 🔐 Register
  {
    name: "Register",
    key: "register",
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
          d="M12 11c1.656 0 3-1.567 3-3.5S13.656 4 12 4s-3 1.567-3 3.5S10.344 11 12 11zm0 2c-2.5 0-6 1.172-6 3.5V19h6m6-2v2m0 0v2m0-2h2m-2 0h-2"
        />
      </svg>
    ),
  },
  // 🔐 Sign In
  {
    name: "Sign in",
    key: "signin",
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
          d="M15 12H3m0 0l4-4m-4 4l4 4m13-10v16"
        />
      </svg>
    ),
  },
  // 🔐 Logout
  {
    name: "Sign Out",
    key: "signout",
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
          d="M9 12h12m0 0l-4-4m4 4l-4 4M3 4v16"
        />
      </svg>
    ),
  },
];

const registerItem = navigation.find((item) => item.key === "register");
const logoutItem = navigation.find((item) => item.key === "signin");
const loginItem = navigation.find((item) => item.key === "signout");

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  currentSection,
  setCurrentSection,
  user = null,
  logoutHandler,
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Safe user data access
  const safeUser = {
    name: user?.name || "Guest",
    email: user?.email || "",
    initial: user?.name?.charAt(0)?.toUpperCase() || "G",
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 bottom-0 z-50 w-64 bg-white shadow-xl 
          transform transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0 lg:shadow-none
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
        style={{
          // Ensure proper viewport height handling for mobile browsers
          height: '100vh',
          height: '100dvh', // Dynamic viewport height for better mobile support
        }}
      >
        {/* Header - Fixed at top */}
        <div className="flex-shrink-0 flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-white">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
              {safeUser.initial}
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {safeUser.name}
              </p>
              {safeUser.email && (
                <p className="text-xs text-gray-500 truncate">{safeUser.email}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <nav className="p-4 pb-20">
            <ul className="space-y-1">
              {/* Main navigation items */}
              {navigation
                .filter(
                  (item) =>
                    item.key !== "signout" &&
                    item.key !== "signin" &&
                    item.key !== "register"
                )
                .map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setCurrentSection(item.key);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                        currentSection === item.key
                          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md transform scale-[1.02]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-teal-600 hover:translate-x-1"
                      }`}
                    >
                      {item.icon && (
                        <item.icon
                          className={`w-5 h-5 mr-3 flex-shrink-0 transition-transform duration-200 ${
                            currentSection === item.key
                              ? "text-white"
                              : "group-hover:scale-110"
                          }`}
                        />
                      )}
                      <span className="flex-1 text-left truncate">{item.name}</span>
                      {currentSection === item.key && (
                        <div className="w-2 h-2 bg-white rounded-full opacity-80 flex-shrink-0 ml-2"></div>
                      )}
                    </button>
                  </li>
                ))}

              {/* Spacing between main nav and auth buttons */}
              <li className="py-2">
                <div className="border-t border-gray-200"></div>
              </li>

              {/* Auth buttons */}
              {isClient && (
                <>
                  {user ? (
                    <li>
                      <button
                        onClick={() => {
                          if (logoutHandler) logoutHandler();
                          setSidebarOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200"
                      >
                        {logoutItem?.icon && (
                          <logoutItem.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                        )}
                        <span className="flex-1 text-left">Logout</span>
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <a
                          href="/Auth/Login"
                          onClick={() => setSidebarOpen(false)}
                          className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                        >
                          {loginItem?.icon && (
                            <loginItem.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                          )}
                          <span className="flex-1 text-left">Login</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Auth/Register"
                          onClick={() => setSidebarOpen(false)}
                          className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl bg-[#00b1a5] text-white hover:bg-[#008a80] transition-all duration-200"
                        >
                          {registerItem?.icon && (
                            <registerItem.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                          )}
                          <span className="flex-1 text-left">Register</span>
                        </a>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Fast, Efficient & Secure
            </div>
            <div className="text-xs text-gray-500">Everywhere.</div>
            <div className="flex justify-center mt-2 space-x-1">
              <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
              <div className="w-1 h-1 bg-teal-300 rounded-full"></div>
              <div className="w-1 h-1 bg-teal-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}