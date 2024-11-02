const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route.js");
const postRoute = require("./routes/post.route.js");
const testRoute = require("./routes/test.route.js");
const userRoute = require("./routes/user.route.js");
const chatRoute = require("./routes/chat.route.js");
const messageRoute = require("./routes/message.route.js");
const connectDb = require("./config/database.js");
const port = 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(() => {
      console.log("server is connected to port " + port);
    });
  })
  .catch((err) => {
    console.log("Server is not connected !");
  });
