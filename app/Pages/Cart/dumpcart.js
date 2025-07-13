// app/components/Cart/page.js
'use client';
import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { 
    ShoppingCart, 
    X, 
    Plus, 
    Minus, 
    Trash2, 
    ShoppingBag,
    ArrowRight,
    MapPin,
    Clock
} from 'lucide-react';
import { toast } from 'react-toastify';

const Cart = ({ isOpen, onClose }) => {
    const { 
        items, 
        totalAmount, 
        totalQuantity, 
        updateQuantity, 
        removeFromCart, 
        clearCart 
    } = useCart();
    
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const ANGOLA_RATE = 850; // Conversion rate if needed
    
    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            toast.info('Item removed from cart');
        } else {
            updateQuantity(id, newQuantity);
        }
    };
    
    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true);
            
            // Simulate checkout process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            toast.success('Order placed successfully! 🎉', {
                position: "top-center",
                autoClose: 4000,
                style: {
                    background: '#00b1a5',
                    color: 'white'
                }
            });
            
            clearCart();
            onClose();
        } catch (error) {
            toast.error('Checkout failed. Please try again.', {
                position: "top-center"
            });
        } finally {
            setIsCheckingOut(false);
        }
    };
    
    const deliveryFee = 2500; // AOA 2,500
    const finalTotal = totalAmount + deliveryFee;
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />
            
            {/* Cart Drawer */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-out">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="relative px-6 py-4 bg-gradient-to-r from-[#00b1a5] to-[#008a80] text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <ShoppingCart className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                                    <p className="text-white/80 text-sm">
                                        {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                                <p className="text-gray-600 mb-6">Discover amazing products and add them to your cart</p>
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 bg-gradient-to-r from-[#00b1a5] to-[#008a80] text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-[#00b1a5]/20">
                                        <div className="flex items-center gap-4">
                                            {/* Product Image */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                                                <img
                                                    src={item.image || '/placeholder-product.jpg'}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder-product.jpg';
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                            </div>
                                            
                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mb-2 truncate">
                                                    {item.vendor || 'Unknown vendor'}
                                                </p>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-sm font-bold text-[#00b1a5]">
                                                        AOA {Math.round(item.price * ANGOLA_RATE).toLocaleString()}
                                                    </span>
                                                    {item.discount > 0 && (
                                                        <span className="text-xs text-gray-500 line-through">
                                                            AOA {Math.round(item.price * ANGOLA_RATE / (1 - item.discount/100)).toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="p-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-bold bg-white px-2 py-1">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                    </div>
                                                    
                                                    <button
                                                        onClick={() => {
                                                            removeFromCart(item.id);
                                                            toast.info(`${item.name} removed from cart`);
                                                        }}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150 hover:scale-110"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Clear Cart Button */}
                                {items.length > 0 && (
                                    <button
                                        onClick={() => {
                                            clearCart();
                                            toast.info('Cart cleared');
                                        }}
                                        className="w-full py-3 text-red-600 hover:text-red-700 text-sm font-semibold hover:bg-red-50 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-300 mt-4"
                                    >
                                        Clear All Items
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Checkout Section */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-200 bg-white p-4 space-y-4 shadow-lg">
                            {/* Delivery Info */}
                            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-xl space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <MapPin className="w-4 h-4 text-[#00b1a5]" />
                                    <span className="font-medium">Delivery to Luanda, Angola</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4 text-[#00b1a5]" />
                                    <span>Estimated delivery: 30-45 minutes</span>
                                </div>
                            </div>
                            
                            {/* Order Summary */}
                            <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
                                    <span className="font-semibold text-gray-900">AOA {Math.round(totalAmount * ANGOLA_RATE).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Delivery Fee</span>
                                    <span className="font-semibold text-gray-900">AOA {deliveryFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-base font-bold text-gray-900 border-t border-gray-200 pt-2">
                                    <span>Total</span>
                                    <span className="text-[#00b1a5]">AOA {Math.round(finalTotal * ANGOLA_RATE).toLocaleString()}</span>
                                </div>
                            </div>
                            
                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#00b1a5] to-[#008a80] hover:from-[#008a80] hover:to-[#006b61] text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isCheckingOut ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        Processing Order...
                                    </>
                                ) : (
                                    <>
                                        <span>Proceed to Checkout</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;