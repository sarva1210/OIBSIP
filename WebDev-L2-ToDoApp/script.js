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

// CREATE TASK ELEMENT
function createTaskElement(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    if (task.completed) {
        taskItem.classList.add("completed");
    }

    taskItem.dataset.id = task.id;

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-toggle");
    completeButton.type = "button";
    completeButton.setAttribute(
        "aria-label",
        task.completed ? "Mark task as pending" : "Mark task as complete"
    );

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskText = document.createElement("p");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;

    const taskTime = document.createElement("p");
    taskTime.classList.add("task-time");

    if (task.completed && task.completedAt) {
        taskTime.textContent = `Completed: ${formatDate(task.completedAt)}`;
    } else {
        taskTime.textContent = `Added: ${formatDate(task.createdAt)}`;
    }

    taskContent.appendChild(taskText);
    taskContent.appendChild(taskTime);

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const editButton = document.createElement("button");
    editButton.classList.add("task-action", "edit-btn");
    editButton.type = "button";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("task-action", "delete-btn");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
}    