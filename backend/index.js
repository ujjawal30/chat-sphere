const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
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

app.get("/api", (req, res) => {
  res.send({ status: 200, page: "Homepage" });
});

app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, console.log(`Server is listening at PORT ${PORT}`));
