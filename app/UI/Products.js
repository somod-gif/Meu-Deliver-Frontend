// app/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Note: next/navigation for app directory

export default function Products() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const ANGOLA_RATE = 850;

  // Fetch products data from JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/Products/products.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        
        const data = await response.json();
        
        setCategories(data.categories || []);
        setProductsByCategory(data.productsByCategory || {});
        
        // Create allProducts array from all categories
        const allProductsArray = Object.values(data.productsByCategory || {}).flat();
        setAllProducts(allProductsArray);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewAllProducts = () => {
    router.push('/Pages/Products/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b1a5]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">Error loading products: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your existing header/hero sections here */}
      
      {/* --------- Categories Section  --------- */}
      <section className="bg-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Shop by Category
          </h2>

          <div className="relative overflow-x-auto pb-2 sm:pb-4">
            <div className="flex space-x-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`
                    flex-shrink-0 flex flex-col items-center
                    w-20 sm:w-24 lg:w-28 p-2 rounded-full cursor-pointer transition-all duration-200
                    ${activeCategory === category.name
                      ? 'bg-[#00b1a5] text-white shadow-lg scale-105'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }
                  `}
                >
                  <div className="text-2xl sm:text-3xl mb-1">
                    {category.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-center">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------- Featured Products   --------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black">
              {activeCategory === 'All' ? 'Featured Products' : activeCategory}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              {activeCategory === 'All'
                ? 'Discover our most popular items'
                : `Best ${activeCategory} products`}
            </p>
          </div>
          <button 
            onClick={handleViewAllProducts}
            className="flex items-center text-[#00b1a5] font-medium hover:text-[#008a80] transition-colors text-sm group"
          >
            View all
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
              viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1
                   0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1
                   0 01-1.414 0z"
                clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
          {(activeCategory === 'All'
            ? allProducts
            : productsByCategory[activeCategory] || []
          ).map((product) => (
            <div key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00b1a5]/20 transition-all duration-300 group">

              {/* Image Container */}
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
                <img src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-2 left-2">
                    <span className="text-xs text-white font-medium px-2 py-1 bg-[#00b1a5] rounded-full">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="bg-[#00b1a5] hover:bg-[#008a80] text-white p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-2 sm:p-3">
                <h3 className="font-semibold text-xs sm:text-sm text-black mb-1 line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-1 truncate">{product.vendor}</p>
                
                {/* Rating and Delivery */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  {/* <span className="text-xs text-gray-500">{product.deliveryTime}</span> */}
                </div>

                {/* Price and CTA */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm sm:text-base text-black">
                      AOA {Math.round(product.price * ANGOLA_RATE).toLocaleString()}
                    </span>
                    
                  </div>

                  <button
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="w-full bg-[#00b1a5] hover:bg-[#008a80] text-white py-1.5 sm:py-2 px-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#00b1a5]/25 active:scale-95">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        {(activeCategory === 'All' ? allProducts : productsByCategory[activeCategory] || []).length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleViewAllProducts}
              className="inline-flex items-center px-6 py-3 bg-[#00b1a5] hover:bg-[#008a80] text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#00b1a5]/25 active:scale-95"
            >
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}