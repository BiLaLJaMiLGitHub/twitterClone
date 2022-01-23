const express = require("express");
const tweetsController = require("../controllers/tweet.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

const router = express.Router();

router.get("/", tweetsController.index);
router.post("/", checkAuthMiddleware.checkAuth, tweetsController.save);
router.get("/:id", tweetsController.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, tweetsController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, tweetsController.destroy);

module.exports = router;