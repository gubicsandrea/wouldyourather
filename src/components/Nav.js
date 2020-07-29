import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <Link to="/">Home page</Link>
      <Link to="/add">Ask a question</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </div>
  );
}
