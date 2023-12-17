const { authenticate } = require("passport");
const {
  getUsers,
  getUserById,
  getUserByEmail,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../../controllers/auth/userController");

const router = require("express").Router();

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUserById);
router.get("/:email", authenticate, getUserByEmail);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

module.exports = {
  router,
};
