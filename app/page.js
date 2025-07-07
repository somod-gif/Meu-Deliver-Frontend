"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { AuthContext } from "./hooks/authContext";
import CategoriesAndProducts from "./UI/ProCat.js";
import SearchBar from "./Components/UI/search-bar.js";
import { useIsMobile } from "./hooks/media-hook.js";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Popular Vendors Data
  const popularVendors = [
    {
      id: 1,
      name: "Burger Palace",
      category: "Food",
      rating: 4.8,
      deliveryTime: "15-25 min",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      featured: true,
      badge: "Popular",
    },
    {
      id: 2,
      name: "FreshMart",
      category: "Groceries",
      rating: 4.6,
      deliveryTime: "20-30 min",
      image:
        "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
      featured: true,
      badge: "Fresh",
    },
    {
      id: 3,
      name: "MediCare",
      category: "Pharmacy",
      rating: 4.9,
      deliveryTime: "10-20 min",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
      featured: true,
      badge: "Fast",
    },
    {
      id: 4,
      name: "TechZone",
      category: "Electronics",
      rating: 4.7,
      deliveryTime: "30-45 min",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      featured: true,
      badge: "Tech",
    },
    {
      id: 5,
      name: "Fashion Hub",
      category: "Retail",
      rating: 4.5,
      deliveryTime: "35-50 min",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop",
      featured: true,
      badge: "Trendy",
    },
    {
      id: 6,
      name: "Brew Masters",
      category: "Beverages",
      rating: 4.8,
      deliveryTime: "25-40 min",
      image:
        "https://images.unsplash.com/photo-1471421298428-1513ab720a8e?w=400&h=300&fit=crop",
      featured: true,
      badge: "Local",
    },
  ];

  // Other static data
  const stats = [
    {
      number: "50K+",
      label: "Happy Customers",
      icon: "😊",
      description: "Serving smiles across the city with our quality products",
    },
    {
      number: "1.2K+",
      label: "Premium Vendors",
      icon: "🤝",
      description: "Curated selection of top-rated local businesses",
    },
    {
      number: "18min",
      label: "Avg. Delivery Time",
      icon: "⚡",
      description: "Lightning-fast delivery to your doorstep",
    },
    {
      number: "99.8%",
      label: "Order Accuracy",
      icon: "🎯",
      description: "Precision in every order you place",
    },
    {
      number: "24/7",
      label: "Customer Support",
      icon: "💬",
      description: "Always here when you need us",
    },
    {
      number: "50+",
      label: "Neighborhoods Served",
      icon: "📍",
      description: "Expanding our reach daily",
    },
  ];

  const riderFeatures = [
    {
      title: "Flexible Earnings",
      desc: "Work when you want and earn on your schedule",
      icon: "💰",
    },
    {
      title: "Reliable Support",
      desc: "24/7 support team to help you with any issues",
      icon: "📞",
    },
    {
      title: "Fast Payouts",
      desc: "Get paid quickly with multiple withdrawal options",
      icon: "💳",
    },
  ];

  const HERO_IMG =
    "https://thumbs.dreamstime.com/b/delivery-man-customer-door-can-use-web-banner-infographics-hero-images-flat-modern-vector-illustration-198679901.jpg";
  const ANGOLA_RATE = 921.23;

  const [currentIndex, setCurrentIndex] = useState(0);

  // All testimonials data
  const testimonials = [
    {
      name: "Jéssica Chilombo",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b442?w=60&h=60&fit=crop&crop=face",
      text: "Incredible service! My food arrived hot and fresh in just 12 minutes. The app is so easy to use, and the delivery tracking is spot-on.",
      gradient: "from-[#00b1a5]/5 to-[#a3d900]/5",
      border: "border-[#00b1a5]/10",
    },
    {
      name: "Mateus Ndongala",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      text: "Best delivery app I've used! Great selection of restaurants, fair prices, and the customer service is outstanding. Highly recommend!",
      gradient: "from-[#a3d900]/5 to-[#c6d90d]/5",
      border: "border-[#a3d900]/10",
    },
    {
      name: "Domingos Quissola",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      text: "As a busy mom, Meu Deliver is a lifesaver! Quick, reliable, and my kids love tracking the delivery. It's become our go-to solution.",
      gradient: "from-[#c6d90d]/5 to-[#00b1a5]/5",
      border: "border-[#c6d90d]/10",
    },
    {
      name: "Ana Silva",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
      text: "The speed is unmatched! I ordered during lunch break and had my meal in 10 minutes. The app interface is clean and intuitive too.",
      gradient: "from-[#00b1a5]/5 to-[#a3d900]/5",
      border: "border-[#00b1a5]/10",
    },
    {
      name: "Carlos Santos",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      text: "Outstanding customer support and lightning-fast delivery. The restaurant variety is amazing and the prices are very competitive.",
      gradient: "from-[#c6d90d]/5 to-[#00b1a5]/5",
      border: "border-[#c6d90d]/10",
    },
  ];

  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];
  return (
    <main className="bg-white">
      {isMobile && (
        <div className="flex items-center px-4 sm:px-6 py-4">
          <SearchBar
            placeholder="Search for products..."
            // onSearch={handleSearch}
          />
        </div>
      )}
      
      {/* --------- Hero Section --------- */}
      <section className="bg-gray-50 ">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center px-6 lg:px-8 ">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl mt-4 lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Fast, Reliable Delivery
              <br />
              <span className="text-[#00b1a5]">
                From Restaurants, Shops & More
              </span>
            </h1>
            <p className="text-sm text-gray-600 max-w-md mx-auto lg:mx-0">
              Meu Deliver brings everything you need — food, groceries,
              pharmacy, documents & parcels — right to your door in Angola.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="/Vendors"
                className="inline-block bg-[#00b1a5] hover:bg-[#008a80] text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Order Now
              </a>
              {!isLoggedIn && (
                <a
                  href="/Auth/Register"
                  className="inline-block border-2 border-[#00b1a5] hover:bg-[#00b1a5] hover:text-white text-[#00b1a5] font-semibold py-3 px-6 rounded-lg transition"
                >
                  Join as Customer
                </a>
              )}
            </div>
          </div>

          {/* Hero Image – hidden on mobile */}
          <div className="hidden lg:flex w-full lg:w-1/2 justify-center">
            <div className="relative w-full max-w-sm h-64 sm:h-80 md:h-96">
              <Image
                src={HERO_IMG}
                alt="Hero delivery illustration"
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <CategoriesAndProducts />

      {/* --------- Popular Vendors Section (Responsive) --------- */}
      <section className="bg-gray-50 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
            Popular Vendors
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm">
            Shop from your favorite local stores
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {popularVendors.slice(0, 6).map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="relative h-24 sm:h-32 lg:h-40">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  {vendor.badge && (
                    <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-[#00b1a5] text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold">
                      {vendor.badge}
                    </span>
                  )}
                </div>
                <div className="p-2 sm:p-3 lg:p-4 text-left">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {vendor.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-1">
                    {vendor.category}
                  </p>
                  <button className="text-[#00b1a5] hover:text-[#008a80] font-medium text-xs sm:text-sm">
                    View Store →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Rider Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00b1a5] to-[#a3d900]"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Drive Your <span className="text-[#c6d90d]">Success</span>
              </h2>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Join our fleet of riders and turn your vehicle into a
                money-making machine. Flexible hours, competitive pay, and the
                freedom to be your own boss.
              </p>
              <div className="space-y-6 mb-10">
                {riderFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl"
                  >
                    <div className="text-3xl mt-1 bg-[#c6d90d]/20 p-2 rounded-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-white/80">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-white text-[#00b1a5] hover:bg-gray-100 px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Earning Today
              </button>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHO5cZAd8DjOtX39hkGxeJRpw7xVuLX_Nyvw&s"
                    alt="Delivery Rider"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-[#c6d90d] text-black px-6 py-3 rounded-2xl font-black text-lg rotate-12 shadow-xl">
                  Join 5000+ Riders!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Sign Up */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#a3d900] to-[#c6d90d]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2 text-black">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Grow Your <span className="text-white">Business</span>
              </h2>
              <p className="text-xl mb-8 leading-relaxed">
                Partner with Meu Deliver and reach thousands of hungry
                customers. Our platform amplifies your reach while you focus on
                what you do best.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-black/10 rounded-2xl">
                  <span className="text-2xl bg-white/20 p-2 rounded-xl">
                    📈
                  </span>
                  <span className="font-bold text-lg">
                    Boost sales by up to 300%
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-black/10 rounded-2xl">
                  <span className="text-2xl bg-white/20 p-2 rounded-xl">
                    📱
                  </span>
                  <span className="font-bold text-lg">
                    Intuitive vendor dashboard
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-black/10 rounded-2xl">
                  <span className="text-2xl bg-white/20 p-2 rounded-xl">
                    🚚
                  </span>
                  <span className="font-bold text-lg">
                    Seamless delivery integration
                  </span>
                </div>
              </div>
              <button className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                Partner With Us
              </button>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-black/10 backdrop-blur-sm rounded-3xl p-2">
                  <img
                    src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Restaurant Owner"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#00b1a5] text-white px-6 py-3 rounded-2xl font-black text-lg -rotate-12 shadow-xl">
                  1000+ Partners!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              How <span className="text-[#00b1a5]">It Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting your favorites delivered is easier than ever. Just three
              simple steps to satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-[#00b1a5] to-[#a3d900] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white font-black group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-black mb-4 text-black">
                Choose & Order
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Browse thousands of restaurants and stores, select your
                favorites, and place your order in seconds.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-[#a3d900] to-[#c6d90d] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-black font-black group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-black mb-4 text-black">
                Track & Relax
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Watch your order come to life in real-time. Our riders ensure
                safe and speedy delivery every time.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-[#c6d90d] to-[#00b1a5] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white font-black group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-black mb-4 text-black">
                Enjoy & Repeat
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Receive your order at your doorstep and enjoy! Rate your
                experience and order again anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Why Choose <span className="text-[#a3d900]">Meu Deliver</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another delivery app. We're your neighborhood
              connector, bringing communities together one delivery at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#00b1a5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00b1a5]/20 transition-colors">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-black">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Average delivery time of just 15 minutes. When you're hungry, we
                move fast.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#a3d900]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#a3d900]/20 transition-colors">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-black">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                Contactless delivery, secure payments, and background-checked
                riders for your peace of mind.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#c6d90d]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#c6d90d]/20 transition-colors">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-black">
                Best Prices
              </h3>
              <p className="text-gray-600">
                Competitive delivery fees and exclusive deals you won't find
                anywhere else.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#00b1a5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00b1a5]/20 transition-colors">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-black">
                Quality First
              </h3>
              <p className="text-gray-600">
                We partner only with the best local businesses to ensure
                top-quality every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------- Stats Section --------- */}
      <section className="bg-gradient-to-r from-[#00b1a5] to-[#a3d900] py-12 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Customers Love Us
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <span className="text-3xl font-bold mb-1">{stat.number}</span>
                <span className="text-sm font-medium mb-2">{stat.label}</span>
                <span className="text-xs opacity-80 hidden md:block">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              <span className="text-sm">Secure Payments</span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
              <span className="text-sm">Quality Guaranteed</span>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
              <span className="text-sm">No Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              What Our <span className="text-[#00b1a5]">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real customers are
              saying about their Meu Deliver experience.
            </p>
          </div>

          {/* Single Testimonial Card */}
          <div className="relative max-w-2xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-4 transition-all duration-300 hover:scale-110 group"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-[#00b1a5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-4 transition-all duration-300 hover:scale-110 group"
            >
              <svg
                className="w-6 h-6 text-gray-600 group-hover:text-[#00b1a5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Testimonial Card */}
            <div
              key={currentIndex}
              className={`bg-gradient-to-br ${currentTestimonial.gradient} p-12 rounded-3xl border ${currentTestimonial.border} 
              transform transition-all duration-700 ease-in-out hover:scale-105 hover:shadow-2xl shadow-xl
              animate-slideIn`}
            >
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={currentTestimonial.image}
                    className="w-20 h-20 rounded-full mx-auto ring-4 ring-[#00b1a5]/20 shadow-lg"
                    alt="Customer"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#00b1a5] rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="font-bold text-black text-xl mt-4 mb-2">
                  {currentTestimonial.name}
                </h4>
                <div className="flex justify-center space-x-1 text-[#c6d90d] text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              <blockquote className="text-gray-700 italic text-xl leading-relaxed text-center relative">
                {/* <span className="text-6xl text-[#00b1a5]/20 absolute -top-4 -left-4">"</span> */}
                <span className="relative z-10">{currentTestimonial.text}</span>
                {/* <span className="text-6xl text-[#00b1a5]/20 absolute -bottom-8 -right-4">"</span> */}
              </blockquote>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 ${
                  index === currentIndex
                    ? "w-12 h-3 bg-[#00b1a5] rounded-full shadow-lg"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full"
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-[#00b1a5] rounded-full animate-pulse"></div>
              <span>Auto-rotating every 4 seconds</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .animate-slideIn {
            animation: slideIn 0.7s ease-out forwards;
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </section>

      {/* Cities We Serve */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Cities We <span className="text-[#a3d900]">Serve</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're rapidly expanding across Angola to bring fast, reliable delivery to more communities every month.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Luanda', 'Huambo', 'Benguela', 'Lubango', 'Kuito', 'Malanje',
              'Cabinda', 'Uíge', 'Soyo', 'Sumbe', 'Namibe', 'Ondjiva',
              'Menongue', 'Caxito', 'Ndalatando', 'Cuito Cuanavale', 'Mbanza Congo', 'Lobito',
              'Camacupa', 'Caála', 'Lucapa', 'Caconda', 'Catumbela', 'Chibia'
            ]
              .map((city, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center group hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#00b1a5] to-[#a3d900] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-white text-xl">🏙️</span>
                  </div>
                  <h3 className="font-bold text-black">{city}</h3>
                </div>
              ))}
          </div>
        </div>
      </section> */}

      {/* App Download */}
      <section className="bg-gradient-to-r from-black to-gray-900 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Get the <span className="text-[#00b1a5]">Meu Deliver</span> App
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Order faster, track in real-time, and enjoy exclusive app-only deals
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <a
              href="#"
              className="group transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center bg-white text-black px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mr-3">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download on the</div>
                  <div className="text-lg font-semibold -mt-1">App Store</div>
                </div>
              </div>
            </a>

            <a
              href="#"
              className="group transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center bg-white text-black px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mr-3">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Get it on</div>
                  <div className="text-lg font-semibold -mt-1">Google Play</div>
                </div>
              </div>
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#a3d900] rounded-full"></div>
              <span>4.8★ Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#a3d900] rounded-full"></div>
              <span>50K+ Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#a3d900] rounded-full"></div>
              <span>Free Download</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Newsletter */}
      <section className="bg-gradient-to-r from-[#00b1a5] to-[#a3d900] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Stay in the <span className="text-[#c6d90d]">Loop</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Subscribe to our newsletter for exclusive deals, new restaurant
              partnerships, and exciting updates delivered straight to your
              inbox.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 mb-8">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 py-4 px-6 text-lg bg-white rounded-xl outline-none text-black placeholder-gray-500"
                  />
                  <button className="bg-black hover:bg-gray-800 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Compact Contact Info - Row on Mobile */}
              <div className="grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-4 lg:gap-8 text-white">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 lg:mb-3">
                    📧
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm lg:text-lg mb-1 lg:mb-2">
                    Email
                  </h4>
                  <p className="text-white/80 text-xs sm:text-sm lg:text-base">
                    hello@meudeliver.com
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 lg:mb-3">
                    📞
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm lg:text-lg mb-1 lg:mb-2">
                    Phone
                  </h4>
                  <p className="text-white/80 text-xs sm:text-sm lg:text-base">
                    +234 (0) 800 DELIVER
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl mb-1 sm:mb-2 lg:mb-3">
                    💬
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm lg:text-lg mb-1 lg:mb-2">
                    Chat
                  </h4>
                  <p className="text-white/80 text-xs sm:text-sm lg:text-base">
                    24/7 Live Support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
