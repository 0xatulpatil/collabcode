import "./App.css";
import { useEffect, useState } from "react";
import { socket } from "./socket";

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [fooEvents, setFooEvents] = useState([]);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
			console.log("Connected to the socket");
		}

		function onDisconnect() {
			setIsConnected(false);
			console.log("Disconnected from the socket");
		}

		function onServerEvent(value) {
			console.log("Server event received");
			setFooEvents((previous) => {
				console.log([...previous, value]);
				return [...previous, value];
			});
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("serverBroadcast", onServerEvent);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("foo", onServerEvent);
		};
	}, []);

	return (
		<div>
			<button onClick={() => socket.connect()}>Connect Socket</button>
			<button
				onClick={() => {
					socket.emit("message", "hello there");
					console.log("event emitted");
				}}
			>
				Hello there client
			</button>
		</div>
	);
}

export default App;
