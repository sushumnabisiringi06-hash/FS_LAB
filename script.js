const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        const message = document.getElementById("registerMessage");

        message.textContent = result.message;

        if (result.success) {
            registerForm.reset();

            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        }
    });
}


const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        const message = document.getElementById("loginMessage");

        message.textContent = result.message;

        if (result.success) {
            localStorage.setItem("student", JSON.stringify(result.user));
            window.location.href = "/dashboard.html";
        }
    });
}


const student = JSON.parse(localStorage.getItem("student"));

if (student && document.getElementById("studentName")) {

    document.getElementById("studentName").textContent = student.name;
    document.getElementById("name").textContent = student.name;
    document.getElementById("age").textContent = student.age;
    document.getElementById("dob").textContent = student.dob;
    document.getElementById("gender").textContent = student.gender;
    document.getElementById("email").textContent = student.email;
    document.getElementById("mobile").textContent = student.mobile;
    document.getElementById("username").textContent = student.username;
    document.getElementById("course").textContent = student.course;
    document.getElementById("address").textContent = student.address;
}


function logout() {
    localStorage.removeItem("student");
    window.location.href = "/login";
}