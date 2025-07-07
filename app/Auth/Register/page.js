"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Check,
  Camera,
  ShoppingBag,
  ShoppingCart,
  Bike,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/app/hooks/authContext";

export default function RegisterPage() {
  const router = useRouter();
  const { setVerifiedUser, setIsLoggedIn } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    profileImage: null,
    agreeTerms: false,
    role: "client", // Default role
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState({
    vendor: { businessName: "", businessType: "", address: "" },
    rider: { vehicleType: "", licenseNumber: "" },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAdditionalDetailsChange = (role, field, value) => {
    setAdditionalDetails((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData((prev) => ({ ...prev, profileImage: file }));
      };
      reader.readAsDataURL(file);
      toast.success("Profile image uploaded successfully!");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms and conditions";

    // Role-specific validations
    if (formData.role === "vendor") {
      if (!additionalDetails.vendor.businessName.trim())
        newErrors.businessName = "Business name is required";
      if (!additionalDetails.vendor.businessType.trim())
        newErrors.businessType = "Business type is required";
      if (!additionalDetails.vendor.address.trim())
        newErrors.address = "Business address is required";
    } else if (formData.role === "rider") {
      if (!additionalDetails.rider.vehicleType.trim())
        newErrors.vehicleType = "Vehicle type is required";
      if (!additionalDetails.rider.licenseNumber.trim())
        newErrors.licenseNumber = "License number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // ✅ stringify!
          credentials: "include", // ✅ receive/set cookies
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(
          Array.isArray(message)
            ? message.join(", ")
            : message || "Registration failed"
        );
      }
      const data = response.json();
      setIsLoggedIn(true);
      setVerifiedUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Registration successful!");
      router.push("/Portal/Clients/Dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    try {
      toast.success("Redirecting to Google Sign-In...");
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toast.error("Failed to sign in with Google. Please try again later.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 ">
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

        <div className="w-full max-w-lg">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-1 group mb-4">
              <img
                src="/images/m_logo.png"
                alt="Meu Deliver Logo"
                className=" "
                width={110}
                height={110}
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join Meu Deliver
            </h1>
            <p className="text-gray-600">
              Fast, Efficient, and Secure Everywhere
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              {/* Role Selection */}
              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Register As
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'client' }))}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.role === 'client' 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <ShoppingCart className={`w-6 h-6 mb-2 ${
                      formData.role === 'client' ? 'text-teal-600' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.role === 'client' ? 'text-teal-700' : 'text-gray-600'
                    }`}>Customer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'vendor' }))}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.role === 'vendor' 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <ShoppingBag className={`w-6 h-6 mb-2 ${
                      formData.role === 'vendor' ? 'text-teal-600' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.role === 'vendor' ? 'text-teal-700' : 'text-gray-600'
                    }`}>Vendor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'rider' }))}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.role === 'rider' 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <Bike className={`w-6 h-6 mb-2 ${
                      formData.role === 'rider' ? 'text-teal-600' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      formData.role === 'rider' ? 'text-teal-700' : 'text-gray-600'
                    }`}>Rider</span>
                  </button>
                </div>
              </div> */}

              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors duration-200">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Upload profile photo (optional)
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 text-gray-400 ${
                      errors.fullName
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-teal-500"
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
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
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
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
                    placeholder="Create a password"
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

              {/* Vendor-specific fields */}
              {formData.role === "vendor" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={additionalDetails.vendor.businessName}
                      onChange={(e) =>
                        handleAdditionalDetailsChange(
                          "vendor",
                          "businessName",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.businessName
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      }`}
                      placeholder="Enter your business name"
                    />
                    {errors.businessName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Type
                    </label>
                    <input
                      type="text"
                      value={additionalDetails.vendor.businessType}
                      onChange={(e) =>
                        handleAdditionalDetailsChange(
                          "vendor",
                          "businessType",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.businessType
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      }`}
                      placeholder="e.g. Restaurant, Grocery"
                    />
                    {errors.businessType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.businessType}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Address
                    </label>
                    <input
                      type="text"
                      value={additionalDetails.vendor.address}
                      onChange={(e) =>
                        handleAdditionalDetailsChange(
                          "vendor",
                          "address",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.address
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      }`}
                      placeholder="Enter your business address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Rider-specific fields */}
              {formData.role === "rider" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vehicle Type
                    </label>
                    <select
                      value={additionalDetails.rider.vehicleType}
                      onChange={(e) =>
                        handleAdditionalDetailsChange(
                          "rider",
                          "vehicleType",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.vehicleType
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      }`}
                    >
                      <option value="">Select vehicle type</option>
                      <option value="bicycle">Bicycle</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="car">Car</option>
                      <option value="scooter">Scooter</option>
                    </select>
                    {errors.vehicleType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.vehicleType}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      License Number
                    </label>
                    <input
                      type="text"
                      value={additionalDetails.rider.licenseNumber}
                      onChange={(e) =>
                        handleAdditionalDetailsChange(
                          "rider",
                          "licenseNumber",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.licenseNumber
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 focus:border-teal-500"
                      }`}
                      placeholder="Enter your license number"
                    />
                    {errors.licenseNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.licenseNumber}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeTerms: !prev.agreeTerms,
                      }))
                    }
                    className={`w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
                      formData.agreeTerms
                        ? "bg-teal-500 border-teal-500"
                        : "border-gray-300 hover:border-teal-400"
                    }`}
                  >
                    {formData.agreeTerms && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-teal-600 hover:text-teal-700 font-semibold"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-teal-600 hover:text-teal-700 font-semibold"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
              )}

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
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  `Register as ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}`
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
                onClick={handleGoogleSignUp}
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

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/Auth/Login"
                  className="text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-200"
                >
                  Sign In
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
