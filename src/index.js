import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GameProgressProvider } from "./store/GameProgressContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GameProgressProvider>
    <Router>
      <App />
    </Router>
  </GameProgressProvider>
);
