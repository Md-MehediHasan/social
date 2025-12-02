"use client";

import { MessageContext } from "@/app/messages/layout";
import { useSession } from "next-auth/react";
import { use, useContext, useEffect } from "react";


export default function Chat() {
  const ctx = useContext(MessageContext);
  if (!ctx) return null;

  const { text, setText, wsRef } = ctx;
  const { data: session } = useSession();

 
  const sendMessage = () => {
    if (!text.trim()) return;
    const msg = JSON.stringify({ msg: text, type:"send_message" });
    wsRef.current?.send(msg);
    setText("");
  };


  return (
    <div className="w-full fixed bottom-0 right-0 bg-white border-t flex items-center gap-2 p-3">
      <input
        type="text"
        value={text}
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1 p-3 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 text-sm rounded-full"
      >
        Send
      </button>
    </div>
  );
}
