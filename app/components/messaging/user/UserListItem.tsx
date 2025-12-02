"use client";
import Image from "next/image";
export default function UserListItem({ room,key,user}: any) {
  
  return (
    <div key={key} className="p-4 cursor-pointer hover:bg-gray-100 flex border-b ">
      {<Image src={room.roomImage} alt={room.roomDisplayName} width={40} height={40} className="rounded-full mr-3" />}

      <div>
        <p className="font-semibold">{room.roomDisplayName}</p>
        <p className="text-sm text-gray-500 truncate">{user?.id ==room.lastMessage.senderId ? "You: " : room.lastMessage.senderName.slice(0,2)}:{room.lastMessage.content}</p>
      </div>
    </div>
  );
}
