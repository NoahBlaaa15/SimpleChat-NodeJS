const io = require("socket.io")(2565);
const express = require("express");
const app = express();

const names = {};

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
})

app.get("/client.js", function(req, res) {
    res.sendFile(__dirname + '/www/client.js')
})

app.listen(80)

io.on("connection", socket => {
    socket.on("send-chat-message", message => {
        socket.broadcast.emit("chat-message", { message : message, name: names[socket.id] });
    });
    socket.on("login", message => {
        names[socket.id] = message;
        socket.broadcast.emit("login", message);
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("logout", names[socket.id]);
        delete names[socket.id];
    })
});
