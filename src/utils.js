
/*
  Returns a random number between min and max inclusive.
*/
export function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  /*
    Return a mathematical expression from the
    supplied numbers and operations.
  */
  export function buildExpression(nums, operators) {

    let expArray = [];
    expArray.push(nums[0]);

    let expression = "";

    if (expArray[0] != null) {
      for (let i = 1; i <= operators.length; i++) {
        expArray.push(operators[i - 1]);
        expArray.push(nums[i]);
      }
      expression = expArray.join(" ");
    } else {  
      expression = "5 + 2 * 3 - 1 + 6";
    }
    return expression;
  }

    /*
    Transforms the supplied expression to reverse polish notation (RPN).
  */
    export function toRPN(expr) {
        const precedence = {
          "+": 1,
          "-": 1,
          "*": 2,
          "/": 2,
        };
    
        const isOperator = (token) => ["+", "-", "*", "/"].includes(token);
    
        const outputQueue = [];
        const operatorStack = [];
        const tokens = expr.split(" ");
    
        tokens.forEach((token) => {
          if (!isNaN(token)) {
            outputQueue.push(Number(token)); // Numbers go directly to the output queue
          } else if (isOperator(token)) {
            while (
              operatorStack.length &&
              precedence[operatorStack[operatorStack.length - 1]] >=
                precedence[token]
            ) {
              outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
          }
        });
    
        while (operatorStack.length) {
          outputQueue.push(operatorStack.pop());
        }
    
        return outputQueue;
      };

  /*
    Calculates each pair of numbers using the first token that is an operator.
    The calculated value is then pushed pack onto the stack and used as one of
    the operands in the next calculation. This pattern is repeated until all numbers
    have been calculated and the only thing left on the stack is the final value,
    which is returned to the caller.
  */
  export function evaluateRPN(rpn) {
    const stack = [];
    rpn.forEach((token) => {
      if (typeof token === "number") {
        stack.push(token);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            stack.push(a / b);
            break;
          default:
            break;
        }
      }
    });
    return stack[0];
  };