// app/Context/CartContext.js
'use client';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
    cart: {
        items: [],
        totalAmount: 0,
        totalQuantity: 0,
        isLoading: false,
        error: null
    },
    orders: {
        list: [],
        isLoading: false,
        error: null
    }
};

// Action types
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    SET_CART_LOADING: 'SET_CART_LOADING',
    SET_CART_ERROR: 'SET_CART_ERROR',
    LOAD_CART: 'LOAD_CART',
    CREATE_ORDER: 'CREATE_ORDER',
    SET_ORDERS_LOADING: 'SET_ORDERS_LOADING',
    SET_ORDERS_ERROR: 'SET_ORDERS_ERROR',
    LOAD_ORDERS: 'LOAD_ORDERS'
};

// Cart reducer
const reducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const newItem = action.payload;
            const existingItemIndex = state.cart.items.findIndex(item => item.id === newItem.id);
            
            let updatedItems;
            if (existingItemIndex >= 0) {
                updatedItems = state.cart.items.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                updatedItems = [...state.cart.items, newItem];
            }
            
            const totalQuantity = updatedItems.reduce((total, item) => total + item.quantity, 0);
            const totalAmount = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: updatedItems,
                    totalQuantity,
                    totalAmount
                }
            };
        }
        
        case CART_ACTIONS.REMOVE_ITEM: {
            const updatedItems = state.cart.items.filter(item => item.id !== action.payload);
            const totalQuantity = updatedItems.reduce((total, item) => total + item.quantity, 0);
            const totalAmount = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: updatedItems,
                    totalQuantity,
                    totalAmount
                }
            };
        }
        
        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;
            
            if (quantity <= 0) {
                return reducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: id });
            }
            
            const updatedItems = state.cart.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
            
            const totalQuantity = updatedItems.reduce((total, item) => total + item.quantity, 0);
            const totalAmount = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: updatedItems,
                    totalQuantity,
                    totalAmount
                }
            };
        }
        
        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: [],
                    totalAmount: 0,
                    totalQuantity: 0
                }
            };
        
        case CART_ACTIONS.SET_CART_LOADING:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    isLoading: action.payload
                }
            };
        
        case CART_ACTIONS.SET_CART_ERROR:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    error: action.payload
                }
            };
        
        case CART_ACTIONS.LOAD_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: action.payload.items || [],
                    totalAmount: action.payload.totalAmount || 0,
                    totalQuantity: action.payload.totalQuantity || 0
                }
            };
        
        case CART_ACTIONS.CREATE_ORDER: {
            const newOrder = action.payload;
            return {
                ...state,
                orders: {
                    ...state.orders,
                    list: [newOrder, ...state.orders.list]
                },
                cart: {
                    ...state.cart,
                    items: [],
                    totalAmount: 0,
                    totalQuantity: 0
                }
            };
        }
        
        case CART_ACTIONS.LOAD_ORDERS:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    list: action.payload || []
                }
            };
        
        case CART_ACTIONS.SET_ORDERS_LOADING:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    isLoading: action.payload
                }
            };
        
        case CART_ACTIONS.SET_ORDERS_ERROR:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    error: action.payload
                }
            };
        
        default:
            return state;
    }
};

// Create context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Cart provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const ANGOLA_RATE = 850;
    
    // Load cart and orders from localStorage on mount
    useEffect(() => {
        const loadData = () => {
            try {
                const savedCart = localStorage.getItem('meudeliver-cart');
                const savedOrders = localStorage.getItem('meudeliver-orders');
                
                if (savedCart) {
                    const cartData = JSON.parse(savedCart);
                    dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
                }
                
                if (savedOrders) {
                    const ordersData = JSON.parse(savedOrders);
                    dispatch({ type: CART_ACTIONS.LOAD_ORDERS, payload: ordersData });
                }
            } catch (error) {
                console.error('Error loading data:', error);
                toast.error('Failed to load saved data');
            }
        };
        
        loadData();
    }, []);
    
    // Save cart and orders to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('meudeliver-cart', JSON.stringify({
                items: state.cart.items,
                totalAmount: state.cart.totalAmount,
                totalQuantity: state.cart.totalQuantity
            }));
            
            localStorage.setItem('meudeliver-orders', JSON.stringify(state.orders.list));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }, [state.cart.items, state.cart.totalQuantity, state.orders.list]);
    
    // Cart actions
    const addToCart = (product, quantity = 1) => {
        try {
            const finalPrice = product.price * ANGOLA_RATE * (product.discount ? (1 - product.discount / 100) : 1);
            
            const cartItem = {
                id: product.id,
                name: product.name,
                image: product.image,
                price: finalPrice,
                originalPrice: product.price * ANGOLA_RATE,
                discount: product.discount || 0,
                quantity: quantity,
                category: product.category,
                vendor: product.vendor,
                badge: product.badge
            };
            
            dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
            
            toast.success(`${product.name} added to cart!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    background: '#00b1a5',
                    color: 'white'
                }
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add item to cart');
        }
    };
    
    const removeFromCart = (productId) => {
        try {
            dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
            toast.info('Item removed from cart', {
                position: "top-right",
                autoClose: 2000,
                style: {
                    background: '#a3d900',
                    color: 'white'
                }
            });
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast.error('Failed to remove item from cart');
        }
    };
    
    const updateQuantity = (productId, quantity) => {
        try {
            dispatch({ 
                type: CART_ACTIONS.UPDATE_QUANTITY, 
                payload: { id: productId, quantity } 
            });
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('Failed to update quantity');
        }
    };
    
    const clearCart = () => {
        try {
            dispatch({ type: CART_ACTIONS.CLEAR_CART });
            toast.success('Cart cleared successfully!', {
                position: "top-right",
                autoClose: 2000,
                style: {
                    background: '#c6d90d',
                    color: 'black'
                }
            });
        } catch (error) {
            console.error('Error clearing cart:', error);
            toast.error('Failed to clear cart');
        }
    };
    
    const getItemQuantity = (productId) => {
        const item = state.cart.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };
    
    const isInCart = (productId) => {
        return state.cart.items.some(item => item.id === productId);
    };
    
    // Order actions
    const createOrder = async (customerInfo) => {
        try {
            dispatch({ type: CART_ACTIONS.SET_ORDERS_LOADING, payload: true });
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newOrder = {
                id: `ORD-${Date.now()}`,
                date: new Date().toISOString(),
                status: 'processing',
                items: [...state.cart.items],
                total: state.cart.totalAmount,
                deliveryFee: 2500,
                address: customerInfo.address,
                paymentMethod: customerInfo.paymentMethod,
                customerName: customerInfo.name,
                customerPhone: customerInfo.phone,
                trackingNumber: `TRK-${Math.floor(Math.random() * 1000000)}`
            };
            
            dispatch({ type: CART_ACTIONS.CREATE_ORDER, payload: newOrder });
            
            toast.success('Order created successfully!', {
                position: "top-right",
                autoClose: 3000,
                style: {
                    background: '#00b1a5',
                    color: 'white'
                }
            });
            
            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            dispatch({ type: CART_ACTIONS.SET_ORDERS_ERROR, payload: error.message });
            toast.error('Failed to create order');
            throw error;
        } finally {
            dispatch({ type: CART_ACTIONS.SET_ORDERS_LOADING, payload: false });
        }
    };
    
    const getOrderById = (orderId) => {
        return state.orders.list.find(order => order.id === orderId);
    };
    
    const value = {
        cart: {
            items: state.cart.items,
            totalAmount: state.cart.totalAmount,
            totalQuantity: state.cart.totalQuantity,
            isLoading: state.cart.isLoading,
            error: state.cart.error,
        },
        orders: {
            list: state.orders.list,
            isLoading: state.orders.isLoading,
            error: state.orders.error,
        },
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        isInCart,
        createOrder,
        getOrderById
    };
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};