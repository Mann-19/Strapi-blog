interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-16">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-6 py-2.5 rounded-sm font-medium text-sm uppercase tracking-wider
            transition-smooth border-2
            ${
              activeCategory === category
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-transparent text-foreground border-border hover:border-accent hover:text-accent"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
