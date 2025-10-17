import React from 'react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrashIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover mr-4" />
                <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-gray-600">-</button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-gray-600">+</button>
                </div>
                 <TrashIcon onClick={() => removeFromCart(item.id)} />
            </div>
        </div>
    );
};


const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, totalPrice, itemCount, clearCart } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">Your Cart ({itemCount})</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {cartItems.length > 0 ? (
            <>
              <div className="flex-grow overflow-y-auto px-6 divide-y">
                {cartItems.map(item => <CartItemRow key={item.id} item={item} />)}
              </div>
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">₹{totalPrice.toFixed(2)}</span>
                </div>
                <button onClick={() => alert('Proceeding to checkout!')} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-purple-700 transition-colors duration-200">
                  Checkout
                </button>
                <button onClick={clearCart} className="w-full text-center text-sm text-gray-500 mt-4 hover:text-red-600">
                    Clear Cart
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">Your cart is empty</h3>
              <p className="text-gray-500 mt-2">Add items to get started!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
