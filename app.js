const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const usersFile = path.join(__dirname, "users.json");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.post("/register", (req, res) => {
    const newUser = req.body;

    fs.readFile(usersFile, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to read database"
            });
        }

        let users = JSON.parse(data);

        const existingUser = users.find(
            user => user.username === newUser.username ||
                    user.email === newUser.email
        );

        if (existingUser) {
            return res.json({
                success: false,
                message: "Username or email already exists"
            });
        }

        users.push(newUser);

        fs.writeFile(usersFile, JSON.stringify(users, null, 4), err => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Unable to save user"
                });
            }

            res.json({
                success: true,
                message: "Registration successful"
            });
        });
    });
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    fs.readFile(usersFile, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Unable to read database"
            });
        }

        const users = JSON.parse(data);

        const user = users.find(
            user =>
                (user.username === username || user.email === username) &&
                user.password === password
        );

        if (user) {
            res.json({
                success: true,
                message: "Login successful",
                user: user
            });
        } else {
            res.json({
                success: false,
                message: "Invalid username/email or password"
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});