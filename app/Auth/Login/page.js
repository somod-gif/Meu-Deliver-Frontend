"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/app/hooks/authContext";

export default function LoginPage() {
  const router = useRouter();
  const { verifyUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Require at least one: email or phone
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = "Email or phone number is required";
      newErrors.phone = "Email or phone number is required";
    } else {
      // If email is present, validate email
      if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      // If phone is present, validate phone
      if (formData.phone.trim() && !/^\d{10,}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsLoading(true);

    try {
      const identifier = formData.email.trim()
        ? formData.email
        : formData.phone;
      if (!identifier) throw new Error("Email or phone number is required");
      if (!formData.password) throw new Error("Password is required");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin/client`,
        {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({
            [formData.email.trim() ? "email" : "phone"]: identifier,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData?.message || response.status === 401
            ? "Invalid credentials"
            : response.status === 500
              ? "Server error"
              : "Login failed. Please try again."
        );
      }

      const data = await response.json();
      if (!data?.user) throw new Error("Invalid server response");
      localStorage.setItem('user', data.user)

      // Store minimal client-side state
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      // Verify the session immediately after login
      await verifyUser();
      toast.success('Sign in successfully')

      // Redirect
      const redirectPath =
        {
          vendor: "/Portal/Vendor/Dashboard/",
          delivery: "/Portal/Rider/Dashboard/",
          client: "/Portal/Clients/Dashboard/",
        }[data.user.role?.toLowerCase()] || "/Portal/Clients/Dashboard/";

      router.push(redirectPath);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.message.includes("Failed to fetch")
          ? "Network error. Please check your connection."
          : error.message || "Signing in failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    try {
      toast.success("Redirecting to Google Sign-In...");
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toast.error("Failed to sign in with Google. Please try again later.");
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email && !formData.phone) {
      toast.error("Please enter your email or phone number first");
      return;
    }

    // Here you would typically make an API call to send a reset link
    toast.info("Password reset link would be sent to your email or phone");
    // router.push('/Auth/ForgotPassword');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
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
          className="mt-16"
        />

        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-1 group mb-4">
              <img
                src="/images/m_logo.png"
                alt="Meu Deliver Logo"
                width={110}
                height={110}
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your Meu Deliver account</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              {/* Login Method Toggle */}
              <div className="flex justify-center space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    loginMethod === "email"
                      ? "bg-teal-100 text-teal-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("phone")}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    loginMethod === "phone"
                      ? "bg-teal-100 text-teal-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Email or Phone Input */}
              {loginMethod === "email" ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      }`}
                      placeholder="Enter your email"
                      autoComplete="username"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-teal-500"
                    }`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-lime-500 hover:from-teal-600 hover:to-lime-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full py-4 px-6 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/Auth/Register"
                  className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-200"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Meu Deliver. All rights reserved.
            </p>
            <p className="mt-1">meudeliver.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
