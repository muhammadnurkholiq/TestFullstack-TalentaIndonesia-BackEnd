const express = require("express");

const router = express.Router();

// controllers
// user
const { getUsers } = require("../controllers/user");

// router
router.get("/users", getUsers);

module.exports = router;
