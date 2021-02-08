const express = require("express");
const routerFaculties = require("../services/faculties/faculties.routes");
const routerSchools = require("../services/schools/schools.routes");
const routerSections = require("../services/sections/sections.routes");
const routerPersons = require ("../services/persons/persons.routes");
const router = express.Router();
const swagger = require("../../swagger.json");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = swaggerJSDoc(swagger);

router.use('/faculties', routerFaculties);
router.use('/sections', routerSections);
router.use('/schools', routerSchools);
router.use('/persons', routerPersons);


router.use("/api-docs", swaggerUI.serve);
/**
 * @swagger
 * /api/v1/api-docs/:
 *   get:
 *     summary: Documentación de la API
 *     description: Documentación de la API con Swagger
 *     produces:
 *       - text/html
 *     responses:
 *       200:
 *         description: HTML con la documentación de la API
 */
router.get("/api-docs", swaggerUI.setup(swaggerDocs));

module.exports = router;