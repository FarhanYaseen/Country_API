const utils = require('./../utils')

function authorize(req, res, next) {
    const { username, password } = req.body;
    if (username === utils.userData.name && password === utils.userData.password) {
        return next();
    }
    else{
        res.status(utils.httpCodes.UNAUTHORIZED);
        return next('Un Authorized User');
    }
}

module.exports = {
    authorize: authorize
}