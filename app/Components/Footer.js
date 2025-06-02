// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700 py-8 px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold mb-2 text-gray-900">MeuDeliver</h4>
          <p>Angola’s trusted multi-service delivery — from food to pharmacy.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-900">Vendors</h4>
          <ul className="space-y-1">
            <li>Restaurants</li>
            <li>Bars & Stores</li>
            <li>Pharmacies</li>
            <li>Supermarkets</li>
            <li>Post Offices</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-900">Company</h4>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Careers</li>
            <li>Partners</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-900">Legal</h4>
          <ul className="space-y-1">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Accessibility</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-6 text-gray-500">
        &copy; {new Date().getFullYear()} MeuDeliver. All rights reserved.
      </div>
    </footer>
  )
}
