const express = require("express");
const sectionsController = require("./sections.controller");
const router = express.Router();

router.get('/', sectionsController.getAll);
router.get('/:id', sectionsController.getOne);
router.post('/', sectionsController.create);
router.delete('/:id', sectionsController.delete);
router.put('/:id', sectionsController.update);

module.exports = router;