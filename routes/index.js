const utils = require("../middleware/utilities")

const index = (req, res, next) => {
    res.send("Index")
};

const login = (req, res, next) => {
    res.send("Login")
};
const loginProcess = (req, res, next) => {
    const isAuth = utils.auth(req.body.username, req.body.password, req.session)
    if (isAuth) {
        res.redirect("/chat")
    } else {
        res.redirect('/login')
    }
};

const chat = (req, res, next) => {
    res.send("Chat")
};

const logOut = (req, res) => {
    utils.logOut(req.session);
    res.redirect('/')
}

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.logOut = logOut;