const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
let count = 0;

const {
	createClassRoom,
	addStudentToClass,
	removePerson,
	studentList,
} = require("./socket.classrooms");

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

io.on("connection", (socket) => {
	console.log("user connection", count++);

	socket.on("disconnect", () => {
		console.log("Socket connected to rooms", socket.rooms);
		let stud = removePerson(socket.id);
		let classCode = stud["classroomId"];

		socket.broadcast
			.to(classCode)
			.emit("classNotif", `${socket.id} left the classroom`);
		socket.broadcast
			.to(classCode)
			.emit("studentActivity", { stud: stud, inClass: false });
	});

	socket.on("message", (message) => {
		console.log("Message received:", message);
		socket.emit("message", message);
	});

	socket.on(
		"createClassroom",
		({ roomId, className, teacherName, password }) => {
			let { error, classroom } = createClassRoom(
				roomId,
				socket.id,
				className,
				teacherName,
				password
			);
			if (error) {
				console.log("Error while creating class", error);
			} else socket.join(roomId);
		}
	);

	socket.on("joinClassroom", ({ roomId, studentName, password }) => {
		console.log("SERVER: Some one is joining the class");
		let addedStud = addStudentToClass(roomId, socket.id, studentName, password);
		socket.broadcast
			.to(roomId)
			.emit("classNotif", `${studentName} joined the classroom`);
		socket.join(roomId);
		socket.broadcast
			.to(roomId)
			.emit("studentActivity", { stud: addedStud, inClass: true });
	});

	socket.on("leaveClassroom", ({ classCode }) => {
		removePerson(socket.id, classCode);
		socket.broadcast
			.to(classCode)
			.emit("classNotif", `${socket.id} left the classroom`);
		socket.broadcast
			.to(classCode)
			.emit("studentActivity", { id: socket.id, inClass: false });
	});

	socket.on("getStudentList", ({ classCode }) => {
		console.log("event received: getStudentList");
		const studList = studentList(classCode);
		console.log(studList);
		socket.broadcast.to(classCode).emit("studentList", studList);
	});
});

server.listen(PORT, (req, res) => {
	console.log("Listening on PORT: ", PORT);
});
