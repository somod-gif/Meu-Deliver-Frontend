'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Utensils,
  ListOrdered,
  Wallet,
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';

export default function SidebarNav() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/Portal/Vendor/Dashboard/dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    { 
      name: 'Menu', 
      href: '/Portal/Vendor/Dashboard/menu', 
      icon: <Utensils className="w-5 h-5" />
    },
    { 
      name: 'Orders', 
      href: '/Portal/Vendor/Dashboard/orders', 
      icon: <ListOrdered className="w-5 h-5" />
    },
    { 
      name: 'Earnings', 
      href: '/Portal/Vendor/Dashboard/earnings', 
      icon: <Wallet className="w-5 h-5" />
    },
    { 
      name: 'Settings', 
      href: '/Portal/Vendor/Dashboard/settings', 
      icon: <Settings className="w-5 h-5" />
    },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-4 rounded-full bg-[#00b1a5] text-white shadow-lg hover:bg-[#00897b] transition-colors"
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar - shows on desktop by default, mobile when toggled */}
      <div className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200
        transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-200 ease-in-out z-40
      `}>
        <div className="flex flex-col h-full">
          {/* Brand header */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-[#00b1a5]">Vendor Portal</h1>
          </div>

          {/* Navigation items */}
          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-md mx-2 transition-colors ${
                    pathname.includes(item.href)
                      ? 'bg-[#00b1a5]/10 text-[#00b1a5] border-l-4 border-[#00b1a5]'
                      : 'text-gray-600 hover:bg-[#a3d900]/10 hover:text-[#a3d900]'
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <span className={`mr-3 ${
                    pathname.includes(item.href) 
                      ? 'text-[#00b1a5]' 
                      : 'text-gray-500 group-hover:text-[#a3d900]'
                  }`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer with sign out */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Vendor Account</p>
                <button className="flex items-center text-xs font-medium text-[#00b1a5] hover:text-[#00897b]">
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}