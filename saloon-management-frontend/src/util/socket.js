import { io } from "socket.io-client";
import { BACK_SOCKET_URL } from "./constants";

export const socket = io(BACK_SOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 100,
  reconnectionDelayMax : 5000,  
  autoConnect: true,
  // requestTimeout: 60 * 60 * 1000,
});
  