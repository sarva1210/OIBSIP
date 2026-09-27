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

    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(completeButton);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskActions);

    completeButton.addEventListener("click", function () {
        toggleTask(task.id);
    });

    editButton.addEventListener("click", function () {
        editTask(task.id, taskItem, taskContent);
    });

    deleteButton.addEventListener("click", function () {
        deleteTask(task.id);
    });

    return taskItem;
}

// RENDER TASKS
function renderTasks() {
    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    const pending = tasks.filter(function (task) {
        return !task.completed;
    });

    const completed = tasks.filter(function (task) {
        return task.completed;
    });

    pending.forEach(function (task) {
        pendingTasks.appendChild(createTaskElement(task));
    });

    completed.forEach(function (task) {
        completedTasks.appendChild(createTaskElement(task));
    });

    pendingEmpty.classList.toggle("hidden", pending.length > 0);
    completedEmpty.classList.toggle("hidden", completed.length > 0);

    pendingTasks.appendChild(pendingEmpty);
    completedTasks.appendChild(completedEmpty);

    updateCounts();
}

// ADD TASK

function addTask(text) {
    const newTask = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();
}

// FORM SUBMIT

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        formMessage.textContent = "Please enter a task.";
        taskInput.focus();
        return;
    }

    formMessage.textContent = "";

    addTask(text);

    taskInput.value = "";
    taskInput.focus();
});

// CLEAR FORM MESSAGE

taskInput.addEventListener("input", function () {
    formMessage.textContent = "";
});

// TOGGLE TASK

function toggleTask(taskId) {
    tasks = tasks.map(function (task) {
        if (task.id === taskId) {
            task.completed = !task.completed;

            if (task.completed) {
                task.completedAt = new Date().toISOString();
            } else {
                task.completedAt = null;
            }
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

// EDIT TASK

function editTask(taskId, taskItem, taskContent) {
    const task = tasks.find(function (item) {
        return item.id === taskId;
    });

    if (!task) {
        return;
    }

    const oldText = task.text;

    taskContent.innerHTML = "";

    const editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.type = "text";
    editInput.value = oldText;
    editInput.maxLength = 200;

    taskContent.appendChild(editInput);

    editInput.focus();
    editInput.select();

    function saveEdit() {
        const newText = editInput.value.trim();

        if (newText === "") {
            renderTasks();
            return;
        }

        task.text = newText;

        saveTasks();
        renderTasks();
    }

    editInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveEdit();
        }

        if (event.key === "Escape") {
            renderTasks();
        }
    });

    editInput.addEventListener("blur", function () {
        saveEdit();
    });
}

// DELETE TASK

function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    saveTasks();
    renderTasks();
}

// INITIAL RENDER
renderTasks();