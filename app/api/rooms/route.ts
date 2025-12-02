import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";


export async function GET() {
  try {
    // 1️⃣ Get the session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // 2️⃣ Fetch rooms where the user is a participant
    const rooms = await prisma.room.findMany({
      where: {
        participants: {
          some: { id: userId },
        },
      },
      include: {
        participants: true,
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1, // only the last message
          include: { sender: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // 3️⃣ Format the response
    const formattedRooms = rooms.map((room) => {
      const otherParticipant = room.participants.find(
        (p) => p.id !== userId
      );

      const lastMessage = room.messages[0];

      return {
        roomId: room.id,
        roomDisplayName: otherParticipant?.name || "Unknown",
        roomImage: otherParticipant?.image || null,
        email: otherParticipant?.email || null,
        lastMessage: lastMessage
          ? {
              content: lastMessage.text,
              senderId: lastMessage.senderId,
              senderName: lastMessage.sender?.name || "Unknown",
              createdAt: lastMessage.createdAt,
            }
          : null,
      };
    });

    // 4️⃣ Return JSON
    return NextResponse.json({ success: true, rooms: formattedRooms });
  } catch (error: any) {
    console.error("Error fetching rooms:", error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
