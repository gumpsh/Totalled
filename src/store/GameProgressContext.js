import { createContext, useState } from "react";

const GameProgressContext = createContext({
  isCompleted: false,
  setIsCompleted: () => {},
  isStarted: false,
  setIsStarted: () => {},
  attempts: [],
  setAttempts: () => {},
  setProgress: () => {},
});

function GameProgressProvider({ children }) {
  const [attempts, setAttempts] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState("attempting");
  const [isStarted, setIsStarted] = useState(false);

  return (
    <GameProgressContext.Provider
      value={{
        attempts,
        setAttempts,
        isCompleted,
        setIsCompleted,
        isStarted,
        setIsStarted,
        progress,
        setProgress,
      }}
    >
      {children}
    </GameProgressContext.Provider>
  );
}

export { GameProgressContext, GameProgressProvider };
