const utils = require('./../utils');
const jwt = require('jsonwebtoken');

function handleErrorsIfAny(err, req, res, next) {
    if (err) console.log("ERROR ---> ", err);
    res.send(err);
};

function sendResponse(req, res, next) {
    if (res.responseObj) {
        res.send(res.responseObj);
    } else {
        res.send({ error: "no response handler found" });
    }
}

function verifyToken(req, res, next) {
    try {
        const { token } = req;
        jwt.verify(token, 'serverKey', null, function (err, decoded) {
            if (err) {
                res.status(utils.httpCodes.UNAUTHORIZED);
                return next(({ error: "Invalid credentials sent!" }));
            }
            return next();
        })
    } catch (error) {
        res.status(utils.httpCodes.INTERNAL_SERVER_ERROR);
        return next({ error: "Internal Server Error" });
    }
}

function getTokenFromHeader(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(utils.httpCodes.UNAUTHORIZED);
        return next({ error: "Invalid Authorization Header" });
    }
    const token = authorization.split(" ")[1];
    if (!req.token)
        req.token = token;
    return next();

}

function createToken(req, res, next) {
    const { username } = req.body;
    const payload = {};
    payload['name'] = username;
    payload['VERSION'] = "1";
    jwt.sign(payload, 'serverKey', null, function (err, token) {
        if (err) {
            res.status(utils.httpCodes.INTERNAL_SERVER_ERROR);
            return next("Internal Server Error");
        }
        res.responseObj = {};
        res.responseObj['token'] = token;
        res.status(utils.httpCodes.OK);
        return next();
    });
};

module.exports = {
    handleErrorsIfAny,
    sendResponse,
    verifyToken,
    createToken,
    getTokenFromHeader
}