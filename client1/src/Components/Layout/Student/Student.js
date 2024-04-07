import React, { useEffect } from "react";
import { socket } from "../../../socket";
import { useLoaderData } from "react-router-dom";

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
	console.log(classCode);

	useEffect(() => {}, []);
	return (
		<div className="">
			<btn onClick={handleReviewClick}>Ask for Review</btn>
		</div>
	);
};
