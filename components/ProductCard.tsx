import React from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const itemInCart = cartItems.find(item => item.id === product.id);

  const handleAdd = () => addToCart(product);
  const handleIncrement = () => itemInCart && updateQuantity(product.id, itemInCart.quantity + 1);
  const handleDecrement = () => itemInCart && updateQuantity(product.id, itemInCart.quantity - 1);
  
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-32 sm:h-40 object-cover" />
        {savings > 0 && <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">SAVE ₹{savings.toFixed(0)}</div>}
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-sm font-semibold text-gray-800 leading-tight">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{product.weight}</p>
          {product.rating && (
            <div className="flex items-center mt-2">
                <StarIcon filled={true}/>
                <span className="text-xs text-gray-600 font-semibold ml-1">{product.rating.toFixed(1)} ({product.ratingCount})</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-sm font-bold text-gray-800">₹{product.price.toFixed(0)}</p>
            {product.originalPrice && <p className="text-xs text-gray-400 line-through">₹{product.originalPrice.toFixed(0)}</p>}
          </div>
          
          {!itemInCart ? (
            <button
              onClick={handleAdd}
              className="border border-rose-500 bg-rose-50 text-rose-600 font-bold py-2 px-5 rounded-lg hover:bg-rose-100 transition-colors duration-200 text-sm"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center justify-between bg-rose-500 text-white font-bold rounded-lg text-sm">
                <button onClick={handleDecrement} className="px-3 py-2 rounded-l-lg hover:bg-rose-600 transition-colors">
                    -
                </button>
                <span className="px-3">{itemInCart.quantity}</span>
                <button onClick={handleIncrement} className="px-3 py-2 rounded-r-lg hover:bg-rose-600 transition-colors">
                    +
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
