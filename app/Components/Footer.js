// components/Footer.js
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700 py-8 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Link 
              href="/" 
              className="flex items-center space-x-1 group flex-shrink-0"
              aria-label="Home"
            >
              
              <div className="relative">
                <img 
                  src="/images/logo.jpg" 
                  alt="" 
                  className="h-8 sm:h-10 md:h-12 w-auto group-hover:rotate-12 transition-transform duration-500"
                  width={48}
                  height={48}
                  loading="eager"
                />
              </div>
              
            </Link>
          </div>
          <p className="text-gray-600">Fast, Efficient, and Secure Everywhere.</p>
          <p className="mt-2 text-gray-600">Your all-in-one delivery solution, available nationwide — from your favorite meals to everyday essentials.</p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold mb-2 text-black">Services</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link href="/services/food-delivery" className="hover:text-[#00b1a5] transition-colors">Food Delivery</Link></li>
            <li><Link href="/services/grocery-delivery" className="hover:text-[#00b1a5] transition-colors">Grocery Delivery</Link></li>
            <li><Link href="/services/package-delivery" className="hover:text-[#00b1a5] transition-colors">Package Delivery</Link></li>
            <li><Link href="/services/document-delivery" className="hover:text-[#00b1a5] transition-colors">Document Delivery</Link></li>
            <li><Link href="/services/medication-delivery" className="hover:text-[#00b1a5] transition-colors">Medication Delivery</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-2 text-black">Company</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link href="/about" className="hover:text-[#00b1a5] transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-[#00b1a5] transition-colors">Careers</Link></li>
            <li><Link href="/partners" className="hover:text-[#00b1a5] transition-colors">Partners</Link></li>
            <li><Link href="/blog" className="hover:text-[#00b1a5] transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-[#00b1a5] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-2 text-black">Legal</h4>
          <ul className="space-y-1 text-gray-600">
            <li><Link href="/Pages/Legal/Terms" className="hover:text-[#00b1a5] transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/Pages/Legal/Privacy" className="hover:text-[#00b1a5] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal/data-security" className="hover:text-[#00b1a5] transition-colors">Data Security</Link></li>
            <li><Link href="/legal/accessibility" className="hover:text-[#00b1a5] transition-colors">Accessibility</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 pt-6 border-t border-gray-200 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Meu Deliver. All rights reserved.</p>
        <p className="mt-1 text-xs">Available 24/7 | Powered by people, driven by technology</p>
      </div>
    </footer>
  )
}
