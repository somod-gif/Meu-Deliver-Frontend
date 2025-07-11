"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { 
  Home, 
  Grid3X3, 
  Package, 
  ShoppingCart, 
  MapPin, 
  User, 
  Settings, 
  HelpCircle, 
  MessageCircle, 
  UserPlus, 
  LogIn, 
  LogOut,
  BarChart3
} from "lucide-react";

const navigation = [
  // 🏠 Home & Discovery
  {
    name: "Home",
    key: "home",
    icon: Home,
  },
  
  // 📊 Dashboard
  {
    name: "Dashboard",
    key: "dashboard",
    icon: BarChart3,
  },

  // 🛍️ Shopping
  {
    name: "Categories",
    key: "categories",
    icon: Grid3X3,
  },
  {
    name: "Products",
    key: "products",
    icon: Package,
  },

  // 📦 Orders
  {
    name: "Orders",
    key: "orders",
    icon: ShoppingCart,
  },
  {
    name: "Track Order",
    key: "track-order",
    icon: MapPin,
  },

  // 👤 Settings
  {
    name: "Settings",
    key: "settings",
    icon: Settings,
  },

  // ❓ Help & Support
  {
    name: "FAQ",
    key: "faq",
    icon: HelpCircle,
  },
  {
    name: "Contact Us",
    key: "contact",
    icon: MessageCircle,
  },

  // 🔐 Authentication
  {
    name: "Register",
    key: "register",
    icon: UserPlus,
  },
  {
    name: "Sign in",
    key: "signin",
    icon: LogIn,
  },
  {
    name: "Sign Out",
    key: "signout",
    icon: LogOut,
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