
// app/layout.js
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider, { AuthContext } from "./hooks/authContext";
import LayoutContent from "./layoutContent";
// import { useState, useContext } from "react"; // Corrected: Import useState and useContext

export const metadata = {
  title: 'MeuDeliver - Angola’s All-in-One Delivery',
  description: 'Food, pharmacy, supermarket, bar, and post deliveries — fast and reliable!',
}

export default function RootLayout({ children }) {
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
