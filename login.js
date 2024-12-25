const signUpBtn = document.getElementById("signUp");
const logInBtn = document.getElementById("logIn");
const main = document.getElementById("main");

const signUpContainer = document.getElementById("signup-container");
const logInContainer = document.getElementById("login-container");

function showSignUpMessage(message, type) {
    signUpContainer.textContent = message;
    signUpContainer.style.display = "block";
    signUpContainer.classList.remove("error", "success");
    signUpContainer.classList.add(type);

    setTimeout(() => {
        signUpContainer.style.display = "none";
    }, 2000);
}

function showLoginInMessage(message, type) {
    logInContainer.textContent = message;
    logInContainer.style.display = "block";
    logInContainer.classList.remove("error", "success");
    logInContainer.classList.add(type); 

    setTimeout(() => {
        logInContainer.style.display = "none";
    }, 2000);
}

signUpBtn.addEventListener("click", () => {
    main.classList.add("right-panel-active");
});

logInBtn.addEventListener("click", () => {
    main.classList.remove("right-panel-active");
});


const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser && currentUser.value) {
    window.location.href = "admin.html";
}


const signUpForm = document.querySelector(".sign-up form");
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userName = signUpForm.querySelector('input[name="UserName"]').value.trim();
    const email = signUpForm.querySelector('input[name="Email"]').value.trim();
    const password = signUpForm.querySelector('input[name="Pass"]').value.trim();
    const isAdmin = signUpForm.querySelector('#admin').checked;

    if (!userName || !email || !password) {
        showSignUpMessage("Please fill all the fields!","error");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
        showSignUpMessage("Email already exists! Please log in.","error");
        return;
    }

    const newUser = { userName, email, password, isAdmin };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    signUpForm.reset();
    logInBtn.click();
});


const logInForm = document.querySelector(".log-in form");
logInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = logInForm.querySelector('input[name="Email"]').value.trim();
    const password = logInForm.querySelector('input[name="Pass"]').value.trim();

    if (!email || !password) {
        showLoginInMessage("Please fill all the fields!", "error");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find((user) => user.email === email && user.password === password);

    if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        showLoginInMessage("Login successful! Redirecting to home page...", "success");
        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000);
    } else {
        showLoginInMessage("Invalid email or password! Please try again.", "error");
    }
});

