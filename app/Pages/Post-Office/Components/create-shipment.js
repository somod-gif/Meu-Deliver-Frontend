import React, { useState, useEffect } from "react";
import {
  Package,
  MapPin,
  Clock,
  CreditCard,
  User,
  Truck,
  Calculator,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
} from "lucide-react";

const CreateShipmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSummary, setShowSummary] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Sender Information
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderStreet: "",
    senderCity: "",
    senderState: "",
    senderCountry: "Angola",
    senderPostalCode: "",

    // Recipient Information
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientStreet: "",
    recipientCity: "",
    recipientState: "",
    recipientCountry: "Angola",
    recipientPostalCode: "",
    deliveryInstructions: "",

    // Package Information
    packageType: "",
    packageDescription: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    declaredValue: "",

    // Pickup Details
    pickupMethod: "pickup",
    pickupDate: "",
    pickupTime: "",

    // Delivery Options
    deliverySpeed: "standard",
    codAmount: "",
    requireSignature: false,

    // Payment
    paymentMethod: "appypay",
    promoCode: "",
    specialInstructions: "",
    acceptTerms: false,
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  const steps = [
    { id: 1, title: "Sender Info", icon: User },
    { id: 2, title: "Recipient Info", icon: MapPin },
    { id: 3, title: "Package Details", icon: Package },
    { id: 4, title: "Pickup & Delivery", icon: Truck },
    { id: 5, title: "Payment", icon: CreditCard },
  ];

  const angolaProvinces = [
    "Bengo",
    "Benguela",
    "Bié",
    "Cabinda",
    "Cuando Cubango",
    "Cuanza Norte",
    "Cuanza Sul",
    "Cunene",
    "Huambo",
    "Huíla",
    "Luanda",
    "Lunda Norte",
    "Lunda Sul",
    "Malanje",
    "Moxico",
    "Namibe",
    "Uíge",
    "Zaire",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Calculate estimated cost in Kwanza (AOA)
  useEffect(() => {
    const calculateCost = () => {
      const baseRate = 2500; // 2500 AOA base rate
      const weightMultiplier = parseFloat(formData.weight) || 0;
      const speedMultiplier = formData.deliverySpeed === "express" ? 2 : 1;
      const codFee = formData.paymentMethod === "cod" ? 800 : 0;

      const total =
        (baseRate + weightMultiplier * 500) * speedMultiplier + codFee;
      setEstimatedCost(total);

      const deliveryDays = formData.deliverySpeed === "express" ? "1" : "2-3";
      setEstimatedDelivery(deliveryDays);
    };

    calculateCost();
  }, [formData.weight, formData.deliverySpeed, formData.paymentMethod]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);

    // Simulate AppyPay payment processing
    setTimeout(() => {
      const newTrackingId =
        "MD" + Math.random().toString(36).substr(2, 9).toUpperCase();
      setTrackingId(newTrackingId);
      setPaymentProcessing(false);
      setShowSummary(true);
    }, 3000);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.senderName &&
          formData.senderPhone &&
          formData.senderStreet &&
          formData.senderCity &&
          formData.senderState
        );
      case 2:
        return (
          formData.recipientName &&
          formData.recipientPhone &&
          formData.recipientStreet &&
          formData.recipientCity &&
          formData.recipientState
        );
      case 3:
        return (
          formData.packageType &&
          formData.packageDescription &&
          formData.weight &&
          formData.declaredValue
        );
      case 4:
        return true; // Optional fields
      case 5:
        return formData.acceptTerms;
      default:
        return false;
    }
  };

  const packageTypes = [
    "Document",
    "Parcel",
    "Food",
    "Fragile",
    "Electronics",
    "Clothing",
    "Books",
    "Other",
  ];

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-[#00B1A5] mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Shipment Created Successfully!
              </h1>
              <p className="text-gray-600">
                Your package is ready for pickup and delivery
              </p>
            </div>

            <div className="bg-[#00B1A5] bg-opacity-10 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Tracking Information
              </h2>
              <div className="text-3xl font-bold text-[#00B1A5] mb-2">
                {trackingId}
              </div>
              <p className="text-gray-600">
                Keep this tracking ID to monitor your shipment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">From</h3>
                <p className="text-sm text-gray-600">{formData.senderName}</p>
                <p className="text-sm text-gray-600">
                  {formData.senderCity}, {formData.senderState}
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">To</h3>
                <p className="text-sm text-gray-600">
                  {formData.recipientName}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.recipientCity}, {formData.recipientState}
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Package</h3>
                <p className="text-sm text-gray-600">
                  {formData.packageDescription}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.weight}kg - {formData.packageType}
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Total Cost</h3>
                <p className="text-xl font-bold text-[#00B1A5]">
                  {estimatedCost.toLocaleString()} AOA
                </p>
                <p className="text-sm text-gray-600">
                  Estimated delivery: {estimatedDelivery} days
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setShowSummary(false);
                  setCurrentStep(1);
                  setFormData({
                    senderName: "",
                    senderPhone: "",
                    senderEmail: "",
                    senderStreet: "",
                    senderCity: "",
                    senderState: "",
                    senderCountry: "Angola",
                    senderPostalCode: "",
                    recipientName: "",
                    recipientPhone: "",
                    recipientEmail: "",
                    recipientStreet: "",
                    recipientCity: "",
                    recipientState: "",
                    recipientCountry: "Angola",
                    recipientPostalCode: "",
                    deliveryInstructions: "",
                    packageType: "",
                    packageDescription: "",
                    weight: "",
                    length: "",
                    width: "",
                    height: "",
                    declaredValue: "",
                    pickupMethod: "pickup",
                    pickupDate: "",
                    pickupTime: "",
                    deliverySpeed: "standard",
                    codAmount: "",
                    requireSignature: false,
                    paymentMethod: "appypay",
                    promoCode: "",
                    specialInstructions: "",
                    acceptTerms: false,
                  });
                }}
                className="bg-[#00B1A5] hover:bg-[#00978D] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Create Another Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="w-full bg-teal-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-teal-800">
            Create New Shipment
          </h2>
          <p className="mt-2 text-gray-600 text-lg">
            Fully online, tailored to you.Meudeliver gives you a seamless way to
            manage shipments.
          </p>
        </div>
      </section>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        {/* Progress Steps */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-start space-x-6 min-w-max px-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors duration-300 ${
                      isActive
                        ? "bg-[#00B1A5] border-[#00B1A5] text-white"
                        : isCompleted
                          ? "bg-[#00B1A5] border-[#00B1A5] text-white"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <div
                      className={`text-sm font-medium whitespace-nowrap ${
                        isActive || isCompleted
                          ? "text-[#00B1A5]"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 sm:w-12 h-0.5 mx-2 ${
                        isCompleted ? "bg-[#00B1A5]" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl border border-teal-100 shadow-lg p-6 mb-6">
          {/* Step 1: Sender Information */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-[#00B1A5] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Sender Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Sender Name *
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="senderStreet"
                    value={formData.senderStreet}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="senderCity"
                    value={formData.senderCity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Province *
                  </label>
                  <select
                    name="senderState"
                    value={formData.senderState}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  >
                    <option value="">Select Province</option>
                    {angolaProvinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="senderPostalCode"
                    value={formData.senderPostalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Recipient Information */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-[#00B1A5] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Recipient Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="recipientStreet"
                    value={formData.recipientStreet}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="recipientCity"
                    value={formData.recipientCity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Province *
                  </label>
                  <select
                    name="recipientState"
                    value={formData.recipientState}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  >
                    <option value="">Select Province</option>
                    {angolaProvinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Delivery Instructions
                  </label>
                  <textarea
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    placeholder="Special delivery instructions, apartment number, gate code, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Package Information */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-[#00B1A5] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Package Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Package Type *
                  </label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  >
                    <option value="">Select Package Type</option>
                    {packageTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Package Description *
                  </label>
                  <input
                    type="text"
                    name="packageDescription"
                    value={formData.packageDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    placeholder="Brief description of package contents"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Length (cm)
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Declared Value (AOA) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="declaredValue"
                    value={formData.declaredValue}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pickup & Delivery Options */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center mb-6">
                <Truck className="h-6 w-6 text-[#00B1A5] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Pickup & Delivery Options
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Pickup Method *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="radio"
                        name="pickupMethod"
                        value="pickup"
                        checked={formData.pickupMethod === "pickup"}
                        onChange={handleChange}
                        className="mr-3 text-[#00B1A5] focus:ring-[#00B1A5]"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          Pickup at address
                        </div>
                        <div className="text-sm text-gray-600">
                          Schedule driver pickup
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="radio"
                        name="pickupMethod"
                        value="dropoff"
                        checked={formData.pickupMethod === "dropoff"}
                        onChange={handleChange}
                        className="mr-3 text-[#00B1A5] focus:ring-[#00B1A5]"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          Drop-off at center
                        </div>
                        <div className="text-sm text-gray-600">
                          Bring to our location
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Delivery Speed *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="radio"
                        name="deliverySpeed"
                        value="standard"
                        checked={formData.deliverySpeed === "standard"}
                        onChange={handleChange}
                        className="mr-3 text-[#00B1A5] focus:ring-[#00B1A5]"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          Standard (2-3 days)
                        </div>
                        <div className="text-sm text-gray-600">
                          Regular delivery
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <input
                        type="radio"
                        name="deliverySpeed"
                        value="express"
                        checked={formData.deliverySpeed === "express"}
                        onChange={handleChange}
                        className="mr-3 text-[#00B1A5] focus:ring-[#00B1A5]"
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          Express (same day/next day)
                        </div>
                        <div className="text-sm text-orange-500">
                          Additional charges apply
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.pickupMethod === "pickup" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Pickup Date
                      </label>
                      <input
                        type="date"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      name="requireSignature"
                      checked={formData.requireSignature}
                      onChange={handleChange}
                      className="mr-3 text-[#00B1A5] focus:ring-[#00B1A5]"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        Require signature on delivery
                      </div>
                      <div className="text-sm text-gray-600">
                        Additional security for your package
                      </div>
                    </div>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    placeholder="Any special handling instructions or notes"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {currentStep === 5 && (
            <div>
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-[#00B1A5] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Payment & Summary
                </h3>
              </div>

              {/* Cost Summary */}
              <div className="bg-gradient-to-r from-[#00B1A5] from-opacity-10 to-[#00978D] to-opacity-10 rounded-lg border border-[#00B1A5] border-opacity-20 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Calculator className="h-5 w-5 text-[#00B1A5] mr-2" />
                  <h4 className="text-lg font-semibold text-gray-800">
                    Cost Summary
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-[#00B1A5]">
                      {estimatedCost.toLocaleString()} AOA
                    </div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-orange-500">
                      {estimatedDelivery} days
                    </div>
                    <div className="text-sm text-gray-600">Delivery Time</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-gray-800">
                      {formData.deliverySpeed === "express"
                        ? "Express"
                        : "Standard"}
                    </div>
                    <div className="text-sm text-gray-600">Service Type</div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-3">
                  Payment Method *
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-[#00B1A5] rounded-lg bg-[#00B1A5] bg-opacity-5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="appypay"
                      checked={formData.paymentMethod === "appypay"}
                      onChange={handleChange}
                      className="mr-4 text-[#00B1A5] focus:ring-[#00B1A5]"
                    />
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="font-semibold text-gray-800">
                          AppyPay
                        </div>
                        <div className="text-sm text-gray-600">
                          Secure payment with AppyPay wallet
                        </div>
                      </div>
                      <div className="bg-[#00B1A5] text-white px-3 py-1 rounded-full text-xs font-medium">
                        Recommended
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pickup"
                      checked={formData.paymentMethod === "pickup"}
                      onChange={handleChange}
                      className="mr-4 text-[#00B1A5] focus:ring-[#00B1A5]"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        Pay at Pickup
                      </div>
                      <div className="text-sm text-gray-600">
                        Cash or card payment when driver arrives
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="mr-4 text-[#00B1A5] focus:ring-[#00B1A5]"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        Cash on Delivery (COD)
                      </div>
                      <div className="text-sm text-orange-500">
                        Additional fee: 800 AOA
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {formData.paymentMethod === "cod" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    COD Amount (AOA)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="codAmount"
                    value={formData.codAmount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    placeholder="Amount to collect from recipient"
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="promoCode"
                    value={formData.promoCode}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    placeholder="Enter promo code"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-start p-4 border border-gray-300 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mr-3 mt-1 text-[#00B1A5] focus:ring-[#00B1A5]"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I accept the{" "}
                    <a href="#" className="text-[#00B1A5] hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and
                    <a href="#" className="text-[#00B1A5] hover:underline ml-1">
                      Privacy Policy
                    </a>
                    . I confirm that the package contents comply with shipping
                    regulations and that all information provided is accurate.
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-[#00B1A5] text-[#00B1A5] hover:bg-[#00B1A5] hover:text-white"
            }`}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!validateStep(currentStep)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                validateStep(currentStep)
                  ? "bg-[#00B1A5] hover:bg-[#00978D] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePayment}
              disabled={!formData.acceptTerms || paymentProcessing}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                formData.acceptTerms && !paymentProcessing
                  ? "bg-[#00B1A5] hover:bg-[#00978D] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {paymentProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Complete Payment - {estimatedCost.toLocaleString()} AOA
                </>
              )}
            </button>
          )}
        </div>

        {/* AppyPay Integration Notice */}
        {currentStep === 5 && formData.paymentMethod === "appypay" && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-[#00B1A5] rounded-full flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-800">
                  Secure Payment with AppyPay
                </h4>
                <p className="text-sm text-gray-600">
                  You will be redirected to AppyPay to complete your payment
                  securely. Your shipment will be processed immediately after
                  payment confirmation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateShipmentForm;
