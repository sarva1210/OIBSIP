// Elements
const currentOperand = document.getElementById("currentOperand");
const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

const historyBtn = document.getElementById("historyBtn");
const historyPanel = document.getElementById("historyPanel");
const closeHistory = document.getElementById("closeHistory");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");


// Calculator State
let expression = "";
let justCalculated = false;


// History Data
let calculationHistory = JSON.parse(
    localStorage.getItem("calculationHistory")
) || [];


// Update Display
function updateDisplay() {
    currentOperand.textContent = expression || "0";
}


// Check Operator
function isOperator(value) {
    return ["+", "−", "×", "÷", "%"].includes(value);
}


// Add Number
function appendNumber(number) {
    if (justCalculated) {
        expression = "";
        justCalculated = false;
    }

    const parts = expression.split(/[+−×÷%]/);
    const currentNumber = parts[parts.length - 1];

    if (number === ".") {
        if (currentNumber.includes(".")) {
            return;
        }

        if (currentNumber === "") {
            expression += "0.";
        } else {
            expression += ".";
        }

        updateDisplay();
        return;
    }

    if (currentNumber === "0") {
        expression = expression.slice(0, -1) + number;
    } else {
        expression += number;
    }

    updateDisplay();
}


// Add Operator
function chooseOperator(operator) {
    if (expression === "") {
        return;
    }

    justCalculated = false;

    const lastCharacter = expression.slice(-1);

    if (isOperator(lastCharacter)) {
        expression = expression.slice(0, -1) + operator;
    } else {
        expression += operator;
    }

    updateDisplay();
}


// Delete
function deleteNumber() {
    if (justCalculated) {
        expression = "";
        justCalculated = false;
    } else {
        expression = expression.slice(0, -1);
    }

    display.classList.remove("error");
    updateDisplay();
}


// Clear Calculator
function clearCalculator() {
    expression = "";
    justCalculated = false;

    display.classList.remove("error");
    updateDisplay();
}


// Calculate
function calculate() {
    if (!expression) {
        return;
    }

    const lastCharacter = expression.slice(-1);

    if (isOperator(lastCharacter)) {
        return;
    }

    try {
        const originalExpression = expression;

        const result = calculateExpression(expression);

        const formattedResult = formatResult(result);

        saveHistory(originalExpression, formattedResult);

        expression = formattedResult;
        justCalculated = true;

        updateDisplay();
    } catch (error) {
        expression = error.message;
        justCalculated = true;

        display.classList.add("error");

        updateDisplay();
    }
}


// Calculate Expression Without eval()
function calculateExpression(input) {
    const numbers = input.split(/[+−×÷%]/).map(Number);
    const operators = input.match(/[+−×÷%]/g);

    if (!operators || numbers.length !== operators.length + 1) {
        throw new Error("Invalid expression");
    }

    // Multiplication, Division and Modulus
    for (let i = 0; i < operators.length; i++) {
        if (
            operators[i] === "×" ||
            operators[i] === "÷" ||
            operators[i] === "%"
        ) {
            const firstNumber = numbers[i];
            const secondNumber = numbers[i + 1];

            let result;

            if (operators[i] === "×") {
                result = firstNumber * secondNumber;
            }

            if (operators[i] === "÷") {
                if (secondNumber === 0) {
                    throw new Error("Cannot divide by zero");
                }

                result = firstNumber / secondNumber;
            }

            if (operators[i] === "%") {
                if (secondNumber === 0) {
                    throw new Error("Cannot divide by zero");
                }

                result = firstNumber % secondNumber;
            }

            numbers[i] = result;

            numbers.splice(i + 1, 1);
            operators.splice(i, 1);

            i--;
        }
    }

    // Addition and Subtraction
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "+") {
            result += numbers[i + 1];
        }

        if (operators[i] === "−") {
            result -= numbers[i + 1];
        }
    }

    return result;
}


// Format Result
function formatResult(number) {
    if (!Number.isFinite(number)) {
        throw new Error("Invalid result");
    }

    return Number(number.toFixed(10)).toString();
}


// Show Error
function showError(message) {
    expression = message;
    justCalculated = true;

    display.classList.add("Error");

    updateDisplay();
}


// Save History
function saveHistory(expressionValue, result) {
    calculationHistory.unshift({
        expression: expressionValue,
        result: result
    });

    if (calculationHistory.length > 20) {
        calculationHistory.pop();
    }

    localStorage.setItem(
        "calculationHistory",
        JSON.stringify(calculationHistory)
    );

    renderHistory();
}


// Render History
function renderHistory() {
    historyList.innerHTML = "";

    if (calculationHistory.length === 0) {
        historyList.innerHTML =
            '<p class="empty-history">No calculations yet</p>';

        return;
    }

    calculationHistory.forEach(function (item) {
        const historyItem = document.createElement("div");

        historyItem.classList.add("history-item");

        historyItem.textContent =
            `${item.expression} = ${item.result}`;

        historyList.appendChild(historyItem);
    });
}


// Open / Close History
historyBtn.addEventListener("click", function () {
    historyPanel.classList.toggle("active");

    renderHistory();
});

closeHistory.addEventListener("click", function () {
    historyPanel.classList.remove("active");
});


// Clear History
clearHistoryBtn.addEventListener("click", function () {
    calculationHistory = [];

    localStorage.removeItem("calculationHistory");

    renderHistory();
});


// Calculator Button Events
buttons.addEventListener("click", function (event) {
    const button = event.target;

    if (!button.classList.contains("btn")) {
        return;
    }

    const number = button.dataset.number;
    const operator = button.dataset.operation;
    const action = button.dataset.action;

    display.classList.remove("error");

    if (number !== undefined) {
        appendNumber(number);
    }

    if (operator !== undefined) {
        chooseOperator(operator);
    }

    if (action === "equals") {
        calculate();
    }

    if (action === "clear") {
        clearCalculator();
    }

    if (action === "delete") {
        deleteNumber();
    }
});


// Keyboard Support
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if ((key >= "0" && key <= "9") || key === ".") {
        display.classList.remove("error");
        appendNumber(key);
    }

    if (key === "+") {
        display.classList.remove("error");
        chooseOperator("+");
    }

    if (key === "-") {
        display.classList.remove("error");
        chooseOperator("−");
    }

    if (key === "*") {
        display.classList.remove("error");
        chooseOperator("×");
    }

    if (key === "/") {
        event.preventDefault();

        display.classList.remove("error");

        chooseOperator("÷");
    }

    if (key === "%") {
        display.classList.remove("error");
        chooseOperator("%");
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    }

    if (key === "Backspace") {
        deleteNumber();
    }

    if (key === "Escape") {
        clearCalculator();
    }
});


// Load History
renderHistory();

// Initial Display
updateDisplay();