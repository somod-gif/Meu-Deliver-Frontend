'use client';
import { useState, useEffect } from 'react';
import { 
  HomeIcon, ShoppingBagIcon, MapPinIcon, CreditCardIcon,
  QuestionMarkCircleIcon, ArrowRightOnRectangleIcon,
  Bars3Icon, XMarkIcon, ClockIcon, CheckCircleIcon,
  TruckIcon, DocumentTextIcon, PencilIcon,
  UserCircleIcon, PlusIcon, ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginHeader from '../../../Components/Login-header'

export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showRiderForm, setShowRiderForm] = useState(false);

  const router = useRouter();

  // Navigation items
  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, key: 'dashboard' },
    { name: 'My Orders', icon: ShoppingBagIcon, key: 'orders' },
    { name: 'Addresses', icon: MapPinIcon, key: 'addresses' },
    { name: 'Payments', icon: CreditCardIcon, key: 'payments' },
    { name: 'Support', icon: QuestionMarkCircleIcon, key: 'support' },
    { name: 'Logout', icon: ArrowRightOnRectangleIcon, key: 'logout' },
  ];

  /* 
  * API FETCH: Verify user token
  * Endpoint: /auth/verify-current-user
  * Method: GET
  * Headers: Authorization: Bearer {token}
  */
  // const verifyUserToken = async (token) => {
  //   try {

  //     // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-current-user`, {
  //     //   method: 'GET',
  //     //   headers: {
  //     //     Authorization: `Bearer ${token}`
  //     //   }
  //     // });

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-current-user`, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });


  //     // if (!response.ok) {
  //     //   throw new Error('Token verification failed');
  //     // }

  //     // const data = await response.json();
  //     // return data;
      
  //     // Mock response for development
  //     return {
  //       success: true,
  //       payload: {
  //         role: 'CLIENT',
  //         name: 'John Doe',
  //         email: 'john@example.com'
  //       }
  //     };
  //   } catch (err) {
  //     console.error('Token verification error:', err);
  //     throw err;
  //   }
  // };

  /* 
  * API FETCH: Logout user
  * Endpoint: /auth/logout
  * Method: POST
  * Headers: Authorization: Bearer {token}
  */
  // const logoutUser = async () => {
  //   try {
  //     const token = localStorage.getItem('userToken');
  //     // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
  //     //   method: 'POST',
  //     //   headers: {
  //     //     'Authorization': `Bearer ${token}`
  //     //   }
  //     // });


  //     // if (response.ok) {
  //       toast.success('Logged out successfully');

  //     if (response.ok) {
  //       toast.success('Logout successfuly.');

  //       localStorage.removeItem('user');
  //       localStorage.removeItem('userToken');
  //       router.push('/Auth/Login/');
  //     // } else {
  //     //   throw new Error('Logout failed');
  //     // }
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //     toast.error('Failed to logout. Please try again.');
  //   }
  // };

  /* 
  * API FETCH: Get current order
  * Endpoint: /orders/current
  * Method: GET
  * Headers: Authorization: Bearer {token}
  */
  const fetchCurrentOrder = async () => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/current`, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('userToken')}`
    //   }
    // });
    // const data = await response.json();
    // return data;

    // Mock data for development
    return {
      id: 'MD240607001',
      status: 'on_way',
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      estimated_delivery: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      driver_name: 'Carlos Mendes',
      total_amount: 12500,
      items: [
        { name: 'Pizza Margherita', quantity: 2 },
        { name: 'Coca-Cola 1.5L', quantity: 1 },
        { name: 'French Fries', quantity: 1 }
      ]
    };
  };

  /* 
  * API FETCH: Get order history
  * Endpoint: /orders/history
  * Method: GET
  * Headers: Authorization: Bearer {token}
  */
  const fetchOrderHistory = async () => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/history`, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('userToken')}`
    //   }
    // });
    // const data = await response.json();
    // return data;

    // Mock data for development
    return [
      {
        id: 'MD240606001',
        status: 'delivered',
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        total_amount: 8750,
        items: [
          { name: 'Special Burger', quantity: 1 },
          { name: 'Natural Juice', quantity: 2 }
        ]
      }
    ];
  };

  /* 
  * API FETCH: Get saved addresses
  * Endpoint: /user/addresses
  * Method: GET
  * Headers: Authorization: Bearer {token}
  */
  const fetchSavedAddresses = async () => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/addresses`, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('userToken')}`
    //   }
    // });
    // const data = await response.json();
    // return data;

    // Mock data for development
    return [
      {
        id: 1,
        label: 'Home',
        is_default: true,
        street_address: 'Rua da Liberdade, 123',
        city: 'Luanda',
        state: 'Luanda',
        zip_code: '1000'
      }
    ];
  };

  /* 
  * API FETCH: Cancel order
  * Endpoint: /orders/{orderId}/cancel
  * Method: POST
  * Headers: Authorization: Bearer {token}
  */
  const cancelOrder = async (orderId) => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/cancel`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('userToken')}`
    //   }
    // });
    // return await response.json();

    // Mock response for development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  /* 
  * API FETCH: Submit vendor application
  * Endpoint: /vendor/apply
  * Method: POST
  * Headers: Authorization: Bearer {token}
  */
  const submitVendorApplication = async (formData) => {
    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vendor/apply`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('userToken')}`
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Application submission failed');
      
      // Mock success response
      toast.success('Vendor application submitted successfully!');
      setShowVendorForm(false);
    } catch (error) {
      console.error('Vendor application error:', error);
      toast.error(error.message || 'Failed to submit application');
    }
  };

  /* 
  * API FETCH: Submit rider application
  * Endpoint: /rider/apply
  * Method: POST
  * Headers: Authorization: Bearer {token}
  */
  const submitRiderApplication = async (formData) => {
    try {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rider/apply`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('userToken')}`
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      // if (!response.ok) throw new Error('Application submission failed');
      
      // Mock success response
      toast.success('Rider application submitted successfully!');
      setShowRiderForm(false);
    } catch (error) {
      console.error('Rider application error:', error);
      toast.error(error.message || 'Failed to submit application');
    }
  };

  // Authentication and data loading
  // useEffect(() => {
  //   const initializeDashboard = async () => {
  //     try {
  //       const token = localStorage.getItem('userToken');
  //       const userData = localStorage.getItem('user');

  //       if (!token || !userData) {
  //         router.push('/Auth/Login/');
  //         return;
  //       }

  //       // Verify token and check role
  //       const verification = await verifyUserToken(token);
  //       const userRole = verification.payload?.role;

  //       switch (userRole) {
  //         case 'CLIENT':
  //           router.push('/Portal/Clients/Dashboard');
  //           break;
  //         case 'VENDOR':
  //           router.push('/Portal/Vendor/Dashboard');
  //           break;
  //         case 'DELIVERY':
  //           router.push('/Portal/Ride/Dashboard');
  //         case 'ADMIN':
  //           router.push('/Portal/Admin/Dashboard'); 
  //           break;
  //       }
  //       // Redirect based on role
  //       switch (userRole) {
  //         case 'CLIENT':
  //           // Continue with client dashboard
  //           break;
  //         case 'VENDOR':
  //           router.push('/Portal/Vendor/Dashboard');
  //           return;
  //         case 'DELIVERY':
  //           router.push('/Portal/Ride/Dashboard');
  //           return;
  //         case 'ADMIN':
  //           router.push('/Portal/Admin/Dashboard');
  //           return;
  //         default:
  //           throw new Error('Unauthorized access');
  //       }

  //       // Set user data
  //       setUser(JSON.parse(userData));

  //       // Load dashboard data
  //       const [currentOrder, history, addresses] = await Promise.all([
  //         fetchCurrentOrder(),
  //         fetchOrderHistory(),
  //         fetchSavedAddresses()
  //       ]);

  //       setCurrentOrder(currentOrder);
  //       setOrderHistory(history);
  //       setSavedAddresses(addresses);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Dashboard initialization error:', error);
  //       setError(error.message);
  //       localStorage.removeItem('userToken');
  //       localStorage.removeItem('user');
  //       router.push('/Auth/Login/');
  //     }
  //   };

  //   initializeDashboard();
  // }, [router]);

  // Helper functions
  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      preparing: 'Preparing',
      picked_up: 'Picked Up',
      on_way: 'On the Way',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-yellow-100 text-yellow-800',
      picked_up: 'bg-orange-100 text-orange-800',
      on_way: 'bg-lime-100 text-lime-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'AOA 0.00';
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const canCancelOrder = (orderTime) => {
    if (!orderTime) return false;
    const orderDate = new Date(orderTime);
    const now = new Date();
    const diffMinutes = (now - orderDate) / (1000 * 60);
    return diffMinutes <= 2; // Allow cancellation within 2 minutes
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      setCurrentOrder(null);
      toast.success('Order successfully canceled!');
    } catch (error) {
      console.error('Cancel order error:', error);
      toast.error('Failed to cancel order. Please try again.');
    }
  };

  // Component for order tracking progress visualization
  const TrackingProgress = ({ status }) => {
    const steps = [
      { key: 'confirmed', label: 'Confirmed', icon: CheckCircleIcon },
      { key: 'preparing', label: 'Preparing', icon: ClockIcon },
      { key: 'picked_up', label: 'Picked Up', icon: CheckCircleIcon },
      { key: 'on_way', label: 'On the Way', icon: TruckIcon },
      { key: 'delivered', label: 'Delivered', icon: CheckCircleIcon },
    ];
    
    const currentIndex = steps.findIndex(s => s.key === status);
    
    return (
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-2 ring-lime-400' : ''}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-xs mt-1 text-center ${
                  isActive ? 'text-teal-600 font-medium' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-full mt-2 ${
                    index < currentIndex ? 'bg-teal-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  
  // Render content based on selected section
  const renderMainContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <DashboardView 
            user={user}
            currentOrder={currentOrder}
            orderHistory={orderHistory}
            savedAddresses={savedAddresses}
            setCurrentSection={setCurrentSection}
            getStatusText={getStatusText}
            getStatusColor={getStatusColor}
            formatTime={formatTime}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
            canCancelOrder={canCancelOrder}
            handleCancelOrder={handleCancelOrder}
            TrackingProgress={TrackingProgress}
            showVendorForm={showVendorForm}
            setShowVendorForm={setShowVendorForm}
            showRiderForm={showRiderForm}
            setShowRiderForm={setShowRiderForm}
            submitVendorApplication={submitVendorApplication}
            submitRiderApplication={submitRiderApplication}
          />
        );
      case 'orders':
        return (
          <OrdersView 
            orderHistory={orderHistory}
            getStatusText={getStatusText}
            getStatusColor={getStatusColor}
            formatTime={formatTime}
            formatDate={formatDate}
            formatCurrency={formatCurrency}
          />
        );
      case 'addresses':
        return (
          <AddressesView 
            savedAddresses={savedAddresses}
          />
        );
      case 'payments':
        return <PaymentsView />;
      case 'support':
        return <SupportView />;
      case 'logout':
        return <LogoutView logoutUser={logoutUser} />;
      default:
        return null;
    }
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  //       <div className="text-center">
  //         <div className="w-8 h-8 bg-teal-500 rounded-full mx-auto mb-4 animate-pulse"></div>
  //         <p className="text-gray-600">Loading your dashboard...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
  //       <div className="text-center text-red-600">
  //         <p>Error: {error}</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 flex z-50 overflow-hidden mt-10">
      {/* Integrated LoginHeader */}
      {/* <LoginHeader 
        user={user}
        setSidebarOpen={setSidebarOpen}
        onLogout={logoutUser}
        cartCount={cartCount}
        notificationCount={notificationCount}
        onCartClick={handleCartClick}
        onNotificationClick={handleNotificationClick}
      /> */}


      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col mt-16">
        {/* <Header 
          user={user}
          setSidebarOpen={setSidebarOpen}
        /> */}
        
        <main className="p-4 flex-1">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

// Sub-components for better organization

const DashboardView = ({
  user,
  currentOrder,
  orderHistory,
  savedAddresses,
  setCurrentSection,
  getStatusText,
  getStatusColor,
  formatTime,
  formatDate,
  formatCurrency,
  canCancelOrder,
  handleCancelOrder,
  TrackingProgress,
  showVendorForm,
  setShowVendorForm,
  showRiderForm,
  setShowRiderForm,
  submitVendorApplication,
  submitRiderApplication
}) => {
  const [vendorForm, setVendorForm] = useState({
    businessName: '',
    businessType: '',
    address: '',
    phone: '',
    description: ''
  });

  const [riderForm, setRiderForm] = useState({
    vehicleType: '',
    licenseNumber: '',
    vehicleModel: '',
    phone: ''
  });

  const handleVendorInputChange = (e) => {
    const { name, value } = e.target;
    setVendorForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRiderInputChange = (e) => {
    const { name, value } = e.target;
    setRiderForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVendorSubmit = (e) => {
    e.preventDefault();
    submitVendorApplication(vendorForm);
  };

  const handleRiderSubmit = (e) => {
    e.preventDefault();
    submitRiderApplication(riderForm);
  };

return (
  <>
    {/* Welcome Section */}
    <div className="mb-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
      </h1>
      <p className="text-gray-700 text-lg">Track your orders and manage your account</p>
    </div>
    
    {/* Current Order Section */}
    {currentOrder && (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Current Order</h2>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(currentOrder.status)}`}>
            {getStatusText(currentOrder.status)}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <TrackingProgress status={currentOrder.status} />
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Order ID:</span>
                <span className="font-semibold text-gray-900">{currentOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Order Time:</span>
                <span className="text-gray-900">{formatTime(currentOrder.created_at)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Estimated Delivery:</span>
                <span className="font-semibold text-teal-600">{formatTime(currentOrder.estimated_delivery)}</span>
              </div>
              {currentOrder.driver_name && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Driver:</span>
                  <span className="text-gray-900">{currentOrder.driver_name}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Order Items</h3>
            {currentOrder.items.length > 0 ? (
              <ul className="space-y-3 mb-6">
                {currentOrder.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center bg-white rounded-lg px-4 py-3 shadow-sm">
                    <span className="text-gray-900 font-medium">{item.name}</span>
                    <span className="text-gray-600">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mb-6">No items available</p>
            )}
            
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total:</span>
              <span className="text-xl font-bold text-teal-600">{formatCurrency(currentOrder.total_amount)}</span>
            </div>
            
            {canCancelOrder(currentOrder.created_at) && (
              <button
                onClick={() => handleCancelOrder(currentOrder.id)}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    )}
    
    {/* Order History & Saved Addresses */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Order History */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
        {orderHistory.length > 0 ? (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">#{order.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {order.items.length > 0
                    ? `${order.items.length} item${order.items.length > 1 ? 's' : ''}`
                    : 'No items'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {formatDate(order.created_at)} at {formatTime(order.created_at)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{formatCurrency(order.total_amount)}</span>
                    <button 
                      className="p-1 text-gray-400 hover:text-teal-600 transition-colors" 
                      aria-label="View order details"
                      onClick={() => setCurrentSection('orders')}
                    >
                      <DocumentTextIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBagIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">No orders yet</p>
            <p className="text-sm text-gray-400">Your order history will appear here</p>
          </div>
        )}
      </div>
      
      {/* Saved Addresses */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Saved Addresses</h2>
        {savedAddresses.length > 0 ? (
          <div className="space-y-4">
            {savedAddresses.map((addr) => (
              <div key={addr.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-gray-900">{addr.label}</span>
                    {addr.is_default && (
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <button 
                    className="text-gray-400 hover:text-teal-600 transition-colors" 
                    aria-label="Edit address"
                    onClick={() => setCurrentSection('addresses')}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {addr.street_address}
                  {addr.city && `, ${addr.city}`}
                  {addr.state && `, ${addr.state}`}
                  {addr.zip_code && ` ${addr.zip_code}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPinIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium">No saved addresses</p>
            <p className="text-sm text-gray-400">Add an address to get started</p>
          </div>
        )}
      </div>
    </div>
    
    {/* Become a Vendor/Rider Sections */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">Become a Vendor</h2>
            <p className="text-teal-100 text-lg">
              Join our platform and start selling your products to thousands of customers.
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <ShoppingBagIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <button
          onClick={() => setShowVendorForm(true)}
          className="w-full bg-white text-teal-600 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Apply Now
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">Become a Rider</h2>
            <p className="text-blue-100 text-lg">
              Earn money by delivering orders to customers in your area.
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <TruckIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <button
          onClick={() => setShowRiderForm(true)}
          className="w-full bg-white text-blue-600 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Apply Now
        </button>
      </div>
    </div>

    {/* Vendor Application Form Modal */}
    {showVendorForm && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Vendor Application</h3>
              <button
                onClick={() => setShowVendorForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleVendorSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={vendorForm.businessName}
                    onChange={handleVendorInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your business name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={vendorForm.businessType}
                    onChange={handleVendorInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select business type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="grocery">Grocery</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={vendorForm.address}
                    onChange={handleVendorInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your business address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={vendorForm.phone}
                    onChange={handleVendorInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    name="description"
                    value={vendorForm.description}
                    onChange={handleVendorInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Tell us about your business"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowVendorForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}

    {/* Rider Application Form Modal */}
    {showRiderForm && (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Rider Application</h3>
              <button
                onClick={() => setShowRiderForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleRiderSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={riderForm.vehicleType}
                    onChange={handleRiderInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select vehicle type</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="car">Car</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    License Number *
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={riderForm.licenseNumber}
                    onChange={handleRiderInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your license number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vehicle Model
                  </label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={riderForm.vehicleModel}
                    onChange={handleRiderInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your vehicle model"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={riderForm.phone}
                    onChange={handleRiderInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowRiderForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}

    {/* Quick Actions */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <button
        onClick={() => setCurrentSection('orders')}
        className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white p-6 rounded-xl flex flex-col items-center transition-all transform hover:scale-105 shadow-lg"
      >
        <ShoppingBagIcon className="w-10 h-10 mb-3" />
        <span className="font-semibold text-lg">My Orders</span>
      </button>
      <button
        onClick={() => setCurrentSection('support')}
        className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 p-6 rounded-xl flex flex-col items-center transition-all transform hover:scale-105 shadow-lg"
      >
        <QuestionMarkCircleIcon className="w-10 h-10 mb-3 text-gray-600" />
        <span className="font-semibold text-lg">Support</span>
      </button>
      <button
        onClick={() => setCurrentSection('payments')}
        className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 p-6 rounded-xl flex flex-col items-center transition-all transform hover:scale-105 shadow-lg"
      >
        <CreditCardIcon className="w-10 h-10 mb-3 text-gray-600" />
        <span className="font-semibold text-lg">Payments</span>
      </button>
    </div>
  </>
);
};

const OrdersView = ({
  orderHistory,
  getStatusText,
  getStatusColor,
  formatTime,
  formatDate,
  formatCurrency
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold mb-4">Order History</h2>
    {orderHistory.length > 0 ? (
      orderHistory.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 mb-2"
        >
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-900">{order.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {order.items.length > 0
                ? `${order.items.length} item${order.items.length > 1 ? 's' : ''}`
                : 'No items'}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                {formatDate(order.created_at)} at {formatTime(order.created_at)}
              </span>
              <span>{formatCurrency(order.total_amount)}</span>
            </div>
          </div>
          <button className="ml-4 p-2 text-gray-400 hover:text-gray-600" aria-label="View order details">
            <DocumentTextIcon className="w-4 h-4" />
          </button>
        </div>
      ))
    ) : (
      <div className="text-center py-8 text-gray-500">
        <ShoppingBagIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No orders yet</p>
        <p className="text-sm">Your order history will appear here</p>
      </div>
    )}
  </div>
);

const AddressesView = ({ savedAddresses }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>
    {savedAddresses.length > 0 ? (
      savedAddresses.map((addr) => (
        <div key={addr.id} className="p-4 border border-gray-100 rounded-lg mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{addr.label}</span>
              {addr.is_default && (
                <span className="px-2 py-1 bg-lime-100 text-lime-800 text-xs rounded-full">
                  Default
                </span>
              )}
            </div>
            <button className="text-gray-400 hover:text-gray-600" aria-label="Edit address">
              <PencilIcon className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            {addr.street_address}
            {addr.city && `, ${addr.city}`}
            {addr.state && `, ${addr.state}`}
            {addr.zip_code && ` ${addr.zip_code}`}
          </p>
        </div>
      ))
    ) : (
      <div className="text-center py-8 text-gray-500">
        <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No saved addresses</p>
        <p className="text-sm">Add an address to get started</p>
      </div>
    )}
  </div>
);

const PaymentsView = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold mb-4">Payments</h2>
    <p className="text-gray-700">Payment methods will be managed here.</p>
  </div>
);

const SupportView = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold mb-4">Support</h2>
    <p className="text-gray-700">Help and contact options will be here.</p>
  </div>
);

const LogoutView = ({ logoutUser }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h2 className="text-lg font-semibold mb-4">Logout</h2>
    <button
      onClick={logoutUser}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Confirm Logout
    </button>
  </div>
);

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  navigation,
  currentSection,
  setCurrentSection
}) => (
  <aside
    className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-all duration-300 ease-in-out z-50 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:static lg:translate-x-0`}
  >
    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-white">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
          M
        </div>
        <div>
          <span className="font-bold text-gray-900 text-xl">My Deliver</span>
          <div className="text-xs text-gray-500">Dashboard</div>
        </div>
      </div>
      <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Close menu"
      >
        <XMarkIcon className="w-5 h-5 text-gray-600" />
      </button>
    </div>
    <nav className="mt-8 px-4">
      <ul className="space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => {
                setCurrentSection(item.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                currentSection === item.key
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md transform scale-[1.02]'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600 hover:translate-x-1'
              }`}
            >
              <item.icon 
                className={`w-5 h-5 mr-3 transition-transform duration-200 ${
                  currentSection === item.key ? 'text-white' : 'group-hover:scale-110'
                }`} 
              />
              <span className="flex-1 text-left">{item.name}</span>
              {currentSection === item.key && (
                <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
      <div className="text-center">
        <div className="text-xs font-medium text-gray-600 mb-1">
          Fast, Efficient & Secure
        </div>
        <div className="text-xs text-gray-500">
          Everywhere.
        </div>
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
          <div className="w-1 h-1 bg-teal-300 rounded-full"></div>
          <div className="w-1 h-1 bg-teal-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </aside>
);
//   <header className="sticky top-0 z-0 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
//     <div className="flex items-center justify-between h-16 px-4 sm:px-6">
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           aria-label="Open menu"
//         >
//           <Bars3Icon className="w-6 h-6 text-gray-600" />
//         </button>
//         <div className="hidden lg:block">
//           <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
//           <p className="text-xs text-gray-500">Welcome back to your delivery hub</p>
//         </div>
//       </div>
      
//       <div className="flex items-center space-x-4">
//         {/* Notification Bell */}
//         <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//           <div className="w-5 h-5 text-gray-600">
//             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//             </svg>
//           </div>
//           <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
//         </button>

//         {/* User Profile */}
//         <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
//           {user ? (
//             <div className="flex items-center space-x-3 group cursor-pointer">
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow duration-200">
//                 {user.name.charAt(0)}
//               </div>
//               <div className="hidden sm:block">
//                 <p className="text-sm font-medium text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
//                   {user.name}
//                 </p>
//                 <p className="text-xs text-gray-500">{user.email}</p>
//               </div>
//               <div className="hidden sm:block w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
//                 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-3">
//               <div className="w-9 h-9 rounded-xl bg-gray-300 animate-pulse" />
//               <div className="hidden sm:block space-y-1">
//                 <div className="w-20 h-3 bg-gray-300 rounded animate-pulse"></div>
//                 <div className="w-24 h-2 bg-gray-200 rounded animate-pulse"></div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </header>
// )
