const express = require("express");
const facultiesController = require("./faculties.controller");
const router = express.Router();

/**
 * @swagger
 *
 * paths:
 *   /api/v1/faculties/:
 *     post:
 *       tags:
 *         - faculties
 *       summary: Crea una facultad
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: body
 *          name: faculty
 *          description: Facultad a crear
 *          schema:
 *            $ref: '#/definitions/Faculty'
 *       responses:
 *         200:
 *           description: Faculty saved
 *     get:
 *       tags:
 *         - faculties
 *       summary: Lista todas las facultades
 *       
 *   /api/v1/faculties/{id}:
 *   
 *     put:
 *       tags:
 *         - faculties
 *       summary: Modifica una facultad existente
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: path
 *          name: id
 *          description: ID de la facultad a modificar
 *          schema:
 *            type: integer
 *            minimum: 1
 *        - in: body
 *          name: faculty
 *          description: Los datos a modificar
 *          schema:
 *            $ref: '#/definitions/Faculty'
 *       responses:
 *         200:
 *           description: Faculty updated
 *         404:
 *           description: Faculty not found
 *     delete:
 *     
 *       tags:
 *         - faculties
 *       summary: Elimina una facultad 
 *       parameters:
 *        - in: path
 *          name: id
 *          description: ID de la facultad a eliminar
 *          schema:
 *            type: integer
 *            minimum: 1
 *       responses:
 *         200:
 *           description: Faculty deleted
 *         404:
 *           description: Faculty not found
 *     get:
 *     
 *      tags:
 *         - faculties
 *      summary: Obtiene la información de una facultad 
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID de la facultad a consultar
 *         schema:
 *           type: integer
 *           minimum: 1
 *      responses:
 *        200:
 *          description: Listado de facultades activas
 *        404:
 *          description: Faculty not found
 *
 * definitions:
 *  Faculty:
 *    type: object
 *    required:
 *      - name
 *      - description
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 */


router.get('/', facultiesController.getAll);
router.get('/:id', facultiesController.getOne);
router.post('/', facultiesController.create);
router.delete('/:id', facultiesController.delete);
router.put('/:id', facultiesController.update);

module.exports = router;