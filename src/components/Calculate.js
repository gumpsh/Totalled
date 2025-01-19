import { buildExpression, evaluateRPN, toRPN } from "../utils";

export default function Calculate({ numbers, operators, onGenerate }) {
  const expression = buildExpression(numbers, operators);

  function evaluateExpression(exp) {
    const rpn = toRPN(exp);
    return evaluateRPN(rpn);
  }

  const total = evaluateExpression(expression);

  if (!Number.isInteger(total) || total < 0) {
    onGenerate();
  }

  return (
    <div className="container">
      <div>
        <h3>{total}</h3>
      </div>
      <div className="numbers">
        {numbers.map((n, i) => (
          <button className="number" key={i}>
            {n}
          </button>
        ))}
      </div>
      <div className="operators">
        <button className="operator">+</button>
        <button className="operator">-</button>
        <button className="operator">*</button>
        <button className="operator">/</button>
      </div>
    </div>
  );
}
