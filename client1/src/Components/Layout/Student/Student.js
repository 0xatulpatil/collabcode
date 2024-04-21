import React, { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { useLoaderData } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Terminal } from "../../Terminal/Terminal";

export async function studentLoader({ params }) {
	const classCode = params.classCode;
	return { classCode };
}

export const Student = () => {
	const { classCode } = useLoaderData();
	const [code, setCode] = useState("");
	const [tcode, settCode] = useState("");
	console.log(classCode);

	const onChange = React.useCallback((val, viewUpdate) => {
		setCode(val);
	}, []);

	const handleReviewClick = () => {
		console.log("sending reviewMe event");
		socket.emit("reviewMe", socket.id);
	};

	const handleCodePush = (code) => {
		console.log("emitted student code", code);
		socket.emit("studentCode", code);
	};

	const handleCodeChange = (code) => {
		setCode(code);
	};

	useEffect(() => {
		socket.on("teacherCode", (code) => {
			console.log("received teachers code", code);
			settCode(code);
		});

		socket.on("getStudentCode", (socketId) => {
			console.log("student code at the moment before sending", code);
			if (socketId === socket.id) handleCodePush(code);
		});

		socket.on("codeChange", ({ socketId, code }) => {
			if (socket.id === socketId) handleCodeChange(code);
		});

		return () => {
			socket.off("teacherCode");
			socket.off("getStudentCode");
		};
	}, [code]);

	return (
		<>
			<div className=""></div>
			<div className="flex flex-col w-full h-full ">
				<div className="flex w-full border border-blue-950 h-2/3">
					<div className="flex flex-col w-full border-r-2 border-orange-800 code-editor">
						<div className="text-center text-white bg-gray-500">
							<div className="h-8 text-lg font-bold text-gray-900">
								Your Editor
							</div>
						</div>
						<CodeMirror
							value={code}
							extensions={[javascript({ jsx: true })]}
							onChange={onChange}
							className="w-full bg-blue-200"
							theme={vscodeDark}
						/>
					</div>
					<div className="flex flex-col w-full code-editor">
						<div className="flex justify-around text-center text-white bg-gray-500">
							<div className="h-8 text-lg font-bold text-gray-900 ">
								Teacher's Editor
							</div>
							<div className="px-2 text-white bg-red-400 rounded-full cursor-pointer">
								X
							</div>
						</div>
						<CodeMirror
							value={tcode}
							extensions={[javascript({ jsx: true })]}
							className="w-full bg-blue-200"
							theme={vscodeDark}
							readOnly={true}
						/>
						<button
							onClick={handleReviewClick}
							className="font-bold bg-gray-300"
						>
							Ask For Review
						</button>
					</div>
					) : (<></>
				</div>
				<div className="overflow-auto h-1/3">
					<Terminal code={code} />
				</div>
			</div>
		</>
	);
};
