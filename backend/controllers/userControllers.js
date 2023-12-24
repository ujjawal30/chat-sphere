const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/token");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields.");
  }

  const doesUserExist = await User.findOne({ email });
  console.log("doesUserExist :>> ", doesUserExist);

  if (doesUserExist) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    res.status(200).json({
      jwt: generateToken(newUser._id),
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        pic: newUser.pic,
      },
    });
  } else {
    res.status(400);
    throw new Error("Unable to create user.");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      jwt: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
      },
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const users = await User.find(
    search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {}
  ).find({ _id: { $ne: req.user._id } });

  res.status(200).json(users);
});

module.exports = {
  registerUser,
  authUser,
  getUsers,
};
