const express = require("express");
const schoolsController = require("./schools.controller");
const router = express.Router();

/**
 * @swagger
 *
 * paths:
 *   /api/v1/schools/:
 *     post:
 *       tags:
 *         - schools
 *       summary: Crea una escuela
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: body
 *          name: school
 *          description: Escuela a crear
 *          schema:
 *            $ref: '#/definitions/School'
 *       responses:
 *         200:
 *           description: School saved
 *     get:
 *       tags:
 *         - schools
 *       summary: Lista todas las escuelaes
 *       
 *   /api/v1/schools/{id}:
 *   
 *     put:
 *       tags:
 *         - schools
 *       summary: Modifica una escuela existente
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: path
 *          name: id
 *          description: ID de la escuela a modificar
 *          schema:
 *            type: integer
 *            minimum: 1
 *        - in: body
 *          name: school
 *          description: Los datos a modificar
 *          schema:
 *            $ref: '#/definitions/School'
 *       responses:
 *         200:
 *           description: School updated
 *         404:
 *           description: School not found
 *     delete:
 *     
 *       tags:
 *         - schools
 *       summary: Elimina una escuela 
 *       parameters:
 *        - in: path
 *          name: id
 *          description: ID de la escuela a eliminar
 *          schema:
 *            type: integer
 *            minimum: 1
 *       responses:
 *         200:
 *           description: School deleted
 *         404:
 *           description: School not found
 *     get:
 *     
 *      tags:
 *         - schools
 *      summary: Obtiene la información de una escuela 
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID de la escuela a consultar
 *         schema:
 *           type: integer
 *           minimum: 1
 *      responses:
 *        200:
 *          description: Listado de escuelas activas
 *        404:
 *          description: School not found
 *
 * definitions:
 *  School:
 *    type: object
 *    required:
 *      - name
 *      - description
 *      - fkFaculty
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      fkFaculty:
 *        type: integer
 */

router.get('/', schoolsController.getAll);
router.get('/:id', schoolsController.getOne);
router.post('/', schoolsController.create);
router.delete('/:id', schoolsController.delete);
router.put('/:id', schoolsController.update);

module.exports = router;