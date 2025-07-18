// app/orders/[id]/page.js
"use client";
import { useCart } from '../../../Context/CartContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock, Truck } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderConfirmation = ({ params }) => {
    const router = useRouter();
    const { getOrderById } = useCart();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = () => {
            try {
                const orderData = getOrderById(params.id);
                if (!orderData) {
                    toast.error('Order not found');
                    router.push('/orders');
                    return;
                }
                setOrder(orderData);
            } catch (error) {
                console.error('Error fetching order:', error);
                toast.error('Failed to load order details');
                router.push('/orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [params.id, getOrderById, router]);

    if (loading) {
        return <div className="p-8 text-center">Loading order details...</div>;
    }

    if (!order) {
        return <div className="p-8 text-center">Order not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md p-8">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-600">
                        Thank you for your order #{order.id.split('-')[1]}
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Processing</h3>
                                <p className="text-gray-600">We're preparing your order</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                                <Truck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Shipping</h3>
                                <p className="text-gray-600">Will be shipped soon</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium">
                                        AOA {Math.round(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>AOA {Math.round(order.total - order.deliveryFee).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span>AOA {order.deliveryFee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2">
                                <span>Total</span>
                                <span>AOA {Math.round(order.total).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-gray-900 mb-4">Delivery Information</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900">Customer</h4>
                                <p className="text-gray-600">{order.name}</p>
                                <p className="text-gray-600">{order.phone}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Address</h4>
                                <p className="text-gray-600">{order.address}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Payment Method</h4>
                                <p className="text-gray-600">Cash on Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => router.push('/orders')}
                        className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                    >
                        View All Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;