const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/fetch/:username", userController.fetchUser);
router.get("/mutual-followers/:username", userController.findMutualFollowers);
router.get("/search", userController.searchUsers);
router.delete("/delete/:username", userController.deleteUser);
router.patch("/update/:username", userController.updateUser);
router.get("/list", userController.listUsers);

module.exports = router;
