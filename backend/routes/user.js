const express = require("express");

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/setTheme", checkAuth, UserController.setTheme);
router.get("/profile", checkAuth, UserController.getProfile);

module.exports = router;
