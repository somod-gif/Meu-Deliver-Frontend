// app/Portal/Vendor/Dashboard/layout.js
import SidebarNav from './components/SidebarNav';
import Header from './components/Header';

export default function VendorDashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}