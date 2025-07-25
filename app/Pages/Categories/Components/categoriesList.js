import React from "react";

const CategoriesList = ({ category, setSelectedCategory, isSelected }) => {
 const { id, name, icon, description } = category
  return (
    <div
    key={id}
      onClick={() => setSelectedCategory(name)}
      className={`min-w-[50%] sm:min-w-0 rounded-2xl p-4 sm:p-6 border-2 cursor-pointer group transition duration-200 ${
        isSelected
          ? "border-[#a3d900] bg-[#f5fef0] scale-[1.02]"
          : "border-transparent hover:border-[#a3d900] hover:shadow-xl"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`text-3xl sm:text-4xl mb-3 transition-transform duration-200 ${
            isSelected ? "scale-110 text-[#a3d900]" : "group-hover:scale-110"
          }`}
        >
          {icon || "🏷️"}
        </div>
        <h3
          className={`text-base sm:text-lg font-semibold transition-colors ${
            isSelected
              ? "text-[#a3d900]"
              : "text-gray-800 group-hover:text-[#a3d900]"
          }`}
        >
          {name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {description || "Explore this category"}
        </p>
      </div>
    </div>
  );
};

export default CategoriesList;
