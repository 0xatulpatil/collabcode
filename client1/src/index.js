import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Navbar } from "./Components/Layout/Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Teacher, loader } from "./Components/Layout/Teacher/Teacher";
import { Student, studentLoader } from "./Components/Layout/Student/Student";
import { JoinClass } from "./Components/JoinClass/JoinClass";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navbar />,
		children: [
			{
				path: "/join",
				element: <JoinClass />,
			},
			{
				path: "/teacher/:classCode",
				element: <Teacher />,
				loader: loader,
			},
			{
				path: "/student/:classCode",
				element: <Student />,
				loader: studentLoader,
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
