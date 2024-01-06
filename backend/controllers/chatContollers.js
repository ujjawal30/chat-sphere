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

const createOrUpdateGroup = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { chatName, users } = req.body;

  if (!chatName || !users) {
    res.status(400);
    throw new Error("Please fill all the fields.");
  }

  if (users.length <= 2) {
    res.status(400);
    throw new Error("There must be more than 2 users to create a group");
  }

  try {
    if (chatId) {
      const groupChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName, users },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.status(200).json(groupChat);
    } else {
      const newGroupChat = await Chat.create({
        chatName,
        users: [req.user._id, ...users],
        isGroupChat: true,
        groupAdmin: req.user._id,
      });

      const groupChat = await Chat.findOne({ _id: newGroupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.status(200).json(groupChat);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error?.message);
  }
});

module.exports = {
  getAllChats,
  getChats,
  createOrUpdateGroup,
};
