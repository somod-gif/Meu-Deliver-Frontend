'use client';
import { useState, useEffect } from 'react';
import { 
  HomeIcon, ShoppingBagIcon, MapPinIcon, CreditCardIcon,
  QuestionMarkCircleIcon, ArrowRightOnRectangleIcon,
  Bars3Icon, XMarkIcon, ClockIcon, CheckCircleIcon,
  TruckIcon, DocumentTextIcon, PencilIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Client Dashboard Component
 * 
 * Features:
 * - Authentication verification
 * - Role-based redirection
 * - Order tracking
 * - Address management
 * - Responsive design with mobile sidebar
 */
export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState('dashboard');

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

  /**
   * API: Verify User Authentication
   * Endpoint: /auth/verify-current-user
   * Method: POST
   * Headers: Authorization: Bearer <token>
   * Body: { token }
   * 
   * Validates the user's JWT token and redirects if invalid
   */
  const verifyUserToken = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-current-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Token verification error:', err);
      throw err;
    }
  };

  /**
   * API: Logout User
   * Endpoint: /auth/logout
   * Method: POST
   * Headers: Authorization: Bearer <token>
   * 
   * Clears user session on the server and client
   */
  const logoutUser = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        router.push('/Auth/Login/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  /**
   * API: Get Current Order (Mock)
   * Endpoint: /orders/current (mock implementation)
   * Method: GET
   * Headers: Authorization: Bearer <token>
   * 
   * Returns the user's current active order
   */
  const fetchCurrentOrder = async () => {
    // In a real implementation, this would be an API call
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

  /**
   * API: Get Order History (Mock)
   * Endpoint: /orders/history (mock implementation)
   * Method: GET
   * Headers: Authorization: Bearer <token>
   * 
   * Returns the user's order history
   */
  const fetchOrderHistory = async () => {
    // In a real implementation, this would be an API call
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

  /**
   * API: Get Saved Addresses (Mock)
   * Endpoint: /user/addresses (mock implementation)
   * Method: GET
   * Headers: Authorization: Bearer <token>
   * 
   * Returns the user's saved addresses
   */
  const fetchSavedAddresses = async () => {
    // In a real implementation, this would be an API call
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

  /**
   * API: Cancel Order (Mock)
   * Endpoint: /orders/{orderId}/cancel (mock implementation)
   * Method: POST
   * Headers: Authorization: Bearer <token>
   * 
   * Cancels the specified order if within the allowed time window
   */
  const cancelOrder = async (orderId) => {
    // In a real implementation, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };

  // Authentication and data loading
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
          router.push('/Auth/Login/');
          return;
        }

        // Verify token and check role
        const verification = await verifyUserToken(token);
        const userRole = verification.payload?.role;

        // Redirect based on role
        if (userRole === 'VENDOR') {
          router.push('/Portal/Vendor/Dashboard');
          return;
        }
        if (userRole === 'ADMIN') {
          router.push('/Portal/Admin/Dashboard');
          return;
        }

        // Set user data
        setUser(JSON.parse(userData));

        // Load dashboard data
        const [currentOrder, history, addresses] = await Promise.all([
          fetchCurrentOrder(),
          fetchOrderHistory(),
          fetchSavedAddresses()
        ]);

        setCurrentOrder(currentOrder);
        setOrderHistory(history);
        setSavedAddresses(addresses);
        setLoading(false);
      } catch (error) {
        console.error('Dashboard initialization error:', error);
        setError(error.message);
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        router.push('/Auth/Login/');
      }
    };

    initializeDashboard();
  }, [router]);

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

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-8 h-8 bg-teal-500 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex z-50 overflow-hidden mt-16">
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
        <Header 
          user={user}
          setSidebarOpen={setSidebarOpen}
        />
        
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
  TrackingProgress
}) => (
  <>
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
      </h1>
      <p className="text-gray-600">Track your orders and manage your account</p>
    </div>
    
    {currentOrder && (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Order</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentOrder.status)}`}>
            {getStatusText(currentOrder.status)}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <TrackingProgress status={currentOrder.status} />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{currentOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Time:</span>
                <span>{formatTime(currentOrder.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium text-lime-600">{formatTime(currentOrder.estimated_delivery)}</span>
              </div>
              {currentOrder.driver_name && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Driver:</span>
                  <span>{currentOrder.driver_name}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Order Items</h3>
            {currentOrder.items.length > 0 ? (
              <ul className="text-gray-600 space-y-1">
                {currentOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.name} x{item.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No items available</p>
            )}
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total:</span>
              <span className="text-lg font-semibold">{formatCurrency(currentOrder.total_amount)}</span>
            </div>
            
            {canCancelOrder(currentOrder.created_at) && (
              <button
                onClick={() => handleCancelOrder(currentOrder.id)}
                className="mt-4 w-full bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    )}
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Order History</h2>
        {orderHistory.length > 0 ? (
          orderHistory.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition mb-2"
            >
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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
              <button 
                className="ml-4 p-2 text-gray-400 hover:text-gray-600" 
                aria-label="View order details"
                onClick={() => setCurrentSection('orders')}
              >
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
                <button 
                  className="text-gray-400 hover:text-gray-600" 
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
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No saved addresses</p>
            <p className="text-sm">Add an address to get started</p>
          </div>
        )}
      </div>
    </div>
    
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        onClick={() => setCurrentSection('orders')}
        className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-lg flex flex-col items-center transition"
      >
        <ShoppingBagIcon className="w-8 h-8 mb-2" />
        <span className="font-medium">My Orders</span>
      </button>
      <button
        onClick={() => setCurrentSection('support')}
        className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-lg flex flex-col items-center transition"
      >
        <QuestionMarkCircleIcon className="w-8 h-8 mb-2" />
        <span className="font-medium">Support</span>
      </button>
      <button
        onClick={() => setCurrentSection('payments')}
        className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-lg flex flex-col items-center transition"
      >
        <CreditCardIcon className="w-8 h-8 mb-2" />
        <span className="font-medium">Payments</span>
      </button>
    </div>
  </>
);

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
    className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:static lg:translate-x-0`}
  >
    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
          M
        </div>
        <span className="font-bold text-gray-900 text-xl">My Deliver</span>
      </div>
      <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden p-1 rounded-md hover:text-gray-600"
        aria-label="Close menu"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
    </div>
    <nav className="mt-16 px-4">
      <ul className="space-y-2">
        {navigation.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => {
                setCurrentSection(item.key);
                setSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                currentSection === item.key
                  ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 text-center text-xs text-gray-500">
      Fast, Efficient & Secure Everywhere.
    </div>
  </aside>
);

const Header = ({ user, setSidebarOpen }) => (
  <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
    <div className="flex items-center justify-between h-16 px-4 sm:px-6">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-md hover:text-gray-600"
        aria-label="Open menu"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>
      <div className="flex items-center space-x-3">
        {user ? (
          <>
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        )}
      </div>
    </div>
  </header>
);