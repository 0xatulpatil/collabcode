import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../../socket";
import { useLoaderData } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export async function loader({ params }) {
	const classCode = params.classCode;
	return { classCode };
}

export const Teacher = () => {
	const [studentMap, setStudentMap] = useState({});
	const { classCode } = useLoaderData();

	const [code, setCode] = useState("console.log('hello world!');");
	const [studentCode, setStudentCode] = useState("hello there student");
	const codemirrorRef = useRef();

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
				delete copiedMap[socketId];

				return { ...copiedMap };
			});
		}
	};
	const sendMessage = () => {
		console.log("sending message");
		socket.emit("message", "hello there");
	};

	const handleReview = (socketId) => {
		console.log("wants to get reviewed", socketId);
		setStudentMap((studentMap) => {
			let tmap = { ...studentMap };
			tmap[socketId].review = true;

			return { ...tmap };
		});
	};

	const handleStudentCard = (socketId) => {
		setStudentMap((studentMap) => {
			let tMap = { ...studentMap };
			tMap[socketId].review = false;

			return { ...tMap };
		});
	};

	const handleCodePush = () => {
		socket.emit("teacherCode", code);
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
		socket.on("reviewMe", (socketId) => handleReview(socketId));

		return () => {
			socket.off("disconnect");
			socket.off("studentList");
			socket.off("studentActivity");
			socket.off("reviewMe");
		};
	}, []);

	const onChange = React.useCallback((val, viewUpdate) => {
		console.log("val:", val);
		setCode(val);
	}, []);

	const onChangeStudent = React.useCallback((val, viewUpdate) => {
		setStudentCode(val);
	}, []);

	return (
		<div className="flex h-full bg-red-50">
			<div className="w-1/5 bg-gray-600">
				<h3 className="p-4 text-xl font-bold bg-gray-700">Students List</h3>
				<div className="flex flex-col items-center justify-center ">
					{Object.entries(studentMap).map(([key, student]) => {
						return (
							<div
								key={student.socketId}
								className="flex items-center justify-center w-full h-12 bg-gray-400 border-2"
								onClick={(e) => handleStudentCard(student.socketId)}
							>
								<div
									className={`w-2 h-2 mr-2 bg-red-600 rounded-full ${
										!student.review ? "hidden" : ""
									}`}
								></div>
								<div>{student.name}</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="w-full h-full">
				<div className="flex w-full border border-blue-950">
					<div className="flex flex-col w-full border-r-2 border-orange-800 code-editor">
						<div className="text-center text-white bg-gray-500">
							<div className="h-8 text-lg font-bold text-gray-900">
								Teacher's Editor
							</div>
						</div>
						<CodeMirror
							value={code}
							extensions={[javascript({ jsx: true })]}
							onChange={onChange}
							className="w-full bg-blue-200"
							ref={codemirrorRef}
							theme={vscodeDark}
						/>
						<button onClick={handleCodePush} className="font-bold bg-gray-300">
							Push Code
						</button>
					</div>
					{studentCode.length > 0 ? (
						<div className="flex flex-col w-full code-editor">
							<div className="flex justify-around text-center text-white bg-gray-500">
								<div className="h-8 text-lg font-bold text-gray-900 ">
									Student's Editor
								</div>
								<div
									onClick={() => setStudentCode("")}
									className="px-2 text-white bg-red-400 rounded-full cursor-pointer"
								>
									X
								</div>
							</div>
							<CodeMirror
								value={studentCode}
								extensions={[javascript({ jsx: true })]}
								onChange={onChangeStudent}
								className="w-full bg-blue-200"
								ref={codemirrorRef}
								theme={vscodeDark}
							/>
							<button
								onClick={handleCodePush}
								className="font-bold bg-gray-300"
							>
								Push Code
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};
