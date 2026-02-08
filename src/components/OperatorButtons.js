export default function OperatorButtons({
  handleHiddenOperators,
  isCompleted,
  isDisabled,
  handleSubmit,
}) {
  return (
    <div className="operatorsContainer">
      <div className="operators">
        <button onClick={() => handleHiddenOperators("+")} className="operator">
          +
        </button>
        <button onClick={() => handleHiddenOperators("-")} className="operator">
          -
        </button>
        <button onClick={() => handleHiddenOperators("*")} className="operator">
          &times;
        </button>
        <button onClick={() => handleHiddenOperators("/")} className="operator">
          /
        </button>
      </div>
      {!isCompleted ? (
        <button disabled={isDisabled} onClick={handleSubmit} className="submit">
          &rarr;
        </button>
      ) : null}
    </div>
  );
}
