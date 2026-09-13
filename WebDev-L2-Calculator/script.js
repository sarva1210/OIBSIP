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