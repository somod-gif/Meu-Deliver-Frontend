// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700 py-8 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-bold text-[#00b1a5]">Meu</span>
            <img 
              src="/images/logo.jpg" 
              alt="Meu Deliver Logo" 
              className="h-6 w-auto"
            />
          </div>
          <p className="text-gray-600">Fast, Efficient, and Secure Everywhere.</p>
          <p className="mt-2 text-gray-600">Your all-in-one delivery solution, available nationwide — from your favorite meals to everyday essentials.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-black">Services</h4>
          <ul className="space-y-1 text-gray-600">
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Food Delivery</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Grocery Delivery</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Package Delivery</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Document Delivery</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Medication Delivery</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-black">Company</h4>
          <ul className="space-y-1 text-gray-600">
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Partners</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-black">Legal</h4>
          <ul className="space-y-1 text-gray-600">
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Terms & Conditions</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Data Security</li>
            <li className="hover:text-[#00b1a5] cursor-pointer transition-colors">Accessibility</li>
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