'use client';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const categories = [
  { name: 'All', icon: '🍔' },
  { name: 'Food', icon: '🍕' },
  { name: 'Groceries', icon: '🛒' },
  { name: 'Pharmacy', icon: '💊' },
  { name: 'Electronics', icon: '📱' },
  { name: 'Retail', icon: '👕' },
  { name: 'Beverages', icon: '🥤' },
  { name: 'Home', icon: '🏠' }
];

// Products data organized by category
const productsByCategory = {
  Food: [
    {
      id: 1,
      name: 'Cheeseburger Meal',
      price: 12.99,
      vendor: 'Burger Palace',
      rating: 4.8,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 6,
      name: 'Pepperoni Pizza',
      price: 14.99,
      vendor: 'Pizza Heaven',
      rating: 4.7,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      badge: 'New'
    },
    {
      id: 7,
      name: 'Chicken Tacos',
      price: 9.99,
      vendor: 'Taco Fiesta',
      rating: 4.5,
      deliveryTime: '15-20 min',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
      badge: ''
    },
    {
      id: 8,
      name: 'Sushi Combo',
      price: 18.50,
      vendor: 'Tokyo Sushi',
      rating: 4.9,
      deliveryTime: '25-35 min',
      image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop',
      badge: 'Chef\'s Choice'
    }
  ],
  Groceries: [
    {
      id: 2,
      name: 'Fresh Fruits Basket',
      price: 20.5,
      vendor: 'FreshMart',
      rating: 4.6,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop',
      badge: ''
    },
    {
      id: 9,
      name: 'Organic Vegetables Pack',
      price: 15.99,
      vendor: 'GreenGrocer',
      rating: 4.7,
      deliveryTime: '25-40 min',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
      badge: 'Organic'
    },
    {
      id: 10,
      name: 'Dairy Essentials Bundle',
      price: 12.75,
      vendor: 'Milk & More',
      rating: 4.5,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
      badge: ''
    },
    {
      id: 11,
      name: 'Premium Coffee Beans',
      price: 14.99,
      vendor: 'Bean There',
      rating: 4.8,
      deliveryTime: '30-45 min',
      image: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?w=400&h=300&fit=crop',
      badge: 'Exclusive'
    }
  ],
  Pharmacy: [
    {
      id: 3,
      name: 'Pain Relief Tablets',
      price: 8.99,
      vendor: 'MediCare',
      rating: 4.9,
      deliveryTime: '10-20 min',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      badge: ''
    },
    {
      id: 12,
      name: 'Multivitamin Supplement',
      price: 12.49,
      vendor: 'HealthPlus',
      rating: 4.7,
      deliveryTime: '15-25 min',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
      badge: 'Best Value'
    },
    {
      id: 13,
      name: 'First Aid Kit',
      price: 19.99,
      vendor: 'SafeLife',
      rating: 4.8,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop',
      badge: 'Essential'
    },
    {
      id: 14,
      name: 'Allergy Relief',
      price: 10.25,
      vendor: 'MediCare',
      rating: 4.6,
      deliveryTime: '10-15 min',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      badge: 'Fast Acting'
    }
  ],
  Electronics: [
    {
      id: 4,
      name: 'Smartphone X200',
      price: 299.99,
      vendor: 'TechZone',
      rating: 4.5,
      deliveryTime: '30-45 min',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      badge: ''
    },
    {
      id: 15,
      name: 'Wireless Earbuds',
      price: 79.99,
      vendor: 'AudioTech',
      rating: 4.6,
      deliveryTime: '25-40 min',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop',
      badge: 'Popular'
    },
    {
      id: 16,
      name: 'Smart Watch Pro',
      price: 149.99,
      vendor: 'TechZone',
      rating: 4.7,
      deliveryTime: '30-50 min',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      badge: 'New'
    },
    {
      id: 17,
      name: 'Bluetooth Speaker',
      price: 59.99,
      vendor: 'SoundMaster',
      rating: 4.4,
      deliveryTime: '20-35 min',
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop',
      badge: ''
    }
  ],
  Retail: [
    {
      id: 5,
      name: 'Fashion T-Shirt',
      price: 19.99,
      vendor: 'Fashion Hub',
      rating: 4.4,
      deliveryTime: '35-50 min',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop',
      badge: ''
    },
    {
      id: 18,
      name: 'Denim Jeans',
      price: 39.99,
      vendor: 'Urban Style',
      rating: 4.5,
      deliveryTime: '40-55 min',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=300&fit=crop',
      badge: 'Trending'
    },
    {
      id: 19,
      name: 'Leather Wallet',
      price: 24.99,
      vendor: 'LeatherCraft',
      rating: 4.7,
      deliveryTime: '30-45 min',
      image: 'https://images.unsplash.com/photo-1548032885-b5e38734688a?w=400&h=300&fit=crop',
      badge: ''
    },
    {
      id: 20,
      name: 'Running Shoes',
      price: 69.99,
      vendor: 'SportLife',
      rating: 4.8,
      deliveryTime: '35-50 min',
      image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop',
      badge: 'Best Seller'
    }
  ],
  Beverages: [
    {
      id: 21,
      name: 'Craft Beer Selection',
      price: 16.99,
      vendor: 'Brew Masters',
      rating: 4.7,
      deliveryTime: '25-40 min',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop',
      badge: 'Local'
    },
    {
      id: 22,
      name: 'Premium Wine Collection',
      price: 29.99,
      vendor: 'Vino Delight',
      rating: 4.8,
      deliveryTime: '30-45 min',
      image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=300&fit=crop',
      badge: 'Exclusive'
    },
    {
      id: 23,
      name: 'Cold Pressed Juices',
      price: 12.50,
      vendor: 'Juice Bar',
      rating: 4.6,
      deliveryTime: '20-30 min',
      image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400&h=300&fit=crop',
      badge: 'Healthy'
    }
  ],
  Home: [
    {
      id: 24,
      name: 'Scented Candles Set',
      price: 22.99,
      vendor: 'Home Comfort',
      rating: 4.7,
      deliveryTime: '30-45 min',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
      badge: 'Cozy'
    },
    {
      id: 25,
      name: 'Throw Blanket',
      price: 34.99,
      vendor: 'Cozy Living',
      rating: 4.5,
      deliveryTime: '35-50 min',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=300&fit=crop',
      badge: ''
    },
    {
      id: 26,
      name: 'Ceramic Dinner Set',
      price: 49.99,
      vendor: 'Table Art',
      rating: 4.8,
      deliveryTime: '40-55 min',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      badge: 'Premium'
    }
  ]
};

const allProducts = Object.values(productsByCategory).flat();

// Popular Vendors Data
const popularVendors = [
  {
    id: 1,
    name: 'Burger Palace',
    category: 'Food',
    rating: 4.8,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    featured: true,
    badge: 'Popular'
  },
  {
    id: 2,
    name: 'FreshMart',
    category: 'Groceries',
    rating: 4.6,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop',
    featured: true,
    badge: 'Fresh'
  },
  {
    id: 3,
    name: 'MediCare',
    category: 'Pharmacy',
    rating: 4.9,
    deliveryTime: '10-20 min',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    featured: true,
    badge: 'Fast'
  },
  {
    id: 4,
    name: 'TechZone',
    category: 'Electronics',
    rating: 4.7,
    deliveryTime: '30-45 min',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    featured: true,
    badge: 'Tech'
  },
  {
    id: 5,
    name: 'Fashion Hub',
    category: 'Retail',
    rating: 4.5,
    deliveryTime: '35-50 min',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop',
    featured: true,
    badge: 'Trendy'
  },
  {
    id: 6,
    name: 'Brew Masters',
    category: 'Beverages',
    rating: 4.8,
    deliveryTime: '25-40 min',
    image: 'https://images.unsplash.com/photo-1471421298428-1513ab720a8e?w=400&h=300&fit=crop',
    featured: true,
    badge: 'Local'
  }
];

  // Other static data
const stats = [
  { 
    number: '50K+', 
    label: 'Happy Customers', 
    icon: '😊',
    description: 'Serving smiles across the city with our quality products'
  },
  { 
    number: '1.2K+', 
    label: 'Premium Vendors', 
    icon: '🤝',
    description: 'Curated selection of top-rated local businesses'
  },
  { 
    number: '18min', 
    label: 'Avg. Delivery Time', 
    icon: '⚡',
    description: 'Lightning-fast delivery to your doorstep'
  },
  { 
    number: '99.8%', 
    label: 'Order Accuracy', 
    icon: '🎯',
    description: 'Precision in every order you place'
  },
  { 
    number: '24/7', 
    label: 'Customer Support', 
    icon: '💬',
    description: 'Always here when you need us'
  },
  { 
    number: '50+', 
    label: 'Neighborhoods Served', 
    icon: '📍',
    description: 'Expanding our reach daily'
  }
];

  const riderFeatures = [
    {
      title: 'Flexible Earnings',
      desc: 'Work when you want and earn on your schedule',
      icon: '💰'
    },
    {
      title: 'Reliable Support',
      desc: '24/7 support team to help you with any issues',
      icon: '📞'
    },
    {
      title: 'Fast Payouts',
      desc: 'Get paid quickly with multiple withdrawal options',
      icon: '💳'
    }
  ];

  return (
    <main className="bg-white">

      {/* --------- Hero Section --------- */}
      
      <section className="relative  mt-3  bg-gradient-to-br from-[#00b1a5] via-[#00b1a5] to-[#a3d900] overflow-hidden">

        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Enhanced Animated Background Elements */}
        <div className="absolute top-16 left-8 w-40 h-40 bg-[#c6d90d]/25 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-24 right-16 w-56 h-56 bg-[#a3d900]/35 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-28 h-28 bg-white/15 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-2/3 right-1/3 w-20 h-20 bg-[#00b1a5]/20 rounded-full blur-lg animate-pulse delay-700"></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 left-1/5 w-4 h-4 bg-[#c6d90d]/60 rounded-full animate-bounce delay-1000"></div>

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-6xl mx-auto">
            {/* Enhanced Main Heading */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight">
                <span className="inline-block animate-fade-in-up">Craving</span>
                <br />
                <span className="text-[#c6d90d] inline-block animate-fade-in-up delay-200">Satisfied.</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a3d900] to-[#c6d90d] inline-block animate-fade-in-up delay-400">
                  Delivered.
                </span>
              </h1>

              {/* Tagline */}
              <div className="text-2xl md:text-3xl font-bold text-[#c6d90d] mb-2 animate-fade-in-up delay-600">
                Your Favorite Food, On Demand
              </div>
            </div>

            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-up delay-800">
              From local gems to popular chains, get your favorite meals delivered fresh and fast.
              <span className="font-medium text-[#c6d90d]"> Available 24/7 </span>
              across the city with live tracking and guaranteed satisfaction.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up delay-1000">
              <button className="group bg-gradient-to-r from-[#00b1a5] to-[#a3d900] hover:from-[#008a80] hover:to-[#8bc200] text-white py-5 px-10 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-[#00b1a5]/25">
                <span className="flex items-center justify-center gap-3">
                  🚀 Order Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/40 hover:border-white/60 py-5 px-10 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span className="flex items-center justify-center gap-3">
                  📱 Download App
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Enhanced Stats with Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto animate-fade-in-up delay-1200">
              {[
                { number: "50K+", label: "Happy Customers", icon: "😊" },
                { number: "1,000+", label: "Restaurant Partners", icon: "🍽️" },
                { number: "15 Min", label: "Average Delivery", icon: "⚡" },
                { number: "4.9★", label: "Customer Rating", icon: "⭐" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-2 group-hover:animate-bounce">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-[#c6d90d] mb-2 group-hover:text-white transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-white/90 font-medium group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-80 animate-fade-in-up delay-1400">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span className="font-medium">100% Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span className="font-medium">Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-400">✓</span>
                <span className="font-medium">Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center hover:border-[#c6d90d] transition-colors cursor-pointer">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
          </div>
          <div className="text-white/60 text-sm mt-2 font-medium">Scroll Down</div>
        </div>

        {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
        
        .delay-800 {
          animation-delay: 0.8s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-1200 {
          animation-delay: 1.2s;
        }
        
        .delay-1400 {
          animation-delay: 1.4s;
        }
      `}
      </style>
      </section>

{/* --------- Categories Section (Responsive - 2 per row on mobile) --------- */}
<section className="bg-white py-6 sm:py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Shop by Category</h2>
    <div className="relative">
      <div className="grid grid-cols-2 sm:flex sm:space-x-4 lg:space-x-6 gap-3 sm:gap-0 overflow-x-auto pb-2 sm:pb-4 scrollbar-hide">
        {categories.map((category) => (
          <div 
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`flex flex-col items-center w-full sm:min-w-[120px] lg:min-w-[140px] p-4 sm:p-3 lg:p-4 rounded-lg cursor-pointer transition-all duration-200 ${activeCategory === category.name
              ? 'bg-[#00b1a5] text-white shadow-md'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-800'
            }`}
          >
            <div className="text-3xl sm:text-2xl lg:text-3xl mb-2 sm:mb-1 lg:mb-2">{category.icon}</div>
            <span className="text-sm sm:text-xs lg:text-sm font-medium text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* --------- Featured Products Grid (Responsive - 2 per row on mobile) --------- */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
        {activeCategory === 'All' ? 'Featured Products' : activeCategory}
      </h2>
      <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
        {activeCategory === 'All' 
          ? 'Discover our most popular items' 
          : `Best ${activeCategory} products`}
      </p>
    </div>
    <button className="flex items-center text-[#00b1a5] font-medium hover:underline text-sm sm:text-base">
      View all
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </button>
  </div>

  {/* Products Grid - Responsive columns */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
    {(activeCategory === 'All' ? allProducts : productsByCategory[activeCategory] || []).slice(0, 4).map((product) => (
      <div key={product.id} className="group relative bg-white rounded-md sm:rounded-lg overflow-hidden shadow-xs hover:shadow-sm transition-shadow duration-200 border border-gray-100">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-[#00b1a5] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold">
              {product.badge}
            </div>
          )}
          {/* Quick Actions */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1 sm:gap-2">
            <button className="bg-white rounded-full p-1 hover:bg-[#00b1a5] hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="bg-white rounded-full p-1 hover:bg-[#00b1a5] hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-2 sm:p-3">
          <h3 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-2xs sm:text-xs text-gray-500 mb-1 sm:mb-2">{product.vendor}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="ml-0.5 text-2xs sm:text-xs font-medium text-gray-900">{product.rating}</span>
              <span className="mx-1 text-gray-200">•</span>
              <span className="text-2xs sm:text-xs text-gray-500">{product.deliveryTime}</span>
            </div>
            <span className="font-bold text-xs sm:text-sm text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          
          {/* Add to Cart Button */}
          <button className="mt-1.5 sm:mt-2 w-full bg-[#00b1a5] hover:bg-[#008a80] text-white py-1 rounded text-xs sm:text-xs font-medium transition-colors flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

{/* --------- Popular Vendors Section (Responsive) --------- */}
<section className="bg-gray-50 py-8 sm:py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Popular Vendors</h2>
    <p className="text-gray-600 mb-4 sm:mb-6 sm:mb-8 text-sm sm:text-base">Shop from your favorite local stores</p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {popularVendors.map((vendor) => (
        <div key={vendor.id} className="bg-white rounded-lg sm:rounded-xl shadow-xs hover:shadow-sm overflow-hidden transition-shadow duration-200">
          <div className="relative h-32 sm:h-40 md:h-48">
            <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
            {vendor.badge && (
              <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-2xs sm:text-xs font-bold shadow-xs">
                {vendor.badge}
              </div>
            )}
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-0.5 sm:mb-1">{vendor.name}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2 md:mb-3">{vendor.category}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-yellow-400 text-xs sm:text-sm">★</span>
                <span className="ml-0.5 text-xs sm:text-sm font-medium text-gray-900">{vendor.rating}</span>
                <span className="mx-1 text-gray-200">•</span>
                <span className="text-2xs sm:text-xs text-gray-600">{vendor.deliveryTime}</span>
              </div>
              <button className="text-[#00b1a5] hover:text-[#008a80] font-medium text-2xs sm:text-xs">
                View Store
              </button>
            </div>
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
                Join our fleet of riders and turn your vehicle into a money-making machine.
                Flexible hours, competitive pay, and the freedom to be your own boss.
              </p>
              <div className="space-y-6 mb-10">
                {riderFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                    <div className="text-3xl mt-1 bg-[#c6d90d]/20 p-2 rounded-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
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
                Partner with Meu Deliver and reach thousands of hungry customers.
                Our platform amplifies your reach while you focus on what you do best.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-black/10 rounded-2xl">
                  <span className="text-2xl bg-white/20 p-2 rounded-xl">📈</span>
                  <span className="font-bold text-lg">Boost sales by up to 300%</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-black/10 rounded-2xl">
                  <span className="text-2xl bg-white/20 p-2 rounded-xl">📱</span>
                  <span className="font-bold text-lg">Intuitive vendor dashboard</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-black/10 rounded-2xl">
                  <span className="text-2xl bg-white/20 p-2 rounded-xl">🚚</span>
                  <span className="font-bold text-lg">Seamless delivery integration</span>
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
              Getting your favorites delivered is easier than ever. Just three simple steps to satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-[#00b1a5] to-[#a3d900] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white font-black group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-black mb-4 text-black">Choose & Order</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Browse thousands of restaurants and stores, select your favorites, and place your order in seconds.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-[#a3d900] to-[#c6d90d] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-black font-black group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-black mb-4 text-black">Track & Relax</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Watch your order come to life in real-time. Our riders ensure safe and speedy delivery every time.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-[#c6d90d] to-[#00b1a5] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white font-black group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-black mb-4 text-black">Enjoy & Repeat</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Receive your order at your doorstep and enjoy! Rate your experience and order again anytime.
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
              We're not just another delivery app. We're your neighborhood connector, bringing communities together one delivery at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#00b1a5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00b1a5]/20 transition-colors">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-black">Lightning Fast</h3>
              <p className="text-gray-600">Average delivery time of just 15 minutes. When you're hungry, we move fast.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#a3d900]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#a3d900]/20 transition-colors">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-black">Safe & Secure</h3>
              <p className="text-gray-600">Contactless delivery, secure payments, and background-checked riders for your peace of mind.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#c6d90d]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#c6d90d]/20 transition-colors">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-black">Best Prices</h3>
              <p className="text-gray-600">Competitive delivery fees and exclusive deals you won't find anywhere else.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#00b1a5]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00b1a5]/20 transition-colors">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-black mb-3 text-black">Quality First</h3>
              <p className="text-gray-600">We partner only with the best local businesses to ensure top-quality every time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --------- Stats Section --------- */}
<section className="bg-gradient-to-r from-[#00b1a5] to-[#a3d900] py-12 text-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8 text-center">Why Customers Love Us</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center text-center p-4">
          <div className="text-4xl mb-3">{stat.icon}</div>
          <span className="text-3xl font-bold mb-1">{stat.number}</span>
          <span className="text-sm font-medium mb-2">{stat.label}</span>
          <span className="text-xs opacity-80 hidden md:block">{stat.description}</span>
        </div>
      ))}
    </div>
    
    {/* Trust Badges */}
    <div className="mt-12 flex flex-wrap justify-center gap-6 items-center">
      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
        <span className="text-sm">Secure Payments</span>
      </div>
      
      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
        </svg>
        <span className="text-sm">Quality Guaranteed</span>
      </div>
      
      <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
        </svg>
        <span className="text-sm">No Hidden Fees</span>
      </div>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              What Our <span className="text-[#00b1a5]">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real customers are saying about their Meu Deliver experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#00b1a5]/5 to-[#a3d900]/5 p-8 rounded-3xl border border-[#00b1a5]/10">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b442?w=60&h=60&fit=crop&crop=face"
                  className="w-12 h-12 rounded-full mr-4" alt="Customer" />
                <div>
                  <h4 className="font-bold text-black">Jéssica Chilombo</h4>
                  <div className="flex text-[#c6d90d] text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-700 italic text-lg leading-relaxed">
                "Incredible service! My food arrived hot and fresh in just 12 minutes. The app is so easy to use, and the delivery tracking is spot-on."
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#a3d900]/5 to-[#c6d90d]/5 p-8 rounded-3xl border border-[#a3d900]/10">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                  className="w-12 h-12 rounded-full mr-4" alt="Customer" />
                <div>
                  <h4 className="font-bold text-black"> Mateus Ndongala</h4>
                  <div className="flex text-[#c6d90d] text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-700 italic text-lg leading-relaxed">
                "Best delivery app I've used! Great selection of restaurants, fair prices, and the customer service is outstanding. Highly recommend!"
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#c6d90d]/5 to-[#00b1a5]/5 p-8 rounded-3xl border border-[#c6d90d]/10">
              <div className="flex items-center mb-6">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
                  className="w-12 h-12 rounded-full mr-4" alt="Customer" />
                <div>
                  <h4 className="font-bold text-black">Domingos Quissola</h4>
                  <div className="flex text-[#c6d90d] text-sm">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-gray-700 italic text-lg leading-relaxed">
                "As a busy mom, Meu Deliver is a lifesaver! Quick, reliable, and my kids love tracking the delivery. It's become our go-to solution."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities We Serve */}
      <section className="py-20 bg-gray-50">
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
      </section>

      {/* App Download */}
      <section className="bg-black py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Get the <span className="text-[#00b1a5]">Meu Deliver</span> App
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Download our app for lightning-fast ordering, exclusive deals,
            real-time tracking, and so much more
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#" className="inline-block transition-transform duration-300 hover:scale-105">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-16 md:h-20"
              />
            </a>
            <a href="#" className="inline-block transition-transform duration-300 hover:scale-105">
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-16 md:h-20"
              />
            </a>
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
              Subscribe to our newsletter for exclusive deals, new restaurant partnerships,
              and exciting updates delivered straight to your inbox.
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                <div className="text-center">
                  <div className="text-3xl mb-3">📧</div>
                  <h4 className="font-bold text-lg mb-2">Email</h4>
                  <p className="text-white/80">hello@meudeliver.com</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📞</div>
                  <h4 className="font-bold text-lg mb-2">Phone</h4>
                  <p className="text-white/80">+234 (0) 800 DELIVER</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">💬</div>
                  <h4 className="font-bold text-lg mb-2">Chat</h4>
                  <p className="text-white/80">24/7 Live Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}