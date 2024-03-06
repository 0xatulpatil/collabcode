const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const PORT = 5000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.get("/", (req, res) => {
	res.send("hello there");
});
console.log(uuidv4());

const rooms = {};

io.on("connection", (socket) => {
	console.log("user connection");
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});

	socket.on("message", (message) => {
		console.log("Message received:", message);
		io.emit("message", message);
	});
});

server.listen(PORT, (req, res) => {
	console.log("Listening on PORT: ", PORT);
});
