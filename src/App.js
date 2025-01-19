import { useState } from "react";
import "./App.css";
import Calculate from "./components/Calculate";
import Home from "./components/Home";
import { getRandomIntInclusive } from "./utils";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [operators, setOperators] = useState([]);

  function handleStart() {
    const operatorsObject = { 1: "+", 2: "-", 3: "*", 4: "/" };
    const numNums = Array.from({ length: 5 }, () =>
      getRandomIntInclusive(1, 10)
    );
    const stringNums = numNums.map(String);
    setNumbers(stringNums);

    setOperators(
      Array.from(
        { length: 4 },
        () => operatorsObject[getRandomIntInclusive(1, 4)]
      )
    );

    setIsStarted(true);
  }

  return (
    <div className="App">
      {isStarted ? (
        <Calculate
          numbers={numbers}
          operators={operators}
          onGenerate={handleStart}
        />
      ) : (
        <Home onStart={handleStart} />
      )}
    </div>
  );
}
