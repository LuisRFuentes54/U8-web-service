const express = require("express");
const routerFaculties = require("../services/faculties/faculties.routes");
const routerSchools = require("../services/schools/schools.routes");
const routerSections = require("../services/sections/sections.routes");
const routerPersons = require ("../services/persons/persons.routes");
const router = express.Router();

router.use('/faculties', routerFaculties);
router.use('/sections', routerSections);
router.use('/schools', routerSchools);
router.use('/persons', routerPersons);

module.exports = router;