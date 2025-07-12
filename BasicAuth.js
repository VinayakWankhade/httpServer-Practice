const express = require("express")
const path = require("path");

const app = express();
app.use(express.json())

let users = [];


// Frontend routes
app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "assets/signup.html"))
})
app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname, "assets/signin.html"))
})
app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "assets/dashboard.html"))
})

// backend routes
app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // ideally check if a user already exists with this username

    users.push({
        username: username,
        password: password,
        todos: []
    })

    res.send({
        message: "You are successfully sign up"
    })
})
app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let user = users.find(function(u) {
        if (u.username == username && u.password == password) {
            return true;
        } else {
            return false
        }
    })

    if (!user) {
        return res.status(403).json({
            message: "Incorrect username ans password"
        })
    }

    let token = Math.random();
    user.token = token;

    res.send({
        token: token
    })
})

app.post("/todos", function(req, res) {
    const token = req.headers.token;
    const todo = req.body.todo;
    console.log(users);
    console.log(token);

    let user = users.find(function(u) {
        if (u.token == token) {
            return true
        } else {
            return false
        }
    })

    if (!user) {
        return res.status(403).json({
            message: "Unauthenticated"
        })
    } else {
        user.todos.push(todo)
        res.json({
            mesage: "Todo created"
        })
    }

})

app.get("/todos", function(req, res) {
    const token = req.headers.token;

    let user = users.find(function(u) {
        if (u.token == token) {
            return true;
        } else {
            return false
        }
    })

    if (!user) {
        res.status(411).json({
            message: "Cant find you"
        })
    } else {
        res.send({
            todos: user.todos
        })
    }

    // return them their todos
})

app.delete("/todos", function(req ,res) {
    const token = req.headers.token;
})

app.listen(3000);
