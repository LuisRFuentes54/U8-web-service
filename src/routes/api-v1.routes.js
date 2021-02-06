const express = require("express");
const routerFaculties = require("../services/faculties/faculties.routes");
const routerSchools = require("../services/schools/schools.routes");
const router = express.Router();

router.use('/faculties', routerFaculties);
router.use('/schools', routerSchools);

module.exports = router;