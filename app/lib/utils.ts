"use client"
export async function getUserRooms(userId: string) {
 const token = localStorage.getItem("token");

const res = await fetch("/api/rooms", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // 👈 send token here
  },
});
const rooms = await res.json();
return rooms;
}
