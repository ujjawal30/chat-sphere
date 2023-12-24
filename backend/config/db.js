const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb://${process.env.MDB_HOST}:${process.env.MDB_PORT}`,
      {
        user: process.env.MDB_USERNAME,
        pass: process.env.MDB_PASSWORD,
        dbName: process.env.MDB_DATABASE,
      }
    );
    console.log(`MongoDB connected successfully.`);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

module.exports = connectDB;
