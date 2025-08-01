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
  Phone,
  Mail,
  Calendar,
  Hash,
} from "lucide-react";

const SchedulePickupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pickupId, setPickupId] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Pickup Location Information
    pickupName: "",
    pickupPhone: "",
    pickupEmail: "",
    pickupAddress: "",
    pickupState: "",
    pickupCity: "",
    pickupDate: "",
    pickupTimeWindow: "",

    // Package Details
    packageType: "",
    packageWeight: "",
    packageDescription: "",
    numberOfItems: "1",

    // Special Instructions
    pickupInstructions: "",

    // Delivery Information
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    deliveryAddress: "",
    deliveryState: "",
    deliveryCity: "",
    deliveryInstructions: "",

    // Payment & Confirmation
    paymentMethod: "appypay",
    promoCode: "",
    termsAccepted: false,
  });

  const [pricing, setPricing] = useState({
    baseRate: 0,
    weightCharge: 0,
    distanceCharge: 0,
    timeSlotCharge: 0,
    total: 0,
  });

  const steps = [
    { id: 1, title: "Pickup Details", icon: MapPin },
    { id: 2, title: "Package Info", icon: Package },
    { id: 3, title: "Delivery Details", icon: Truck },
    { id: 4, title: "Payment", icon: CreditCard },
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

  const timeWindows = [
    { value: "9-12", label: "9:00 AM - 12:00 PM" },
    { value: "12-15", label: "12:00 PM - 3:00 PM" },
    { value: "15-18", label: "3:00 PM - 6:00 PM" },
    { value: "18-20", label: "6:00 PM - 8:00 PM" },
    { value: "flexible", label: "Flexible (Any time)" },
  ];

  const packageTypes = [
    { value: "envelope", label: "Envelope/Document", baseRate: 1500 },
    { value: "small-box", label: "Small Box", baseRate: 2500 },
    { value: "medium-box", label: "Medium Box", baseRate: 3500 },
    { value: "large-box", label: "Large Box", baseRate: 5000 },
    { value: "fragile", label: "Fragile Item", baseRate: 4000 },
    { value: "electronics", label: "Electronics", baseRate: 4500 },
    { value: "food", label: "Food/Perishable", baseRate: 3000 },
    { value: "other", label: "Other", baseRate: 3000 },
  ];

  const weightRanges = [
    { value: "0-1", label: "Up to 1kg", charge: 0 },
    { value: "1-5", label: "1-5kg", charge: 500 },
    { value: "5-10", label: "5-10kg", charge: 1000 },
    { value: "10-20", label: "10-20kg", charge: 2000 },
    { value: "20+", label: "Over 20kg", charge: 3500 },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Calculate pricing based on selections
  useEffect(() => {
    const calculatePricing = () => {
      const selectedPackageType = packageTypes.find(
        (type) => type.value === formData.packageType
      );
      const selectedWeight = weightRanges.find(
        (weight) => weight.value === formData.packageWeight
      );

      const baseRate = selectedPackageType?.baseRate || 0;
      const weightCharge = selectedWeight?.charge || 0;
      const distanceCharge = 1500; // Base distance charge
      const timeSlotCharge = formData.pickupTimeWindow === "flexible" ? 0 : 500;

      const total = baseRate + weightCharge + distanceCharge + timeSlotCharge;

      setPricing({
        baseRate,
        weightCharge,
        distanceCharge,
        timeSlotCharge,
        total,
      });
    };

    calculatePricing();
  }, [formData.packageType, formData.packageWeight, formData.pickupTimeWindow]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setPaymentProcessing(true);

    // Simulate payment processing and pickup scheduling
    setTimeout(() => {
      const newPickupId =
        "PU" + Math.random().toString(36).substr(2, 9).toUpperCase();
      setPickupId(newPickupId);
      setPaymentProcessing(false);
      setShowConfirmation(true);
    }, 3000);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.pickupName &&
          formData.pickupPhone &&
          formData.pickupAddress &&
          formData.pickupCity &&
          formData.pickupState &&
          formData.pickupDate &&
          formData.pickupTimeWindow
        );
      case 2:
        return (
          formData.packageType &&
          formData.packageWeight &&
          formData.packageDescription &&
          formData.numberOfItems
        );
      case 3:
        return (
          formData.recipientName &&
          formData.recipientPhone &&
          formData.deliveryAddress &&
          formData.deliveryCity &&
          formData.deliveryState
        );
      case 4:
        return formData.termsAccepted && formData.paymentMethod;
      default:
        return false;
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-[#00B1A5] mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Pickup Scheduled Successfully!
              </h1>
              <p className="text-gray-600">
                Our driver will arrive at your specified time to collect the
                package
              </p>
            </div>

            <div className="bg-[#00B1A5] bg-opacity-10 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Pickup Information
              </h2>
              <div className="text-3xl font-bold text-[#00B1A5] mb-2">
                {pickupId}
              </div>
              <p className="text-gray-600 mb-4">
                Pickup ID - Share this with our driver
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-[#00B1A5] mr-2" />
                    <span className="font-semibold text-gray-800">
                      Pickup Date & Time
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{formData.pickupDate}</p>
                  <p className="text-sm text-gray-600">
                    {
                      timeWindows.find(
                        (tw) => tw.value === formData.pickupTimeWindow
                      )?.label
                    }
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-[#00B1A5] mr-2" />
                    <span className="font-semibold text-gray-800">
                      Pickup Location
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{formData.pickupName}</p>
                  <p className="text-sm text-gray-600">
                    {formData.pickupCity}, {formData.pickupState}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Package Details
                </h3>
                <p className="text-sm text-gray-600">
                  {formData.packageDescription}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.numberOfItems} item(s) -{" "}
                  {
                    packageTypes.find((pt) => pt.value === formData.packageType)
                      ?.label
                  }
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Delivery To
                </h3>
                <p className="text-sm text-gray-600">
                  {formData.recipientName}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.deliveryCity}, {formData.deliveryState}
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Total Paid</h3>
                <p className="text-xl font-bold text-[#00B1A5]">
                  {pricing.total.toLocaleString()} AOA
                </p>
                <p className="text-sm text-gray-600">Payment confirmed</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• SMS confirmation sent to {formData.pickupPhone}</li>
                <li>• Driver will call 15 minutes before arrival</li>
                <li>
                  • Have your pickup ID ready: <strong>{pickupId}</strong>
                </li>
                <li>• Package tracking will begin after pickup</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setCurrentStep(1);
                  setFormData({
                    pickupName: "",
                    pickupPhone: "",
                    pickupEmail: "",
                    pickupAddress: "",
                    pickupState: "",
                    pickupCity: "",
                    pickupDate: "",
                    pickupTimeWindow: "",
                    packageType: "",
                    packageWeight: "",
                    packageDescription: "",
                    numberOfItems: "1",
                    pickupInstructions: "",
                    recipientName: "",
                    recipientPhone: "",
                    recipientEmail: "",
                    deliveryAddress: "",
                    deliveryState: "",
                    deliveryCity: "",
                    deliveryInstructions: "",
                    paymentMethod: "appypay",
                    promoCode: "",
                    termsAccepted: false,
                  });
                }}
                className="bg-[#00B1A5] hover:bg-[#00978D] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Schedule Another Pickup
              </button>
              <button className="bg-white border-2 border-[#00B1A5] text-[#00B1A5] hover:bg-[#00B1A5] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                Track This Pickup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}

      <section className="w-full bg-teal-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-teal-800">
            Schedule Package Pickup
          </h2>
          <p className="mt-2 text-gray-600 text-lg">
            Need to adjust a pickup? No problem. easily reschedule or cancel
            pickups even after placing your order.
          </p>
        </div>
      </section>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        {/* Progress Steps */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center space-x-4 px-2 snap-x snap-mandatory w-max">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className="flex items-center snap-start shrink-0"
                >
                  {/* Step Icon */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      isActive
                        ? "bg-[#00B1A5] border-[#00B1A5] text-white"
                        : isCompleted
                          ? "bg-[#00B1A5] border-[#00B1A5] text-white"
                          : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Step Label */}
                  <div className="ml-2 hidden md:block">
                    <div
                      className={`text-sm font-medium ${
                        isActive || isCompleted
                          ? "text-[#00B1A5]"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>

                  {/* Connector line (only on larger screens) */}
                  {index < steps.length - 1 && (
                    <div
                      className={`hidden md:block w-12 md:w-20 h-0.5 mx-4 ${
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
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Step 1: Pickup Details */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-[#00B1A5] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Pickup Location & Schedule
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Delivery City *
                  </label>
                  <input
                    type="text"
                    name="deliveryCity"
                    value={formData.deliveryCity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Delivery Province *
                  </label>
                  <select
                    name="deliveryState"
                    value={formData.deliveryState}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  name="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B1A5] focus:border-transparent"
                  placeholder="Special delivery instructions, building access, preferred delivery time, etc."
                />
              </div>
            </div>
          )}

          {/* Step 4: Payment & Confirmation */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-[#00B1A5] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Payment & Confirmation
                </h3>
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-r from-[#00B1A5] from-opacity-10 to-[#00978D] to-opacity-10 rounded-lg border border-[#00B1A5] border-opacity-20 p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Calculator className="h-5 w-5 text-[#00B1A5] mr-2" />
                  <h4 className="text-lg font-semibold text-gray-800">
                    Price Summary
                  </h4>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Base Rate (
                      {
                        packageTypes.find(
                          (pt) => pt.value === formData.packageType
                        )?.label
                      }
                      ):
                    </span>
                    <span className="font-medium">
                      {pricing.baseRate.toLocaleString()} AOA
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Weight Charge (
                      {
                        weightRanges.find(
                          (wr) => wr.value === formData.packageWeight
                        )?.label
                      }
                      ):
                    </span>
                    <span className="font-medium">
                      {pricing.weightCharge.toLocaleString()} AOA
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Distance Charge:</span>
                    <span className="font-medium">
                      {pricing.distanceCharge.toLocaleString()} AOA
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time Slot Fee:</span>
                    <span className="font-medium">
                      {pricing.timeSlotCharge.toLocaleString()} AOA
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-[#00B1A5]">
                      {pricing.total.toLocaleString()} AOA
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">
                      Estimated Pickup
                    </div>
                    <div className="font-semibold text-gray-800">
                      {formData.pickupDate}
                    </div>
                    <div className="text-sm text-gray-600">
                      {
                        timeWindows.find(
                          (tw) => tw.value === formData.pickupTimeWindow
                        )?.label
                      }
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Estimated Delivery
                    </div>
                    <div className="font-semibold text-gray-800">
                      Same Day - Next Day
                    </div>
                    <div className="text-sm text-gray-600">
                      Depending on distance
                    </div>
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
                          Pay securely with your AppyPay wallet
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
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="mr-4 text-[#00B1A5] focus:ring-[#00B1A5]"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        Credit/Debit Card
                      </div>
                      <div className="text-sm text-gray-600">
                        Pay with Visa, Mastercard, or local cards
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === "bank_transfer"}
                      onChange={handleChange}
                      className="mr-4 text-[#00B1A5] focus:ring-[#00B1A5]"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        Bank Transfer
                      </div>
                      <div className="text-sm text-gray-600">
                        Direct bank transfer or mobile banking
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash_pickup"
                      checked={formData.paymentMethod === "cash_pickup"}
                      onChange={handleChange}
                      className="mr-4 text-[#00B1A5] focus:ring-[#00B1A5]"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        Cash at Pickup
                      </div>
                      <div className="text-sm text-orange-500">
                        Pay driver when package is collected
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Promo Code (Optional)
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

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-start p-4 border border-gray-300 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
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
                    regulations and that all pickup and delivery information
                    provided is accurate. I understand that the driver may
                    contact me via the provided phone number.
                  </span>
                </label>
              </div>

              {/* Pickup Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Pickup Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Pickup From:</div>
                    <div className="font-medium">{formData.pickupName}</div>
                    <div className="text-gray-600">
                      {formData.pickupAddress}
                    </div>
                    <div className="text-gray-600">
                      {formData.pickupCity}, {formData.pickupState}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Deliver To:</div>
                    <div className="font-medium">{formData.recipientName}</div>
                    <div className="text-gray-600">
                      {formData.deliveryAddress}
                    </div>
                    <div className="text-gray-600">
                      {formData.deliveryCity}, {formData.deliveryState}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Package:</div>
                    <div className="font-medium">
                      {
                        packageTypes.find(
                          (pt) => pt.value === formData.packageType
                        )?.label
                      }
                    </div>
                    <div className="text-gray-600">
                      {formData.numberOfItems} item(s) -{" "}
                      {
                        weightRanges.find(
                          (wr) => wr.value === formData.packageWeight
                        )?.label
                      }
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Pickup Schedule:</div>
                    <div className="font-medium">{formData.pickupDate}</div>
                    <div className="text-gray-600">
                      {
                        timeWindows.find(
                          (tw) => tw.value === formData.pickupTimeWindow
                        )?.label
                      }
                    </div>
                  </div>
                </div>
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

          {currentStep < 4 ? (
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
              onClick={handleSubmit}
              disabled={!formData.termsAccepted || paymentProcessing}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
                formData.termsAccepted && !paymentProcessing
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
                  Schedule Pickup - {pricing.total.toLocaleString()} AOA
                </>
              )}
            </button>
          )}
        </div>

        {/* AppyPay Integration Notice */}
        {currentStep === 4 && formData.paymentMethod === "appypay" && (
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
                  securely. Your pickup will be scheduled immediately after
                  payment confirmation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Help & Support */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?
            <a href="#" className="text-[#00B1A5] hover:underline ml-1">
              Contact Support
            </a>{" "}
            or
            <a href="#" className="text-[#00B1A5] hover:underline ml-1">
              Live Chat
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SchedulePickupForm;
