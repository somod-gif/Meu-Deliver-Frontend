'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen pt-24 px-6 bg-gray-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Get Anything Delivered <span className="text-green-600">Fast</span> in Angola 🇦🇴
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            From restaurants, bars, supermarkets, pharmacies, to post offices — MeuDeliver brings your needs to your door, fast and fresh.
          </p>
          <Link href="/Vendors">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition">
              Start Ordering
            </button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-6">We Deliver From:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { title: 'Restaurants', icon: '/icons/restaurant.png' },
            { title: 'Bars', icon: '/icons/bar.png' },
            { title: 'Stores', icon: '/icons/store.png' },
            { title: 'Pharmacies', icon: '/icons/pharmacy.png' },
            { title: 'Supermarkets', icon: '/icons/supermarket.png' },
            { title: 'Post Offices', icon: '/icons/post-office.png' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center"
            >
              <Image src={item.icon} alt={item.title} width={48} height={48} className="mb-3" />
              <p className="text-gray-800 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER SECTION */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">👤 For Customers</h2>
          <p className="text-gray-600 mb-6">
            Hungry? Need essentials? Simply open MeuDeliver, choose your favorite vendor, order your item, and a delivery partner will bring it to your doorstep in minutes.
          </p>
          <Link href="/Auth/Register">
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition">
              Create Account
            </button>
          </Link>
        </div>
      </section>

      {/* VENDOR SECTION */}
      <section className="bg-gray-100 py-14">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">🏪 For Vendors</h2>
          <p className="text-gray-600 mb-6">
            Do you run a business? Join MeuDeliver and reach thousands of customers in your area.
            We handle the logistics so you focus on selling.
          </p>
          <Link href="/Portal/Vendor">
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition">
              Join as Vendor
            </button>
          </Link>
        </div>
      </section>

      {/* RIDER SECTION */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">🚴 For Riders</h2>
          <p className="text-gray-600 mb-6">
            Earn money delivering food and packages around your city. Set your own schedule and join a community of reliable riders across Angola.
          </p>
          <Link href="/Ride">
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition">
              Become a Rider
            </button>
          </Link>
        </div>
      </section>

      {/* VENDOR TYPES SECTION */}
      <section className="bg-gray-100 py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">🛍️ Types of Vendors We Accept</h2>
          <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
            Whether you run a physical store or a home business, MeuDeliver gives you a powerful platform to grow. Here are some vendor categories we accept:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'Restaurants & Food Vendors',
              'Liquor & Beverage Shops',
              'Grocery & Supermarkets',
              'Pharmacy & Health Stores',
              'Clothing & Accessories',
              'Electronics & Gadget Shops',
            ].map((type, idx) => (
              <div key={idx} className="bg-white shadow-sm p-5 rounded-xl hover:shadow-md transition">
                <p className="text-green-700 font-semibold">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore MeuDeliver?</h2>
          <p className="text-lg mb-6">We’re on a mission to power delivery in every Angolan city. Be part of the movement.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/Auth/Register">
              <button className="bg-white text-green-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition">
                Register
              </button>
            </Link>
            <Link href="/Portal/Vendor">
              <button className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-green-600 transition">
                Become a Vendor
              </button>
            </Link>
            <Link href="/Ride">
              <button className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-green-600 transition">
                Become a Rider
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
