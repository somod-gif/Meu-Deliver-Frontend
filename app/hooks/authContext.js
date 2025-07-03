"use client";

import { useEffect, useState, createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  verifiedUser: null,
  setVerifiedUser: () => {},
  loading: true,
});

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-current-user`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resData = await res.json();

      if (res.ok && resData.valid) {
        setIsLoggedIn(true);
        setVerifiedUser(resData.user);
        
        // Store minimal non-sensitive user data
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: resData.user.id,
            role: resData.user.role,
            name: resData.user.name,
          })
        );
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Verification error:", error);
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setVerifiedUser(null);
    localStorage.removeItem("userInfo");
  };

  useEffect(() => {
    verifyUser();
    
    // Set up periodic verification (every 5 minutes)
    const interval = setInterval(verifyUser, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ 
        isLoggedIn, 
        setIsLoggedIn, 
        verifiedUser, 
        setVerifiedUser,
        loading,
        logoutUser,
        verifyUser
      }}
    >
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthContext.Provider>
  );
}