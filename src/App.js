import { useContext, useState } from "react";
import "./App.css";
import Calculate from "./components/Calculate";
import Home from "./components/Home";
import {
  buildExpression,
  evaluateRPN,
  getRandomIntInclusive,
  toRPN,
} from "./utils";
import { Routes, Route, Router } from "react-router-dom";
import { GameProgressContext } from "./store/GameProgressContext";

export default function App() {
  //const [isStarted, setIsStarted] = useState(false);
  const [expression, setExpression] = useState();
  const [total, setTotal] = useState();

  const { isStarted: started, setIsStarted: setStarted } =
    useContext(GameProgressContext);

  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Router>;

  function evaluateExpression(exp) {
    const rpn = toRPN(exp);
    return evaluateRPN(rpn);
  }

  function generateExpression(l, r) {
    const operatorsObject = { 1: "+", 2: "-", 3: "*", 4: "/" };

    /*
      easy: nums array length = 3, random 1 - 10
            ops array length = nums length - 1
      medium: nums array length = 3, random 1 - 100
              ops array length = nums length - 1
      hard: nums array length = 4, random 1 - 100
            ops array length = nums length - 1
    */
    const numNums = Array.from({ length: l }, () =>
      getRandomIntInclusive(1, r),
    );
    const stringNums = numNums.map(String);

    const ops = Array.from(
      { length: l - 1 },
      () => operatorsObject[getRandomIntInclusive(1, 4)],
    );

    const generatedExpression = buildExpression(stringNums, ops);
    return generatedExpression;
  }

  function initialise(l, r) {
    let exp = generateExpression(l, r);
    let totalFromExpression = evaluateExpression(exp);

    // Only integers greater than zero allowed
    while (!Number.isInteger(totalFromExpression) || totalFromExpression < 0) {
      exp = generateExpression(l, r);
      totalFromExpression = evaluateExpression(exp);
    }

    setExpression(exp);
    setTotal(totalFromExpression);
  }

  function handleStart(num) {
    let length;
    let range;

    if (num === 1) {
      length = 3;
      range = 10;
    } else if (num === 2) {
      length = 3;
      range = 100;
    } else {
      length = 4;
      range = 100;
    }

    initialise(length, range);
    setStarted(true);
  }

  return (
    <div>
      {started ? (
        <Calculate expression={expression} total={total} />
      ) : (
        <Home onStart={handleStart} />
      )}
    </div>
  );
}
