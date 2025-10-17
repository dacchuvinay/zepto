import React from 'react';
import { useCart } from '../context/CartContext';

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

const Header: React.FC<{ onCartClick: () => void }> = ({ onCartClick }) => {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 bg-white shadow-sm z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px] gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-purple-600">SwiftCart</h1>
                <span className="bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">SUPER SAVER</span>
            </div>
            <div className="hidden md:flex items-center cursor-pointer">
              <span className="font-semibold text-sm">Select Location</span>
              <ChevronDownIcon />
            </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 min-w-0 mx-4 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder='Search for "chocolate box"'
                className="block w-full bg-gray-100 border border-gray-200 rounded-lg py-2.5 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="flex flex-col items-center text-gray-600 hover:text-purple-600">
                <UserIcon />
                <span className="text-xs font-medium">Login</span>
            </button>
            <button onClick={onCartClick} className="relative flex flex-col items-center text-gray-600 hover:text-purple-600">
              <CartIcon />
              <span className="text-xs font-medium">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
