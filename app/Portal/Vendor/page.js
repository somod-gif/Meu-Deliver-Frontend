'use client';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon, PlayIcon, StarIcon, TruckIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function VendorPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('standard');
  
  // Calculator state
  const [averageOrderValue, setAverageOrderValue] = useState(10000);
  const [dailyOrders, setDailyOrders] = useState(5);
  const [commissionRate, setCommissionRate] = useState(0.03);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);

  // Calculate monthly earnings
  useEffect(() => {
    const calculateEarnings = () => {
      const monthlyOrders = dailyOrders * 30;
      const grossRevenue = monthlyOrders * averageOrderValue;
      const platformFees = grossRevenue * commissionRate;
      const netEarnings = grossRevenue - platformFees;
      setMonthlyEarnings(netEarnings);
    };
    calculateEarnings();
  }, [averageOrderValue, dailyOrders, commissionRate]);

  // Animated revenue counter
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRevenue(prev => {
        const target = 500000;
        if (prev < target) {
          return Math.min(prev + 8500, target);
        }
        return target;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: "📈",
      title: "Increase Your Revenue",
      description: "Reach more customers and boost your sales by up to 40% with our delivery network.",
      highlight: "Up to 40% sales increase"
    },
    {
      icon: "🚚",
      title: "Nationwide Delivery",
      description: "Deliver to customers across Angola with our extensive network of reliable riders.",
      highlight: "All provinces covered"
    },
    {
      icon: "📱",
      title: "Easy Management",
      description: "Manage orders, track deliveries, and monitor performance through our vendor dashboard.",
      highlight: "Real-time tracking"
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Get paid securely and on time with multiple payment options and instant settlements.",
      highlight: "Daily settlements"
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description: "Access detailed analytics to understand your customers and optimize your business.",
      highlight: "Data-driven growth"
    },
    {
      icon: "🎯",
      title: "Marketing Support",
      description: "Promote your business with featured listings, discounts, and targeted campaigns.",
      highlight: "Free marketing tools"
    }
  ];

  const features = [
    {
      icon: "🏪",
      title: "Online Store Setup",
      description: "Create your digital storefront with product catalog, images, and descriptions."
    },
    {
      icon: "📋",
      title: "Order Management",
      description: "Receive, process, and track orders seamlessly through our platform."
    },
    {
      icon: "🚛",
      title: "Delivery Network",
      description: "Access our network of trained riders for fast and secure deliveries."
    },
    {
      icon: "💰",
      title: "Payment Processing",
      description: "Accept various payment methods including cards, bank transfers, and cash."
    },
    {
      icon: "📈",
      title: "Sales Analytics",
      description: "Monitor your performance with detailed reports and business insights."
    },
    {
      icon: "🎁",
      title: "Promotion Tools",
      description: "Create discounts, offers, and marketing campaigns to attract customers."
    }
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for small businesses just getting started',
      features: [
        'Up to 50 orders per month',
        'Basic analytics',
        'Standard delivery',
        'Email support',
        '5% commission per order'
      ],
      highlight: false,
      commission: 0.05
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '5,000 AOA/month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 500 orders per month',
        'Advanced analytics',
        'Priority delivery',
        'Phone & email support',
        '3% commission per order',
        'Marketing tools',
        'Custom branding'
      ],
      highlight: true,
      commission: 0.03
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '15,000 AOA/month',
      description: 'For established businesses',
      features: [
        'Unlimited orders',
        'Full analytics suite',
        'Express delivery',
        '24/7 dedicated support',
        '2% commission per order',
        'Advanced marketing tools',
        'API access',
        'White-label solutions'
      ],
      highlight: false,
      commission: 0.02
    }
  ];

  const testimonials = [
    {
      name: "Padaria Luanda",
      business: "Luanda, Angola",
      image: "👩‍🍳",
      rating: 5,
      text: "Meu Deliver has transformed our business! We've increased sales by 60% and reached customers we never could before."
    },
    {
      name: "Mercado Fresco",
      business: "Huambo, Angola",
      image: "🛒",
      rating: 5,
      text: "The platform is so easy to use and the delivery network is incredibly reliable. Our customers love the fast service."
    },
    {
      name: "Restaurante Sabores",
      business: "Lubango, Angola",
      image: "🍲",
      rating: 5,
      text: "Best decision we made for our restaurant. The analytics help us understand our customers better."
    }
  ];

  const faqs = [
    {
      question: "How do I get started as a vendor on Meu Deliver?",
      answer: "Getting started is easy! Simply fill out our vendor application form, upload your business documents, and once approved, you can start listing your products and accepting orders within 24-48 hours."
    },
    {
      question: "What are the commission rates?",
      answer: "Commission rates vary by plan: Starter (5%), Standard (3%), and Premium (2%). All plans include secure payment processing and delivery services."
    },
    {
      question: "How do I receive payments?",
      answer: "Payments are settled daily directly to your bank account. You can track all transactions through your vendor dashboard and receive detailed payment reports."
    },
    {
      question: "What types of businesses can join?",
      answer: "We welcome restaurants, grocery stores, pharmacies, retail shops, and any business that sells products suitable for delivery. All businesses must meet our quality and safety standards."
    },
    {
      question: "Do you provide delivery services?",
      answer: "Yes! We have a network of trained riders across Angola who handle all deliveries. You don't need to worry about logistics - we handle it all."
    },
    {
      question: "What support do you provide?",
      answer: "We offer comprehensive support including onboarding assistance, training materials, marketing guidance, and ongoing technical support based on your plan."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Apply & Get Approved",
      description: "Submit your business information and documents for quick verification."
    },
    {
      number: "02",
      title: "Set Up Your Store",
      description: "Add your products, prices, and customize your storefront."
    },
    {
      number: "03",
      title: "Start Receiving Orders",
      description: "Go live and begin accepting orders from customers."
    },
    {
      number: "04",
      title: "Grow Your Business",
      description: "Use our tools and insights to expand your customer base."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-lime-500 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Grow Your Business with Meu Deliver</h1>
            <p className="text-xl md:text-2xl mb-8">Join Angola's fastest growing delivery platform and reach thousands of new customers</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Sign Up Now - It's Free
              </button>
              <button className="bg-white hover:bg-gray-100 text-teal-600 font-bold py-3 px-6 rounded-lg transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-gray-50">
            <div className="text-4xl font-bold text-teal-600">5,000+</div>
            <div className="text-lg text-gray-600">Vendors Nationwide</div>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <div className="text-4xl font-bold text-teal-600">{currentRevenue.toLocaleString()} AOA+</div>
            <div className="text-lg text-gray-600">Generated for Vendors</div>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <div className="text-4xl font-bold text-teal-600">98%</div>
            <div className="text-lg text-gray-600">Positive Ratings</div>
          </div>
        </div>
      </div>

      {/* Earnings Calculator Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-3xl font-bold text-center mb-8">Calculate Your Potential Earnings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Order Value (AOA)</label>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={averageOrderValue}
                  onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span>1,000 AOA</span>
                  <span className="font-bold">{averageOrderValue.toLocaleString()} AOA</span>
                  <span>50,000 AOA</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Orders</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={dailyOrders}
                  onChange={(e) => setDailyOrders(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span>1</span>
                  <span className="font-bold">{dailyOrders}</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate</label>
                <div className="flex space-x-4">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => {
                        setCommissionRate(plan.commission);
                        setSelectedPlan(plan.id);
                      }}
                      className={`px-4 py-2 rounded-lg ${selectedPlan === plan.id ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {plan.name} ({plan.commission * 100}%)
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg flex flex-col justify-center">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Estimated Monthly Earnings</div>
                <div className="text-4xl font-bold text-teal-600 mb-4">
                  {monthlyEarnings.toLocaleString()} AOA
                </div>
                <div className="text-gray-600 mb-2">
                  <span className="font-medium">Gross Revenue:</span> {(dailyOrders * 30 * averageOrderValue).toLocaleString()} AOA
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">Platform Fees:</span> {(dailyOrders * 30 * averageOrderValue * commissionRate).toLocaleString()} AOA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 mb-3">{benefit.description}</p>
                <div className="text-sm font-medium text-lime-600">{benefit.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Vendor Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-xl hover:border-teal-300 transition duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Getting Started is Easy</h2>
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

      {/* Pricing Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`border rounded-xl p-6 ${plan.highlight ? 'border-teal-500 ring-2 ring-teal-200' : 'border-gray-200'}`}
              >
                {plan.highlight && (
                  <div className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2">{plan.price}</div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-teal-500 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-bold ${plan.highlight ? 'bg-teal-500 hover:bg-teal-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Vendors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.business}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
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
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8">Join thousands of vendors already benefiting from Meu Deliver's platform</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Sign Up Now - It's Free
            </button>
            <button className="bg-white hover:bg-gray-100 text-teal-600 font-bold py-3 px-6 rounded-lg transition duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}