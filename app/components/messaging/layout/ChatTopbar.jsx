"use client";

import { useContext } from "react";
import { MessageContext } from "@/app/messages/layout";

export default function ChatTopbar() {
 const ctx = useContext(MessageContext);
 
   if (!ctx) return null;
 
   const { roomInfo } = ctx;


  return (
    <div className="flex items-center p-4 bg-blue-600 text-white shadow-md gap-3 sticky top-0 z-30">
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        {roomInfo?.image && (
          <img
            src={roomInfo?.image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div>
        <p className="font-semibold">{roomInfo?.name || "User"}</p>
        <p className="text-xs opacity-70">Online</p>
      </div>
    </div>
  );
}
