import { io } from "socket.io-client";

const socket = io("http://localhost:8080" || "https://womensafety-r0s4.onrender.com");

export default socket;