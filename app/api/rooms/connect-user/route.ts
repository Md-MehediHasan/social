import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const body = await req.json();
    const { roomId, userId } = body;
    if (!roomId || !userId) {
        return NextResponse.json({ error: "roomId and userId are required" }, { status: 400 });
    }
    const room = await prisma.room.update({
        where: { id: roomId },
        data: {
            participants: {
                connect: { id: userId },
            },
        },
    });

    return NextResponse.json({ success: true, room });
}