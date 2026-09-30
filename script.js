// 1. SIGN UP FUNCTION
function signup() {
    let nameInput = document.getElementById("signupName");
    let emailInput = document.getElementById("signupEmail");
    let passwordInput = document.getElementById("signupPassword");

    if (!nameInput || !emailInput || !passwordInput) {
        alert("Input elements missing in HTML. Ensure IDs are signupName, signupEmail, signupPassword.");
        return;
    }

    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        alert("An account with this email already exists!");
        return;
    }

    let newUser = { name: name, email: email, password: password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! Redirecting to login...");
    window.location.href = "login.html";
}

// 2. LOGIN FUNCTION
function login() {
    let emailInput = document.getElementById("loginEmail");
    let passwordInput = document.getElementById("loginPassword");
    let messageBox = document.getElementById("loginMessage");

    if (!emailInput || !passwordInput) {
        alert("Input elements missing in HTML. Ensure IDs are loginEmail, loginPassword.");
        return;
    }

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();

    if (email === "" || password === "") {
        if (messageBox) messageBox.innerText = "Please enter both email and password.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (validUser) {
        localStorage.setItem("currentUser", JSON.stringify(validUser));
        alert("Login successful! Welcome, " + (validUser.name || "User"));
        window.location.href = "user.html";
    } else {
        if (messageBox) {
            messageBox.innerText = "Invalid email or password. Please try again.";
        } else {
            alert("Invalid email or password.");
        }
    }
}