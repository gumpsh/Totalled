import "../App.css";
import NavBar from "./NavBar";

export default function Home({ onStart }) {
  return (
    <>
      <NavBar />
      <div className="container">
        <h3 className="span">
          =<span style={{ color: "black" }}>Totalled</span>=
        </h3>
        <h6>Fill in the hidden operators</h6>
        <div className="homeButtonContainer">
          <button className="homeButton" onClick={() => onStart(1)}>
            Easy
          </button>
          <button className="homeButton" onClick={() => onStart(2)}>
            Medium
          </button>
          <button className="homeButton" onClick={() => onStart(3)}>
            Hard
          </button>
        </div>
      </div>
    </>
  );
}
