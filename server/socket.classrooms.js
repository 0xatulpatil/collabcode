const { v4: uuidv4 } = require("uuid");

let classrooms = {
	/* 'classroom1': {
        teacherId: null,
        className: 'python - introduction'
        teacherName: 'shaila'
        password: uuid(4)
        students: []
    }, */
};

let socketToRoomMap = new Map();

const insertIntoMap = (socketId, roomId) => {
	socketToRoomMap.set(socketId, roomId);
};

const deleteFromMap = (socketId, roomId) => {
	socketToRoomMap.delete(socketId, roomId);
};

const createClassRoom = (
	roomId,
	socketId,
	className,
	teacherName,
	password
) => {
	console.log(roomId, socketId, className, teacherName, password);
	if (!className || !teacherName || !password)
		return { error: "Some of the fields are empty" };

	const classroom = {
		teacherId: socketId,
		className: className.trim().toLowerCase(),
		teacherName: teacherName.trim().toLowerCase(),
		password: password.trim().toLowerCase(),
		students: [],
	};

	classrooms[roomId] = classroom;
	insertIntoMap(socketId, roomId);
	console.log("created classroom", classrooms);
	return classrooms;
};

const addStudentToClass = (roomId, socketId, studentName, password) => {
	console.log("Joining student info", roomId, studentName, socketId, password);

	if (
		// !classrooms.hasOwnProperty(roomId) ||
		typeof classrooms[roomId] === "undefined" ||
		classrooms[roomId].password != password
	) {
		console.log("SERVER: error, password or room");
		console.log("err: classrooms:", classrooms);
		console.log("ERROR: classroom has property", classrooms[roomId], roomId);

		return { error: "Room does not exist or wrong password" };
	}

	const student = {
		name: studentName,
		socketId: socketId,
	};

	for (let elem of classrooms[roomId].students) {
		if (elem.socketId === socketId) {
			console.error(`Student ${elem.name} already present in class`);
			return student;
		}
	}

	classrooms[roomId].students.push(student);

	console.log(`joined classroom ${roomId}`);
	insertIntoMap(socketId, roomId);
	console.log("Student list:", classrooms[roomId].students);
	return student;
};

const removePerson = (socketId, io) => {
	console.log("server remove intiated");
	let classroomId = socketToRoomMap.get(socketId);

	if (
		typeof classroomId === "undefined" ||
		!classrooms.hasOwnProperty(classroomId)
	) {
		console.log("Classroom does not exits", classroomId);
		return { error: "Class does not exists" };
	}

	if (classrooms[classroomId].teacherId === socketId) {
		console.log("teacher itself exited");

		deleteFromMap(socketId, classroomId);
		//TODO: disconnect everyone from class if teacher exits
		/* let studentList = classrooms[socketId];

		studentList.forEach((student) => {
			const clientSocket = io.sockets.connected[student.socketId];
			const s = io.sockets.sockets.get(s);
			console.log("removing socet", s);
			s.disconnect(true);
		}); */
		delete classrooms[classroomId];
		return { classroomId: classroomId };
	}

	let newArr = classrooms[classroomId].students.filter((elem) => {
		return !(elem.socketId === socketId);
	});

	deleteFromMap(socketId, classroomId);
	console.log("Student list after student left", newArr);

	classrooms[classroomId].students = newArr;
	console.log("removed student", classrooms[classroomId].students);

	return { socketId: socketId, classroomId: classroomId };
};

const studentList = (classCode) => {
	return classrooms[classCode]?.students;
};

const askForReview = (socketId, socket) => {
	let studentClass = socketToRoomMap.get(socketId);
	const classCode = socketToRoomMap.get(socketId);
	socket.broadcast.to(classCode).emit("reviewMe", socketId);
};

const handleCodePush = (code, socket) => {
	const classCode = socketToRoomMap.get(socket.id);
	console.log("broadcasting teachers code");
	socket.broadcast.to(classCode).emit("teacherCode", code);
};

module.exports = {
	addStudentToClass,
	createClassRoom,
	removePerson,
	studentList,
	askForReview,
	handleCodePush,
};
