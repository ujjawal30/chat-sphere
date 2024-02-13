const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/chat-sphere"
    );

    console.log(`MongoDB connected successfully.`);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

module.exports = connectDB;
