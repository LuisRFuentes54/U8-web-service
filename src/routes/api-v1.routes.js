const express = require("express");
const routerFaculties = require("../services/faculties/faculties.routes");
const router = express.Router();

router.use('/faculties', routerFaculties);

module.exports = router;