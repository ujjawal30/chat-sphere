const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    res.status(400);
    throw new Error("Please provide valid data.");
  }

  try {
    let newMessage = await Message.create({
      sender: req.user._id,
      chat: chatId,
      content: content,
    });

    newMessage = await newMessage.populate("sender", "name pic");
    newMessage = await newMessage.populate("chat");
    newMessage = await User.populate(newMessage, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: newMessage,
    });

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getAllMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const allMessages = await Message.find({ chat: chatId })
      .populate("sender", "name")
      .populate("chat");

    res.status(200).json(allMessages);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  sendMessage,
  getAllMessages,
};
