import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaRegHourglass } from "react-icons/fa";
import { useSelector } from "react-redux";

const challenges = [
  {
    id: 145,
    title: "Two-sum",
    category: "Data structure",
    Difficulty: "Easy",
    status: "Completed",
    solutionRate: "45%",
  },
  {
    id: 146,
    title: "Fibonacci series",
    category: "Data structure",
    Difficulty: "Moderate",
    status: "Attempted",
    solutionRate: "50%",
  },
  {
    id: 147,
    title: "Skyline problem",
    category: "Data structure",
    Difficulty: "Hard",
    status: "Pending",
    solutionRate: "30%",
  },
];
const ChallengesList = () => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div
      className={`overflow-auto ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">Challenges</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Difficulty</th>
            <th className="p-2">Status</th>
            <th className="p-2">Solution Rate</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id} className="border-t">
              <td className="p-2">{challenge.title}</td>
              <td className="p-2">{challenge.category}</td>
              <td className="p-2">{challenge.Difficulty}</td>
              <td className="p-2">
                <span
                  title={challenge.status}
                  className="flex items-center space-x-1"
                >
                  {challenge.status === "Completed" ? (
                    <BsCheck2Circle />
                  ) : challenge.status === "Attempted" ? (
                    <LuFileSpreadsheet />
                  ) : (
                    <FaRegHourglass />
                  )}
                  <span>{challenge.status}</span>
                </span>
              </td>
              <td className="p-2">{challenge.solutionRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChallengesList;
