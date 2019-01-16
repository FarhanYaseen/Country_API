const express = require("express");
const router = express.Router();
const controller = require('./../controllers/countries');
const mws = require('./../middleware');

router.get("/", mws.getTokenFromHeader, mws.verifyToken, controller.getCountries, mws.handleErrorsIfAny, mws.sendResponse);

router.put("/", mws.getTokenFromHeader, mws.verifyToken, controller.putCountry, mws.handleErrorsIfAny, mws.sendResponse);

router.delete("/", mws.getTokenFromHeader, mws.verifyToken, controller.deleteCountry, mws.handleErrorsIfAny, mws.sendResponse);


module.exports = router;
