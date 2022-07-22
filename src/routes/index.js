const express = require("express");

const router = express.Router();

// middlewares
const { auth } = require("../middlewares/auth");

// controllers
// auth
const { register, login, checkAuth } = require("../controllers/auth");

// user
const { getUsers, getUser } = require("../controllers/user");

// router
// auth
router.post("/register", register);
router.post("/login", login);
router.post("/check-auth", auth, checkAuth);

// user
router.get("/users", getUsers);
router.get("/users/:id", getUser);

module.exports = router;
