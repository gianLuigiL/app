require('dotenv').config()
const express = require("express");
const app = express();
const routes = require("./routes")
const errorHandlers = require("./middleware/errorHandlers")
const log = require("./middleware/log")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const session = require("express-session")
const redis = require("redis");
const csurf = require("csurf");

app.use(log)
app.use(express.static(`${__dirname}/static`))
app.use(cookieParser(process.env.SESSION_SECRET))

// Redis session storage prepare
const RedisStore = require('connect-redis')(session);
// Create client for redis
const client = redis.createClient({
    host: process.env.REDIS_URL,
    url: process.env.REDIS_URL
});
//Use the session integrated with redis
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({
        url: process.env.REDIS_URL,
        client
    }),
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



app.use((req, res, next) => {
    if(req.session.pageCount) req.session.pageCount++
    else req.session.pageCount = 1;
    next();
})
app.get("/token",  (req, res) => {
    res.status(200).send('OK')
})
app.use(csurf({ cookie: true }))
app.get("/", routes.index)
app.get("/login", routes.login)
app.post("/login", routes.loginProcess)
app.get("/chat", routes.chat)

app.use(errorHandlers.error)
app.use(errorHandlers.notFound)
app.listen(process.env.PORT, () => {
    console.log(`App listening at port ${process.env.PORT}`)
})