const express = require("express");
const router = express.Router();
const controller = require('./../controllers/users');
const mws = require('./../middleware');


router.post('/', controller.authorize, mws.createToken, mws.sendResponse, mws.handleErrorsIfAny);

module.exports = router;
