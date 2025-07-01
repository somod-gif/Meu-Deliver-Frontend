"use client";

import { useEffect, useState, createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  verifiedUser: null,
  setVerifiedUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-current-user`,
          {
            method: "GET",
            credentials: "include", // Send cookies
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const resData = await res.json();

        if (res.ok && resData.valid) {
          setIsLoggedIn(true);
          setVerifiedUser(resData.user);
        } else {
          setIsLoggedIn(false);
          setVerifiedUser(null);

          if (res.status === 401) {
            toast.error("Session expired. Please log in again.");
          } else {
            toast.error(resData.message || "Failed to verify user.");
          }
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Network error verifying user.");
        setIsLoggedIn(false);
        setVerifiedUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, verifiedUser, setVerifiedUser }}
    >
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </AuthContext.Provider>
  );
}
