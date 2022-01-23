const express = require("express");
const usersController = require("../controllers/user.controller");

const router = express.Router();

//router.get("/", usersController.index);
router.post("/sign-up", usersController.signUp);
router.post("/login", usersController.login);
router.get("/:id", usersController.show);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.destroy);

module.exports = router;