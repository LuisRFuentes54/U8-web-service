const express = require("express");
const facultiesController = require("./faculties.controller");
const router = express.Router();

router.get('/', facultiesController.getAll);
router.get('/:id', facultiesController.getOne);
router.post('/', facultiesController.create);
router.delete('/:id', facultiesController.delete);
router.put('/:id', facultiesController.update);

module.exports = router;