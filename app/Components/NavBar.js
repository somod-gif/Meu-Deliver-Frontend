"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";
import Sidebar from "./sideabar";
import SearchBar from "./UI/search-bar";
import { useIsTablet, useIsMobile } from "../hooks/media-hook";
import { AuthContext } from "../hooks/authContext";
import { 
  UserPlus, 
  LogIn, 
  ShoppingBag, 
  Bell, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut,
  Menu,
  Package,
  PackageSearch,
  HelpCircle,
  List,
  Grid,
  Sun,
  Moon
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function NavBar({ user }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState();
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  const { isLoggedIn, verifiedUser, setVerifiedUser, setIsLoggedIn, loading } =
    useContext(AuthContext);

  const navigation = [
    {
      name: "Categories",
      key: "categories",
      icon: List,
    },
    {
      name: "Products",
      key: "products",
      icon: Grid,
    },
    {
      name: "FAQ",
      key: "faq",
      icon: HelpCircle,
    },
  ];
  
  const authLinks = [
    {
      name: "Register",
      path: "/Auth/Register",
      icon: UserPlus,
      style: "secondary",
    },
    { 
      name: "Login", 
      path: "/Auth/Login", 
      icon: LogIn, 
      style: "primary" 
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserDropdown && !event.target.closest(".user-dropdown-container")) {
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
        sidebarOpen && 
        !event.target.closest("aside") &&
        !event.target.closest('[aria-label="Open menu"]')
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const handleCartClick = () => {
    console.log("Cart clicked");
  };

  const handleNotificationClick = () => {
    console.log("Notifications clicked");
  };

  const handleUserProfileClick = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const logoutHandler = async () => {
    try {
      const logout = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (logout.ok) {
        toast.success("You have been logged out");
        setIsLoggedIn(false);
        setVerifiedUser(null);
        router.push('/');
        if (setShowUserDropdown) setShowUserDropdown(false);
        if (setSidebarOpen) setSidebarOpen(false);
      }
    } catch (error) {
      toast.error("Error signing out user");
    }
  };

  if (!mounted) return null;

  return (
    <>
      {isTablet && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          user={verifiedUser}
          logoutHandler={logoutHandler}
          loading={loading}
        />
      )}

      <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center" aria-label="Home">
              <img
                src="/images/m_logo.png"
                alt="Meu Deliver Logo"
                width={110}
                height={110}
                className="dark:invert"
              />
            </Link>
          </div>

          {!isMobile && (
            <div className="flex items-center px-4 sm:px-6 py-4">
              <SearchBar
                placeholder="Search for products..."
              />
            </div>
          )}

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
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30"
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
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Google Translate - Compact */}
            <div className="hidden lg:block w-32">
              <GoogleTranslate variant="compact" />
            </div>

            {/* Notification Bell */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              )}
            </button>

            {/* Cart Icon - Desktop */}
            <button
              onClick={handleCartClick}
              className="hidden lg:block p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-[#00b1a5]" />
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
                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 relative"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-[#00b1a5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#00b1a5] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* User Profile - Desktop only */}
            {!loading && isLoggedIn ? (
              <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                {user ? (
                  <div className="relative user-dropdown-container">
                    <button
                      onClick={handleUserProfileClick}
                      className="flex items-center space-x-3 group cursor-pointer p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      aria-label="User menu"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow duration-200">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-500 transition-colors duration-200">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email || "user@example.com"}
                        </p>
                      </div>
                      <div className="hidden sm:block w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                        <ChevronDown className={`transform transition-transform duration-200 ${showUserDropdown ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {user.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user.email || "user@example.com"}
                          </p>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>Your Profile</span>
                          </div>
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </div>
                        </Link>
                        <button
                          onClick={logoutHandler}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <LogOut className="w-4 h-4" />
                            <span>Sign out</span>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-300 dark:bg-gray-700 animate-pulse" />
                    <div className="hidden sm:block space-y-1">
                      <div className="w-20 h-3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
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
                          : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
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
          className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}