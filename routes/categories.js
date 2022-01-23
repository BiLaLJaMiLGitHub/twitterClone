const express = require("express");
const categoriesController = require("../controllers/category.controller");

const router = express.Router();

router.get("/", categoriesController.index);
router.post("/", categoriesController.save);
router.patch("/:id", categoriesController.update);
router.delete("/:id", categoriesController.destroy);

module.exports = router;