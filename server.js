require('dotenv').config()
const x = require("express");
const express = x();
const http = require('http')
const app = http.createServer(express)
const routes = require("./routes")
const errorHandlers = require("./middleware/errorHandlers")
const log = require("./middleware/log")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const session = require("express-session")
const redis = require("redis");
const csurf = require("csurf");
const util = require("./middleware/utilities")
const passport = require("./passport");
const rabbit = require("./rabbit/connect");
const { sendMessage } = require("./rabbit/connect");

var io = require('socket.io')(app)
express.use(log)

// Redis session storage prepare
const RedisStore = require('connect-redis')(session);
// Create client for redis
const client = redis.createClient({
    host: process.env.REDIS_URL,
    url: process.env.REDIS_URL
});


//Use the session integrated with redis
express.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({
        url: process.env.REDIS_URL,
        client
    }),
}))

express.use(passport.passport.initialize())
express.use(passport.passport.session())


express.use(bodyParser.json())
express.use(bodyParser.urlencoded({
    extended: false
}))

const csrfProtection = csurf({
    cookie: true
})

express.use(cookieParser(process.env.SESSION_SECRET))

express.use((req, res, next) => {
    if (req.session.pageCount) req.session.pageCount++
    else req.session.pageCount = 1;
    next();
})

express.use(util.authenticated)

express.get("/token", csrfProtection, (req, res) => {
    res.status(200).send({
        token: req.csrfToken()
    })
})
express.get("/", routes.index)
express.get("/login", csrfProtection, routes.login)
express.post("/login", csrfProtection, routes.loginProcess)
express.get("/chat", [util.requireAuthentication], routes.chat)
express.get("/logout", routes.logOut)
express.post('/message', (req, res) => {
    const msg = req.body.msg;
    console.log(msg)
    if (sendMessage) {
        sendMessage(msg)
        res.send("Message sent.")
    } else {
        res.status(200).send("Rabbit is not ready");
    }
})

express.use(errorHandlers.error)
express.use(errorHandlers.notFound)


io.sockets.on("connection", function (socket) {
    console.log("Websocket connected server side")

    socket.on("join", data => {
        io.sockets.emit("userJoined", data);
        socket.username = data.username;
    });

    socket.on("ping", data => {
        io.sockets.emit("ping", { username: socket.username })
    })
})


app.listen(process.env.PORT, () => {
    console.log(`App listening at port ${process.env.PORT}`)
})
