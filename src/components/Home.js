import "../App.css";

export default function Home({ onStart }) {
  return (
    <div className="container">
      <h3>Home</h3>
      <button onClick={onStart}>Play</button>
    </div>
  );
}
