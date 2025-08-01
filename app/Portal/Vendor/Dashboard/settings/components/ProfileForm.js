'use client';
import { useState } from 'react';

export default function ProfileForm({ initialData, vendorConfig, onSave }) {
  const [formData, setFormData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  const renderDynamicFields = () => {
    if (!vendorConfig?.fields) return null;

    return vendorConfig.fields.map(field => {
      switch(field) {
        case 'cuisineType':
          return (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
              <select
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!isEditing}
              >
                {vendorConfig.cuisineTypes?.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          );
        case 'storeType':
          return (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Type</label>
              <select
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={!isEditing}
              >
                {vendorConfig.storeTypes?.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Common fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      {/* Dynamic fields based on vendor type */}
      {renderDynamicFields()}

      {/* Common action buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        {isEditing ? (
          <>
            <button 
              type="button" 
              onClick={() => {
                setFormData(initialData);
                setIsEditing(false);
              }} 
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-[#00b1a5] text-white rounded-md">
              Save
            </button>
          </>
        ) : (
          <button 
            type="button" 
            onClick={() => setIsEditing(true)} 
            className="px-4 py-2 bg-[#00b1a5] text-white rounded-md"
          >
            Edit Profile
          </button>
        )}
      </div>
    </form>
  );
}