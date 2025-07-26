// app/Portal/Vendor/Dashboard/menu/components/ProductForm.js
'use client';
import { useState, useEffect } from 'react';

export default function ProductForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    ingredients: '',
    stock: 0,
    isAvailable: true,
    status: 'Available'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: (initialData.price / 100).toFixed(2) // Convert cents to AOA
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : 
              value,
      ...(name === 'stock' && {
        status: getStatusFromStock(value)
      })
    }));
  };

  const getStatusFromStock = (stockValue) => {
    const stock = parseInt(stockValue);
    return stock > 5 ? 'Available' : 
           stock > 0 ? 'Low Stock' : 'Out of Stock';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Math.round(parseFloat(formData.price) * 100), // Convert AOA to cents
      status: getStatusFromStock(formData.stock)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-black mb-6">
        {initialData.id ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
              required
            >
              <option value="">Select a category</option>
              <option value="Pizza">Pizza</option>
              <option value="Burgers">Burgers</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (AOA)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
              required
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <input
              type="text"
              name="ingredients"
              id="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
              placeholder="Comma separated list of ingredients"
            />
          </div>

          <div>
            <div className="flex items-center">
              <input
                id="isAvailable"
                name="isAvailable"
                type="checkbox"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="h-4 w-4 text-[#00b1a5] focus:ring-[#00b1a5] border-gray-300 rounded"
              />
              <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                Available for ordering
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleChange}
                className="focus:outline-none focus:ring-[#00b1a5] focus:border-[#00b1a5]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00b1a5]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#00b1a5] hover:bg-[#00897b] text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00b1a5]"
          >
            {initialData.id ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}