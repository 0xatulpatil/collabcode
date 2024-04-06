import React, { useState } from "react";
import { createClassRoom, joinClass } from "../../Utils/socketEvents";
import { v4 as uuid4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const JoinClass = () => {
	const [classname, setClassname] = useState(" ");
	const [teachername, setTeachername] = useState("");
	const [password, setPassword] = useState("");

	const [classcode, setClasscode] = useState("");
	const [classpassword, setClasspassword] = useState("");
	const [studentname, setStudentname] = useState("");
	const navigate = useNavigate();

	const handleChange = (e, setValue) => {
		setValue(String(e.target.value));
	};

	const handleJoinClass = () => {
		if (classcode.trim() === " " || classpassword.trim() === " ") {
			alert("Some fields are empty");
			return;
		}
		console.log("Joining initiated");
		joinClass(classcode, studentname, classpassword);
		console.log("Joined class", classcode, classpassword);
		navigate("/student");
	};

	const handleCreateClass = () => {
		if (
			classname.trim() === " " ||
			password.trim() === " " ||
			teachername.trim() === " "
		) {
			alert("some fields are empty");
			return;
		}
		let classCode = uuid4();
		createClassRoom(classCode, classname, teachername, password);
		console.log("Created class", classname, password, teachername);
		navigate("/teacher/" + classCode);
	};

	return (
		<div className="flex flex-col items-center h-full p-10 bg-green-200">
			<div className="flex flex-col w-7/12 p-10 rounded-md bg-red-50">
				<div className="text-xl font-semibold">Create Classroom</div>
				<div>Enter Class Name:</div>
				<input
					onChange={(e) => handleChange(e, setClassname)}
					value={classname}
					className="w-3/4 h-8"
				/>
				<div>Enter Teacher Name:</div>
				<input
					type="text"
					value={teachername}
					onChange={(e) => handleChange(e, setTeachername)}
					className="w-3/4 h-8"
				/>
				<div>Enter Class Password:</div>
				<input
					value={password}
					onChange={(e) => handleChange(e, setPassword)}
					className="w-3/4 h-8"
				/>
				<button
					onClick={handleCreateClass}
					className="text-white bg-green-500 rounded-md"
				>
					Create Classroom
				</button>
				<div className="">OR</div>
				<div className="text-xl">Join Classroom</div>
				<div>Enter ClassCode</div>
				<input
					value={classcode}
					onChange={(e) => handleChange(e, setClasscode)}
					className="w-3/4 h-8"
				/>
				<div>Enter Class Password</div>
				<input
					value={classpassword}
					onChange={(e) => handleChange(e, setClasspassword)}
					className="w-3/4 h-8"
				/>
				<div>Enter Student Name</div>
				<input
					value={studentname}
					onChange={(e) => handleChange(e, setStudentname)}
					className="w-3/4 h-8"
				/>
				<button
					onClick={handleJoinClass}
					className="text-white bg-green-500 rounded-md"
				>
					Join Classroom
				</button>
			</div>
		</div>
	);
};
