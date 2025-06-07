'use client';
import { useState } from 'react';
import { ChevronDownIcon, CheckIcon, CurrencyDollarIcon, ClockIcon, MapIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function RidePage() {
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [activeTab, setActiveTab] = useState('bike');
  const [calculator, setCalculator] = useState({
    rideType: 'bike',
    orders: 10,
    amountPerOrder: 500,
  });

    const [isClient, setIsClient] = useState(false);

  const handleCalculatorChange = (e) => {
    const { name, value } = e.target;
    setCalculator(prev => ({
      ...prev,
      [name]: name === 'orders' || name === 'amountPerOrder' ? parseInt(value) || 0 : value
    }));
  };

  const calculateEarnings = () => {
    const daily = calculator.orders * calculator.amountPerOrder;
    const weekly = daily * 6; // Assuming 6 working days
    const monthly = weekly * 4; // Assuming 4 weeks
    return { daily, weekly, monthly };
  };

  const benefits = [
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: "Earn More",
      description: "Competitive rates and bonuses help you maximize your earnings."
    },
    {
      icon: <ClockIcon className="h-8 w-8" />,
      title: "Flexible Hours",
      description: "Work when you want - full time, part time, or just weekends."
    },
    {
      icon: <MapIcon className="h-8 w-8" />,
      title: "Local Deliveries",
      description: "Deliver in your neighborhood with optimized routes."
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Insurance Coverage",
      description: "We've got you covered with accident and liability insurance."
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Support Network",
      description: "24/7 support and a community of fellow riders."
    }
  ];

  const requirements = [
    {
      vehicle: "Bike",
      items: [
        "Valid driver's license",
        "Vehicle papers (where applicable)",
        "Smartphone (Android 8+ or iPhone 8+)",
        "18+ years old",
        "Clean background check"
      ]
    },
    {
      vehicle: "Car",
      items: [
        "Valid driver's license",
        "Vehicle papers and insurance",
        "Smartphone (Android 8+ or iPhone 8+)",
        "21+ years old",
        "Clean background check",
        "Vehicle year 2010 or newer"
      ]
    },
    {
      vehicle: "Truck",
      items: [
        "Valid driver's license",
        "Vehicle papers and insurance",
        "Smartphone (Android 8+ or iPhone 8+)",
        "25+ years old",
        "Clean background check",
        "3+ years driving experience"
      ]
    }
  ];

  const earnings = [
    {
      vehicle: "Bike",
      range: "AOA 3,000 - AOA 8,000",
      perDelivery: "AOA 500 - AOA 1,500",
      description: "Earn per delivery with surge pricing during peak hours"
    },
    {
      vehicle: "Car",
      range: "AOA 5,000 - AOA 12,000",
      perDelivery: "AOA 800 - AOA 2,500",
      description: "Higher earnings for larger deliveries and packages"
    },
    {
      vehicle: "Truck",
      range: "AOA 8,000 - AOA 20,000",
      perDelivery: "AOA 1,500 - AOA 5,000",
      description: "Premium rates for bulk and commercial deliveries"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up Online",
      description: "Complete our simple application form in minutes"
    },
    {
      number: "2",
      title: "Submit Documents",
      description: "Upload your license and other required documents"
    },
    {
      number: "3",
      title: "Get Approved",
      description: "We'll verify your information within 24-48 hours"
    },
    {
      number: "4",
      title: "Start Earning",
      description: "Download the app and begin accepting deliveries"
    }
  ];

  const faqs = [
    {
      question: "How much can I earn with Meu Deliver Website?",
      answer: "Earnings vary based on vehicle type, location, and hours worked. On average, our riders earn between AOA 3,000 - AOA 20,000 daily. Full-time riders can earn AOA 150,000+ monthly."
    },
    {
      question: "When do I get paid?",
      answer: "You can cash out your earnings daily with no fees. Payments are processed directly to your bank account or mobile money."
    },
    {
      question: "What areas do you operate in?",
      answer: "We operate nationwide across all major cities in Angola including Luanda, Huambo, Lobito, Benguela, and more. Coverage is expanding daily."
    },
    {
      question: "What support do you provide?",
      answer: "We offer 24/7 support, free training, vehicle maintenance discounts, and a rider community for advice and networking."
    },
    {
      question: "Are there bonuses or incentives?",
      answer: "Yes! We offer sign-up bonuses, referral rewards, peak hour boosts, and weekly challenges with cash prizes."
    }
  ];

  const { daily, weekly, monthly } = calculateEarnings();

  


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-lime-500 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Earn on Your Own Terms</h1>
            <p className="text-xl md:text-2xl mb-8">Join Angola's largest delivery network and make money when you want</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Apply Now
              </button>
              <button className="bg-white hover:bg-gray-100 text-teal-600 font-bold py-3 px-6 rounded-lg transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Ride With Kudi Express</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earnings Calculator Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Earnings Calculator</h2>
          <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ride Type</label>
                <select
                  name="rideType"
                  value={calculator.rideType}
                  onChange={handleCalculatorChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="bike">Bike</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Orders Per Day</label>
                <input
                  type="number"
                  name="orders"
                  value={calculator.orders}
                  onChange={handleCalculatorChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Per Order (AOA)</label>
                <input
                  type="number"
                  name="amountPerOrder"
                  value={calculator.amountPerOrder}
                  onChange={handleCalculatorChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  min="100"
                />
              </div>
              <div className="md:col-span-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-3">Estimated Earnings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Daily</p>
                      <p className="text-xl font-bold text-teal-600">AOA {daily.toLocaleString()}</p>
                    </div>
                    <div className="bg-lime-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Weekly</p>
                      <p className="text-xl font-bold text-lime-600">AOA {weekly.toLocaleString()}</p>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Monthly</p>
                      <p className="text-xl font-bold text-emerald-600">AOA {monthly.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Potential Earnings</h2>
          <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200">
              {earnings.map((item, index) => (
                <button
                  key={index}
                  className={`flex-1 py-4 px-6 font-medium ${activeTab === item.vehicle.toLowerCase() ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab(item.vehicle.toLowerCase())}
                >
                  {item.vehicle}
                </button>
              ))}
            </div>
            <div className="p-6">
              {earnings.map((item, index) => (
                <div 
                  key={index} 
                  className={`${activeTab === item.vehicle.toLowerCase() ? 'block' : 'hidden'}`}
                >
                  <div className="text-3xl font-bold text-teal-600 mb-2">{item.range}</div>
                  <div className="text-lg text-gray-600 mb-4">Per day (4-8 hours)</div>
                  <div className="flex items-center mb-4">
                    <div className="bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-sm font-medium">
                      {item.perDelivery} per delivery
                    </div>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="text-xl font-bold mb-4 text-center">{req.vehicle}</h3>
                <ul className="space-y-3">
                  {req.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get Started in 4 Easy Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 bg-white p-4 rounded-lg">
                <button 
                  className="flex justify-between items-center w-full text-left font-medium text-lg py-2"
                  onClick={() => setSelectedFAQ(selectedFAQ === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${selectedFAQ === index ? 'transform rotate-180' : ''}`} />
                </button>
                {selectedFAQ === index && (
                  <div className="mt-2 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-500 to-lime-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8">Join thousands of riders across Angola who are already making money with Kudi Express</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Apply Now
            </button>
            <button className="bg-white hover:bg-gray-100 text-teal-600 font-bold py-3 px-6 rounded-lg transition duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}