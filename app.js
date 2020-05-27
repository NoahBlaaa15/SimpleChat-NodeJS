const express = require("express");
const app = express();

const names = {};

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/www/index.html');
})

app.get("/client.js", function(req, res) {
    res.sendFile(__dirname + '/www/client.js')
})

const server = app.listen(process.env.PORT || 80);
const io = require("socket.io")(server);

io.on("connection", socket => {
    socket.on("send-chat-message", message => {
        socket.broadcast.emit("chat-message", { message : message, name: names[socket.id] });
    });
    socket.on("login", message => {
        names[socket.id] = message;
        socket.broadcast.emit("login", message);

        const values = Object.keys(names).map(function (key) {
            return names[key];
        });
        io.local.emit("users", values);
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("logout", names[socket.id]);
        delete names[socket.id];

        const values = Object.keys(names).map(function (key) {
            return names[key];
        });
        io.local.emit("users", values);
    })
});
