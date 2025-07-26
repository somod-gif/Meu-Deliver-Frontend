// app/Portal/Vendor/Dashboard/components/Header.js
export default function Header() {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Vendor Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
            <span className="sr-only">Notifications</span>
            <span className="text-xl">🔔</span>
          </button>
          <div className="relative">
            <button className="flex text-sm rounded-full focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-[#00b1a5] flex items-center justify-center text-white">
                V
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}