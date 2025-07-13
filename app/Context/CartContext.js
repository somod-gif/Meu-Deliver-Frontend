// app/Context/CartContext.js
'use client';
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    isLoading: false,
    error: null
};

// Action types
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    LOAD_CART: 'LOAD_CART'
};

// Cart reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
            
            let updatedItems;
            if (existingItemIndex >= 0) {
                // Item exists, update quantity
                updatedItems = state.items.map((item, index) => 
                    index === existingItemIndex 
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                // New item
                updatedItems = [...state.items, newItem];
            }
            
            return {
                ...state,
                items: updatedItems,
                totalQuantity: updatedItems.reduce((total, item) => total + item.quantity, 0),
                totalAmount: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
            };
        }
        
        case CART_ACTIONS.REMOVE_ITEM: {
            const updatedItems = state.items.filter(item => item.id !== action.payload);
            
            return {
                ...state,
                items: updatedItems,
                totalQuantity: updatedItems.reduce((total, item) => total + item.quantity, 0),
                totalAmount: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
            };
        }
        
        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;
            
            if (quantity <= 0) {
                return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: id });
            }
            
            const updatedItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
            
            return {
                ...state,
                items: updatedItems,
                totalQuantity: updatedItems.reduce((total, item) => total + item.quantity, 0),
                totalAmount: updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
            };
        }
        
        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: [],
                totalAmount: 0,
                totalQuantity: 0
            };
        
        case CART_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        
        case CART_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        
        case CART_ACTIONS.LOAD_CART:
            return {
                ...state,
                items: action.payload.items || [],
                totalAmount: action.payload.totalAmount || 0,
                totalQuantity: action.payload.totalQuantity || 0
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
    const [state, dispatch] = useReducer(cartReducer, initialState);
    
    // Load cart from localStorage on mount
    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = localStorage.getItem('meudeliver-cart');
                if (savedCart) {
                    const cartData = JSON.parse(savedCart);
                    dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
                }
            } catch (error) {
                console.error('Error loading cart:', error);
                toast.error('Failed to load cart data');
            }
        };
        
        loadCart();
    }, []);
    
    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            const cartData = {
                items: state.items,
                totalAmount: state.totalAmount,
                totalQuantity: state.totalQuantity
            };
            localStorage.setItem('meudeliver-cart', JSON.stringify(cartData));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }, [state.items, state.totalAmount, state.totalQuantity]);
    
    // Cart actions
    const addToCart = (product, quantity = 1) => {
        try {
            const ANGOLA_RATE = 850;
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
        const item = state.items.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };
    
    const isInCart = (productId) => {
        return state.items.some(item => item.id === productId);
    };
    
    const value = {
        // State
        items: state.items,
        totalAmount: state.totalAmount,
        totalQuantity: state.totalQuantity,
        isLoading: state.isLoading,
        error: state.error,
        
        // Actions
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        isInCart
    };
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};