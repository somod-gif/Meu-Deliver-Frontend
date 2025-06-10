'use client'

import Link from 'next/link'
import { MapPin, Clock, Star, ArrowRight, Search, Plus, Shield, Truck, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Maria Fernandes',
      role: 'Restaurant Owner, Luanda',
      content: 'Since partnering with this delivery service, our sales have increased by 40%. The professional drivers and reliable service have helped us expand our customer base significantly.',
      rating: 5
    },
    {
      id: 2,
      name: 'João Manuel',
      role: 'Frequent Customer, Benguela',
      content: 'I use this service at least twice a week. The deliveries are always on time, and the customer support team is very responsive when I have questions. Highly recommended!',
      rating: 4
    },
    {
      id: 3,
      name: 'Ana dos Santos',
      role: 'Delivery Partner, Huambo',
      content: 'Earning with this platform has changed my life. The flexible hours allow me to work around my schedule, and the earnings are better than any other option in our city.',
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <main className="min-h-screen pt-20 bg-white">
      {/* Hero Section - Enhanced Professional Design */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-blue-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-20">
            {/* Left Content */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Truck className="w-4 h-4 mr-2" />
                  Now serving across Angola
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                  Professional delivery <span className="text-blue-600">solutions</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Reliable, fast, and secure delivery services connecting businesses and customers across Angola's major cities.
                </p>
              </div>
              
              {/* Feature Points */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">24/7 Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Secure Payments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Real-time Tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Professional Support</span>
                </div>
              </div>
              
              {/* Enhanced Search Bar */}
              <div className="bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-400 pl-2">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your delivery address in Angola"
                    className="flex-1 py-4 px-2 text-lg focus:outline-none placeholder-gray-400"
                  />
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                    Get Started
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Join thousands of satisfied customers across Angola
              </p>
            </div>

            {/* Right Content - Professional Hero Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3"></div>
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=500&fit=crop&auto=format"
                  alt="Professional delivery service"
                  className="relative w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                
                {/* Floating Stats Cards */}
                <div className="absolute top-6 left-6 bg-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Live Tracking</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 right-6 bg-white px-4 py-3 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">4.9 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">10,000+</p>
              <p className="text-gray-600">Deliveries Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-gray-600">Business Partners</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">8</p>
              <p className="text-gray-600">Cities Served</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">98%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Our Service Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Simple steps to get your deliveries moving across Angola
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Request a Delivery</h3>
              <p className="text-gray-600">
                Enter your pickup and delivery locations through our app or website.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Matched</h3>
              <p className="text-gray-600">
                Our system instantly matches you with the nearest available delivery partner.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Track & Receive</h3>
              <p className="text-gray-600">
                Follow your delivery in real-time and receive your items safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Trusted by businesses and individuals across Angola
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-6">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div>
                <p className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>

            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to experience professional delivery?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-blue-100 mx-auto">
            Join thousands of satisfied customers and businesses across Angola
          </p>
          <div className="mt-8">
            <Link href="/signup" className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}