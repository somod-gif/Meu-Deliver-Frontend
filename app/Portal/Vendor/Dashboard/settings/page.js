'use client';
import ProfileForm from './components/ProfileForm';

export default function SettingsPage() {
  // Sample vendor data
  const vendorData = {
    businessName: "Tasty Bites",
    email: "contact@tastybites.com",
    phone: "(555) 123-4567",
    address: "123 Food Street, Kitchenville",
    cuisineType: "Italian",
    openingHours: {
      monday: { open: "09:00", close: "21:00" },
      tuesday: { open: "09:00", close: "21:00" },
      wednesday: { open: "09:00", close: "21:00" },
      thursday: { open: "09:00", close: "22:00" },
      friday: { open: "09:00", close: "23:00" },
      saturday: { open: "10:00", close: "23:00" },
      sunday: { open: "10:00", close: "21:00" }
    },
    deliveryRadius: 5, // miles
    minOrder: 10.00,
    isActive: true
  };

  const vendorConfig = {
    fields: ['cuisineType'],
    cuisineTypes: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American'],
    storeTypes: ['Restaurant', 'Cafe', 'Bakery', 'Food Truck']
  };

  const handleSave = (updatedData) => {
    console.log("Saving settings:", updatedData);
    // In a real app, you would send this to your API
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-black">Business Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Profile Information</h2>
            <ProfileForm 
              initialData={vendorData} 
              vendorConfig={vendorConfig}
              onSave={handleSave} 
            />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Business Hours</h2>
            <div className="space-y-4">
              {Object.entries(vendorData.openingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center">
                  <div className="w-24">
                    <label className="capitalize text-sm font-medium text-gray-700">
                      {day}
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      defaultValue={hours.open}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      defaultValue={hours.close}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                    />
                    <button className="ml-4 text-sm text-gray-500 hover:text-gray-700">
                      Closed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Delivery Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Radius (miles)
                </label>
                <input
                  type="number"
                  defaultValue={vendorData.deliveryRadius}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                  min="1"
                  max="15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Order ($)
                </label>
                <input
                  type="number"
                  defaultValue={vendorData.minOrder}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Account Status</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {vendorData.isActive ? 'Active' : 'Inactive'}
                </p>
                <p className="text-sm text-gray-500">
                  {vendorData.isActive ? 'Your business is visible to customers' : 'Your business is hidden'}
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  vendorData.isActive ? 'bg-[#00b1a5]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    vendorData.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="mt-4">
              <button className="text-sm text-red-600 hover:text-red-800">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}