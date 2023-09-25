import useWebSocket from "react-use-websocket";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const useWebsocketConnection = () => {
  // useWebSocket(apiBaseUrl ?? "", {
  //   onOpen: () => {
  //     console.log("WebSocket connection established.");
  //   },
  // });
};

export default useWebsocketConnection;
