import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Smartphone, Globe } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: "Food Delivery", href: "/services/food-delivery" },
    { name: "Grocery Delivery", href: "/services/grocery-delivery" },
    { name: "Package Delivery", href: "/services/package-delivery" },
    { name: "Pharmacy Delivery", href: "/services/pharmacy-delivery" },
    { name: "Express Courier", href: "/services/express-courier" },
  ]

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Drivers", href: "/drivers" },
    { name: "Restaurants", href: "/restaurants" },
    { name: "Contact", href: "/contact" },
  ]

  const legal = [
    { name: "Terms & Conditions", href: "/legal/terms" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Security", href: "/legal/security" },
    { name: "FAQ", href: "/faq" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  ]

  const cities = ["Luanda", "Lubango", "Benguela", "Huambo", "Lobito"];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Section - Takes 2 columns on large screens */}
          <div className="sm:col-span-2 lg:col-span-2">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 mb-4">
              <Link 
                href="/" 
                className="flex items-center space-x-3 group flex-shrink-0"
                aria-label="Meu Deliver Home"
              >
                <div className="relative">
                  <img 
                    src="/images/m_logo.png" 
                    alt="Meu Deliver Logo" 
                    className=" rounded-xl object-cover shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                    width={110}
                    height={110 }
                    loading="lazy"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#00b1a5] text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                    AO
                  </div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-[#00b1a5] transition-colors duration-300">
                    Meu Deliver
                  </span>
                  <p className="text-xs text-gray-500">Angola's #1 Delivery Service</p>
                </div>
              </Link>
            </div>

            {/* Tagline */}
            <p className="text-gray-700 font-medium mb-3 text-base">
              Fast delivery across Angola
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Connecting you to your favorite restaurants, stores, and services with reliable delivery across all major Angolan cities.
            </p>

            {/* Cities Served */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Serving:</p>
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <span key={city} className="px-3 py-1 bg-white text-xs font-medium text-gray-700 rounded-full shadow-sm hover:bg-[#00b1a5] hover:text-white transition-all duration-200">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-600 hover:text-[#00b1a5] transition-colors duration-200">
                <div className="p-2 bg-white rounded-lg shadow-sm hover:bg-[#00b1a5] hover:text-white transition-all duration-200">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">+244 923 456 789</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 hover:text-[#00b1a5] transition-colors duration-200">
                <div className="p-2 bg-white rounded-lg shadow-sm hover:bg-[#00b1a5] hover:text-white transition-all duration-200">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">contact@meudeliver.ao</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="p-2 bg-white rounded-lg shadow-sm hover:bg-[#00b1a5] hover:text-white transition-all duration-200">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Open 7am - 11pm daily</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 hover:text-[#00b1a5] transition-colors duration-200">
                <div className="p-2 bg-white rounded-lg shadow-sm hover:bg-[#00b1a5] hover:text-white transition-all duration-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Luanda, Angola</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 mr-2">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`p-2.5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-4 text-base">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href} 
                    className="flex items-center text-gray-600 hover:text-[#00b1a5] transition-colors duration-200 text-sm font-medium hover:pl-2 transition-all duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#00b1a5] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-4 text-base">Company</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="flex items-center text-gray-600 hover:text-[#00b1a5] transition-colors duration-200 text-sm font-medium hover:pl-2 transition-all duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#00b1a5] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + App Download */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-4 text-base">Information</h4>
            <ul className="space-y-2.5 mb-6">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="flex items-center text-gray-600 hover:text-[#00b1a5] transition-colors duration-200 text-sm font-medium hover:pl-2 transition-all duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#00b1a5] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* App Download Section */}
            <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <h5 className="font-semibold text-gray-900 mb-3 text-sm flex items-center">
                <Smartphone className="w-4 h-4 mr-2 text-[#00b1a5]" />
                Get the App
              </h5>
              <div className="space-y-3">
                <Link 
                  href="#" 
                  className="flex items-center justify-between px-3 py-2 bg-[#00b1a5]/10 text-[#00b1a5] rounded-lg text-xs font-medium group hover:bg-[#00b1a5] hover:text-white transition-all duration-200"
                >
                  <span>Android App</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
                <Link 
                  href="#" 
                  className="flex items-center justify-between px-3 py-2 bg-[#00b1a5]/10 text-[#00b1a5] rounded-lg text-xs font-medium group hover:bg-[#00b1a5] hover:text-white transition-all duration-200"
                >
                  <span>iOS App</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-600 text-sm font-medium">
                &copy; {currentYear} Meu Deliver Angola. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Delivering happiness across Angola
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Currently delivering in {cities.length} cities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}