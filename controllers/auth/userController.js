const User = require("../../models/auth/userModel");
const { createToken } = require("../../services/auth");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(200).send({ message: "no user found", user });
    else
      return res.status(200).send({
        message: "all user fetched",
        statusCode: 200,
        users,
      });
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: error.message, errorType: error.name });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .send({ message: "user not found", statusCode: 404, user });
    else
      return res.status(201).send({
        message: "user fetched successfully",
        statusCode: 201,
        user,
      });
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: error.message, errorType: error.name });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .send({ message: "user not found", statusCode: 404, user });
    else
      return res.status(201).send({
        message: "user fetched successfully",
        statusCode: 201,
        user,
      });
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: error.message, errorType: error.name });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password)
      return res.status(400).send({
        message: "email, username and password is required for login",
        statusCode: 400,
      });
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (!userExist)
      return res
        .status(404)
        .send({ message: "user doesn't exist ", user: userExist });

    const isPasswordValid = await User.isPasswordCorrect(password);
    if (!isPasswordValid)
      return res
        .status(400)
        .send({ message: "invalid/wrong password ", statusCode: 400 });

    const token = createToken(userExist);
    res.cookie("token", token);

    return res
      .status(200)
      .send({ message: "user login successfull ", user: userExist });
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: error.message, errorType: error.name });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist)
      return res
        .status(409)
        .send({ message: "user already exist", user: userExist });

    const newUser = await User.create({ username, email, password, role });
    if (!newUser)
      return res
        .status(502)
        .send({ message: "user creation unsuccessfull", user: newUser });

    return res.status(201).send({
      message: "user created user",
      statusCode: 201,
      user: newUser,
    });
  } catch (error) {
    return res
      .status(error.status)
      .send({ message: error.message, errorType: error.name });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExistAndUpdated = await User.findByIdAndUpdate(id, {
      ...req.body,
    });
    if (!userExistAndUpdated)
      return res
        .status(404)
        .send({ message: "user not found", user: userExistAndUpdated });

    return res.status(201).send({
      message: "user updated successfully",
      statusCode: 201,
      user: userExistAndUpdated,
    });
  } catch (error) {
    return res.status(error.status).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExistAndDeleted = await User.findByIdAndDelete(id);
    if (!userExistAndDeleted)
      return res
        .status(404)
        .send({ message: "user not found ", user: userExistAndDeleted });

    return res.status().send({
      message: "user deleted successfully",
      user: userExistAndDeleted,
    });
  } catch (error) {
    return res.status(error.status).send({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
