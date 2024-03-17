import "./App.css";
import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [fooEvents, setFooEvents] = useState([]);
	const [roomId, setRoomId] = useState("");
	const [classCode, setClassCode] = useState("");

	const teacherName = "atul",
		password = "atul";
	const className = "python test";

	const createClassRoom = (roomId, className, teacherName, password) => {
		socket.emit("createClassroom", {
			roomId,
			className,
			teacherName,
			password,
		});
	};

	const joinClass = (roomId, studentName, password) => {
		socket.emit("joinClassroom", {
			roomId,
			studentName,
			password,
		});
	};

	function onDisconnect() {
		socket.emit("leaveClassroom", {
			classCode,
		});
		console.log("Disconnected from socket from browser");
	}

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
			console.log("Connected to the socket");
		}

		function onNotif(notif) {
			console.log(notif);
		}

		function onServerEvent(value) {
			console.log("Server event received");
			setFooEvents((previous) => {
				console.log([...previous, value]);
				return [...previous, value];
			});
		}

		socket.on("connect", onConnect);
		socket.on("serverBroadcast", onServerEvent);
		socket.on("classNotif", onNotif);

		return () => {
			socket.off("connect", onConnect);
			socket.off("foo", onServerEvent);
			socket.off("classNotif");
		};
	}, []);

	return (
		<div>
			<button
				onClick={() =>
					createClassRoom(roomId, className, teacherName, password)
				}
			>
				Create Classroom
			</button>

			<input onChange={(e) => setRoomId(e.target.value)} type="text"></input>
			<br></br>
			<button
				onClick={() => {
					joinClass(classCode, "student1", "atul");
				}}
			>
				Join Classroom with Code
			</button>
			<input onChange={(e) => setClassCode(e.target.value)} type="text"></input>
			<button onClick={() => onDisconnect()}>Disconnect</button>
		</div>
	);
}

export default App;
