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