// Pages/Products/[id]/page.js
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
    ArrowLeft, 
    Star, 
    Heart, 
    ShoppingCart, 
    Minus, 
    Plus, 
    Share2, 
    Shield, 
    Truck, 
    RotateCcw,
    Zap,
    Leaf,
    Globe,
    Smartphone,
    Check,
    AlertCircle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function ProductDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params?.id;
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [productImages, setProductImages] = useState([]);

    const ANGOLA_RATE = 850;

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                
                console.log('Fetching product with ID:', productId);
                
                // Fetch the products data
                const response = await fetch('/Products/products.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Fetched data:', data);
                
                // Find the product by ID across all categories
                let foundProduct = null;
                let productCategory = null;
                
                // Convert productId to both string and number for comparison
                const idAsString = String(productId);
                const idAsNumber = parseInt(productId, 10);
                
                for (const [categoryName, categoryProducts] of Object.entries(data.productsByCategory || {})) {
                    foundProduct = categoryProducts.find(p => {
                        // Check both string and number comparison
                        return String(p.id) === idAsString || p.id === idAsNumber;
                    });
                    if (foundProduct) {
                        productCategory = categoryName;
                        break;
                    }
                }
                
                console.log('Found product:', foundProduct);
                console.log('Product category:', productCategory);
                
                if (!foundProduct) {
                    throw new Error('Product not found');
                }
                
                // Add category to product object if it doesn't exist
                if (!foundProduct.category) {
                    foundProduct.category = productCategory;
                }
                
                setProduct(foundProduct);
                
                // Setup product images - use multiple images if available, otherwise create variants of the main image
                const images = [];
                if (foundProduct.images && foundProduct.images.length > 0) {
                    images.push(...foundProduct.images);
                } else if (foundProduct.image) {
                    // If only one image, create multiple placeholder variants
                    images.push(foundProduct.image);
                    // Add some placeholder variants for demonstration
                    for (let i = 1; i < 5; i++) {
                        images.push(foundProduct.image);
                    }
                }
                
                setProductImages(images);
                setSelectedImage(0); // Reset to first image
                
                // Get related products from the same category
                const allProducts = Object.values(data.productsByCategory || {}).flat();
                const related = allProducts
                    .filter(p => {
                        const pId = String(p.id);
                        const currentId = String(productId);
                        return pId !== currentId && p.category === foundProduct.category;
                    })
                    .slice(0, 4);
                    
                setRelatedProducts(related);
                
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleAddToCart = () => {
        // Here you would typically add to cart logic
        console.log('Adding to cart:', { productId: product.id, quantity });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleImageSelect = (index) => {
        setSelectedImage(index);
    };

    const handleNextImage = () => {
        setSelectedImage(prev => (prev + 1) % productImages.length);
    };

    const handlePrevImage = () => {
        setSelectedImage(prev => prev === 0 ? productImages.length - 1 : prev - 1);
    };

    const getBadgeColor = (badge) => {
        if (!badge) return 'bg-gray-600';
        
        switch (badge.toLowerCase()) {
            case 'best seller': return 'bg-[#00b1a5]';
            case 'new': return 'bg-[#a3d900]';
            case 'eco': 
            case 'organic': 
            case 'healthy': return 'bg-[#c6d90d]';
            case 'smart': return 'bg-[#00b1a5]';
            case 'trending': return 'bg-purple-500';
            case 'popular': return 'bg-blue-500';
            case 'exclusive': return 'bg-gold-500';
            case 'local': return 'bg-green-600';
            case 'premium': return 'bg-gray-800';
            case 'cozy': return 'bg-orange-500';
            case 'essential': return 'bg-red-600';
            case 'fast acting': return 'bg-blue-600';
            case 'best value': return 'bg-green-500';
            case 'fast': return 'bg-red-500';
            case 'professional': return 'bg-blue-700';
            case 'complete set': return 'bg-indigo-500';
            case 'official': return 'bg-blue-800';
            case 'chef\'s choice': return 'bg-amber-600';
            default: return 'bg-gray-600';
        }
    };

    const getCategoryIcon = (category) => {
        if (!category) return <Zap className="w-4 h-4" />;
        
        switch (category.toLowerCase()) {
            case 'smart devices': 
            case 'store': return <Smartphone className="w-4 h-4" />;
            case 'eco products': 
            case 'supermarket': return <Leaf className="w-4 h-4" />;
            case 'global brands': return <Globe className="w-4 h-4" />;
            case 'bar': return <span className="w-4 h-4 text-sm">🍺</span>;
            case 'pharmacy': return <span className="w-4 h-4 text-sm">💊</span>;
            case 'post office': return <span className="w-4 h-4 text-sm">🏤</span>;
            case 'restaurant': return <span className="w-4 h-4 text-sm">🍽️</span>;
            default: return <Zap className="w-4 h-4" />;
        }
    };

    const handleRelatedProductClick = (relatedProductId) => {
        // Navigate to the related product
        router.push(`/Pages/Products/${relatedProductId}`);
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

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                    <div className="text-center">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
                        <p className="text-gray-600 mb-6">
                            {error || "The product you're looking for doesn't exist or has been removed."}
                        </p>
                        <button
                            onClick={() => router.push('/Pages/Products')}
                            className="bg-[#00b1a5] hover:bg-[#008a80] text-white px-6 py-3 rounded-xl font-medium transition-colors"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Safe price calculations with fallbacks
    const basePrice = product.price || 0;
    const discount = product.discount || 0;
    const finalPrice = basePrice * ANGOLA_RATE * (discount ? (1 - discount / 100) : 1);
    const originalPrice = basePrice * ANGOLA_RATE;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-600 hover:text-[#00b1a5] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Products
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group">
                            <img
                                src={productImages[selectedImage] || product.image || '/api/placeholder/400/400'}
                                alt={product.name || 'Product image'}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.src = '/api/placeholder/400/400';
                                }}
                            />
                            
                            {/* Navigation Arrows */}
                            {productImages.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight className="w-5 h-5 text-gray-700" />
                                    </button>
                                </>
                            )}
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.badge && (
                                    <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${getBadgeColor(product.badge)}`}>
                                        {product.badge}
                                    </span>
                                )}
                                {discount > 0 && (
                                    <span className="px-3 py-1 text-xs font-bold text-white rounded-full bg-red-500">
                                        -{discount}% OFF
                                    </span>
                                )}
                            </div>

                            {/* Favorite Button */}
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all ${
                                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                            </button>

                            {/* Image Counter */}
                            {productImages.length > 1 && (
                                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                                    {selectedImage + 1} / {productImages.length}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {productImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleImageSelect(index)}
                                        className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                            selectedImage === index
                                                ? 'border-[#00b1a5] shadow-lg scale-105'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img
                                            src={image || '/api/placeholder/400/400'}
                                            alt={`${product.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/400/400';
                                            }}
                                        />
                                        {selectedImage === index && (
                                            <div className="absolute inset-0 bg-[#00b1a5]/20 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-[#00b1a5] rounded-full"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category & Vendor */}
                        <div className="flex items-center gap-4 text-sm">
                            {product.category && (
                                <div className="flex items-center text-[#00b1a5] font-medium">
                                    {getCategoryIcon(product.category)}
                                    <span className="ml-2">{product.category}</span>
                                </div>
                            )}
                            {product.vendor && (
                                <div className="text-gray-500">
                                    by {product.vendor}
                                </div>
                            )}
                        </div>

                        {/* Product Name */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        {product.rating && (
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < Math.floor(product.rating)
                                                    ? 'text-[#c6d90d] fill-current'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                                <span className="text-gray-500">(128 reviews)</span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-gray-900">
                                    AOA {Math.round(finalPrice).toLocaleString()}
                                </span>
                                {discount > 0 && (
                                    <span className="text-xl text-gray-500 line-through">
                                        AOA {Math.round(originalPrice).toLocaleString()}
                                    </span>
                                )}
                            </div>
                            {discount > 0 && (
                                <p className="text-green-600 font-medium">
                                    You save AOA {Math.round(originalPrice - finalPrice).toLocaleString()}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                                {product.description || 
                                 "Experience premium quality and innovative design with this exceptional product. Crafted with attention to detail and built to exceed your expectations."}
                            </p>
                        </div>

                        {/* Delivery Time */}
                        {product.deliveryTime && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Truck className="w-4 h-4" />
                                <span>Delivery: {product.deliveryTime}</span>
                            </div>
                        )}

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.inStock !== false ? (
                                <>
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span className="text-green-600 font-medium">In Stock</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <span className="text-red-600 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Quantity & Add to Cart */}
                        {product.inStock !== false && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-medium text-gray-900">Quantity:</span>
                                    <div className="flex items-center border border-gray-200 rounded-xl">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            className="p-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="p-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-medium transition-all ${
                                            addedToCart
                                                ? 'bg-green-500 text-white'
                                                : 'bg-[#00b1a5] hover:bg-[#008a80] text-white'
                                        }`}
                                    >
                                        {addedToCart ? (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Added to Cart!
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                    <button className="p-4 border border-gray-200 rounded-xl hover:border-[#00b1a5] transition-colors">
                                        <Share2 className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="p-2 bg-[#00b1a5]/10 rounded-lg">
                                    <Truck className="w-4 h-4 text-[#00b1a5]" />
                                </div>
                                <span>Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="p-2 bg-[#00b1a5]/10 rounded-lg">
                                    <RotateCcw className="w-4 h-4 text-[#00b1a5]" />
                                </div>
                                <span>30-Day Returns</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="p-2 bg-[#00b1a5]/10 rounded-lg">
                                    <Shield className="w-4 h-4 text-[#00b1a5]" />
                                </div>
                                <span>2-Year Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map((relatedProduct) => {
                                const relatedFinalPrice = relatedProduct.price * ANGOLA_RATE * (relatedProduct.discount ? (1 - relatedProduct.discount / 100) : 1);
                                
                                return (
                                    <div
                                        key={relatedProduct.id}
                                        className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00b1a5]/20 transition-all duration-300 cursor-pointer"
                                        onClick={() => handleRelatedProductClick(relatedProduct.id)}
                                    >
                                        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                                            <img
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = "";
                                                }}
                                            />
                                            {relatedProduct.discount > 0 && (
                                                <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded-full bg-red-500">
                                                    -{relatedProduct.discount}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-sm text-black mb-1 line-clamp-2">
                                                {relatedProduct.name}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-sm text-black">
                                                    AOA {Math.round(relatedFinalPrice).toLocaleString()}
                                                </span>
                                                {relatedProduct.rating && (
                                                    <div className="flex items-center">
                                                        <Star className="w-3 h-3 text-[#c6d90d] fill-current" />
                                                        <span className="text-xs text-gray-600 ml-1">{relatedProduct.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
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