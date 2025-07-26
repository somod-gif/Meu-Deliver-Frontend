// app/Portal/Vendor/Dashboard/orders/[id]/page.js
'use client';
import StatusBadge from '../../components/StatusBadge';

export default function OrderDetails({ params }) {
  // In a real app, you would fetch this data based on params.id
  const order = {
    id: params.id,
    customer: 'John Doe',
    contact: '+1 (555) 123-4567',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    status: 'Preparing',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
      { name: 'Garlic Bread', quantity: 2, price: 4.99 },
      { name: 'Cola', quantity: 1, price: 2.99 }
    ],
    subtotal: 25.96,
    deliveryFee: 3.99,
    tax: 2.62,
    total: 32.57,
    specialInstructions: 'Please include extra napkins',
    orderTime: '2023-11-15 10:30 AM',
    estimatedDelivery: '11:30 AM'
  };

  const updateStatus = (newStatus) => {
    // In a real app, you would update the order status via API
    console.log(`Updating order ${params.id} to status: ${newStatus}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Order #{order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold text-black">Order Items</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 text-left text-sm font-medium text-gray-500">Item</th>
                <th className="py-3 text-left text-sm font-medium text-gray-500">Qty</th>
                <th className="py-3 text-right text-sm font-medium text-gray-500">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 text-sm text-gray-900">{item.name}</td>
                  <td className="py-3 text-sm text-gray-500">{item.quantity}</td>
                  <td className="py-3 text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm text-gray-900">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Delivery Fee</span>
              <span className="text-sm text-gray-900">${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tax</span>
              <span className="text-sm text-gray-900">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
              <span className="text-black">Total</span>
              <span className="text-black">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {order.specialInstructions && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Special Instructions</h3>
              <p className="text-sm text-gray-600 mt-1">{order.specialInstructions}</p>
            </div>
          )}
        </div>

        {/* Customer and Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-black">Customer Details</h2>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Contact</h3>
              <p className="text-sm text-gray-900 mt-1">{order.customer}</p>
              <p className="text-sm text-gray-600 mt-1">{order.contact}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Delivery Address</h3>
              <p className="text-sm text-gray-600 mt-1">{order.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Order Time</h3>
              <p className="text-sm text-gray-600 mt-1">{order.orderTime}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700">Estimated Delivery</h3>
              <p className="text-sm text-gray-600 mt-1">{order.estimatedDelivery}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-black">Update Status</h2>
            <div className="space-y-2">
              <button
                onClick={() => updateStatus('Confirmed')}
                className="w-full bg-blue-100 text-blue-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-200"
              >
                Confirm Order
              </button>
              <button
                onClick={() => updateStatus('Preparing')}
                className="w-full bg-yellow-100 text-yellow-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-yellow-200"
              >
                Start Preparing
              </button>
              <button
                onClick={() => updateStatus('Ready')}
                className="w-full bg-purple-100 text-purple-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-purple-200"
              >
                Mark as Ready
              </button>
              <button
                onClick={() => updateStatus('Completed')}
                className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-green-200"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}