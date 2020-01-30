module.exports.authenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
        
    }
    next();
}

module.exports.requireAuthentication = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect("/login")
    }
}

module.exports.auth = (username, password, session) => {
    const auth = username === 'Gigio' || 'Brian';
    if (auth) {
        session.isAuthenticated = true;
        session.user = {username}
    }
    return true;
}

module.exports.logOut = (session) => {
    session.isAuthenticated = false;
    delete session.user;
}