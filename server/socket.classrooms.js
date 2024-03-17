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
	console.log("created classroom", classrooms);
	return classrooms;
};

const addStudentToClass = (roomId, socketId, studentName, password) => {
	roomId = roomId.trim().toLowerCase();
	studentName = studentName.trim().toLowerCase();
	password = password.trim().toLowerCase();

	if (
		!classrooms.hasOwnProperty(roomId.toString()) ||
		classrooms[roomId].password != password
	) {
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
	console.log("Student list:", classrooms[roomId].students);
	return student;
};

const removePerson = (socketId, classroomId) => {
	console.log("server remove intiated");
	if (!classrooms.hasOwnProperty(classroomId)) {
		console.log("Classroom does not exits", classroomId);
		return { error: "Class does not exists" };
	}

	if (classrooms[classroomId].teacherId === socketId) {
		console.log("teacher itself exited");

		delete classrooms[classroomId];
		return;
	}

	let newArr = classrooms[classroomId].students.filter((elem) => {
		return !(elem.socketId === socketId);
	});

	console.log("modified array", newArr);

	classrooms[classroomId].students = newArr;
	console.log("removed student", classrooms[classroomId].students);
};

module.exports = { addStudentToClass, createClassRoom, removePerson };
