// app/layout.js
import './globals.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import GoogleTranslate from './Components/GoogleTranslate'

export const metadata = {
  title: 'MeuDeliver - Angola’s All-in-One Delivery',
  description: 'Food, pharmacy, supermarket, bar, and post deliveries — fast and reliable!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen">
          <GoogleTranslate />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
