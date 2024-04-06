import React from "react";
import { Outlet, useParams } from "react-router-dom";

export const Navbar = () => {
	let { classCode } = useParams();

	const copyClassCode = () => {
		console.log(classCode);
		navigator.clipboard.writeText(classCode);
	};

	return (
		<div className="h-screen">
			<div className="flex items-center justify-between p-4 bg-gray-400 h-15 ">
				<div className="font-medium">CollabCodex</div>
				<div className="flex">
					<div>Exit Class</div>
					<div onClick={copyClassCode}>Copy Code </div>
				</div>
			</div>
			<Outlet />
		</div>
	);
};
