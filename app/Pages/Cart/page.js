"use client";
import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { 
    ShoppingCart, 
    X, 
    Plus, 
    Minus, 
    Trash2, 
    ShoppingBag,
    ArrowRight,
    MapPin,
    Clock,
    CreditCard,
    User,
    Phone,
    Home
} from 'lucide-react';

const Cart = ({ isOpen, onClose, onCheckout }) => {
    const { 
        items, 
        totalAmount, 
        totalQuantity, 
        updateQuantity, 
        removeFromCart, 
        clearCart 
    } = useCart();
    
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const ANGOLA_RATE = 850;
    
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
            await new Promise(resolve => setTimeout(resolve, 1000));
            onCheckout();
            onClose();
        } catch (error) {
            toast.error('Checkout failed. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };
    
    const deliveryFee = 2500;
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
                    <div className="relative px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
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
                                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-teal-200">
                                        <div className="flex items-center gap-4">
                                            {/* Product Image */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            </div>
                                            
                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mb-2 truncate">
                                                    {item.vendor}
                                                </p>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-sm font-bold text-teal-600">
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
                                                        >
                                                            <Minus className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-bold bg-white px-2 py-1">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150"
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
                                    <MapPin className="w-4 h-4 text-teal-600" />
                                    <span className="font-medium">Delivery to Luanda, Angola</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4 text-teal-600" />
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
                                    <span className="text-teal-600">AOA {Math.round(finalTotal * ANGOLA_RATE).toLocaleString()}</span>
                                </div>
                            </div>
                            
                            {/* Checkout Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
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

const Checkout = ({ isOpen, onClose, onBackToCart }) => {
    const { 
        items, 
        totalAmount, 
        totalQuantity,
        clearCart
    } = useCart();
    
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'cash'
    });
    
    const ANGOLA_RATE = 850;
    const deliveryFee = 2500;
    const finalTotal = totalAmount + deliveryFee;
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsPlacingOrder(true);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would typically send the order to your backend
            const orderData = {
                customer: formData,
                items,
                total: finalTotal,
                paymentMethod: formData.paymentMethod
            };
            
            console.log('Order submitted:', orderData);
            
            toast.success('Order placed successfully! 🎉');
            clearCart();
            onClose();
        } catch (error) {
            toast.error('Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    };
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />
            
            {/* Checkout Drawer */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-out">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="relative px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Checkout</h2>
                                    <p className="text-white/80 text-sm">
                                        Complete your purchase
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                                aria-label="Close checkout"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Checkout Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
                                <div className="space-y-3">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold text-teal-600">
                                                AOA {Math.round(item.price * ANGOLA_RATE * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">AOA {Math.round(totalAmount * ANGOLA_RATE).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Delivery Fee</span>
                                        <span className="font-medium">AOA {deliveryFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2">
                                        <span>Total</span>
                                        <span className="text-teal-600">AOA {Math.round(finalTotal * ANGOLA_RATE).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Customer Information Form */}
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
                                <h3 className="font-bold text-gray-900 mb-2">Customer Information</h3>
                                
                                <div className="space-y-3">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Home className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Delivery Address"
                                            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="pt-2">
                                        <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cash"
                                                    checked={formData.paymentMethod === 'cash'}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                                                />
                                                <span className="text-gray-900">Cash on Delivery</span>
                                            </label>
                                            <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="card"
                                                    checked={formData.paymentMethod === 'card'}
                                                    onChange={handleChange}
                                                    className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                                                />
                                                <span className="text-gray-900">Credit/Debit Card</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onBackToCart}
                                        className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                                    >
                                        Back to Cart
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPlacingOrder}
                                        className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                    >
                                        {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Demo Component
const CartDemo = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cart Demo</h1>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <p className="text-gray-600 mb-4">Click the button below to open the cart</p>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Open Cart 
                    </button>
                </div>
            </div>
            
            <Cart 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                onCheckout={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                }}
            />
            
            <Checkout 
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onBackToCart={() => {
                    setIsCheckoutOpen(false);
                    setIsCartOpen(true);
                }}
            />
        </div>
    );
};

export default CartDemo;