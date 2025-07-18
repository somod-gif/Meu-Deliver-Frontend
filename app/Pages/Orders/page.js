// app/orders/page.js
'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../../Context/CartContext';
import { 
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  ChevronRight,
  MapPin,
  CreditCard,
  Package,
  ArrowLeft,
  RefreshCw,
  HelpCircle,
  ShoppingCart,
    X,
} from 'lucide-react';
import { toast } from 'react-toastify';

const ANGOLA_RATE = 850;

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    processing: { 
      color: 'bg-yellow-100 text-yellow-800', 
      icon: <Clock className="w-4 h-4" />, 
      text: 'Processing' 
    },
    shipped: { 
      color: 'bg-blue-100 text-blue-800', 
      icon: <Truck className="w-4 h-4" />, 
      text: 'Shipped' 
    },
    delivered: { 
      color: 'bg-green-100 text-green-800', 
      icon: <CheckCircle className="w-4 h-4" />, 
      text: 'Delivered' 
    },
    cancelled: {
      color: 'bg-red-100 text-red-800',
      icon: <X className="w-4 h-4" />,
      text: 'Cancelled'
    }
  };

  const config = statusConfig[status] || statusConfig.processing;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {config.text}
    </span>
  );
};

const OrderCard = ({ order, onClick }) => {
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900">Order #{order.id.split('-')[1]}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
              +{order.items.length - 3}
            </div>
          )}
        </div>
        <span className="text-sm text-gray-600">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-600">Total</span>
        <span className="font-bold text-gray-900">
          AOA {Math.round(order.total + (order.deliveryFee || 0)).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const OrderDetails = ({ order, onBack, onTrackOrder }) => {
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-medium text-teal-600 mb-6 hover:text-teal-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to orders
      </button>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order #{order.id.split('-')[1]}</h2>
          <p className="text-gray-500">Placed on {formattedDate}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      
      {/* Order Progress */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Order Status</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
          
          <div className="space-y-6">
            <div className="relative flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Order confirmed</h4>
                <p className="text-sm text-gray-500">Your order has been received</p>
              </div>
            </div>
            
            <div className="relative flex gap-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Processing</h4>
                <p className="text-sm text-gray-500">
                  {order.status === 'processing' 
                    ? 'We\'re preparing your order' 
                    : `Processed on ${new Date(order.date).toLocaleDateString()}`
                  }
                </p>
              </div>
            </div>
            
            <div className="relative flex gap-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                order.status === 'shipped' || order.status === 'delivered' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Shipped</h4>
                <p className="text-sm text-gray-500">
                  {order.status === 'shipped' || order.status === 'delivered' 
                    ? `Shipped on ${new Date(order.date).toLocaleDateString()}`
                    : 'Not yet shipped'}
                </p>
                {order.trackingNumber && (
                  <button 
                    onClick={onTrackOrder}
                    className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Track Package
                  </button>
                )}
              </div>
            </div>
            
            <div className="relative flex gap-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                order.status === 'delivered' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Delivered</h4>
                <p className="text-sm text-gray-500">
                  {order.status === 'delivered' 
                    ? `Delivered on ${new Date(order.date).toLocaleDateString()}`
                    : 'Not yet delivered'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Items */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold text-teal-600">
                AOA {Math.round(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">AOA {Math.round(order.total).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">AOA {Math.round(order.deliveryFee || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-teal-600">
              AOA {Math.round(order.total + (order.deliveryFee || 0)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Delivery Info */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Delivery Information</h3>
        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Delivery Address</h4>
              <p className="text-gray-600">{order.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Payment Method</h4>
              <p className="text-gray-600">
                {order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
              </p>
            </div>
          </div>
          {order.customerName && (
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900">Customer</h4>
                <p className="text-gray-600">{order.customerName}</p>
                {order.customerPhone && (
                  <p className="text-gray-600">{order.customerPhone}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {order.status === 'shipped' && order.trackingNumber && (
          <button
            onClick={onTrackOrder}
            className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-md transition-all"
          >
            Track Order
          </button>
        )}
        <button className="flex-1 py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Need Help?
        </button>
      </div>
    </div>
  );
};

const TrackOrder = ({ order, onBack }) => {
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.info('Tracking information updated');
    }, 1000);
  };
  
  const trackingEvents = [
    {
      id: 1,
      status: 'Order Processed',
      location: 'Luanda Warehouse',
      date: new Date(order.date).getTime() + (24 * 60 * 60 * 1000),
      completed: true
    },
    {
      id: 2,
      status: 'Shipped',
      location: 'Luanda Distribution Center',
      date: new Date(order.date).getTime() + (2 * 24 * 60 * 60 * 1000),
      completed: order.status === 'shipped' || order.status === 'delivered'
    },
    {
      id: 3,
      status: 'In Transit',
      location: 'On the way to your location',
      date: new Date(order.date).getTime() + (3 * 24 * 60 * 60 * 1000),
      completed: order.status === 'delivered'
    },
    {
      id: 4,
      status: 'Out for Delivery',
      location: 'Your neighborhood',
      date: order.status === 'delivered' ? new Date(order.date).getTime() + (3 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) : null,
      completed: order.status === 'delivered'
    },
    {
      id: 5,
      status: 'Delivered',
      location: order.address,
      date: order.status === 'delivered' ? new Date(order.date).getTime() + (3 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000) : null,
      completed: order.status === 'delivered'
    }
  ];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-sm font-medium text-teal-600 mb-6 hover:text-teal-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to order details
      </button>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Track Your Order</h2>
          <p className="text-gray-500">Tracking number: {order.trackingNumber}</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-teal-100 rounded-lg text-teal-600">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Estimated Delivery</h3>
            <p className="text-gray-600">
              {new Date(new Date(order.date).getTime() + (3 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200">
            <div 
              className={`h-${order.status === 'delivered' ? 'full' : '2/3'} w-0.5 bg-teal-500`}
              style={{ height: order.status === 'delivered' ? '100%' : '66%' }}
            ></div>
          </div>
          
          <div className="space-y-6">
            {trackingEvents.map((event) => (
              <div key={event.id} className="relative flex gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${event.completed ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {event.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <HelpCircle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{event.status}</h4>
                  <p className="text-sm text-gray-500">{event.location}</p>
                  {event.date && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(event.date).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-gray-900 mb-2">Delivery Address</h3>
        <p className="text-gray-600 mb-4">{order.address}</p>
        <button className="text-sm font-medium text-teal-600 hover:text-teal-700">
          Contact Delivery Agent
        </button>
      </div>
    </div>
  );
};

const OrderConfirmation = ({ order, onContinueShopping }) => {
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order #{order.id.split('-')[1]} placed on {formattedDate} has been received and is being processed.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">AOA {Math.round(order.total).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">AOA {Math.round(order.deliveryFee || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-teal-600">
                  AOA {Math.round(order.total + (order.deliveryFee || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Delivery Information</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Address:</span> {order.address}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Payment:</span> {order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
              </p>
              {order.trackingNumber && (
                <p className="text-gray-600">
                  <span className="font-medium">Tracking #:</span> {order.trackingNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-md transition-all"
        >
          Continue Shopping
        </button>
        <button className="px-6 py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors">
          View Order Details
        </button>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const { orders } = useCart();
  const [view, setView] = useState('list');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const handleViewOrder = (orderId) => {
    const order = orders.list.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setView('details');
    }
  };
  
  const handleTrackOrder = () => {
    setView('track');
  };
  
  const handleBackToList = () => {
    setView('list');
  };
  
  const handleBackToDetails = () => {
    setView('details');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-teal-600" />
            My Orders
          </h1>
        </div>
        
        {view === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.list.length > 0 ? (
              orders.list.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onClick={() => handleViewOrder(order.id)}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 col-span-full">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
                <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-md transition-all">
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}
        
        {view === 'details' && selectedOrder && (
          <OrderDetails 
            order={selectedOrder} 
            onBack={handleBackToList}
            onTrackOrder={handleTrackOrder}
          />
        )}
        
        {view === 'track' && selectedOrder && (
          <TrackOrder 
            order={selectedOrder} 
            onBack={handleBackToDetails}
          />
        )}
        
        {view === 'confirmation' && selectedOrder && (
          <OrderConfirmation 
            order={selectedOrder}
            onContinueShopping={handleBackToList}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;