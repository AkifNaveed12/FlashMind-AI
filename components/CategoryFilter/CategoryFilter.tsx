interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: string[];
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  categories,
}: CategoryFilterProps) {
  return (
    <div className="mb-10 w-full overflow-x-auto hide-scrollbar pb-2">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
            selectedCategory === 'All'
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
