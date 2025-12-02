import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomId, userId } = body;

    if (!roomId || !userId) {
      return NextResponse.json(
        { error: "roomId and userId are required" },
        { status: 400 }
      );
    }

    const room = await prisma.room.upsert({
      where: { id: roomId },
      update: {
        participants: {
          connect: { id: userId },
        },
      },
      create: {
        id: roomId,
        participants: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json({ success: true, room });
  } catch (err) {
    console.error("Room upsert error:", err);
    return NextResponse.json(
      { error: "Something went wrong", details: String(err) },
      { status: 500 }
    );
  }
}
