import React from "react";
import Navbar from "../_components/HomePage/Navbar";
import { useSelector } from "react-redux";
const LeaderBoardData = [
  {
    rank: 1,
    first_name: "John",
    last_name: "Doe",
    score: 400,
    solved_challenges: 150,
  },
  {
    rank: 2,
    first_name: "Alice",
    last_name: "Smith",
    score: 350,
    solved_challenges: 140,
  },
  {
    rank: 3,
    first_name: "Emma",
    last_name: "Johnson",
    score: 320,
    solved_challenges: 135,
  },
];

const LeaderBoard = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Leaderboard</h2>
        <div className="overflow-auto">
          <table
            className={`min-w-full border ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            } border-gray-200`}
          >
            <thead>
              <tr
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                } border-b`}
              >
                <th className="p-4 text-left">Rank</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Score</th>
                <th className="p-4 text-left">Solved Challenges</th>
              </tr>
            </thead>
            <tbody>
              {LeaderBoardData.map((coder) => (
                <tr
                  key={coder.rank}
                  className={`${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } border-b`}
                >
                  <td className="p-4">{coder.rank}</td>
                  <td className="p-4">
                    {coder.first_name} {coder.last_name}
                  </td>
                  <td className="p-4">{coder.score}</td>
                  <td className="p-4">{coder.solved_challenges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
