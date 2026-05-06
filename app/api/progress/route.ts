import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { lessonId, completed } = body;

    if (!lessonId) {
      return new NextResponse("Missing lessonId", { status: 400 });
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: (session.user as any).id,
          lessonId: lessonId,
        }
      },
      update: {
        completed: completed
      },
      create: {
        userId: (session.user as any).id,
        lessonId: lessonId,
        completed: completed
      }
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("[PROGRESS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
