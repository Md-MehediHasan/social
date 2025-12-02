import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

  

    const { roomId, senderId, text, sendingStatus } = body;

    if (!senderId || !text) {
      return NextResponse.json(
        { error: "senderId and text are required" },
        { status: 400 }
      );
    }

    let finalRoomId = roomId;

    // 1️⃣ Check if sender exists — required by foreign key
    const sender = await prisma.user.findUnique({
      where: { id: senderId },
    });

    if (!sender) {
      return NextResponse.json(
        { error: "Sender does not exist" },
        { status: 400 }
      );
    }

    // 2️⃣ If roomId provided → check if room exists
    if (roomId) {
      const roomExists = await prisma.room.findUnique({
        where: { id: roomId },
      });

      // 2.1️⃣ If room does NOT exist → create it
      if (!roomExists) {
        const newRoom = await prisma.room.create({
          data: {
            id: roomId, // preserve requested id
            participants: {
              connect: { id: senderId }, // creator added as participant
            },
          },
        });

        finalRoomId = newRoom.id;
      }
    } else {
      // 3️⃣ If NO roomId provided → create auto new room
      const newRoom = await prisma.room.create({
        data: {
          participants: {
            connect: { id: senderId },
          },
        },
      });

      finalRoomId = newRoom.id;
    }

    // 4️⃣ Create the message
    const message = await prisma.message.create({
      data: {
        roomId: finalRoomId,
        senderId,
        text,
         sendingStatus,
      },
      include:{
        sender:true
      }
    });

    return NextResponse.json(
      {
        success: true,
        message,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Message Create Error:", err);
    return NextResponse.json(
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}
