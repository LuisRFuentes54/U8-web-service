const express = require("express");
const sectionsController = require("./sections.controller");
const router = express.Router();

/**
 * @swagger
 *
 * paths:
 *   /api/v1/sections/:
 *     post:
 *       tags:
 *         - sections
 *       summary: Crea una sección
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: body
 *          name: section
 *          description: Sección a crear
 *          schema:
 *            $ref: '#/definitions/Section'
 *       responses:
 *         200:
 *           description: Section saved
 *     get:
 *       tags:
 *         - sections
 *       summary: Lista todas las secciones
 *       
 *   /api/v1/sections/{id}:
 *   
 *     put:
 *       tags:
 *         - sections
 *       summary: Modifica una sección existente
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: path
 *          name: id
 *          description: ID de la sección a modificar
 *          schema:
 *            type: integer
 *            minimum: 1
 *        - in: body
 *          name: section
 *          description: Los datos a modificar
 *          schema:
 *            $ref: '#/definitions/Section'
 *       responses:
 *         200:
 *           description: Section updated
 *         404:
 *           description: Section not found
 *     delete:
 *     
 *       tags:
 *         - sections
 *       summary: Elimina una sección 
 *       parameters:
 *        - in: path
 *          name: id
 *          description: ID de la sección a eliminar
 *          schema:
 *            type: integer
 *            minimum: 1
 *       responses:
 *         200:
 *           description: Section deleted
 *         404:
 *           description: Section not found
 *     get:
 *     
 *      tags:
 *         - sections
 *      summary: Obtiene la información de una sección 
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID de la sección a consultar
 *         schema:
 *           type: integer
 *           minimum: 1
 *      responses:
 *        200:
 *          description: Listado de secciones activas
 *        404:
 *          description: Section not found
 * 
 *   /api/v1/sections/{ids}/persons/{idp}:
 *   
 *     post:
 *       tags:
 *         - sections
 *       summary: Agrega una persona a una sección
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: path
 *        
 *          name: ids
 *          description: ID de la sección en la que desea agregar una persona
 *          schema:
 *            type: integer
 *            minimum: 1
 *        - in: path
 *          name: idp
 *          description: ID de la persona a la que desea inscribir
 *          schema:
 *            type: integer
 *            minimum: 1
 *        - in: body
 *          name: type
 *          description: Indica si es estudiante o profesor
 *          schema:
 *            $ref: '#/definitions/Type'
 *       responses:
 *         200:
 *           description: Person registered in the section
 *         500:
 *           description: Person is already registered in the section
 *         404: 
 *           description: Section not found - Person not found
 *     
 *     delete:
 *     
 *       tags:
 *         - sections
 *       summary: Elimina a un persona de una seccion
 *       parameters:
 *        - in: path
 *          name: ids
 *          description: ID de la sección a la cual pertenece la persona
 *          schema:
 *            type: integer
 *            minimum: 1
 *        - in: path
 *          name: idp
 *          description: ID de la persona a eliminar
 *          schema:
 *            type: integer
 *            minimum: 1
 *       responses:
 *         200:
 *           description: Person removed from section
 *         404:
 *           description: The person is not already registered in the section
 * 
 *   /api/v1/sections/students/{ids}:
 *   
 *     get:
 *       tags:
 *         - sections
 *       summary: Listar los estudiantes de una sección
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: path
 *        
 *          name: ids
 *          description: ID de la sección la cual se desea consultar
 *          schema:
 *            type: integer
 *            minimum: 1
 *       responses:
 *         200:
 *           description: Lista los estudiantes de la sección
 *         404: 
 *           description: There aren't students in this section
 * 
 *   /api/v1/sections/teachers/{ids}:
 *     get:
 *       tags:
 *         - sections
 *       summary: Obtener el profesor de una sección
 *       consumes:
 *         - application/json
 *       parameters:
 *        - in: path
 *        
 *          name: ids
 *          description: ID de la sección la cual se desea consultar
 *          schema:
 *            type: integer
 *            minimum: 1
 *       responses:
 *         200:
 *           description: Retorna el profesor de la sección
 *         404: 
 *           description: There isn't teacher in this section
 *     
 *     
 *
 * definitions:
 *  Section:
 *    type: object
 *    required:
 *      - name
 *      - description
 *      - creditUnit
 *      - smester
 *      - type
 *      - teoricHours
 *      - practiceHours
 *      - labHours
 *      - fkSchool
 * 
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      creditUnit:
 *        type: integer
 *      semester:
 *        type: integer
 *      type:
 *        type: string
 *      teoricHours:
 *        type: number
 *      practiceHours:
 *        type: number
 *      labHours:
 *        type: number
 *      fkSchool:
 *        type: integer
 * 
 *  Type:
 *    type: object
 *    required:
 *      - type
 *     
 * 
 *    properties:
 *      type:
 *        type: string
 */

router.get('/', sectionsController.getAll);
router.get('/:id', sectionsController.getOne);
router.post('/', sectionsController.create);
router.delete('/:id', sectionsController.delete);
router.put('/:id', sectionsController.update);
router.post('/:ids/persons/:idp', sectionsController.addPerson);
router.delete('/:ids/persons/:idp', sectionsController.deletePerson);
router.get('/students/:ids', sectionsController.getStudents);
router.get('/teachers/:ids', sectionsController.getTeacher);

module.exports = router;