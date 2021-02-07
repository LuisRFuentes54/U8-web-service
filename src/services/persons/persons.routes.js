const express = require("express");
const personsController = require("./persons.controller");
const router = express.Router();

router.get('/', personsController.getAll);
router.get('/:id', personsController.getOne);
router.post('/', personsController.create);
router.delete('/:id', personsController.delete);
router.put('/:id', personsController.update);

module.exports = router;