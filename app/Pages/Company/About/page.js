'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen pt-16 md:pt-24 px-4 sm:px-6 bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight mb-4">
            Get Anything Delivered <span className="text-[#00b1a5]">Fast, Efficient, and Secure</span> Everywhere 
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Your all-in-one delivery solution, available nationwide — from your favorite meals to everyday essentials. 
            Whether it's food, groceries, packages, documents, or medication, we deliver fast and safely, 24/7, always with a smile.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/Vendors">
              <button className="bg-[#00b1a5] hover:bg-[#008a80] text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-colors duration-300 w-full sm:w-auto">
                Start Ordering
              </button>
            </Link>
            <Link href="/Auth/Register">
              <button className="border-2 border-[#00b1a5] text-[#00b1a5] hover:bg-[#00b1a5] hover:text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-all duration-300 w-full sm:w-auto">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto mb-12 md:mb-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 md:mb-8 text-black animate-fade-in">We Deliver Everything You Need:</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
              className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg hover:border-[#a3d900] hover:border-2 transition-all duration-500 flex flex-col items-center group animate-slide-up"
              style={{ animationDelay: item.delay }}
            >
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 overflow-hidden rounded-full group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:rotate-3 transition-transform duration-300" 
                  loading="lazy"
                />
              </div>
              <h3 className="text-black font-semibold text-sm sm:text-base mb-1 group-hover:text-[#00b1a5] transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm text-center group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THREE PILLARS SECTION - Combined Row */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-black">Join Our Community</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Customer Card */}
            <div className="bg-gradient-to-br from-[#00b1a5] to-[#008a80] rounded-2xl p-6 md:p-8 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="text-4xl md:text-5xl mb-4">👤</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">For Customers</h3>
              <p className="text-white/90 mb-6 text-sm md:text-base leading-relaxed">
                Just tap, track, and trust Meu Deliver for anything you need delivered right to you. 
                Our technology-driven platform ensures fast delivery with real-time tracking.
              </p>
              <Link href="/Auth/Register">
                <button className="bg-white text-[#00b1a5] hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-colors duration-300 text-sm md:text-base w-full">
                  Create Account
                </button>
              </Link>
            </div>

            {/* Vendor Card */}
            <div className="bg-gradient-to-br from-[#a3d900] to-[#8fb800] rounded-2xl p-6 md:p-8 text-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="text-4xl md:text-5xl mb-4">🏪</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">For Vendors</h3>
              <p className="text-black/80 mb-6 text-sm md:text-base leading-relaxed">
                Join thousands of vendors nationwide. We handle the logistics so you focus on what you do best. 
                Powered by people and driven by technology for greener deliveries.
              </p>
              <Link href="/Portal/Vendor">
                <button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full font-semibold transition-colors duration-300 text-sm md:text-base w-full">
                  Join as Vendor
                </button>
              </Link>
            </div>

            {/* Rider Card */}
            <div className="bg-gradient-to-br from-[#c6d90d] to-[#a8b80a] rounded-2xl p-6 md:p-8 text-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="text-4xl md:text-5xl mb-4">🚴</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">For Riders</h3>
              <p className="text-black/80 mb-6 text-sm md:text-base leading-relaxed">
                Earn money delivering with flexible schedules. Join our community of reliable riders 
                making deliveries fast, efficient, and secure everywhere.
              </p>
              <Link href="/Ride">
                <button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full font-semibold transition-colors duration-300 text-sm md:text-base w-full">
                  Become a Rider
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-gray-100 py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center text-black">How It Works</h2>
          <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-3xl mx-auto text-base sm:text-lg">
            Getting your delivery is as easy as 1-2-3. Our streamlined process ensures quick and reliable service every time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: '01',
                title: 'Place Your Order',
                desc: 'Browse vendors, select items, and place your order through our easy-to-use platform.',
                icon: '📱'
              },
              {
                step: '02',
                title: 'Track in Real-Time',
                desc: 'Watch your order being prepared and follow your rider in real-time with live updates.',
                icon: '📍'
              },
              {
                step: '03',
                title: 'Receive & Enjoy',
                desc: 'Get your order delivered fast and secure, right to your doorstep with a smile.',
                icon: '🎉'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                  <div className="text-4xl md:text-5xl mb-4">{item.icon}</div>
                  <div className="text-[#00b1a5] font-bold text-3xl md:text-4xl mb-2">{item.step}</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-black">{item.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center text-black">Why Choose Meu Deliver?</h2>
          <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-3xl mx-auto text-base sm:text-lg">
            We're not just another delivery service. We're your trusted partner in getting things done efficiently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '24/7 Service',
                desc: 'Always available when you need us most',
                icon: '🕐',
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'Real-Time Tracking',
                desc: 'Know exactly where your order is',
                icon: '📡',
                color: 'from-green-500 to-green-600'
              },
              {
                title: 'Secure Delivery',
                desc: 'Your items are safe with us',
                icon: '🔒',
                color: 'from-purple-500 to-purple-600'
              },
              {
                title: 'Fast & Reliable',
                desc: 'Consistently quick delivery times',
                icon: '⚡',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((feature, idx) => (
              <div key={idx} className="group">
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:border-[#00b1a5] text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-black group-hover:text-[#00b1a5] transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VENDOR TYPES SECTION */}
      <section className="bg-gray-100 py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-black">🛍️ Types of Vendors We Accept</h2>
          <p className="text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto text-base sm:text-lg">
            Whether you run a physical store or a home business, Meu Deliver gives you a powerful platform to grow nationwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Restaurants & Food Vendors', desc: 'All types of food businesses', icon: '🍽️' },
              { title: 'Grocery & Supermarkets', desc: 'Fresh produce and essentials', icon: '🛒' },
              { title: 'Pharmacy & Health Stores', desc: 'Medication and health products', icon: '💊' },
              { title: 'Electronics & Gadget Shops', desc: 'Tech products and accessories', icon: '📱' },
              { title: 'Clothing & Fashion', desc: 'Apparel and accessories', icon: '👕' },
              { title: 'Document Services', desc: 'Legal and business documents', icon: '📄' },
            ].map((type, idx) => (
              <div key={idx} className="bg-white shadow-sm p-4 sm:p-6 rounded-xl hover:shadow-lg hover:border-l-4 hover:border-l-[#00b1a5] transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{type.icon}</div>
                <h3 className="text-[#00b1a5] font-bold text-base sm:text-lg mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center text-black">What Our Users Say</h2>
          <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-3xl mx-auto text-base sm:text-lg">
            Don't just take our word for it. Here's what our community has to say about Meu Deliver.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Customer',
                text: 'Meu Deliver has made my life so much easier. Fast delivery and excellent service every time!',
                rating: 5
              },
              {
                name: 'Mike\'s Restaurant',
                role: 'Vendor',
                text: 'Our sales increased by 40% after joining Meu Deliver. The platform is fantastic for business.',
                rating: 5
              },
              {
                name: 'David Martinez',
                role: 'Rider',
                text: 'Great flexible income opportunity. The app is user-friendly and support is always helpful.',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <h4 className="font-bold text-black">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="bg-gradient-to-r from-[#00b1a5] to-[#008a80] py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Meu Deliver by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '5K+', label: 'Partner Vendors' },
              { number: '2K+', label: 'Active Riders' },
              { number: '1M+', label: 'Deliveries Made' }
            ].map((stat, idx) => (
              <div key={idx} className="group">
                <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                <p className="text-white/90 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-[#00b1a5] to-[#a3d900] text-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to experience Meu Deliver?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-white/95">
            Fast, Efficient, and Secure Everywhere. Available 24/7 with a smile.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/Auth/Register">
              <button className="bg-white text-[#00b1a5] hover:bg-gray-100 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                Get Started
              </button>
            </Link>
            <Link href="/Portal/Vendor">
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#00b1a5] px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                Become a Vendor
              </button>
            </Link>
            <Link href="/Ride">
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#00b1a5] px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto">
                Start Delivering
              </button>
            </Link>
          </div>
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
    </main>
  )
}