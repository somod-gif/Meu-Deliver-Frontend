// app/Portal/Clients/Profile/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  User,
  Shield,
  ShoppingBag,
  Bike,
  Settings,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Lock,
  HelpCircle,
  LogOut
} from 'lucide-react';

const ProfilePage = () => {
  const router = useRouter();
  
  // Color constants
  const colors = {
    teal: '#00b1a5',
    lime: '#a3d900',
    yellowGreen: '#c6d90d',
    black: '#000000'
  };

  // Mock user data
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+244 123 456 789',
    address: '123 Main Street, Luanda, Angola',
    dob: '1990-01-01'
  };

  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [vendorApplication, setVendorApplication] = useState({
    businessName: '',
    businessType: '',
    address: '',
    phone: '',
    document: null
  });
  const [riderApplication, setRiderApplication] = useState({
    vehicleType: 'bike',
    licenseNumber: '',
    idDocument: null
  });
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: ''
  });

  useEffect(() => {
    setUserDetails({
      name: mockUser.name,
      email: mockUser.email,
      phone: mockUser.phone,
      address: mockUser.address,
      dob: mockUser.dob
    });
  }, []);

  const handleVendorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Vendor application submitted successfully! (Demo)');
      setVendorApplication({
        businessName: '',
        businessType: '',
        address: '',
        phone: '',
        document: null
      });
    } catch (error) {
      toast.error('Failed to submit application (Demo)');
    } finally {
      setLoading(false);
    }
  };

  const handleRiderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Rider application submitted successfully! (Demo)');
      setRiderApplication({
        vehicleType: 'bike',
        licenseNumber: '',
        idDocument: null
      });
    } catch (error) {
      toast.error('Failed to submit application (Demo)');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully! (Demo)');
    } catch (error) {
      toast.error('Failed to update profile (Demo)');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Logged out successfully! (Demo)');
      router.push('/');
    } catch (error) {
      toast.error('Error logging out (Demo)');
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'vendor') {
        setVendorApplication({ ...vendorApplication, document: file });
        toast.info('Document uploaded (Demo)');
      } else {
        setRiderApplication({ ...riderApplication, idDocument: file });
        toast.info('ID document uploaded (Demo)');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation - Updated with new colors */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4 h-fit border border-gray-100">
            <div className="flex items-center gap-3 p-3 border-b border-gray-200">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors.teal }}
              >
                {userDetails.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="font-medium" style={{ color: colors.black }}>{userDetails.name || 'User'}</h3>
                <p className="text-sm text-gray-500">Client Account</p>
              </div>
            </div>

            <nav className="mt-4 space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'profile' 
                    ? `text-white` 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: activeTab === 'profile' ? colors.teal : 'transparent'
                }}
              >
                <User className="w-5 h-5" />
                My Profile
              </button>

              <button
                onClick={() => setActiveTab('vendor')}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'vendor' 
                    ? `text-white` 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: activeTab === 'vendor' ? colors.teal : 'transparent'
                }}
              >
                <ShoppingBag className="w-5 h-5" />
                Become a Vendor
              </button>

              <button
                onClick={() => setActiveTab('rider')}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'rider' 
                    ? `text-white` 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: activeTab === 'rider' ? colors.teal : 'transparent'
                }}
              >
                <Bike className="w-5 h-5" />
                Become a Rider
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'settings' 
                    ? `text-white` 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={{
                  backgroundColor: activeTab === 'settings' ? colors.teal : 'transparent'
                }}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.black }}>
                  <User className="w-6 h-6" style={{ color: colors.teal }} />
                  My Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 rounded-lg border" style={{ borderColor: colors.teal, backgroundColor: '#f0fdfa' }}>
                    <h3 className="font-medium mb-3" style={{ color: colors.black }}>Personal Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5" style={{ color: colors.teal }} />
                        <span style={{ color: colors.black }}>{userDetails.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5" style={{ color: colors.teal }} />
                        <span style={{ color: colors.black }}>{userDetails.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" style={{ color: colors.teal }} />
                        <span style={{ color: colors.black }}>{userDetails.phone || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5" style={{ color: colors.teal }} />
                        <span style={{ color: colors.black }}>{userDetails.dob || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border" style={{ borderColor: colors.teal, backgroundColor: '#f0fdfa' }}>
                    <h3 className="font-medium mb-3" style={{ color: colors.black }}>Address Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5" style={{ color: colors.teal }} />
                        <span style={{ color: colors.black }}>{userDetails.address || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors"
                  style={{ backgroundColor: colors.teal }}
                >
                  Edit Profile
                </button>
              </div>
            )}

            {/* Become a Vendor Section */}
            {activeTab === 'vendor' && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.black }}>
                  <ShoppingBag className="w-6 h-6" style={{ color: colors.teal }} />
                  Become a Vendor (Demo)
                </h2>

                <form onSubmit={handleVendorSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      value={vendorApplication.businessName}
                      onChange={(e) => setVendorApplication({ ...vendorApplication, businessName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: colors.teal,
                        focusRingColor: colors.lime 
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                      Business Type
                    </label>
                    <select
                      id="businessType"
                      value={vendorApplication.businessType}
                      onChange={(e) => setVendorApplication({ ...vendorApplication, businessType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: colors.teal,
                        focusRingColor: colors.lime 
                      }}
                      required
                    >
                      <option value="">Select business type</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="grocery">Grocery Store</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="businessAddress" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                      Business Address
                    </label>
                    <input
                      type="text"
                      id="businessAddress"
                      value={vendorApplication.address}
                      onChange={(e) => setVendorApplication({ ...vendorApplication, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: colors.teal,
                        focusRingColor: colors.lime 
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="businessPhone" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                      Business Phone
                    </label>
                    <input
                      type="tel"
                      id="businessPhone"
                      value={vendorApplication.phone}
                      onChange={(e) => setVendorApplication({ ...vendorApplication, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: colors.teal,
                        focusRingColor: colors.lime 
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="businessDocument" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                      Business Registration Document
                    </label>
                    <div className="flex items-center gap-3">
                      <label 
                        htmlFor="businessDocument"
                        className="px-4 py-2 rounded-md cursor-pointer transition-colors"
                        style={{ 
                          backgroundColor: colors.lime,
                          color: colors.black,
                          hover: { opacity: 0.9 }
                        }}
                      >
                        Choose File
                      </label>
                      <span className="text-sm" style={{ color: colors.black }}>
                        {vendorApplication.document ? vendorApplication.document.name : 'No file chosen'}
                      </span>
                    </div>
                    <input
                      type="file"
                      id="businessDocument"
                      onChange={(e) => handleFileChange(e, 'vendor')}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <p className="mt-1 text-sm" style={{ color: colors.black }}>Upload PDF, JPG, or PNG files</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-6 py-2 text-white rounded-md hover:opacity-90 transition-colors disabled:opacity-50"
                    style={{ backgroundColor: colors.teal }}
                  >
                    {loading ? 'Submitting...' : 'Submit Application (Demo)'}
                  </button>
                </form>
              </div>
            )}

            {/* Become a Rider Section */}
            {activeTab === 'rider' && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.black }}>
                  <Bike className="w-6 h-6" style={{ color: colors.teal }} />
                  Become a Rider (Demo)
                </h2>

                <form onSubmit={handleRiderSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="vehicleType" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                      Vehicle Type
                    </label>
                    <select
                      id="vehicleType"
                      value={riderApplication.vehicleType}
                      onChange={(e) => setRiderApplication({ ...riderApplication, vehicleType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: colors.teal,
                        focusRingColor: colors.lime 
                      }}
                      required
                    >
                      <option value="bike">Bike</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="car">Car</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                      License Number
                    </label>
                    <input
                      type="text"
                      id="licenseNumber"
                      value={riderApplication.licenseNumber}
                      onChange={(e) => setRiderApplication({ ...riderApplication, licenseNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: colors.teal,
                        focusRingColor: colors.lime 
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="idDocument" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                      ID Document
                    </label>
                    <div className="flex items-center gap-3">
                      <label 
                        htmlFor="idDocument"
                        className="px-4 py-2 rounded-md cursor-pointer transition-colors"
                        style={{ 
                          backgroundColor: colors.lime,
                          color: colors.black,
                          hover: { opacity: 0.9 }
                        }}
                      >
                        Choose File
                      </label>
                      <span className="text-sm" style={{ color: colors.black }}>
                        {riderApplication.idDocument ? riderApplication.idDocument.name : 'No file chosen'}
                      </span>
                    </div>
                    <input
                      type="file"
                      id="idDocument"
                      onChange={(e) => handleFileChange(e, 'rider')}
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <p className="mt-1 text-sm" style={{ color: colors.black }}>Upload a clear photo of your ID</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-6 py-2 text-white rounded-md hover:opacity-90 transition-colors disabled:opacity-50"
                    style={{ backgroundColor: colors.teal }}
                  >
                    {loading ? 'Submitting...' : 'Submit Application (Demo)'}
                  </button>
                </form>
              </div>
            )}

            {/* Settings Section */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: colors.black }}>
                  <Settings className="w-6 h-6" style={{ color: colors.teal }} />
                  Settings (Demo)
                </h2>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: colors.teal,
                          focusRingColor: colors.lime 
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-gray-100"
                        style={{ 
                          borderColor: colors.teal,
                          focusRingColor: colors.lime 
                        }}
                        required
                        disabled
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={userDetails.phone}
                        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: colors.teal,
                          focusRingColor: colors.lime 
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        value={userDetails.dob}
                        onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: colors.teal,
                          focusRingColor: colors.lime 
                        }}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-1" style={{ color: colors.black }}>
                        Address
                      </label>
                      <textarea
                        id="address"
                        value={userDetails.address}
                        onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: colors.teal,
                          focusRingColor: colors.lime 
                        }}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('profile')}
                      className="px-4 py-2 border rounded-md transition-colors"
                      style={{ 
                        borderColor: colors.teal,
                        color: colors.teal,
                        hover: { backgroundColor: '#f0fdfa' }
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-colors disabled:opacity-50"
                      style={{ backgroundColor: colors.teal }}
                    >
                      {loading ? 'Saving...' : 'Save Changes (Demo)'}
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2" style={{ color: colors.black }}>
                    <Shield className="w-5 h-5" style={{ color: colors.teal }} />
                    Account Security (Demo)
                  </h3>

                  <div className="space-y-4">
                    <button
                      onClick={() => toast.info('Change password feature (Demo)')}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                      style={{ 
                        borderColor: colors.yellowGreen,
                        hover: { borderColor: colors.teal }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5" style={{ color: colors.teal }} />
                        <span style={{ color: colors.black }}>Change Password</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: colors.teal }}>Update</span>
                    </button>

                    <button
                      onClick={() => toast.info('Help & support feature (Demo)')}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-50 transition-colors border"
                      style={{ 
                        borderColor: colors.yellowGreen,
                        hover: { borderColor: colors.teal }
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5" style={{ color: colors.teal }} />
                        <span style={{ color: colors.black }}>Help & Support</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: colors.teal }}>Contact</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;