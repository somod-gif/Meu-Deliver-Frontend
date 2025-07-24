"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import GoogleTranslate from "./GoogleTranslate";
import Sidebar from "./sideabar";
import SearchBar from "./UI/search-bar";
import LocationSelector from "./LocationSelector";
import { useIsTablet, useIsMobile } from "../hooks/media-hook";
import { AuthContext } from "../hooks/authContext";
import { useCart } from "../Context/CartContext";

import {
  UserPlus,
  LogIn,
  ShoppingBag,
  ChevronDown,
  Settings,
  LogOut,
  Menu,
  Layers,
  Box,
  Truck,
  MapPin,
  Navigation,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function NavBar({ user }) {
  const router = useRouter();
  const { cart } = useCart();
  const { totalQuantity } = cart;
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState();

  // Location state
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);

  const isTablet = useIsTablet();
  const isMobile = useIsMobile();
  const { isLoggedIn, verifiedUser, setVerifiedUser, setIsLoggedIn, loading } =
    useContext(AuthContext);

  const navigation = [
    {
      name: "Categories",
      key: "categories",
      icon: Layers,
      href: "/Pages/Categories",
    },
    {
      name: "Products",
      key: "products",
      icon: Box,
      href: "/Pages/Products",
    },
    {
      name: "Post Office",
      key: "post-office",
      icon: Mail,
      href: "/Pages/Post-Office",
    },
    // {
    //   name: "Tracking",
    //   key: "track-order",
    //   icon: Truck,
    //   href: "/track-order",
    // },
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
      style: "primary",
    },
  ];

  // Load saved locations on component mount
  useEffect(() => {
    const saved = localStorage.getItem("meu-deliver-locations");
    if (saved) {
      setSavedLocations(JSON.parse(saved));
    }

    const currentLoc = localStorage.getItem("meu-deliver-current-location");
    if (currentLoc) {
      setCurrentLocation(JSON.parse(currentLoc));
    }
  }, []);

  // Save locations to localStorage whenever they change
  useEffect(() => {
    if (savedLocations.length > 0) {
      localStorage.setItem(
        "meu-deliver-locations",
        JSON.stringify(savedLocations)
      );
    }
  }, [savedLocations]);

  // Save current location to localStorage
  useEffect(() => {
    if (currentLocation) {
      localStorage.setItem(
        "meu-deliver-current-location",
        JSON.stringify(currentLocation)
      );
    }
  }, [currentLocation]);

  // Detect user's current location
  const detectCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      toast.error("Geolocation is not supported by this browser");
      return;
    }

    setIsDetectingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Reverse geocoding to get address
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API}`
          );

          if (!response.ok) {
            throw new Error("Failed to get address from coordinates");
          }

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const location = {
              id: Date.now(),
              address: result.formatted,
              shortAddress:
                result.components.neighbourhood ||
                result.components.suburb ||
                result.components.city ||
                "Current Location",
              coordinates: { latitude, longitude },
              isCurrentLocation: true,
              timestamp: new Date().toISOString(),
            };

            setCurrentLocation(location);
            toast.success("Location detected successfully!");
          } else {
            throw new Error("No address found for current location");
          }
        } catch (error) {
          console.error("Error getting address:", error);
          setLocationError(error.message);
          toast.error("Failed to get address for current location");
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        let errorMessage = "Failed to get your location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        setLocationError(errorMessage);
        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  // Handle manual location selection
  const handleLocationSelect = (location) => {
    setCurrentLocation(location);
    setShowLocationDropdown(false);

    // Add to saved locations if not already there
    if (!savedLocations.find((loc) => loc.address === location.address)) {
      const newLocation = {
        ...location,
        id: Date.now(),
        isCurrentLocation: false,
      };
      setSavedLocations((prev) => [newLocation, ...prev.slice(0, 4)]); // Keep only 5 recent locations
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showUserDropdown &&
        !event.target.closest(".user-dropdown-container")
      ) {
        setShowUserDropdown(false);
      }

      if (
        showLocationDropdown &&
        !event.target.closest(".location-dropdown-container")
      ) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserDropdown, showLocationDropdown]);

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
        router.push("/");
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
          {/* Left Side - Logo & Location */}
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

            {/* Location Selector - Desktop */}
            {!isMobile && (
              <div className="relative location-dropdown-container">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-[var(--button-hover)] transition-colors duration-200 border border-[var(--navbar-border)] min-w-[200px]"
                  aria-label="Select location"
                >
                  <MapPin className="w-5 h-5 text-[var(--primary-color)]" />
                  <div className="flex-1 text-left">
                    {currentLocation ? (
                      <>
                        <div className="text-sm font-medium text-[var(--text-color)] truncate">
                          {currentLocation.shortAddress}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] truncate">
                          {currentLocation.address.length > 30
                            ? `${currentLocation.address.substring(0, 30)}...`
                            : currentLocation.address}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-[var(--text-secondary)]">
                        Select delivery location
                      </div>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 ${showLocationDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Location Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-[var(--dropdown-bg)] rounded-lg shadow-lg border border-[var(--navbar-border)] py-2 z-50">
                    {/* Current Location Button */}
                    <button
                      onClick={detectCurrentLocation}
                      disabled={isDetectingLocation}
                      className="w-full px-4 py-3 text-left hover:bg-[var(--dropdown-hover)] transition-colors duration-200 flex items-center space-x-3 border-b border-[var(--dropdown-border)]"
                    >
                      <div className="flex-shrink-0">
                        {isDetectingLocation ? (
                          <div className="w-5 h-5 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Navigation className="w-5 h-5 text-[var(--primary-color)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[var(--primary-color)]">
                          {isDetectingLocation
                            ? "Detecting location..."
                            : "Use current location"}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          GPS will be used to find your location
                        </div>
                      </div>
                    </button>

                    {/* Saved Locations */}
                    {savedLocations.length > 0 && (
                      <div className="py-2">
                        <div className="px-4 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                          Recent Locations
                        </div>
                        {savedLocations.map((location) => (
                          <button
                            key={location.id}
                            onClick={() => handleLocationSelect(location)}
                            className="w-full px-4 py-3 text-left hover:bg-[var(--dropdown-hover)] transition-colors duration-200 flex items-center space-x-3"
                          >
                            <MapPin className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-[var(--text-color)] truncate">
                                {location.shortAddress}
                              </div>
                              <div className="text-xs text-[var(--text-secondary)] truncate">
                                {location.address}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Add Location Button */}
                    <div className="border-t border-[var(--dropdown-border)] pt-2">
                      <LocationSelector
                        onLocationSelect={handleLocationSelect}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center - Search Bar for Desktop */}
          {!isMobile && (
            <div className="flex items-center px-3 sm:px-6 py-3">
              <SearchBar placeholder="Search for products..." />
            </div>
          )}

          {/* Center Nav Buttons - Desktop Only */}
          {!isTablet && (
            <nav className="flex justify-center gap-3 px-3 py-2">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    currentSection === item.key
                      ? "bg-[var(--primary-color)] text-white shadow"
                      : "bg-[var(--button-bg)] text-[var(--text-color)] hover:bg-[var(--button-hover)]"
                  }`}
                  onClick={() => setCurrentSection(item.key)}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Google Translate - Desktop */}
            <div className="hidden lg:block relative">
              <GoogleTranslate variant="icon-only" />
            </div>

            {/* Cart Icon - Desktop */}
            <button
              onClick={() => router.push("/Pages/Cart")}
              className="hidden lg:block p-2 hover:bg-[var(--button-hover)] rounded-lg transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-6 h-6 text-[var(--text-color)] hover:text-[var(--primary-color)]" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--primary-color)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Google Translate */}
              <div className="relative">
                <GoogleTranslate variant="icon-only" />
              </div>

              {/* Cart Icon - Mobile */}
              <button
                onClick={() => router.push("/Pages/Cart")}
                className="p-2 hover:bg-[var(--button-hover)] rounded-lg transition-colors duration-200 relative"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-6 h-6 text-[var(--text-color)] hover:text-[var(--primary-color)]" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--primary-color)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
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
                        <ChevronDown
                          className={`transform transition-transform duration-200 ${showUserDropdown ? "rotate-180" : ""}`}
                        />
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
                      className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200 ${
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

        {/* Mobile Location Bar */}
        {isMobile && (
          <div className="px-4 pb-3 border-t border-[var(--navbar-border)]">
            <div className="relative location-dropdown-container">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg hover:bg-[var(--button-hover)] transition-colors duration-200 border border-[var(--navbar-border)]"
                aria-label="Select location"
              >
                <MapPin className="w-5 h-5 text-[var(--primary-color)]" />
                <div className="flex-1 text-left">
                  {currentLocation ? (
                    <>
                      <div className="text-sm font-medium text-[var(--text-color)] truncate">
                        {currentLocation.shortAddress}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] truncate">
                        {currentLocation.address.length > 40
                          ? `${currentLocation.address.substring(0, 40)}...`
                          : currentLocation.address}
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-[var(--text-secondary)]">
                      Select delivery location
                    </div>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 ${showLocationDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mobile Location Dropdown */}
              {showLocationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--dropdown-bg)] rounded-lg shadow-lg border border-[var(--navbar-border)] py-2 z-50">
                  {/* Current Location Button */}
                  <button
                    onClick={detectCurrentLocation}
                    disabled={isDetectingLocation}
                    className="w-full px-4 py-3 text-left hover:bg-[var(--dropdown-hover)] transition-colors duration-200 flex items-center space-x-3 border-b border-[var(--dropdown-border)]"
                  >
                    <div className="flex-shrink-0">
                      {isDetectingLocation ? (
                        <div className="w-5 h-5 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Navigation className="w-5 h-5 text-[var(--primary-color)]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--primary-color)]">
                        {isDetectingLocation
                          ? "Detecting location..."
                          : "Use current location"}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">
                        GPS will be used to find your location
                      </div>
                    </div>
                  </button>

                  {/* Saved Locations */}
                  {savedLocations.length > 0 && (
                    <div className="py-2">
                      <div className="px-4 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                        Recent Locations
                      </div>
                      {savedLocations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full px-4 py-3 text-left hover:bg-[var(--dropdown-hover)] transition-colors duration-200 flex items-center space-x-3"
                        >
                          <MapPin className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[var(--text-color)] truncate">
                              {location.shortAddress}
                            </div>
                            <div className="text-xs text-[var(--text-secondary)] truncate">
                              {location.address}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Add Location Button */}
                  <div className="border-t border-[var(--dropdown-border)] pt-2">
                    <LocationSelector onLocationSelect={handleLocationSelect} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
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
