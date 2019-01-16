const httpCodes = {
    OK: 200,
    CREATED: 201,
    FOUND: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

const userData= {
    name: 'admin',
    password: 'admin'
}

module.exports = {
    httpCodes,
    userData
}