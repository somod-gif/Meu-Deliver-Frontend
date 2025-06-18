import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Smartphone, Globe } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: "Food Delivery", href: "/services/food-delivery" },
    { name: "Grocery Delivery", href: "/services/grocery-delivery" },
    { name: "Package Delivery", href: "/services/package-delivery" },
    { name: "Document Delivery", href: "/services/document-delivery" },
    { name: "Medication Delivery", href: "/services/medication-delivery" },
  ]

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Partners", href: "/partners" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const legal = [
    { name: "Terms & Conditions", href: "/Pages/Legal/Terms" },
    { name: "Privacy Policy", href: "/Pages/Legal/Privacy" },
    { name: "Data Security", href: "/legal/data-security" },
    { name: "Accessibility", href: "/legal/accessibility" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  ]

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
                    src="/images/logo.jpg" 
                    alt="Meu Deliver Logo" 
                    className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                    width={56}
                    height={56}
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-[#00b1a5] transition-colors duration-300">
                    Meu Deliver
                  </span>
                </div>
              </Link>
            </div>

            {/* Tagline */}
            <p className="text-gray-700 font-medium mb-3 text-base">
              Fast, Efficient, and Secure Everywhere.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your all-in-one delivery solution, available nationwide — from your favorite meals to everyday essentials, delivered with care and precision.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-600 hover:text-[#00b1a5] transition-colors duration-200">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 hover:text-[#00b1a5] transition-colors duration-200">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">support@meudeliver.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Available 24/7</span>
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
            <h4 className="font-bold text-gray-900 mb-4 text-base">Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href} 
                    className="text-gray-600 hover:text-[#00b1a5] transition-colors duration-200 text-sm font-medium hover:pl-2 transition-all duration-200 block"
                  >
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
                    className="text-gray-600 hover:text-[#00b1a5] transition-colors duration-200 text-sm font-medium hover:pl-2 transition-all duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-4 text-base">Legal</h4>
            <ul className="space-y-2.5">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-600 hover:text-[#00b1a5] transition-colors duration-200 text-sm font-medium hover:pl-2 transition-all duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* App Download Section */}
            <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <h5 className="font-semibold text-gray-900 mb-3 text-sm">Get the App</h5>
              <div className="space-y-2">
                <Link 
                  href="#" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#00b1a5] transition-colors duration-200 text-xs font-medium group"
                >
                  <Smartphone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Download for Mobile</span>
                </Link>
                <Link 
                  href="#" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#00b1a5] transition-colors duration-200 text-xs font-medium group"
                >
                  <Globe className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Web Application</span>
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
                &copy; {currentYear} Meu Deliver. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Powered by people, driven by technology
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Service Available</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}