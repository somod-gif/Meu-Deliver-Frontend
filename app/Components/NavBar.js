"use client";

import { useState, useEffect, useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";
import Sidebar from "./sideabar";
import SearchBar from "./UI/search-bar";
import { useIsTablet, useIsMobile } from "../hooks/media-hook";
import { AuthContext } from "../hooks/authContext";
import { useTheme } from "../Context/ThemeProvider";
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

export default function NavBar({ user }) {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState();
  const { darkMode, toggleDarkMode } = useTheme();
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
        if (setShowUserDropdown) {
          setShowUserDropdown(false);
          return;
        }
        if (setSidebarOpen) {
          setSidebarOpen(false);
        }
      }
    } catch (error) {
      toast.error("Error signing out user");
    }
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
          logoutHandler={logoutHandler}
          loading={loading}
        />
      )}

      <header className="sticky top-0 z-40 bg-[var(--navbar-bg)] backdrop-blur-sm shadow-sm border-b border-[var(--navbar-border)]">
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
                      ? "bg-[var(--primary-color)] text-white shadow"
                      : "bg-[var(--button-bg)] text-[var(--text-color)] hover:bg-[var(--button-hover)]"
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
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-[var(--button-hover)] transition-colors duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--text-color)]" />
              )}
            </button>

            {/* Google Translate - Desktop */}
            <div className="hidden lg:block w-40">
              <GoogleTranslate variant="compact" />
            </div>

            {/* Notification Bell */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-lg hover:bg-[var(--button-hover)] transition-colors duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-[var(--text-color)]" />
              {notificationCount > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[var(--navbar-bg)]"></div>
              )}
            </button>

            {/* Cart Icon - Desktop */}
            <button
              onClick={handleCartClick}
              className="hidden lg:block p-2 hover:bg-[var(--button-hover)] rounded-lg transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6 text-[var(--text-color)] hover:text-[var(--primary-color)]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--primary-color)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
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
                className="p-2 hover:bg-[var(--button-hover)] rounded-lg transition-colors duration-200 relative"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-6 h-6 text-[var(--text-color)] hover:text-[var(--primary-color)]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--primary-color)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-[var(--button-hover)] transition-colors duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-[var(--text-color)]" />
              </button>
            </div>

            {/* User Profile - Desktop only */}
            {!loading && isLoggedIn ? (
              <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-[var(--navbar-border)]">
                {user ? (
                  <div className="relative user-dropdown-container">
                    <button
                      onClick={handleUserProfileClick}
                      className="flex items-center space-x-3 group cursor-pointer p-1 rounded-lg hover:bg-[var(--button-hover)] transition-colors duration-200"
                      aria-label="User menu"
                    >
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-dark)] flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow duration-200">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors duration-200">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {user.email || "user@example.com"}
                        </p>
                      </div>
                      <div className="hidden sm:block w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--text-color)] transition-colors duration-200">
                        <ChevronDown className={`transform transition-transform duration-200 ${showUserDropdown ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-[var(--dropdown-bg)] rounded-lg shadow-lg border border-[var(--navbar-border)] py-1 z-50">
                        <div className="px-4 py-2 border-b border-[var(--dropdown-border)]">
                          <p className="text-sm font-medium text-[var(--text-color)]">
                            {user.name || "User"}
                          </p>
                          <p className="text-xs text-[var(--text-secondary)]">
                            {user.email || "user@example.com"}
                          </p>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--dropdown-hover)] transition-colors duration-200"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>Your Profile</span>
                          </div>
                        </Link>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-[var(--text-color)] hover:bg-[var(--dropdown-hover)] transition-colors duration-200"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </div>
                        </Link>
                        <button
                          onClick={logoutHandler}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[var(--dropdown-hover)] transition-colors duration-200"
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
                    <div className="w-9 h-9 rounded-xl bg-[var(--button-bg)] animate-pulse" />
                    <div className="hidden sm:block space-y-1">
                      <div className="w-20 h-3 bg-[var(--button-bg)] rounded animate-pulse"></div>
                      <div className="w-24 h-2 bg-[var(--button-hover)] rounded animate-pulse"></div>
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
                          ? "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-dark)]"
                          : "border border-[var(--navbar-border)] text-[var(--text-color)] hover:bg-[var(--button-hover)]"
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