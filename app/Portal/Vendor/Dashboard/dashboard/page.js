// app/Portal/Vendor/Dashboard/dashboard/page.js
import StatsCards from '../components/StatsCards';
import RecentOrders from '../components/RecentOrders';
import Link from 'next/link';

export default function VendorDashboard() {
  // Updated data with AOA currency
  const statsData = [
    { title: "Today's Orders", value: 24, change: "+12%", icon: "📦" },
    { title: "Active Orders", value: 8, change: "+5%", icon: "⏳" },
    { title: "Total Earnings", value: "124,500 AOA", change: "+18%", icon: "💰" },
    { title: "New Customers", value: 14, change: "+7%", icon: "👥" }
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", amount: "24,500 AOA", status: "Preparing", time: "10 min ago" },
    { id: "#ORD-002", customer: "Jane Smith", amount: "32,750 AOA", status: "Confirmed", time: "25 min ago" },
    { id: "#ORD-003", customer: "Robert Johnson", amount: "18,900 AOA", status: "Ready", time: "42 min ago" },
    { id: "#ORD-004", customer: "Emily Davis", amount: "45,200 AOA", status: "Completed", time: "1 hour ago" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-black">Dashboard Overview</h1>
      
      {/* Stats Cards Row */}
      <StatsCards data={statsData} />
      
      {/* Recent Orders Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Recent Orders</h2>
          <Link 
            href="/Portal/Vendor/Dashboard/orders" 
            className="text-[#00b1a5] hover:text-[#00897b] font-medium"
          >
            View All
          </Link>
        </div>
        <RecentOrders orders={recentOrders} />
      </div>
      
      {/* Quick Actions - Now with proper links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/Portal/Vendor/Dashboard/menu"
          className="bg-[#00b1a5] hover:bg-[#00897b] text-white py-3 px-4 rounded-lg font-medium transition-colors text-center"
        >
          Add New Menu Item
        </Link>
        
        <Link
          href="/Portal/Vendor/Dashboard/orders"
          className="bg-[#a3d900] hover:bg-[#8bc34a] text-black py-3 px-4 rounded-lg font-medium transition-colors text-center"
        >
          Process Orders
        </Link>
        
        <Link
          href="/Portal/Vendor/Dashboard/earnings"
          className="bg-white border border-[#c6d90d] text-black py-3 px-4 rounded-lg font-medium transition-colors hover:bg-[#f9fbe7] text-center"
        >
          View Earnings
        </Link>
      </div>
    </div>
  );
}