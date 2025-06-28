"use client";
// app/layout.js
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import GoogleTranslate from "./Components/GoogleTranslate";
import { toast, ToastContainer } from "react-toastify"; // Keep these as they are fine
import "react-toastify/dist/ReactToastify.css";
import LoginHeader from "./Components/Login-header";
import AuthContextProvider, { AuthContext } from "./hooks/authContext";
import LayoutContent from "./layoutContent";
// import { useState, useContext } from "react"; // Corrected: Import useState and useContext

// export const metadata = {
//   title: 'MeuDeliver - Angola’s All-in-One Delivery',
//   description: 'Food, pharmacy, supermarket, bar, and post deliveries — fast and reliable!',
// }

export default function RootLayout({ children }) {
  // useState and useContext calls should be inside a functional component
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const { isLoggedIn, verifiedUser } = useContext(AuthContext);

  // console.log("isLoggedIn:", isLoggedIn);

  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900">
        {/* Wrap the entire body content with AuthContextProvider */}
        <AuthContextProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthContextProvider>
      </body>
    </html>
  );
}
