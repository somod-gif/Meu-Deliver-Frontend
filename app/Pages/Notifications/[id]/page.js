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
  HelpCircle
} from 'lucide-react';

// Mock data - in a real app you would fetch this based on the ID
const notificationDetails = {
  '1': {
    id: '1',
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped and will arrive in 2-3 business days',
    icon: Truck,
    color: 'text-teal-500',
    time: '2 min ago',
    date: 'May 22, 2023 at 10:30 AM',
    details: {
      orderNumber: '#12345',
      shippingMethod: 'Express Delivery',
      estimatedDelivery: 'May 25, 2023',
      trackingNumber: 'TRK123456789',
      carrier: 'FastShip Logistics',
      items: [
        { name: 'Organic Cotton T-Shirt', quantity: 2, price: '$29.98', status: 'Shipped' },
        { name: 'Wireless Earbuds', quantity: 1, price: '$59.99', status: 'Shipped' }
      ],
      shippingAddress: '123 Main St, Apt 4B, New York, NY 10001',
      paymentMethod: 'Visa ending in 4242',
      subtotal: '$89.97',
      shipping: '$5.99',
      tax: '$7.19',
      total: '$103.15',
      actions: [
        { label: 'Track Package', href: '/track/TRK123456789' },
        { label: 'View Order Details', href: '/orders/12345' },
        { label: 'Contact Support', href: '/contact' }
      ]
    }
  },
  '2': {
    id: '2',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 20% off on your next purchase with code SPRING20',
    icon: ShoppingBag,
    color: 'text-lime-500',
    time: '1 hour ago',
    date: 'May 22, 2023 at 9:45 AM',
    details: {
      promoCode: 'SPRING20',
      discount: '20% off',
      validUntil: 'May 31, 2023',
      applicableTo: 'All products excluding clearance items',
      minimumPurchase: '$50.00',
      terms: 'One use per customer. Cannot be combined with other offers.',
      actions: [
        { label: 'Shop Now', href: '/products' },
        { label: 'View All Promotions', href: '/promotions' }
      ]
    }
  },
  '3': {
    id: '3',
    type: 'system',
    title: 'System Update',
    message: 'New features available in your account dashboard',
    icon: CheckCircle2,
    color: 'text-yellow-500',
    time: '3 hours ago',
    date: 'May 22, 2023 at 8:00 AM',
    details: {
      version: '2.3.1',
      releaseDate: 'May 20, 2023',
      features: [
        'New order tracking interface with real-time updates',
        'Enhanced search functionality with filters',
        'Dark mode support for better nighttime browsing',
        'Improved checkout process with saved payment methods'
      ],
      actions: [
        { label: 'View Release Notes', href: '/updates/2.3.1' },
        { label: 'Give Feedback', href: '/feedback' }
      ]
    }
  },
  '4': {
    id: '4',
    type: 'alert',
    title: 'Important Notice',
    message: 'Your subscription will expire in 7 days',
    icon: AlertCircle,
    color: 'text-red-500',
    time: '1 day ago',
    date: 'May 21, 2023 at 3:15 PM',
    details: {
      subscriptionType: 'Premium Membership',
      renewalDate: 'May 27, 2023',
      price: '$9.99/month',
      benefits: [
        'Free shipping on all orders',
        'Exclusive member discounts',
        'Early access to sales',
        'Priority customer support'
      ],
      actionRequired: 'Please update your payment method to avoid interruption',
      actions: [
        { label: 'Renew Subscription', href: '/account/subscription' },
        { label: 'Update Payment Method', href: '/account/payment' }
      ]
    }
  },
  '5': {
    id: '5',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from customer support',
    icon: Mail,
    color: 'text-blue-500',
    time: '2 days ago',
    date: 'May 20, 2023 at 11:20 AM',
    details: {
      from: 'Support Team',
      subject: 'Regarding your recent inquiry',
      message: 'Thank you for contacting us about your order #12345. We have investigated the issue and confirmed that your package was shipped on May 18. According to our tracking system, it should arrive by May 25. We apologize for any inconvenience this may have caused and have applied a 10% discount to your next purchase as a courtesy. Please don\'t hesitate to reach out if you have any further questions.',
      responseTime: 'Typically within 24 hours',
      actions: [
        { label: 'Reply to Message', href: '/messages/123' },
        { label: 'View All Messages', href: '/messages' }
      ]
    }
  }
};

export default function NotificationDetails({ params }) {
  const router = useRouter();
  const notification = notificationDetails[params.id];

  if (!notification) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-teal-600 hover:text-teal-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to notifications
        </button>
        <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
          <HelpCircle className="w-10 h-10 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Notification not found</h3>
          <p className="mt-1 text-gray-500">
            The notification you're looking for doesn't exist or may have been deleted.
          </p>
        </div>
      </div>
    );
  }

  const renderDetails = () => {
    switch (notification.type) {
      case 'order':
        return (
          <div className="space-y-6">
            <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
              <h3 className="font-medium text-teal-800 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Order Shipped
              </h3>
              <p className="text-sm text-teal-700 mt-1">
                Your order is on its way! Expected delivery: {notification.details.estimatedDelivery}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium">{notification.details.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{notification.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{notification.details.total}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Shipping Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carrier:</span>
                    <span>{notification.details.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-medium">{notification.details.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Method:</span>
                    <span>{notification.details.shippingMethod}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
              <div className="divide-y divide-gray-200">
                {notification.details.items.map((item, index) => (
                  <div key={index} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p>{item.price}</p>
                      <p className="text-sm text-teal-600">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {notification.details.actions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        );

      case 'promotion':
        return (
          <div className="space-y-6">
            <div className="bg-lime-50 border border-lime-100 rounded-lg p-4">
              <h3 className="font-medium text-lime-800 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Special Promotion
              </h3>
              <p className="text-sm text-lime-700 mt-1">
                Use code <span className="font-bold">{notification.details.promoCode}</span> at checkout
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Promotion Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount:</span>
                    <span className="font-medium">{notification.details.discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid Until:</span>
                    <span>{notification.details.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Purchase:</span>
                    <span>{notification.details.minimumPurchase}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Terms & Conditions</h4>
                <p className="text-sm text-gray-600">
                  {notification.details.terms}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {notification.details.actions.map((action, index) => (
                <a
                  key={index}
                  href={action.href}
                  className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        );

      // Similar cases for other notification types...

      default:
        return (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Details</h4>
              <p className="text-gray-600">
                {notification.message}
              </p>
            </div>
            {notification.details.actions && (
              <div className="flex flex-wrap gap-3">
                {notification.details.actions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-teal-600 hover:text-teal-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Back to notifications
      </button>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className={`p-4 border-b ${notification.color.replace('text', 'bg')} bg-opacity-10`}>
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 mt-1 ${notification.color}`}>
              <notification.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900">{notification.title}</h2>
              <p className="text-gray-600">{notification.message}</p>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {notification.time}
            </div>
          </div>
        </div>

        <div className="p-6">
          {renderDetails()}
        </div>
      </div>
    </div>
  );
}