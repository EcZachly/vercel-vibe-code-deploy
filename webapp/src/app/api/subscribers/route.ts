import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.subscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (existing.status === "UNSUBSCRIBED") {
        await prisma.subscriber.update({
          where: { id: existing.id },
          data: { status: "ACTIVE" },
        });
        return NextResponse.json({ message: "Resubscribed successfully" });
      }
      return NextResponse.json({ message: "Already subscribed" });
    }

    await prisma.subscriber.create({
      data: { email: normalizedEmail },
    });

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(subscribers);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
