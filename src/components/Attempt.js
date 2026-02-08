export default function Attempt({ attempt }) {
  return (
    <div className="attempt">
      <p>
        {attempt.expression}
        <span> = </span>
        <span>{attempt.total}</span>
      </p>
      <p>
        {" "}
        {attempt.correct ? (
          <span className="mark" style={{ color: "green", fontWeight: "bold" }}>
            {" "}
            ✓
          </span>
        ) : (
          <span className="mark" style={{ color: "red", fontWeight: "bold" }}>
            {" "}
            ✕
          </span>
        )}
      </p>
    </div>
  );
}
