const authWrapper = document.querySelector(".auth-wrapper");

const registerPage = document.getElementById("registerPage");
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const registerUsername = document.getElementById("registerUsername");
const registerPassword = document.getElementById("registerPassword");

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");

const showLoginButton = document.getElementById("showLoginButton");
const showRegisterButton = document.getElementById("showRegisterButton");

const welcomeMessage = document.getElementById("welcomeMessage");
const logoutButton = document.getElementById("logoutButton");

// STORAGE KEYS

const USERS_KEY = "authUsers";
const SESSION_KEY = "authSession";

// GET USERS

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

// SAVE USERS

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// HASH PASSWORD

async function hashPassword(password) {
    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(function (byte) {
            return byte.toString(16).padStart(2, "0");
        })
        .join("");
}

// PASSWORD VALIDATION

function isValidPassword(password) {
    const minimumLength = password.length >= 8;
    const hasNumber = /\d/.test(password);

    return minimumLength && hasNumber;
}

// SHOW LOGIN

showLoginButton.addEventListener("click", function () {
    authWrapper.classList.add("show-login");

    registerMessage.textContent = "";
    loginMessage.textContent = "";

    registerForm.reset();
});

// SHOW REGISTER

showRegisterButton.addEventListener("click", function () {
    authWrapper.classList.remove("show-login");

    registerMessage.textContent = "";
    loginMessage.textContent = "";

    loginForm.reset();
});

// REGISTER

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    registerMessage.textContent = "";

    const username = registerUsername.value.trim();
    const password = registerPassword.value;

    if (username === "" || password === "") {
        registerMessage.textContent =
            "Please fill in all fields.";
        return;
    }

    if (!isValidPassword(password)) {
        registerMessage.textContent =
            "Password must be at least 8 characters and contain at least 1 number.";
        return;
    }

    const users = getUsers();

    const existingUser = users.find(function (user) {
        return user.username.toLowerCase() === username.toLowerCase();
    });

    if (existingUser) {
        registerMessage.textContent =
            "An account with this username or email already exists.";
        return;
    }

    const passwordHash = await hashPassword(password);

    const newUser = {
        username: username,
        passwordHash: passwordHash,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);

    saveUsers(users);

    registerForm.reset();

    loginUsername.value = username;

    authWrapper.classList.add("show-login");

    loginMessage.textContent =
        "Registration successful. Please login.";
});

// LOGIN

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    loginMessage.textContent = "";

    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    if (username === "" || password === "") {
        loginMessage.textContent =
            "Please enter your username/email and password.";
        return;
    }

    const users = getUsers();

    const user = users.find(function (item) {
        return item.username.toLowerCase() === username.toLowerCase();
    });

    if (!user) {
        loginMessage.textContent =
            "Incorrect username/email or password.";
        return;
    }

    const passwordHash = await hashPassword(password);

    if (passwordHash !== user.passwordHash) {
        loginMessage.textContent =
            "Incorrect username/email or password.";
        return;
    }

    const session = {
        username: user.username,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
    );

    loginForm.reset();

    showDashboard(session);
});

// SHOW DASHBOARD

function showDashboard(session) {
    authWrapper.classList.add("hidden");
    dashboardPage.classList.remove("hidden");

    welcomeMessage.textContent =
        `Welcome back, ${session.username}!`;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// LOGOUT

logoutButton.addEventListener("click", function () {
    localStorage.removeItem(SESSION_KEY);

    dashboardPage.classList.add("hidden");
    authWrapper.classList.remove("hidden");

    authWrapper.classList.remove("show-login");

    loginForm.reset();
    registerForm.reset();

    registerMessage.textContent = "";
    loginMessage.textContent = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// CHECK SESSION

function checkSession() {
    const session = JSON.parse(
        localStorage.getItem(SESSION_KEY)
    );

    if (session && session.username) {
        showDashboard(session);
    } else {
        authWrapper.classList.remove("hidden");
        dashboardPage.classList.add("hidden");
    }
}

// INITIAL CHECK

checkSession();