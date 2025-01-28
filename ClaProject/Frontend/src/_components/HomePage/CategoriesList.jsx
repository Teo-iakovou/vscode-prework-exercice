import React from "react";

const categories = ["Data structure", "Graphs", "Databases"];

const CategoriesList = () => (
  <div className="mb-4">
    <h3 className="text-lg font-semibold mb-2">Select category</h3>
    <div className="flex space-x-2">
      {categories.map((category, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full cursor-pointer"
        >
          {category}
        </span>
      ))}
    </div>
  </div>
);

export default CategoriesList;
