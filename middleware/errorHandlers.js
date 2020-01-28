module.exports.notFound = (req, res, next) => {
    res.status(404).send("You seem lost. You must have taken a wrong turn back there.")
}

module.exports.error = (err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message)
}