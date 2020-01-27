require('dotenv').config()
const express = require("express");
const app = express();
const routes = require("./routes")
const errorHandlers = require("./middleware/errorHandlers")

app.get("/", routes.index)
app.get("/login", routes.login)
app.post("/login", routes.loginProcess)
app.get("/chat", routes.chat)

app.use(errorHandlers.notFound)
app.listen(process.env.PORT, () => {
    console.log(`App listening at port ${process.env.PORT}`)
})