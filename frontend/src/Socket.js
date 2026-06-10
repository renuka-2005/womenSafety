import { io } from "socket.io-client";

const socket = io(
  "https://womensafety-r0s4.onrender.com",
  {
    transports: ["websocket", "polling"],
    reconnection: true
  }
);

export default socket;