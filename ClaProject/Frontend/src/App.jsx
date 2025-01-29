import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/home";
import LeaderBoard from "./pages/Leaderboard";
import Challenges from "./pages/Challenges";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
      </Routes>
    </Router>
  );
};

export default App;
