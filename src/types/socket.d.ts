import { Socket } from "socket.io-client";

export interface CustomSocket extends Socket {
  auth: {
    token?: string;
    sessionId?: string;
  };
}