import React, { useState, useEffect } from "react";
import { socket } from "../../../socket";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
	const classCode = params.classCode;
	return { classCode };
}

export const Teacher = () => {
	const [studentMap, setStudentMap] = useState({});
	const { classCode } = useLoaderData();

	const getStudentList = (classCode) => {
		console.log("fetchign studentlist with code", classCode);
		socket.emit("getStudentList", {
			classCode,
		});
	};

	const handleStudentList = (studentList) => {
		console.log("received student list", studentList);
		let studentMp = {};
		console.log("handling list", studentList);

		studentList.forEach((student) => {
			student["review"] = false;
			studentMp[student.socketId] = student;
		});

		setStudentMap(studentMp);
		console.log(studentMp);
	};

	const handleStudentActivity = (stud) => {
		console.log("Handling student activity:", stud);
		if (stud.inClass) {
			/* let prevMap = studentMap;
			let addedStud = stud.stud;
			addedStud["review"] = false;
			prevMap[stud.stud.socketId] = addedStud;
			console.log("setting student Map as student joined");
			setStudentMap(prevMap); */

			setStudentMap((studentMap) => {
				let copiedMap = { ...studentMap };
				stud.stud["review"] = false;
				copiedMap[stud.stud.socketId] = stud.stud;

				return { ...copiedMap };
			});
		} else {
			setStudentMap((studentMap) => {
				let copiedMap = { ...studentMap };
				let socketId = stud.stud.socketId;
				console.log("removing from list", socketId);
				delete copiedMap[socketId];

				return { ...copiedMap };
			});
		}
	};
	const sendMessage = () => {
		console.log("sending message");
		socket.emit("message", "hello there");
	};

	useEffect(() => {
		socket.on("disconnect", () => {
			console.log("something went wrong or you lost connection");
			alert("are you sure want to exit");
			return;
		});
		socket.on("message", (msg) => {
			console.log("message even received", msg);
		});
		getStudentList(classCode);
		socket.on("studentList", (list) => handleStudentList(list));
		socket.on("studentActivity", (stud) => handleStudentActivity(stud));

		return () => {
			socket.off("disconnect");
			socket.off("studentList");
		};
	}, []);

	return (
		<div className="flex h-full bg-red-50">
			<div className="w-1/5">
				<h3 className="p-4 text-xl font-bold">Students List</h3>
				<div className="flex flex-col items-center justify-center ">
					{Object.entries(studentMap).map(([key, student]) => {
						return (
							<div className="flex items-center justify-center w-full h-12 bg-gray-400 border-2">
								<div className="w-2 h-2 mr-2 bg-red-600 rounded-full"></div>
								<div>{student.name}</div>
							</div>
						);
					})}
				</div>
			</div>
			<button onClick={sendMessage}>Send message</button>
			<div className="w-full bg-blue-200">Text Editor</div>
		</div>
	);
};
