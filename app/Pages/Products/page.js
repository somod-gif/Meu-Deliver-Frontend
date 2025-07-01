'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Grid, List, Star, Eye, ShoppingCart, Heart, Zap, Leaf, Globe, Smartphone } from 'lucide-react';

export default function ModernProductsPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('All');
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Set());
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [allProducts, setAllProducts] = useState([]);

    const ANGOLA_RATE = 850;

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

                const allProductsArray = Object.values(data.productsByCategory || {}).flat();
                setAllProducts(allProductsArray);

            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = (activeCategory === 'All' ? allProducts : productsByCategory[activeCategory] || [])
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.vendor && product.vendor.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesSearch;
        });

    const toggleFavorite = (productId) => {
        const newFavorites = new Set(favorites);
        if (favorites.has(productId)) {
            newFavorites.delete(productId);
        } else {
            newFavorites.add(productId);
        }
        setFavorites(newFavorites);
    };

    const getBadgeColor = (badge) => {
        switch (badge?.toLowerCase()) {
            case 'best seller': return 'bg-[#00b1a5]';
            case 'new': return 'bg-[#a3d900]';
            case 'eco': case 'organic': return 'bg-[#c6d90d]';
            case 'smart': return 'bg-[#00b1a5]';
            default: return 'bg-gray-600';
        }
    };

    const handleViewProduct = (productId) => {
        router.push(`/products/${productId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                    <div className="flex items-center justify-center h-64">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"></div>
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00b1a5] border-t-transparent absolute top-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="relative overflow-hidden bg-gradient-to-r from-[#00b1a5] via-[#00b1a5] to-[#a3d900] py-16 sm:py-24">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                        Discover Amazing
                        <span className="block bg-gradient-to-r from-[#c6d90d] to-[#a3d900] bg-clip-text text-transparent">
                            Products
                        </span>
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Curated collection of premium products that blend innovation, sustainability, and style
                    </p>

                    <div className="max-w-md mx-auto relative">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border-0 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute top-20 left-10 animate-float">
                    <div className="w-16 h-16 bg-[#c6d90d]/30 rounded-full blur-xl"></div>
                </div>
                <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
                    <div className="w-24 h-24 bg-[#a3d900]/30 rounded-full blur-xl"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                            <Zap className="w-6 h-6 text-[#00b1a5] mr-2" />
                            Shop by Category
                        </h2>
                        <div className="flex overflow-x-auto pb-2 -mx-2 sm:mx-0 sm:flex-wrap sm:gap-3">
                            <button
                                onClick={() => setActiveCategory('All')}
                                className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shrink-0 mx-2 sm:mx-0
                                    ${activeCategory === 'All'
                                        ? 'bg-gradient-to-r from-[#00b1a5] to-[#a3d900] text-white shadow-lg shadow-[#00b1a5]/30'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                            >
                                <span className="text-lg mr-2">🌟</span>
                                <span>All</span>
                                <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                                    {allProducts.length}
                                </span>
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shrink-0 mx-2 sm:mx-0
                                        ${activeCategory === category.name
                                            ? 'bg-gradient-to-r from-[#00b1a5] to-[#a3d900] text-white shadow-lg shadow-[#00b1a5]/30'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    <span className="text-lg mr-2">{category.icon}</span>
                                    <span>{category.name}</span>
                                    <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                                        {(productsByCategory[category.name] || []).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#00b1a5] text-white' : 'text-gray-600 hover:text-[#00b1a5]'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#00b1a5] text-white' : 'text-gray-600 hover:text-[#00b1a5]'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="text-gray-600 font-medium">
                                {filteredProducts.length} products found
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00b1a5] bg-white"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest</option>
                            </select>

                            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-xl hover:border-[#00b1a5] transition-colors">
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </button>
                        </div>
                    </div>

                    <div className={`grid gap-3 sm:gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00b1a5]/20 transition-all duration-300"
                            >
                                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                                        {product.badge && (
                                            <span className={`px-2 py-1 text-[10px] font-bold text-white rounded-full ${getBadgeColor(product.badge)}`}>
                                                {product.badge}
                                            </span>
                                        )}
                                        {product.discount > 0 && (
                                            <span className="px-2 py-1 text-[10px] font-bold text-white rounded-full bg-red-500">
                                                -{product.discount}%
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(product.id);
                                        }}
                                        className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-all ${favorites.has(product.id)
                                                ? 'bg-red-500 text-white'
                                                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                                            }`}
                                    >
                                        <Heart className={`w-3 h-3 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
                                    </button>

                                    <div
                                        onClick={() => handleViewProduct(product.id)}
                                        className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer"
                                    >
                                        <div className="bg-[#00b1a5] hover:bg-[#008a80] text-white p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-200">
                                            <Eye className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-3">
                                    <h3 className="font-semibold text-xs sm:text-sm text-black mb-1 line-clamp-2 leading-tight">
                                        {product.name}
                                    </h3>
                                    {product.vendor && (
                                        <p className="text-xs text-gray-500 mb-1 truncate">{product.vendor}</p>
                                    )}

                                    {product.rating && (
                                        <div className="flex items-center mb-2">
                                            <div className="flex items-center">
                                                <Star className="w-3 h-3 text-[#c6d90d] fill-current" />
                                                <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-sm text-black">
                                            AOA {Math.round(product.price * ANGOLA_RATE * (product.discount ? (1 - product.discount / 100) : 1)).toLocaleString()}
                                        </span>
                                        {product.discount > 0 && (
                                            <span className="text-xs text-gray-500 line-through">
                                                AOA {Math.round(product.price * ANGOLA_RATE).toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleViewProduct(product.id)}
                                        className={`w-full text-xs py-1.5 px-2 rounded-lg font-medium transition-all ${product.inStock !== false
                                                ? 'bg-[#00b1a5] hover:bg-[#008a80] text-white'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {product.inStock !== false ? 'View' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}