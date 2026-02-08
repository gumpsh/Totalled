import { useCallback, useContext, useEffect, useState } from "react";
import Attempts from "./Attempts";
import { evaluateRPN, toRPN } from "../utils";
import { GameProgressContext } from "../store/GameProgressContext";
import Modal from "./Modal";
import NavBar from "./NavBar";
import OperatorButtons from "./OperatorButtons";
import Container from "./Container";
import Expression from "./Expression";
import { useNavigate } from "react-router-dom";

export default function Calculate({ expression, total }) {
  const [index, setIndex] = useState(null);
  const [editExpression, setEditExpression] = useState([]);
  //const [selectedOp, setSelectedOp] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    attempts: attemptsArray,
    setAttempts: setAttemptsArray,
    isCompleted: completed,
    setIsCompleted: setCompleted,
    setIsStarted: setStarted,
    setProgress: setProg,
  } = useContext(GameProgressContext);

  const navigate = useNavigate();

  //let hiddenOperators;

  const initialiseDisplay = useCallback(() => {
    setIndex(null);
    const exp = expression;
    const inputOperators = ["+", "-", "*", "/"];
    const expArray = exp.split(" ");
    const hiddenOperators = expArray.map((e) =>
      !inputOperators.includes(e) ? e : "?",
    );
    setEditExpression(hiddenOperators);
  }, [expression]);

  useEffect(() => {
    initialiseDisplay();
  }, [initialiseDisplay]);

  // Inserts operators
  function handleHiddenOperators(op) {
    if (!index) return;

    setIsClicked(false);
    //setSelectedOp(op);
    const exp = editExpression;
    exp[index] = op;
    setEditExpression(exp);
  }

  function handleToggle(i) {
    if (!isDisabled) {
      setIsClicked((clicked) => !clicked);
      setIndex(i);
    }
  }

  // For evaluating user attempt
  function evaluateExpression(exp) {
    const rpn = toRPN(exp);
    return evaluateRPN(rpn);
  }

  function resetAndUpdateLocalStorage(receievedProgress, recievedMessage) {
    setProg(receievedProgress);
    setMessage(recievedMessage);
    setIndex(null);
    setIsDisabled(true);
    setCompleted(true);
    setShowModal(true);
    const localStorageAmountGamesPlayed = JSON.parse(
      window.localStorage.getItem("amountGamesPlayed"),
    );
    window.localStorage.setItem(
      "amountGamesPlayed",
      localStorageAmountGamesPlayed != null
        ? JSON.stringify(Number(localStorageAmountGamesPlayed) + 1)
        : JSON.stringify(Number(1)),
    );
    console.log(
      "games played:",
      JSON.parse(window.localStorage.getItem("amountGamesPlayed")),
    );
  }

  // Handle user attempt
  function handleSubmit() {
    const submittedAttempt = editExpression.join(" ");

    if (submittedAttempt.includes("?")) {
      setMessage("Please Complete Your Attempt");
      setShowModal(true);
      return;
    }

    const userTotal = evaluateExpression(submittedAttempt);
    const correct = submittedAttempt === expression || userTotal === total;

    const attempt = {
      expression: submittedAttempt,
      total: !Number.isInteger(userTotal) ? userTotal.toFixed(2) : userTotal,
      correct: correct,
    };

    setAttemptsArray((currentAttempts) => [...currentAttempts, attempt]);

    if (!correct) {
      if (attemptsArray.length < 4) {
        initialiseDisplay();
      } else {
        resetAndUpdateLocalStorage("finished", "Better Luck Next Time!");
      }
    } else {
      resetAndUpdateLocalStorage("finished", "Well Done!");
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleNavigateHome() {
    setProg(
      message === "Well Done!"
        ? "successfull"
        : message === "Better Luck Next Time!"
          ? "unsuccessfull"
          : "attempting",
    );
    setCompleted(false);
    setAttemptsArray([]);
    setStarted(false);
    navigate("/");
  }

  return (
    <>
      <NavBar />
      <Container>
        <Expression
          editExpression={editExpression}
          handleToggle={handleToggle}
          index={index}
          isClicked={isClicked}
          isDisabled={isDisabled}
          total={total}
        />
        <OperatorButtons
          handleHiddenOperators={handleHiddenOperators}
          isCompleted={completed}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
        />
      </Container>
      {attemptsArray.length > 0 && (
        <Attempts handleNavigateHome={handleNavigateHome} />
      )}
      {showModal && (
        <Modal type="info" open={showModal} onClose={handleCloseModal}>
          <h6>{message}</h6>
        </Modal>
      )}
    </>
  );
}
