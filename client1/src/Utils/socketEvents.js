import { socket } from "../socket";

const createClassRoom = (roomId, className, teacherName, password) => {
	socket.emit("createClassroom", {
		roomId,
		className,
		teacherName,
		password,
	});
	console.log("UTIL: Class Created with code", roomId);
};

const joinClass = (roomId, studentName, password) => {
	socket.emit("joinClassroom", {
		roomId,
		studentName,
		password,
	});
	console.log("CLIENT: Joined class with room", roomId, studentName);
};

export { createClassRoom, joinClass };
