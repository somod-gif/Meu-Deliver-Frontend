// app/Portal/Vendor/Dashboard/components/RecentOrders.js
import Link from 'next/link';

export default function RecentOrders({ orders }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#00b1a5]">
                <Link href={`/Portal/Vendor/Dashboard/orders/${order.id.replace('#', '')}`}>
                  {order.id}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Ready' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}