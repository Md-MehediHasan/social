"use client";

import { createContext, useEffect, useRef, useState, ReactNode } from "react";
import { connectWS } from "../lib/socket";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

// ------------------- Message type -------------------
export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    image?: string;
  };
  text: string;
  createdAt: string;
}

// ------------------- Context type -------------------
interface MessageContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  status: "connecting" | "connected" | "disconnected";
  wsRef: React.MutableRefObject<WebSocket | null>;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  roomInfo?: any;
}

// ------------------- Create context -------------------
export const MessageContext = createContext<MessageContextType | null>(null);

interface Props {
  children: ReactNode;
}

// ------------------- Provider -------------------
export default function MessageLayout({ children }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [status, setStatus] =
    useState<"connecting" | "connected" | "disconnected">("connecting");

  const [roomId, setRoom] = useState<string>(""); // ✅ Added setRoom
  const wsRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [roomInfo, setRoomInfo] = useState<any>(null);

  const { data: session } = useSession();
  const params = useParams();


  // roomId from useParams() can be string | string[] | undefined
  useEffect(() => {
    const roomIdRaw = params?.roomId;
    const currentRoomId: string = Array.isArray(roomIdRaw)
      ? roomIdRaw[0]
      : roomIdRaw ?? "";

    setRoom(currentRoomId); // ✅ update roomId state
  }, [params?.roomId]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // WebSocket initialization
  useEffect(() => {
    if (session?.user?.id && roomId) {
      wsRef.current = connectWS(
        (data: any) => {
          if (data.type === "history") {
            setMessages(data.msg);
            setRoomInfo(data.recipant); // ✅ set roomInfo from server
          } else if (data.type === "new" || data.type === "new_message") {
            setMessages((prev) => [...prev, data.msg]);
            
          }
        },
        (s: "connecting" | "connected" | "disconnected") => setStatus(s),
        session.user.id,
        roomId
      );

      return () => {
        wsRef.current?.close();
      };
    }
  }, [session?.user?.id, roomId]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        text,
        setText,
        status,
        wsRef,
        scrollRef,
        setRoom, // ✅ include setRoom
        roomId,
        roomInfo  // ✅ include roomId
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
