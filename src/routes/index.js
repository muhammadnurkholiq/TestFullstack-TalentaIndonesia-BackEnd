const express = require("express");

const router = express.Router();

// middlewares
const { auth } = require("../middlewares/auth");

// controllers
// auth
const { register, login, checkAuth } = require("../controllers/auth");

// user
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

// friend
const {
  addFriend,
  getFriends,
  getFriend,
  updateFriend,
  deleteFriend,
} = require("../controllers/friend");

// router
// auth
router.post("/register", register);
router.post("/login", login);
router.post("/check-auth", auth, checkAuth);

// user
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// friend
router.post("/friends", auth, addFriend);
router.get("/friends", auth, getFriends);
router.get("/friends/:id", auth, getFriend);
router.put("/friends/:id", auth, updateFriend);
router.delete("/friends/:id", auth, deleteFriend);

module.exports = router;
