const express = require("express");
const sectionsController = require("./sections.controller");
const router = express.Router();

router.get('/', sectionsController.getAll);
router.get('/:id', sectionsController.getOne);
router.post('/', sectionsController.create);
router.delete('/:id', sectionsController.delete);
router.put('/:id', sectionsController.update);
router.post('/:ids/persons/:idp', sectionsController.addPerson);
router.delete('/:ids/persons/:idp', sectionsController.deletePerson);

module.exports = router;