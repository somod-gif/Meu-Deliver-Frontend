"use client";
export default function CategoryLists({
  activeCategory,
  setActiveCategory,
  categories,
}) {
  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
          Shop by Category
        </h2>

        <div className="relative overflow-x-auto scrollbar-hide pl-3 pb-3 pt-3 sm:pb-5">
          <div className="flex space-x-4 sm:space-x-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`
              flex-shrink-0 flex flex-col items-center justify-center
              w-20 sm:w-24 lg:w-28 aspect-square
              rounded-xl transition-all duration-200 group
              ${
                activeCategory === category.name
                  ? "bg-[#00b1a5] text-white shadow-md scale-105"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-800"
              }
            `}
              >
                <div className="text-2xl sm:text-3xl mb-1 transition-transform duration-200 group-hover:scale-110">
                  {category.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium text-center leading-snug">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
