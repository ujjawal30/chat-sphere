require("colors");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {
  notFoundMiddleware,
  errorMiddleware,
} = require("./middlewares/errorMiddleware");

dotenv.config({ path: "./.env.local" });
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => res.send("ChatSphere API running!!!"));

app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(
  PORT,
  console.log(`Server is listening at PORT ${PORT}`.yellow.underline.bold)
);
