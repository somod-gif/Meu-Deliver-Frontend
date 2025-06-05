'use client';

import { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  MapPinIcon, 
  CreditCardIcon, 
  QuestionMarkCircleIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  DocumentTextIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // API calls - replace with your actual endpoints
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Replace these with your actual API endpoints
        const [userResponse, currentOrderResponse, historyResponse, addressesResponse] = await Promise.all([
          fetch('/api/user/profile'),
          fetch('/api/orders/current'),
          fetch('/api/orders/history?limit=5'),
          fetch('/api/addresses')
        ]);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }

        if (currentOrderResponse.ok) {
          const orderData = await currentOrderResponse.json();
          setCurrentOrder(orderData);
        }

        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setOrderHistory(historyData.orders || []);
        }

        if (addressesResponse.ok) {
          const addressData = await addressesResponse.json();
          setSavedAddresses(addressData.addresses || []);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const navigation = [
    { name: 'Dashboard', icon: HomeIcon, current: true, href: '/clients/dashboard' },
    { name: 'My Orders', icon: ShoppingBagIcon, current: false, href: '/clients/orders' },
    { name: 'Addresses', icon: MapPinIcon, current: false, href: '/clients/addresses' },
    { name: 'Payments', icon: CreditCardIcon, current: false, href: '/clients/payments' },
    { name: 'Support', icon: QuestionMarkCircleIcon, current: false, href: '/clients/support' },
    { name: 'Logout', icon: ArrowRightOnRectangleIcon, current: false, href: '/auth/logout' },
  ];

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      preparing: 'Preparing',
      picked_up: 'Picked Up',
      on_way: 'On The Way',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: 'bg-gray-100 text-gray-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-yellow-100 text-yellow-800',
      picked_up: 'bg-orange-100 text-orange-800',
      on_way: 'bg-lime-100 text-lime-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const canCancelOrder = (orderTime) => {
    if (!orderTime) return false;
    const orderDate = new Date(orderTime);
    const now = new Date();
    const diffInMinutes = (now - orderDate) / (1000 * 60);
    return diffInMinutes <= 2;
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refresh current order data
        const updatedOrder = await fetch('/api/orders/current');
        if (updatedOrder.ok) {
          const orderData = await updatedOrder.json();
          setCurrentOrder(orderData);
        }
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const TrackingProgress = ({ status }) => {
    const steps = [
      { key: 'confirmed', label: 'Confirmed', icon: CheckCircleIcon },
      { key: 'preparing', label: 'Preparing', icon: ClockIcon },
      { key: 'picked_up', label: 'Picked Up', icon: CheckCircleIcon },
      { key: 'on_way', label: 'On The Way', icon: TruckIcon },
      { key: 'delivered', label: 'Delivered', icon: CheckCircleIcon }
    ];

    const currentStepIndex = steps.findIndex(step => step.key === status);

    return (
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          
          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-400'
              } ${isCurrent ? 'ring-2 ring-lime-400' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-xs mt-1 text-center ${
                isActive ? 'text-teal-600 font-medium' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-full mt-2 ${
                  index < currentStepIndex ? 'bg-teal-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-teal-500 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Meu Deliver</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      item.current
                        ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Fast, Efficient, and Secure Everywhere.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {user ? (
                  <>
                    <img
                      className="w-8 h-8 rounded-full bg-gray-300"
                      src={user.avatar || '/api/placeholder/40/40'}
                      alt={user.name || 'User'}
                    />
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6">
          {/* Welcome section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-gray-600">Track your orders and manage your account</p>
          </div>

          {/* Current Order */}
          {currentOrder && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Current Order</h2>
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
                      <span className="text-lime-600 font-medium">
                        {formatTime(currentOrder.estimated_delivery)}
                      </span>
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
                  <h3 className="font-medium text-gray-900 mb-2">Order Items</h3>
                  <div className="mb-4">
                    {currentOrder.items?.length > 0 ? (
                      <ul className="text-gray-600 space-y-1">
                        {currentOrder.items.map((item, index) => (
                          <li key={index}>{item.name} x{item.quantity}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No items available</p>
                    )}
                  </div>
                  <p className="text-lg font-bold text-gray-900 mb-4">
                    Total: ${currentOrder.total_amount?.toFixed(2) || '0.00'}
                  </p>
                  
                  {canCancelOrder(currentOrder.created_at) && (
                    <button 
                      onClick={() => handleCancelOrder(currentOrder.id)}
                      className="w-full bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
                <a href="/clients/orders" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {orderHistory.length > 0 ? (
                  orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {order.items?.length > 0 
                            ? `${order.items.length} item${order.items.length > 1 ? 's' : ''}`
                            : 'No items'
                          }
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {formatDate(order.created_at)} at {formatTime(order.created_at)}
                          </span>
                          <span className="font-medium text-gray-900">
                            ${order.total_amount?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                      </div>
                      <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
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
            </div>

            {/* Saved Addresses */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  + Add New
                </button>
              </div>

              <div className="space-y-4">
                {savedAddresses.length > 0 ? (
                  savedAddresses.map((address) => (
                    <div key={address.id} className="p-4 border border-gray-100 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{address.label}</span>
                          {address.is_default && (
                            <span className="ml-2 px-2 py-1 bg-lime-100 text-lime-800 text-xs rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        {address.street_address}
                        {address.city && `, ${address.city}`}
                        {address.state && `, ${address.state}`}
                        {address.zip_code && ` ${address.zip_code}`}
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
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="/clients/new-order"
              className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-lg transition-colors block"
            >
              <div className="text-center">
                <ShoppingBagIcon className="w-8 h-8 mx-auto mb-2" />
                <span className="font-medium">New Order</span>
              </div>
            </a>

            <a 
              href="/clients/support"
              className="bg-white hover:bg-gray-50 text-gray-700 p-4 rounded-lg border border-gray-200 transition-colors block"
            >
              <div className="text-center">
                <QuestionMarkCircleIcon className="w-8 h-8 mx-auto mb-2" />
                <span className="font-medium">Need Help?</span>
              </div>
            </a>

            <a 
              href="/clients/payments"
              className="bg-white hover:bg-gray-50 text-gray-700 p-4 rounded-lg border border-gray-200 transition-colors block"
            >
              <div className="text-center">
                <CreditCardIcon className="w-8 h-8 mx-auto mb-2" />
                <span className="font-medium">Payments</span>
              </div>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}