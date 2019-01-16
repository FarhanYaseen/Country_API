const utils = require('./../utils')
let countries = [];

function getCountries(req, res, next) {
    if (!res.responseObj) {
        res.responseObj = {};
        res.responseObj['countries'] = countries;
    }
    res.status(utils.httpCodes.OK);
    return next();
}
function putCountry(req, res, next) {
    const { body } = req;
    if (body && body.country) {
        const { country } = body;
        if (!res.responseObj)
            res.responseObj = {};
        if (!countries.includes(country)) {
            countries.push(country);
            res.responseObj["country"] = country;
            res.responseObj["msg"] = `Country ${country} Added Successfully`;
            res.status(utils.httpCodes.OK);
            return next();
        }
        else {
            res.responseObj["country"] = country;
            res.responseObj["msg"] = `Country ${country} Already Exist`;
            res.status(utils.httpCodes.OK);
            return next();
        }
    } else {
        res.status(utils.httpCodes.BAD_REQUEST);
        return next({ error: "Request parameters do not conform to the API" });
    }
}
function deleteCountry(req, res, next) {
    const { body } = req;
    if (body && body.country) {
        const { country } = body;
        const originalLength = countries.length;
        countries = countries.filter(countryItem => countryItem !== country);
        const filteredLength = countries.length;
        if (originalLength === filteredLength) {
            res.status(utils.httpCodes.NOT_FOUND);
            return next({ error: `Country ${country} Not Exist` });
        }
        if (!res.responseObj) {
            res.responseObj = {};
            res.responseObj["country"] = country;
            res.responseObj["msg"] = `Country ${country} Removed Successfully`;
            res.status(utils.httpCodes.OK);
            return next();
        }
    } else {
        res.status(utils.httpCodes.BAD_REQUEST);
        return next({ error: "Request parameters do not conform to the API" });
    }
}
module.exports = {
    getCountries,
    putCountry,
    deleteCountry
};