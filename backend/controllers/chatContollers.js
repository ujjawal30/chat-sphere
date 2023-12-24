const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const getAllChats = asyncHandler(async (req, res) => {
  try {
    const availableChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(
        async (results) =>
          await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          })
      );

    res.status(200).json(availableChats);
  } catch (error) {
    res.status(500);
    throw new Error(error?.message);
  }
});

const getChats = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("Please provide userId.");
  }

  let existingChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  existingChat = await User.populate(existingChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (existingChat.length) {
    res.status(200).json(existingChat[0]);
  } else {
    try {
      const newChat = await Chat.create({
        chatName: "one2one",
        isGroupChat: false,
        users: [req.user._id, userId],
      });

      const chat = await Chat.findById(newChat._id).populate(
        "users",
        "-password"
      );

      res.status(200).json(chat);
    } catch (error) {
      res.status(500);
      throw new Error(error?.message);
    }
  }
});

const createGroup = asyncHandler(async (req, res) => {
  const { name, users } = req.body;

  if (!name || !users) {
    res.status(400);
    throw new Error("Please fill all the fields.");
  }

  if (users.length <= 2) {
    res.status(400);
    throw new Error("There must be more than 2 users to create a group");
  }

  try {
    const newGroupChat = await Chat.create({
      chatName: name,
      users: [req.user._id, ...users],
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const groupChat = await Chat.findOne({ _id: newGroupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(groupChat);
  } catch (error) {
    res.status(500);
    throw new Error(error?.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  if (!chatId || !chatName) {
    res.status(400);
    throw new Error("Please provide valid payload.");
  }

  try {
    const renameGroup = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (renameGroup) {
      res.status(200).json(renameGroup);
    } else {
      res.status(404);
      throw new Error("Chat not available.");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error?.message);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.status(400);
    throw new Error("Please provide valid payload.");
  }

  try {
    const addUser = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (addUser) {
      res.status(200).json(addUser);
    } else {
      res.status(404);
      throw new Error("Chat not available.");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error?.message);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.status(400);
    throw new Error("Please provide valid payload.");
  }

  try {
    const removeUser = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (removeUser) {
      res.status(200).json(removeUser);
    } else {
      res.status(404);
      throw new Error("Chat not available.");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error?.message);
  }
});

module.exports = {
  getAllChats,
  getChats,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
