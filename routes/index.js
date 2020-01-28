const index = (req, res, next) => {
    res.send("Index")
};

const login = (req, res, next) => {
    res.send("Login")
};
const loginProcess = (req, res, next) => {
    console.log(req.body)
    res.send({user:  req.body.username, password: req.body.password})
};

const chat = (req, res, next) => {
    res.send("Chat")
};

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;