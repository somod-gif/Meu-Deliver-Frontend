"use client";
import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { 
    ShoppingCart, 
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

const Cart = ({ onOrderCreated }) => {
    const { 
        cart: {
            items = [],
            totalAmount = 0, 
            totalQuantity = 0
        },
        updateQuantity, 
        removeFromCart, 
        clearCart,
        createOrder
    } = useCart();
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    
    const ANGOLA_RATE = 850;
    const deliveryFee = 2500;
    const finalTotal = totalAmount + deliveryFee;

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            toast.info('Item removed from cart');
        } else {
            updateQuantity(id, newQuantity);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckout = async () => {
        if (items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
        setShowCheckoutForm(true);
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            setIsProcessing(true);
            
            const orderData = {
                ...customerInfo,
                paymentMethod: 'cash', // Force cash on delivery
                items: [...items],
                total: finalTotal,
                deliveryFee
            };

            const newOrder = await createOrder(orderData);
            
            toast.success('Order placed successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            if (onOrderCreated) {
                onOrderCreated(newOrder);
            }

            setShowCheckoutForm(false);
            clearCart();
        } catch (error) {
            console.error('Order error:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden">
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
                    </div>
                </div>
                
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                    {!items || items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <ShoppingBag className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-600 mb-6">Discover amazing products and add them to your cart</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-teal-200">
                                    <div className="flex items-center gap-4">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                                            {item.image && (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                />
                                            )}
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">
                                                {item.name || 'Unnamed Product'}
                                            </h3>
                                            <p className="text-xs text-gray-500 mb-2 truncate">
                                                {item.vendor || 'Unknown Vendor'}
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
                {items && items.length > 0 && (
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
                        
                        {/* Checkout Form (Conditional) */}
                        {showCheckoutForm ? (
                            <form onSubmit={handlePlaceOrder} className="space-y-4">
                                <div className="space-y-3">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={customerInfo.name}
                                            onChange={handleInputChange}
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
                                            value={customerInfo.phone}
                                            onChange={handleInputChange}
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
                                            value={customerInfo.address}
                                            onChange={handleInputChange}
                                            placeholder="Delivery Address"
                                            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-teal-700">
                                            <CreditCard className="w-5 h-5" />
                                            <span className="font-medium">Payment on Delivery</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            You'll pay in cash when your order arrives
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowCheckoutForm(false)}
                                        className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                    >
                                        {isProcessing ? 'Placing Order...' : 'Confirm Order'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Proceed to Checkout</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;