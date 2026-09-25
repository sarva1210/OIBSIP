const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const formMessage = document.getElementById("formMessage");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

// LOAD TASKS
let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

// SAVE TASKS
function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// FORMAT DATE
function formatDate(date) {
    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// UPDATE COUNTS
function updateCounts() {
    const pending = tasks.filter(function (task) {
        return !task.completed;
    });

    const completed = tasks.filter(function (task) {
        return task.completed;
    });

    pendingCount.textContent = `${pending.length} pending`;
    completedCount.textContent = `${completed.length} completed`;
}