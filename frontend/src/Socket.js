import { io } from "socket.io-client";

const socket = io("https://womensafety-r0s4.onrender.com");
// const socket = io("http://localhost:8080");

export default socket;