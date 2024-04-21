import React, { useState } from "react";

export const Terminal = ({ code }) => {
	const [codeOutput, setCodeOutput] = useState([]);

	const log = console.log.bind(console);
	console.log = (...args) => {
		log(...args);
		return args;
	};

	const handleExecute = () => {
		let exOutput = eval(code);
		setCodeOutput((prevOutput) => {
			return [exOutput, ...prevOutput];
		});
	};

	return (
		<div className="w-full h-full bg-gray-950 ">
			<div className="flex justify-between w-full px-2 py-2">
				<div className="h-full font-medium text-center text-gray-500">
					Console Output
				</div>
				<div
					onClick={handleExecute}
					className="p-2 m-1 bg-green-500 rounded-md cursor-pointer "
				>
					Run
				</div>
			</div>
			<div className="h-full overflow-auto bg-gray-950">
				return (
				{codeOutput.map((output, idx) => {
					return (
						<div
							className="p-2 mx-2 my-1 text-green-600 border-t-2 border-y-gray-800"
							key={idx + output}
						>
							{output}
						</div>
					);
				})}
				);
			</div>
		</div>
	);
};
