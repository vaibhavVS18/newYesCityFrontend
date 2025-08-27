import { CATEGORIES, CATEGORY_LABELS, CategoryType } from '@/constants/categories';

interface CategoryTabsProps {
  cityName: string;
  activeCategory?: CategoryType | 'all';
  onCategoryChange: (category: CategoryType | 'all') => void;
}

export default function CategoryTabs({ 
  cityName, 
  activeCategory = 'all',
  onCategoryChange 
}: CategoryTabsProps) {

  const handleTabClick = (category: CategoryType | 'all') => {
    onCategoryChange(category);
  };

  const isActive = (category: CategoryType | 'all') => activeCategory === category;

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide py-4 space-x-1">
          {/* All tab */}
          <button
            onClick={() => handleTabClick('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              isActive('all')
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {/* Category tabs */}
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleTabClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isActive(category)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}