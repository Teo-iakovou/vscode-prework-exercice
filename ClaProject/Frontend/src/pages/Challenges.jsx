import React, { useState } from "react";
import ChallengesList from "../_components/HomePage/ChallengesList";
import { useAddChallengeMutation } from "../../src/services/graphqlApi";

const Challenges = () => {
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [addChallenge, { isLoading }] = useAddChallengeMutation();

  // Function to add a new challenge using GraphQL Mutation
  const handleAddChallenge = async (e) => {
    e.preventDefault();
    try {
      await addChallenge(newChallenge).unwrap();
      setNewChallenge({ title: "", description: "" });
    } catch (err) {
      setError("Failed to add challenge");
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
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Challenge"}
        </button>
      </form>

      {/* Display Challenges */}
      <ChallengesList />
    </div>
  );
};

export default Challenges;
