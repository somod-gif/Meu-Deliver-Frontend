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
    Banknote,
    ChevronDown
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
        state: '',
        city: '',
        province: '',
        street: '',
        paymentMethod: 'card'
    });
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [hasShownEmptyCartAlert, setHasShownEmptyCartAlert] = useState(false);
    
    const angolaStates = [
        'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango',
        'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla',
        'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico',
        'Namibe', 'Uíge', 'Zaire'
    ];
    
    const ANGOLA_RATE = 850;
    const deliveryFee = 2500;
    const finalTotal = totalAmount + deliveryFee;

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
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
            if (!hasShownEmptyCartAlert) {
                toast.error('Your cart is empty');
                setHasShownEmptyCartAlert(true);
            }
            return;
        }
        setShowCheckoutForm(true);
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        const requiredFields = ['name', 'phone', 'state', 'city', 'province', 'street'];
        const missingFields = requiredFields.filter(field => !customerInfo[field]);
        
        if (missingFields.length > 0) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            setIsProcessing(true);
            
            const orderData = {
                ...customerInfo,
                items: [...items],
                total: finalTotal,
                deliveryFee
            };

            const newOrder = await createOrder(orderData);
            
            toast.success('Order placed successfully!');
            if (onOrderCreated) onOrderCreated(newOrder);

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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="flex items-center gap-3 p-6 border-b">
                        <ShoppingCart className="w-8 h-8 text-[#00b1a5]" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                            <p className="text-gray-500">{totalQuantity} items in your cart</p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-6">
                                {items.length === 0 ? (
                                    <div className="text-center py-16">
                                        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
                                        <p className="text-gray-500 mb-6">Add some products to get started</p>
                                        <button 
                                            onClick={() => window.history.back()}
                                            className="px-6 py-3 bg-[#00b1a5] hover:bg-[#00a398] text-white font-medium rounded-lg"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    {item.image && (
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">{item.vendor}</p>
                                                    <p className="text-[#00b1a5] font-semibold mt-1">
                                                        AOA {Math.round(item.price * ANGOLA_RATE).toLocaleString()}
                                                    </p>
                                                    
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center border rounded-lg">
                                                            <button
                                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                className="p-2 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                className="p-2 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {items.length > 0 && (
                                            <div className="pt-4 border-t">
                                                <button
                                                    onClick={clearCart}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                                                >
                                                    Clear All Items
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Checkout */}
                    {items.length > 0 && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm sticky top-4">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                                    
                                    {/* Delivery Info */}
                                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>Delivery Address</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>30-45 minutes</span>
                                        </div>
                                    </div>

                                    {/* Price Summary */}
                                    <div className="space-y-3 text-sm mb-6">
                                        <div className="flex justify-between">
                                            <span>Subtotal ({totalQuantity} items)</span>
                                            <span>AOA {Math.round(totalAmount * ANGOLA_RATE).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Delivery Fee</span>
                                            <span>AOA {deliveryFee.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-base border-t pt-3">
                                            <span>Total</span>
                                            <span className="text-[#00b1a5]">AOA {Math.round(finalTotal * ANGOLA_RATE).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Checkout Form */}
                                    {showCheckoutForm ? (
                                        <form onSubmit={handlePlaceOrder} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={customerInfo.name}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={customerInfo.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                <div className="relative">
                                                    <select
                                                        name="state"
                                                        value={customerInfo.state}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b1a5] focus:border-[#00b1a5] appearance-none"
                                                        required
                                                    >
                                                        <option value="">Select State</option>
                                                        {angolaStates.map(state => (
                                                            <option key={state} value={state}>{state}</option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="w-5 h-5 absolute right-3 top-3 text-gray-400 pointer-events-none" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={customerInfo.city}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                                                    <input
                                                        type="text"
                                                        name="province"
                                                        value={customerInfo.province}
                                                        onChange={handleInputChange}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    value={customerInfo.street}
                                                    onChange={handleInputChange}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b1a5] focus:border-[#00b1a5]"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                                <div className="space-y-2">
                                                    {[
                                                        { value: 'card', icon: CreditCard, label: 'Credit/Debit Card' },
                                                        { value: 'transfer', icon: Banknote, label: 'Bank Transfer' },
                                                        { value: 'delivery', icon: Banknote, label: 'Cash on Delivery' }
                                                    ].map((method) => (
                                                        <label key={method.value} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                                            <input
                                                                type="radio"
                                                                name="paymentMethod"
                                                                value={method.value}
                                                                checked={customerInfo.paymentMethod === method.value}
                                                                onChange={handleInputChange}
                                                                className="text-[#00b1a5] focus:ring-[#00b1a5]"
                                                            />
                                                            <method.icon className="w-5 h-5 text-gray-600" />
                                                            <span>{method.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCheckoutForm(false)}
                                                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isProcessing}
                                                    className="flex-1 py-3 bg-[#00b1a5] hover:bg-[#00a398] text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
                                                >
                                                    {isProcessing ? 'Processing...' : 'Place Order'}
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button
                                            onClick={handleCheckout}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#00b1a5] hover:bg-[#00a398] text-white font-medium rounded-lg transition-colors"
                                        >
                                            <span>Proceed to Checkout</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;