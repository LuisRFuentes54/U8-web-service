const express = require("express");
const personsController = require("./persons.controller");
const router = express.Router();

/**
 * @swagger
 *
 * paths:
 *   /api/v1/persons/:
 *     post:
 *       tags:
 *         - persons
 *       summary: Registra a una persona
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: body
 *          name: person
 *          description: Persona a registrar
 *          schema:
 *            $ref: '#/definitions/person'
 *       responses:
 *         200:
 *           description: Person saved
 *     get:
 *       tags:
 *         - persons
 *       summary: Lista todas las personas activas
 *       
 *   /api/v1/persons/{id}:
 *   
 *     put:
 *       tags:
 *         - persons
 *       summary: Modifica los datos de una persona activa
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: path
 *          name: id
 *          description: ID de la personas cuyos datos se modificarán
 *          schema:
 *            type: integer
 *            minimum: 1
 *        - in: body
 *          name: person
 *          description: Los datos a modificar
 *          schema:
 *            $ref: '#/definitions/person'
 *       responses:
 *         200:
 *           description: Person updated
 *         404:
 *           description: Person not found
 *     delete:
 *     
 *       tags:
 *         - persons
 *       summary: Elimina el registro de una persona 
 *       parameters:
 *        - in: path
 *          name: id
 *          description: ID del registro de persona a eliminar
 *          schema:
 *            type: integer
 *            minimum: 1
 *       responses:
 *         200:
 *           description: Person deleted
 *         404:
 *           description: Person not found
 *     get:
 *     
 *      tags:
 *         - persons
 *      summary: Obtiene la información de una persona
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID de la persona a consultar
 *         schema:
 *           type: integer
 *           minimum: 1
 *      responses:
 *        200:
 *          description: Información de la persona
 *        404:
 *          description: Person not found
 *
 * definitions:
 *  person:
 *    type: object
 *    required:
 *      - ci
 *      - firstName
 *      - lastName
 *    properties:
 *      ci:
 *        type: string
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 */


router.get('/', personsController.getAll);
router.get('/:id', personsController.getOne);
router.post('/', personsController.create);
router.delete('/:id', personsController.delete);
router.put('/:id', personsController.update);

module.exports = router;