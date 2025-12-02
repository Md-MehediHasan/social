"use client";
import { use, useContext, useEffect, useState } from "react";
import UserListItem from "../user/UserListItem";
import { getUserRooms } from "@/app/lib/utils";
import { useSession } from "next-auth/react";
import { MessageContext } from "@/app/messages/layout";



export default  function Sidebar() {
  const [rooms, setRooms] = useState<any[]>([]);
  const {data:session}=useSession()
const ctx = useContext(MessageContext);
if (!ctx) return null;
console.log(rooms)

const { messages } = ctx;
  useEffect(() => {
    const fetchRooms = async () => {
      const data= await getUserRooms("currentUserId");
 
      setRooms(data.rooms);
    };
    fetchRooms(); 
  }, [messages]);

   // Replace with actual user ID retrieval logic
  return (
    <div className="w-72 bg-white shadow-lg border-r overflow-y-auto">
      <div className="p-4 border-b font-bold text-xl bg-blue-600 text-white">
        Chat Lists
      </div>
   { rooms?.map((room,index) => (
    <div key={index}>
        <UserListItem key={room.id} room={room} user={session?.user}/>
    </div>
      ))}
   
    </div>
  );
}
