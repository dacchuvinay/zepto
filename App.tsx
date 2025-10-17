import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import SmartAssistant from './components/SmartAssistant';
import { products as allProducts } from './data/products';
import type { Product } from './types';
import ProductCard from './components/ProductCard';

// To keep file structure minimal, new components are defined locally within App.tsx
const PromotionalBanners: React.FC = () => (
  <div className="space-y-4 lg:space-y-6">
    {/* Main Banner */}
    <div className="relative rounded-2xl overflow-hidden bg-green-200 aspect-[2/1] md:aspect-[3/1]">
       <div className="absolute inset-0 bg-gradient-to-r from-green-400/80 to-transparent p-6 md:p-10 flex flex-col justify-center w-3/4 md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 drop-shadow-sm">Paan Corner</h2>
        <p className="mt-2 text-sm md:text-base text-gray-700 font-medium">Get smoking accessories, fresheners & more in 10 mins this monsoon with SwiftCart!</p>
        <button className="mt-4 bg-white text-gray-800 font-bold py-2 px-5 rounded-lg w-fit text-sm md:text-base hover:bg-gray-100 transition-transform hover:scale-105">Order Now</button>
      </div>
       <img src="https://picsum.photos/seed/paan/1200/400" alt="Paan Corner" className="w-full h-full object-cover"/>
    </div>
    {/* Double Banners */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      <div className="rounded-2xl overflow-hidden bg-black aspect-[2/1]">
        <img src="https://picsum.photos/seed/sonic-deals/800/400" alt="Super Sonic Deals" className="w-full h-full object-cover"/>
      </div>
      <div className="rounded-2xl overflow-hidden bg-rose-100 aspect-[2/1]">
        <img src="https://picsum.photos/seed/beauty-fest/800/400" alt="Beauty Lit Fest" className="w-full h-full object-cover"/>
      </div>
    </div>
  </div>
);

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
  products: Product[];
  layout?: 'grid' | 'scroll';
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, subtitle, bgColor = 'transparent', products, layout = 'grid' }) => {
  return (
    <div className={`rounded-2xl ${bgColor} py-6`}>
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <a href="#" className="text-sm font-bold text-purple-600 hover:text-purple-800">See All &gt;</a>
        </div>
      </div>
      {layout === 'grid' ? (
        <div className="px-4 sm:px-6">
           <ProductGrid products={products} />
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-4 no-scrollbar -mx-2 px-4 sm:px-6">
          <div className="flex space-x-4">
            {products.map(product => (
              <div key={product.id} className="w-40 sm:w-48 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = useMemo(() => [
    { name: 'All', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> },
    { name: 'Home Needs', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { name: 'Beauty', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
    { name: 'Fashion', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6l2-2m-2 2l-2-2m2 2l2 2m-2-2l-2 2" /></svg> },
    { name: 'Electronics', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
    { name: 'Mobiles', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
  ], []);

  const homeNeedsProducts = useMemo<Product[]>(() => {
    if (selectedCategory === 'All' || selectedCategory === 'Home Needs') {
      return allProducts['Home Needs'] || [];
    }
    if(allProducts[selectedCategory]) {
       return allProducts[selectedCategory];
    }
    return [];
  }, [selectedCategory]);

  return (
    <CartProvider>
      <div className="bg-gray-50 min-h-screen text-gray-800">
        <Header onCartClick={() => setIsCartOpen(true)} />
         <nav className="bg-white border-b border-gray-200">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 lg:space-y-8">
            <PromotionalBanners />
            <ProductSection title="Get Your Home Needs" products={homeNeedsProducts} layout="grid" />
            <ProductSection title="Wholesome Meals" subtitle="Delight in every bite with these delicacies" products={allProducts['Wholesome Meals']} layout="scroll" bgColor="bg-purple-50" />
        </main>
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <SmartAssistant isOpen={isAssistantOpen} onToggle={() => setIsAssistantOpen(!isAssistantOpen)} />
      </div>
    </CartProvider>
  );
}

export default App;
