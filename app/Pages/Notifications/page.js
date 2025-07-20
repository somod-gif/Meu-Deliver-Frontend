'use client';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Truck,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Mail,
  Clock,
  Calendar,
  Package,
  CreditCard,
  FileText,
  HelpCircle,
  ShoppingCart
} from 'lucide-react';
import { useCart } from '../../Context/CartContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const notificationTypes = {
  order: {
    icon: ShoppingCart,
    color: 'text-[#00b1a5]',
    bgColor: 'bg-[#00b1a5]',
    lightBg: 'bg-[#00b1a5]/10',
    borderColor: 'border-[#00b1a5]/20'
  },
  promotion: {
    icon: ShoppingBag,
    color: 'text-[#a3d900]',
    bgColor: 'bg-[#a3d900]',
    lightBg: 'bg-[#a3d900]/10',
    borderColor: 'border-[#a3d900]/20'
  },
  system: {
    icon: CheckCircle2,
    color: 'text-[#c6d90d]',
    bgColor: 'bg-[#c6d90d]',
    lightBg: 'bg-[#c6d90d]/10',
    borderColor: 'border-[#c6d90d]/20'
  },
  alert: {
    icon: AlertCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-500',
    lightBg: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  message: {
    icon: Mail,
    color: 'text-[#00b1a5]',
    bgColor: 'bg-[#00b1a5]',
    lightBg: 'bg-[#00b1a5]/10',
    borderColor: 'border-[#00b1a5]/20'
  }
};

export default function NotificationDetails({ params }) {
  const router = useRouter();
  const { orders } = useCart();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = () => {
      try {
        // Check if it's an order notification (ID starts with 'ORD-')
        if (params.id.startsWith('ORD-')) {
          const order = orders.list.find(order => order.id === params.id);
          if (order) {
            const orderNotification = {
              id: order.id,
              type: 'order',
              title: `Order ${order.status === 'processing' ? 'Processing' : 'Shipped'}`,
              message: order.status === 'processing' 
                ? 'We are preparing your order for shipment' 
                : 'Your order has been shipped and will arrive soon',
              time: new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              date: new Date(order.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }),
              details: {
                orderNumber: order.id,
                status: order.status,
                shippingMethod: 'Standard Delivery',
                estimatedDelivery: new Date(new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                trackingNumber: order.trackingNumber,
                carrier: 'FastShip Logistics',
                items: order.items.map(item => ({
                  name: item.name,
                  quantity: item.quantity,
                  price: `AOA ${Math.round(item.price * item.quantity).toLocaleString()}`,
                  status: order.status === 'processing' ? 'Processing' : 'Shipped'
                })),
                shippingAddress: `${order.address}, ${order.city}, ${order.state}`,
                paymentMethod: order.paymentMethod === 'card' ? 'Credit Card' : 
                              order.paymentMethod === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery',
                subtotal: `AOA ${Math.round(order.total - order.deliveryFee).toLocaleString()}`,
                shipping: `AOA ${order.deliveryFee.toLocaleString()}`,
                total: `AOA ${Math.round(order.total).toLocaleString()}`,
                actions: [
                  { label: 'Track Package', href: `/track/${order.trackingNumber}` },
                  { label: 'View Order Details', href: `/orders/${order.id}` },
                  { label: 'Contact Support', href: '/contact' }
                ]
              }
            };
            setNotification(orderNotification);
          }
        } else {
          // Handle other notification types (you can keep your mock data here)
          toast.error('Notification not found');
          router.push('/Pages/Notifications');
        }
      } catch (error) {
        console.error('Error fetching notification:', error);
        toast.error('Failed to load notification');
        router.push('/Pages/Notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotification();
  }, [params.id, orders.list, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00b1a5]"></div>
        </div>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-[#00b1a5] hover:text-[#00a294] mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to notifications
        </button>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
          <HelpCircle className="w-10 h-10 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-black">Notification not found</h3>
          <p className="mt-1 text-gray-600">
            The notification you're looking for doesn't exist or may have been deleted.
          </p>
        </div>
      </div>
    );
  }

  const notificationType = notificationTypes[notification.type] || notificationTypes.system;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-[#00b1a5] hover:text-[#00a294] mb-4 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back to notifications
      </button>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className={`p-4 border-b ${notificationType.lightBg}`}>
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 mt-1 ${notificationType.color}`}>
              <notificationType.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-black">{notification.title}</h2>
              <p className="text-gray-700">{notification.message}</p>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {notification.time}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div className={`${notificationType.lightBg} ${notificationType.borderColor} border rounded-lg p-4`}>
              <h3 className={`font-medium ${notificationType.color} flex items-center gap-2`}>
                <Truck className="w-5 h-5" />
                Order {notification.details.status === 'processing' ? 'Processing' : 'Shipped'}
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                {notification.details.status === 'processing' 
                  ? 'We are preparing your order for shipment' 
                  : `Your order is on its way! Expected delivery: ${notification.details.estimatedDelivery}`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-black mb-3">Order Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium text-black">{notification.details.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-black">{notification.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${
                      notification.details.status === 'processing' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {notification.details.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium text-black">{notification.details.total}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-black mb-3">Shipping Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carrier:</span>
                    <span className="text-black">{notification.details.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-medium text-black">{notification.details.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Method:</span>
                    <span className="text-black">{notification.details.shippingMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="text-black">{notification.details.paymentMethod}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-black mb-3">Order Items</h4>
              <div className="divide-y divide-gray-200">
                {notification.details.items.map((item, index) => (
                  <div key={index} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium text-black">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-black">{item.price}</p>
                      <p className={`text-sm ${
                        item.status === 'Processing' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-black mb-3">Shipping Address</h4>
              <p className="text-gray-700">{notification.details.shippingAddress}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {notification.details.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => router.push(action.href)}
                  className={`px-4 py-2 ${
                    index === 0 
                      ? 'bg-[#00b1a5] text-white hover:bg-[#00a294]' 
                      : 'bg-white text-[#00b1a5] border border-[#00b1a5] hover:bg-[#00b1a5]/10'
                  } rounded-md transition-colors`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}