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
const { Server } = require("socket.io");

dotenv.config();
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

const server = app.listen(
  PORT,
  console.log(`Server is listening at PORT ${PORT}`.yellow.underline.bold)
);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("<<: Socket Connected :>>".bgYellow.black);

  socket.on("setup", (user) => {
    socket.join(user);
    console.log("Room Setup :>> ", user);
    socket.emit("connected");
  });

  socket.on("join", (room) => {
    socket.join(room);
    console.log("User Joined Room :>> ", room);
  });

  socket.on("start-typing", (room) => socket.in(room).emit("start-typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));

  socket.on("message-sent", (message) => {
    const chat = message.chat;

    chat.users.forEach((user) => {
      if (user._id == message.sender._id) return;

      socket.in(user._id).emit("message-recieved", message);
    });
  });
});
