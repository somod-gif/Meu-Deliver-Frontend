'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen pt-24 px-6 bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-black leading-tight mb-4">
            Get Anything Delivered <span className="text-[#00b1a5]">Fast, Efficient, and Secure</span> Everywhere 
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Your all-in-one delivery solution, available nationwide — from your favorite meals to everyday essentials. 
            Whether it's food, groceries, packages, documents, or medication, we deliver fast and safely, 24/7, always with a smile.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/Vendors">
              <button className="bg-[#00b1a5] hover:bg-[#008a80] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                Start Ordering
              </button>
            </Link>
            <Link href="/Auth/Register">
              <button className="border-2 border-[#00b1a5] text-[#00b1a5] hover:bg-[#00b1a5] hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-black animate-fade-in">We Deliver Everything You Need:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { 
              title: 'Food & Meals', 
              image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&auto=format', 
              desc: 'Restaurants & Food Vendors',
              delay: '0s'
            },
            { 
              title: 'Groceries', 
              image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&auto=format', 
              desc: 'Supermarkets & Stores',
              delay: '0.1s'
            },
            { 
              title: 'Packages', 
              image: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=400&h=300&fit=crop&auto=format', 
              desc: 'Any Package Delivery',
              delay: '0.2s'
            },
            { 
              title: 'Documents', 
              image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&auto=format', 
              desc: 'Important Documents',
              delay: '0.3s'
            },
            { 
              title: 'Medication', 
              image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop&auto=format', 
              desc: 'Pharmacy & Health',
              delay: '0.4s'
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-[#a3d900] hover:border-2 transition-all duration-500 flex flex-col items-center group animate-slide-up"
              style={{ animationDelay: item.delay }}
            >
              <div className="relative w-16 h-16 mb-4 overflow-hidden rounded-full group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:rotate-3 transition-transform duration-300" 
                />
              </div>
              <h3 className="text-black font-semibold mb-1 group-hover:text-[#00b1a5] transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-500 text-sm text-center group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out both;
        }
      `}</style>

      {/* CUSTOMER SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 text-black">👤 For Customers</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-3xl mx-auto">
            Just tap, track, and trust Meu Deliver for anything you need delivered right to you. 
            Our technology-driven platform ensures fast delivery with real-time tracking.
          </p>
          <Link href="/Auth/Register">
            <button className="bg-[#a3d900] hover:bg-[#8fb800] text-black px-8 py-3 rounded-full font-semibold transition-colors duration-300">
              Create Account
            </button>
          </Link>
        </div>
      </section>

      {/* VENDOR SECTION */}
      <section className="bg-gradient-to-r from-[#00b1a5] to-[#008a80] py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 text-white">🏪 For Vendors</h2>
          <p className="text-white/90 mb-8 text-lg max-w-3xl mx-auto">
            Join thousands of vendors nationwide. We handle the logistics so you focus on what you do best. 
            Powered by people and driven by technology for greener deliveries.
          </p>
          <Link href="/Portal/Vendor">
            <button className="bg-white text-[#00b1a5] hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors duration-300">
              Join as Vendor
            </button>
          </Link>
        </div>
      </section>

      {/* RIDER SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 text-black">🚴 For Riders</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-3xl mx-auto">
            Earn money delivering with flexible schedules. Join our community of reliable riders 
            making deliveries fast, efficient, and secure everywhere.
          </p>
          <Link href="/Ride">
            <button className="bg-[#c6d90d] hover:bg-[#a8b80a] text-black px-8 py-3 rounded-full font-semibold transition-colors duration-300">
              Become a Rider
            </button>
          </Link>
        </div>
      </section>

      {/* VENDOR TYPES SECTION */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">🛍️ Types of Vendors We Accept</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            Whether you run a physical store or a home business, Meu Deliver gives you a powerful platform to grow nationwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Restaurants & Food Vendors', desc: 'All types of food businesses' },
              { title: 'Grocery & Supermarkets', desc: 'Fresh produce and essentials' },
              { title: 'Pharmacy & Health Stores', desc: 'Medication and health products' },
              { title: 'Electronics & Gadget Shops', desc: 'Tech products and accessories' },
              { title: 'Clothing & Fashion', desc: 'Apparel and accessories' },
              { title: 'Document Services', desc: 'Legal and business documents' },
            ].map((type, idx) => (
              <div key={idx} className="bg-white shadow-sm p-6 rounded-xl hover:shadow-lg hover:border-l-4 hover:border-l-[#00b1a5] transition-all duration-300">
                <h3 className="text-[#00b1a5] font-bold text-lg mb-2">{type.title}</h3>
                <p className="text-gray-600">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#00b1a5] to-[#a3d900] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to experience Meu Deliver?</h2>
          <p className="text-xl mb-8 text-white/95">
            Fast, Efficient, and Secure Everywhere. Available 24/7 with a smile.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/Auth/Register">
              <button className="bg-white text-[#00b1a5] hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </Link>
            <Link href="/Portal/Vendor">
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#00b1a5] px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Become a Vendor
              </button>
            </Link>
            <Link href="/Ride">
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#00b1a5] px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Start Delivering
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}