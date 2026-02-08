export default function Expression({
  editExpression,
  handleToggle,
  index,
  isClicked,
  isDisabled,
  total,
}) {
  return (
    <div className="numbers">
      {editExpression.map((e, i) => (
        <h3
          onClick={() => handleToggle(i)}
          className={i % 2 === 0 ? "number" : "select"}
          key={i}
          style={
            i === index && !Number(e) && isClicked && !isDisabled
              ? {
                  color: "#00AEEF",
                }
              : {}
          }
        >
          {e}
        </h3>
      ))}
      <h3 className="number">=</h3>
      <h3 className="number">{total}</h3>
    </div>
  );
}
