import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { IoMdStats } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";
import Modal from "./Modal";
import { First, Second, Third } from "../assets/images";

export default function NavBar() {
  const [showInfo, setShowInfo] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const localStorage = window.localStorage;
  const gamesPlayed = JSON.parse(localStorage.getItem("amountGamesPlayed"));

  const storedAttempts = localStorage.getItem("numAttempts");
  const attempts = storedAttempts ? JSON.parse(storedAttempts) : [];

  /**
   * Calculate total attempts - each array index holds
   * the amount of games where it took i + 1 attempts.
   * hence a * (i + 1). It is i + 1 to account for zero indexing.
   */
  const totalAttempts =
    attempts.length > 0
      ? attempts.reduce((total, a, i) => total + a * (i + 1), 0)
      : 0;

  const avgAttempts = gamesPlayed > 0 ? totalAttempts / gamesPlayed : 0;

  return (
    <>
      <nav className="nav">
        <div>
          <CiCircleInfo
            size="2rem"
            style={{ padding: "4px" }}
            onClick={() => setShowInfo(true)}
          />
          <IoIosHelpCircleOutline
            size="2rem"
            style={{ padding: "4px" }}
            onClick={() => setShowHelp(true)}
          />
          <IoMdStats
            size="2rem"
            style={{ padding: "4px" }}
            onClick={() => setShowStats(true)}
          />
        </div>
      </nav>
      {showInfo && (
        <Modal type="info" open={showInfo} onClose={() => setShowInfo(false)}>
          <h6>
            <strong>How To Play</strong>
          </h6>
          <p>
            Replace all the question marks with an operator, so the expression
            evaluates to the given total.
          </p>
          <p>Select a question mark:</p>
          <img src={First} alt="info 1" width={120} />
          <p>Then choose an operator:</p>
          <img src={Second} alt="info 2" width={120} />
          <p>
            When your expression is complete, select the arrow to see if it is
            correct!
          </p>
          <img src={Third} alt="info 3" width={120} />
        </Modal>
      )}
      {showHelp && (
        <Modal type="info" open={showHelp} onClose={() => setShowHelp(false)}>
          <h6>
            <strong>Tip</strong>
          </h6>
          <p>The order of operations is important!</p>
          <p>
            Division and multiplication come before addition and subtraction.
          </p>
          <p>So for this expression:</p>
          <h6>2 + 4 * 5</h6>
          <p>4 * 5 is calculated first, then 2 is added to it.</p>
        </Modal>
      )}
      {showStats && (
        <Modal type="info" open={showStats} onClose={() => setShowStats(false)}>
          <h6>
            <strong>Stats</strong>
          </h6>
          <p>{`Games played: ${gamesPlayed ? gamesPlayed : 0}`}</p>
          <p>{`Average attempts: ${avgAttempts.toFixed(1)}`}</p>
        </Modal>
      )}
    </>
  );
}
