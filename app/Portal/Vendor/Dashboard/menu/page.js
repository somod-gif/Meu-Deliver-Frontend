// app/Portal/Vendor/Dashboard/menu/page.js
'use client';
import { useState } from 'react';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';

export default function MenuPage() {
  // Sample product data in AOA (Angolan Kwanza)
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Margherita Pizza', 
      category: 'Pizza', 
      price: 12990, // 12,990 AOA (stored in cents)
      status: 'Available', 
      stock: 24,
      description: 'Classic pizza with tomato sauce and mozzarella',
      ingredients: 'Tomato sauce, mozzarella, basil',
      isAvailable: true
    },
    { 
      id: 2, 
      name: 'Pepperoni Pizza', 
      category: 'Pizza', 
      price: 14990, // 14,990 AOA
      status: 'Available', 
      stock: 18,
      description: 'Pizza with pepperoni and extra cheese',
      ingredients: 'Tomato sauce, mozzarella, pepperoni',
      isAvailable: true
    },
    { 
      id: 3, 
      name: 'Veggie Burger', 
      category: 'Burgers', 
      price: 8990, // 8,990 AOA
      status: 'Low Stock', 
      stock: 3,
      description: 'Vegetarian burger with fresh vegetables',
      ingredients: 'Vegetable patty, lettuce, tomato, onion',
      isAvailable: true
    }
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Format price as AOA currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 2
    }).format(price / 100); // Convert cents to AOA
  };

  const handleSave = (product) => {
    if (product.id) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Add new product
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Menu Management</h1>
        {!showForm && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="bg-[#00b1a5] hover:bg-[#00897b] text-white py-2 px-4 rounded-lg font-medium"
          >
            Add New Item
          </button>
        )}
      </div>

      {showForm ? (
        <ProductForm 
          initialData={editingProduct || { 
            name: '',
            description: '',
            category: '',
            price: '',
            ingredients: '',
            stock: 0,
            isAvailable: true,
            status: 'Available'
          }}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <ProductTable 
            products={products} 
            formatPrice={formatPrice}
            onEdit={(product) => {
              setEditingProduct(product);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}