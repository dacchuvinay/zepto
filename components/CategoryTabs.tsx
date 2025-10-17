import React from 'react';

interface Category {
    name: string;
    icon: React.ReactNode;
}

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center space-x-4 overflow-x-auto no-scrollbar py-2">
        {categories.map(category => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`flex-shrink-0 flex flex-col items-center justify-center space-y-1 w-20 pb-2 transition-colors duration-200 group ${
              selectedCategory === category.name
                ? 'border-b-2 border-purple-600'
                : 'border-b-2 border-transparent'
            }`}
          >
            <div className={`text-gray-500 group-hover:text-purple-600 ${selectedCategory === category.name && 'text-purple-600'}`}>
                {category.icon}
            </div>
            <span className={`text-xs font-semibold text-gray-600 group-hover:text-purple-600 whitespace-nowrap ${selectedCategory === category.name && 'text-purple-600'}`}>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
