// src/pages/Home.jsx

import React from "react";
import Navbar from "../_components/HomePage/Navbar";
import CategoriesList from "../_components/HomePage/CategoriesList";
import ChallengesList from "../_components/HomePage/ChallengesList";
import TrendingCategoriesBox from "../_components/HomePage/TrendingCategoriesBox";
import TopKCodersList from "../_components/HomePage/TopKCodersList";
import { useSelector } from "react-redux";

const Home = () => {
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-6">
          <div
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Challenges</h2>
            <CategoriesList />
            <ChallengesList />
          </div>
        </div>
        <div className="w-full lg:w-1/3 space-y-6">
          <TrendingCategoriesBox />
          <TopKCodersList />
        </div>
      </div>
    </div>
  );
};

export default Home;
