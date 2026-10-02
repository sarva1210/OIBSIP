# Login Authentication System
A frontend-based Login Authentication System developed as part of the OASIS INFOBYTE Web Development & Designing Internship — Level 2, Task 4.

## Features

- User registration with username/email and password
- Password validation with minimum 8 characters and at least 1 number
- Duplicate username/email checking
- Password hashing using SHA-256
- Login authentication
- Generic error message for incorrect credentials
- Sliding animation between Register and Login pages
- Protected dashboard
- Login session using Local Storage
- Logout functionality
- Responsive design
- Session persistence after page refresh

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Local Storage
- Web Crypto API

## Project Structure

WebDev-L2-LoginAuth/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
    ├── login-register.png
    ├── registration-success.png
    ├── login-error.png
    ├── login-success.png
    └── dashboard-logout.png

## How It Works

1. Registration
The user enters a username/email and password. The password must contain at least 8 characters and one number.
Before creating an account, the system checks whether the username/email already exists.
The password is converted into a SHA-256 hash before being stored in Local Storage.

2. Login
The user enters their registered username/email and password.
The entered password is hashed again and compared with the stored password hash.
If the credentials are correct, a login session is created and the user is redirected to the protected dashboard.

3. Protected Dashboard
The dashboard is displayed only when a valid login session exists.
If the user refreshes the page, the existing session is checked and the dashboard remains accessible.

4. Logout
Clicking the Logout button removes the active session from Local Storage and returns the user to the registration page.

## Validation
The system validates:

* Empty username/email
* Empty password
* Password length
* Password number requirement
* Duplicate username/email
* Incorrect login credentials

## User Interface
The authentication interface includes a sliding transition between the Register and Login sections, providing a smooth user experience without navigating to separate pages.

## Internship Details
OASIS INFOBYTE Web Development & Designing Internship
Level 2
Task 4 — Login Authentication System

## Author
Sarva Vishwakarma