import { BACK_SOCKET_URL } from "../../util";
import { io } from "socket.io-client";

export const createSocket = (payload = {}) => {
  try {
    const socket = io(BACK_SOCKET_URL);
    return socket;
  } catch (error) {
    let socket = null;
    return socket;
  }
};
