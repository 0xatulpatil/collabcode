import React from "react";
import { Outlet } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="h-screen">
			<div className="flex items-center justify-between p-4 bg-gray-400 h-15 ">
				<div className="font-medium">CollabCodex</div>
				<div>Exit Class</div>
			</div>
			<Outlet />
		</div>
	);
};
