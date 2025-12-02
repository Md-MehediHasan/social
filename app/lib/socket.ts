let ws: WebSocket | null = null;

type Callback = (data: any) => void;
type StatusCallback = (status: "connecting" | "connected" | "disconnected") => void;

export function connectWS(onMessage: Callback, onStatus?: StatusCallback,userID?:string,roomNo?:string): WebSocket {
  console.log(userID,roomNo);
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    onStatus?.("connecting");
    ws = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}/?userId=${userID}&roomNo=${roomNo}`);
    console.log("websocket connected",ws);

    ws.onopen = () => onStatus?.("connected");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch {
        onMessage(event.data);
      }
    };

    ws.onclose = () => {
      onStatus?.("disconnected");
      ws = null;
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
  }

  return ws;
}
