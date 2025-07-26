// app/Portal/Vendor/Dashboard/orders/page.js
'use client';
import OrdersTable from './components/OrdersTable';

export default function OrdersPage() {
  // Sample orders data
  const orders = [
    {
      id: 'ORD-1001',
      customer: 'John Doe',
      items: 3,
      total: 42.97,
      status: 'Preparing',
      date: '2023-11-15 10:30',
      delivery: 'ASAP'
    },
    {
      id: 'ORD-1002',
      customer: 'Jane Smith',
      items: 5,
      total: 68.45,
      status: 'Confirmed',
      date: '2023-11-15 09:15',
      delivery: '12:30 PM'
    },
    {
      id: 'ORD-1003',
      customer: 'Robert Johnson',
      items: 2,
      total: 24.98,
      status: 'Ready',
      date: '2023-11-14 18:45',
      delivery: 'Pickup'
    },
    {
      id: 'ORD-1004',
      customer: 'Emily Davis',
      items: 4,
      total: 55.20,
      status: 'Completed',
      date: '2023-11-14 17:30',
      delivery: 'Delivered'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Orders Management</h1>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Preparing</option>
            <option>Ready</option>
            <option>Completed</option>
          </select>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
          />
        </div>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}