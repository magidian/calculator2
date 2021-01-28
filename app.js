// what is the data- ?

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const pointButton = document.querySelector("[data-point]");
const screen = document.querySelector("[data-screen]");

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

window.addEventListener("keydown", setInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button) =>           //here don't need to define button?
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (screen.textContent === "0" || shouldResetScreen) resetScreen();    //why need this condition to reset the screen?
  screen.textContent += number;
}

function resetScreen() {
  screen.textContent = "";
  shouldResetScreen = false;                  //?
}

function clear() {
  screen.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();                           //?
  if (screen.textContent === "") screen.textContent = "0";
  if (screen.textContent.includes(".")) return; //can only add 1 decimal point
  screen.textContent += ".";
}

function deleteNumber() {
  screen.textContent = screen.textContent.toString().slice(0, -1); //returns the extracted string
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = screen.textContent;
  currentOperation = operator;
  shouldResetScreen = true; //? shouldn't it be true only when clear button is pressed?
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;  //return here means don't evaluate?
  if (currentOperation === "÷" && screen.textContent === "0") {
    alert("You can't divide by 0");
    clear();
    return;
  }
  secondOperand = screen.textContent;        //why start with second operand?
  screen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  currentOperation = null;                  //finished an operation
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function setInput(e) {                                        // e.key ?  //this is for keyboard
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Esacpe") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

// function operate(operator, a, b) {
//   switch (operator) {
//     case "+":
//       return a + b;
//       break;
//     case "-":
//       return a - b;
//       break;
//     case "*":
//       return a * b;
//       break;
//     case "/":
//       return a / b;
//       break;
//   }
// }

// function calculate() {
//   const display = document.querySelector(".display");
//   display.textContent = ``;
// }
