import { useContext, useEffect } from "react";
import { GameProgressContext } from "../store/GameProgressContext";
import Attempt from "./Attempt";

export default function Attempts({ handleNavigateHome }) {
  const { attempts, isCompleted } = useContext(GameProgressContext);

  useEffect(() => {
    const l = attempts.length;
    const lsNumAttempts = JSON.parse(
      window.localStorage.getItem("numAttempts")
    );

    const checkCorrect = attempts.filter((a) => a.correct);

    if (checkCorrect.length > 0) {
      if (lsNumAttempts != null) {
        if (lsNumAttempts[l - 1] != null) {
          lsNumAttempts[l - 1] += 1;
        } else {
          lsNumAttempts[l - 1] = 1;
        }
        window.localStorage.setItem(
          "numAttempts",
          JSON.stringify(lsNumAttempts)
        );
        console.log(
          "attempts:",
          JSON.parse(window.localStorage.getItem("numAttempts"))
        );
      } else {
        const attemptsArray = Array.from({ length: 5 });
        attemptsArray[l - 1] = 1;
        window.localStorage.setItem(
          "numAttempts",
          JSON.stringify(attemptsArray)
        );
        console.log(
          "attempts:",
          JSON.parse(window.localStorage.getItem("numAttempts"))
        );
      }
    }
  }, [attempts]);

  return (
    <div>
      <hr className="hr" />
      <div className="attempts">
        {attempts.map((attempt, i) => (
          <Attempt key={i + Date.now()} attempt={attempt} />
        ))}
        {isCompleted && (
          <button className="modalButton" onClick={handleNavigateHome}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
