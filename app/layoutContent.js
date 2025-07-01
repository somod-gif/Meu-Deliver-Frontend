"use client";
import { useContext, useState } from "react";
import Footer from "./Components/Footer";
import GoogleTranslate from "./Components/GoogleTranslate";
import LoginHeader from "./Components/NavBar";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./hooks/authContext";

const LayoutContent = ({ children }) => {
  const { isLoggedIn, verifiedUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <LoginHeader user={verifiedUser} setSidebarOpen={setSidebarOpen} />
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
