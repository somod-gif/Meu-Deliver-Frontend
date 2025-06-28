"use client";
import { useContext, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import GoogleTranslate from "./Components/GoogleTranslate";
import LoginHeader from "./Components/Login-header";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./hooks/authContext";

const LayoutContent = ({ children }) => {
  const { isLoggedIn, verifiedUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <LoginHeader user={verifiedUser} setSidebarOpen={setSidebarOpen} />
      ) : (
        <Navbar />
      )}
      {/* Sidebar */}
      <main className="min-h-screen">
        <GoogleTranslate />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
      <Footer />
    </>
  );
};

export default LayoutContent;
