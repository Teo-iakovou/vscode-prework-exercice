import React from "react";
import { useSelector } from "react-redux";

const trendingCategories = [
  { category: "Graphs", count: 100 },
  { category: "Stacks", count: 45 },
  { category: "Algorithms", count: 20 },
  { category: "Databases", count: 3 },
];
const TrendingCategoriesBox = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-lg font-semibold mb-2">Trending Categories</h3>
      <div className="flex flex-wrap gap-2">
        {trendingCategories.map((cat, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full ${
              theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat.category} ({cat.count})
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrendingCategoriesBox;
