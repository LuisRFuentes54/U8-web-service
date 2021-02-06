const express = require("express");
const schoolsController = require("./schools.controller");
const router = express.Router();

router.get('/', schoolsController.getAll);
router.get('/:id', schoolsController.getOne);
router.post('/', schoolsController.create);
router.delete('/:id', schoolsController.delete);
router.put('/:id', schoolsController.update);

module.exports = router;