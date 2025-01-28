import React from "react";
import { useSelector } from "react-redux";

const topCoders = [
  {
    id: 101,
    first_name: "Alice",
    last_name: "Johnson",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    score: 350,
  },
  {
    id: 102,
    first_name: "Bob",
    last_name: "Smith",
    avatar_url: "https://i.pravatar.cc/150?img=2",
    score: 320,
  },
  {
    id: 103,
    first_name: "Emily",
    last_name: "Davis",
    avatar_url: "https://i.pravatar.cc/150?img=5",
    score: 290,
  },
  {
    id: 104,
    first_name: "Michael",
    last_name: "Brown",
    avatar_url: "https://i.pravatar.cc/150?img=4",
    score: 270,
  },
];

const TopKCodersList = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">Top Coders</h3>
      <div className="space-y-4">
        {topCoders.map((coder) => (
          <div
            key={coder.id}
            className={`flex items-center p-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            <img
              src={coder.avatar_url}
              alt={`${coder.first_name} ${coder.last_name}`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold">{`${coder.first_name} ${coder.last_name}`}</p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Score: {coder.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopKCodersList;
