import React, { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { useLoaderData } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export async function studentLoader({ params }) {
	const classCode = params.classCode;
	return { classCode };
}

const handleReviewClick = () => {
	console.log("sending reviewMe event");
	socket.emit("reviewMe", socket.id);
};

export const Student = () => {
	const { classCode } = useLoaderData();
	const [code, setCode] = useState("");
	const [tcode, settCode] = useState("");
	console.log(classCode);

	const onChange = React.useCallback((val, viewUpdate) => {
		console.log("val:", val);
		setCode(val);
	}, []);

	useEffect(() => {
		socket.on("teacherCode", (code) => {
			console.log("received teachers code", code);
			settCode(code);
		});

		return () => {
			socket.off("teacherCode");
		};
	}, []);

	return (
		<>
			<div className="">
				<btn onClick={handleReviewClick}>Ask for Review</btn>
			</div>
			<div className="flex w-full border border-blue-950">
				<div className="flex flex-col w-full border-r-2 border-orange-800 code-editor">
					<div className="text-center text-white bg-gray-500">
						<div className="h-8 text-lg font-bold text-gray-900">
							Student's Editor
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
					</div>
					<CodeMirror
						value={tcode}
						extensions={[javascript({ jsx: true })]}
						className="w-full bg-blue-200"
						theme={vscodeDark}
						readOnly={true}
					/>
				</div>
			</div>
		</>
	);
};
