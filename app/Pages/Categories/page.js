// Pages/Categories/page.js
// This file is part of the Meu Deliver project, a frontend application for managing categories, vendors, and products.
// It includes functionality for displaying categories, filtering products by category and vendor, and managing a shopping cart.
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, Star, Heart } from "lucide-react";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  
  // State for filters and selections
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVendor, setSelectedVendor] = useState("all");
  const [viewMode, setViewMode] = useState("categories"); // categories, vendors, products
  const [cart, setCart] = useState([]);

  const ANGOLA_RATE = 850;

  // Fetch data from JSON files
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResponse = await fetch('/Dataset/dataset.json');
        const categoriesData = await categoriesResponse.json();
        
        // Fetch products
        const productsResponse = await fetch('/Products/products.json');
        const productsData = await productsResponse.json();
        
        // Extract unique categories from both datasets
        const allCategories = [
          ...categoriesData.categories || [],
          ...(productsData.categories || [])
        ];
        
        // Remove duplicates based on name
        const uniqueCategories = allCategories.filter((category, index, self) =>
          index === self.findIndex(c => c.name === category.name)
        );
        
        setCategories(uniqueCategories);
        setVendors(categoriesData.vendors || []);
        setProducts([
          ...(categoriesData.products || []),
          ...(productsData.productsByCategory ? 
            Object.values(productsData.productsByCategory).flat() : [])
        ]);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get vendors by category
  const getVendorsByCategory = (categoryName) => {
    if (categoryName === "all") return vendors;
    const categoryProducts = products.filter(p => 
      p.categoryId === categoryName || p.category === categoryName
    );
    const vendorIds = [...new Set(categoryProducts.map(p => p.vendorId || p.vendor))];
    return vendors.filter(v => vendorIds.includes(v.id) || vendorIds.includes(v.businessName));
  };

  // Get products by vendor and category
  const getFilteredProducts = () => {
    let filteredProducts = products;
    
    if (selectedCategory !== "all") {
      filteredProducts = filteredProducts.filter(p => 
        p.categoryId === selectedCategory || p.category === selectedCategory
      );
    }
    
    if (selectedVendor !== "all") {
      filteredProducts = filteredProducts.filter(p => 
        p.vendorId === selectedVendor || p.vendor === selectedVendor
      );
    }
    
    return filteredProducts;
  };

  // Navigate to product details
  const handleViewProduct = (productId) => {
    router.push(`/Pages/Products/${productId}`);
  };

  // Toggle favorite
  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  // Get badge color
  const getBadgeColor = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'best seller': return 'bg-[#00b1a5]';
      case 'new': return 'bg-[#a3d900]';
      case 'eco': case 'organic': return 'bg-[#c6d90d]';
      case 'smart': return 'bg-[#00b1a5]';
      default: return 'bg-gray-600';
    }
  };

  // Add to cart function (keeping for cart functionality)
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Calculate cart totals
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b1a5] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-black">Categories</h1>
              <p className="text-gray-600 mt-1">Discover products from all our categories and vendors</p>
            </div>
            
            {/* Cart Summary */}
            {getCartItemCount() > 0 && (
              <div className="flex items-center space-x-4">
                <div className="bg-[#00b1a5] text-white px-4 py-2 rounded-lg shadow-md">
                  <span className="font-medium">
                    {getCartItemCount()} items - AOA {(getCartTotal() * ANGOLA_RATE).toFixed(0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
            {[
              { key: "categories", label: "Categories", icon: "🏷️" },
              { key: "vendors", label: "Vendors", icon: "🏪" },
              { key: "products", label: "Products", icon: "📦" }
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200
                  ${viewMode === mode.key 
                    ? "bg-[#00b1a5] text-white shadow-sm" 
                    : "text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <span>{mode.icon}</span>
                <span className="font-medium">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-black">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00b1a5] focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id || category.name} value={category.id || category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Vendor Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-black">Vendor:</label>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00b1a5] focus:border-transparent"
              >
                <option value="all">All Vendors</option>
                {getVendorsByCategory(selectedCategory).map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.businessName || vendor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories View */}
        {viewMode === "categories" && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">All Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id || category.name}
                  onClick={() => {
                    setSelectedCategory(category.id || category.name);
                    setViewMode("products");
                  }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group border-2 border-transparent hover:border-[#a3d900]"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                      {category.icon || "🏷️"}
                    </div>
                    <h3 className="font-semibold text-black mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {category.description || "Explore this category"}
                    </p>
                    <div className="bg-[#c6d90d] text-black text-xs px-3 py-1 rounded-full font-medium">
                      {products.filter(p => p.categoryId === category.id || p.category === category.name).length} products
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vendors View */}
        {viewMode === "vendors" && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">
              Vendors {selectedCategory !== "all" && `in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVendorsByCategory(selectedCategory).map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => {
                    setSelectedVendor(vendor.id);
                    setViewMode("products");
                  }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-[#a3d900]"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-[#00b1a5] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {(vendor.businessName || vendor.name).charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-black text-lg">{vendor.businessName || vendor.name}</h3>
                        <p className="text-gray-600 text-sm">{vendor.description || "Quality products and services"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600">
                          {vendor.ratingAverage || "4.5"} ({vendor.ratingCount || "0"} reviews)
                        </span>
                      </div>
                      <div className="bg-[#c6d90d] text-black text-xs px-3 py-1 rounded-full font-medium">
                        {products.filter(p => p.vendorId === vendor.id || p.vendor === vendor.businessName).length} products
                      </div>
                    </div>
                    
                    {vendor.verified && (
                      <div className="mt-3 flex items-center space-x-1 text-[#00b1a5]">
                        <span className="text-sm">✓</span>
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products View */}
        {viewMode === "products" && (
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">
              Products 
              {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              {selectedVendor !== "all" && ` from ${getVendorsByCategory(selectedCategory).find(v => v.id === selectedVendor)?.businessName}`}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {getFilteredProducts().map((product) => (
                <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00b1a5]/20 transition-all duration-300">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <img
                      src={product.imageUrl || product.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.badge && (
                        <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${getBadgeColor(product.badge)}`}>
                          {product.badge}
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="px-2 py-1 text-xs font-bold text-white rounded-full bg-red-500">
                          -{product.discount}%
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all ${
                        favorites.has(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
                    </button>

                    {/* View Product Overlay */}
                    <div 
                      onClick={() => handleViewProduct(product.id)}
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <div className="bg-[#00b1a5] hover:bg-[#008a80] text-white p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-200">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Out of Stock Overlay */}
                    {product.isAvailable === false && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-black mb-1 line-clamp-2">{product.name}</h3>
                    
                    {/* Vendor */}
                    <p className="text-xs text-gray-500 mb-2 truncate">
                      {product.vendor || vendors.find(v => v.id === product.vendorId)?.businessName || "Unknown Vendor"}
                    </p>
                    
                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center mb-2">
                        <Star className="w-3 h-3 text-[#c6d90d] fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    )}
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-[#00b1a5]">
                        AOA {Math.round((product.price || 0) * ANGOLA_RATE * (product.discount ? (1 - product.discount / 100) : 1)).toLocaleString()}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          AOA {Math.round((product.price || 0) * ANGOLA_RATE).toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* View Product Button */}
                    <button
                      onClick={() => handleViewProduct(product.id)}
                      disabled={product.isAvailable === false}
                      className={`
                        w-full py-2 px-4 rounded-lg font-medium transition-all duration-200
                        ${product.isAvailable === false
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#00b1a5] hover:bg-[#00a094] text-white shadow-sm hover:shadow-md"
                        }
                      `}
                    >
                      {product.isAvailable === false ? "Out of Stock" : "View Product"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {getFilteredProducts().length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-black mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more products.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fixed Cart Summary */}
      {getCartItemCount() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#00b1a5] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {getCartItemCount()}
              </div>
              <div>
                <p className="font-bold text-black text-lg">AOA {(getCartTotal() * ANGOLA_RATE).toFixed(0)}</p>
                <p className="text-sm text-gray-600">
                  {getCartItemCount()} item{getCartItemCount() > 1 ? 's' : ''} in cart
                </p>
              </div>
            </div>
            <button className="bg-[#00b1a5] hover:bg-[#00a094] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md">
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}