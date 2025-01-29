import React, { useEffect, useState } from "react";
import ChallengesList from "../_components/HomePage/ChallengesList";
import axios from "axios";
import Cookies from "js-cookie";

const Challenges = () => {
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to add a new challenge
  const handleAddChallenge = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = Cookies.get("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/challenges`,
        newChallenge,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewChallenge({ title: "", description: "" });
      setLoading(false);
      window.location.reload(); // Reload page to fetch new challenges
    } catch (err) {
      setError("Failed to add challenge");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Challenges</h1>

      {/* Add New Challenge Form */}
      <form onSubmit={handleAddChallenge} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newChallenge.title}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, title: e.target.value })
          }
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newChallenge.description}
          onChange={(e) =>
            setNewChallenge({ ...newChallenge, description: e.target.value })
          }
          className="p-2 border rounded mr-2"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Challenge"}
        </button>
      </form>

      {/* Display Challenges */}
      <ChallengesList />
    </div>
  );
};

export default Challenges;
