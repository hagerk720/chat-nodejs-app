const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
const io = require("socket.io")(server);
app.get("/message.js", (req, res) => {
  res.send("./message.js");
});
app.use(express.static(path.join(__dirname, "public")));
let socketsConnected = new Set();
io.on("connection", onConnected);

function onConnected(socket) {
  socketsConnected.add(socket.id);
  io.emit("clients-total", socketsConnected.size);
  socket.on("disconnect", () => {
    socketsConnected.delete(socket.id);
    io.emit("clients-total", socketsConnected.size);
  });
  socket.on("message", (data) => {
    socket.broadcast.emit("chat-message", data);
  });
}
