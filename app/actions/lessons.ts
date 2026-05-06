"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Não autorizado.");
  }
}

export async function createLesson(moduleId: string, formData: FormData) {
  await checkAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const videoUrl = formData.get("videoUrl") as string;

  if (!title) {
    throw new Error("Título é obrigatório.");
  }

  await prisma.lesson.create({
    data: {
      title,
      description: description || null,
      content: content || null,
      videoUrl: videoUrl || null,
      moduleId,
    }
  });

  revalidatePath(`/dashboard/admin/trilhas/${moduleId}/aulas`);
  revalidatePath(`/dashboard/trilhas/${moduleId}`);
  redirect(`/dashboard/admin/trilhas/${moduleId}/aulas`);
}

export async function updateLesson(lessonId: string, moduleId: string, formData: FormData) {
  await checkAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const videoUrl = formData.get("videoUrl") as string;

  if (!title) {
    throw new Error("Título é obrigatório.");
  }

  await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      title,
      description: description || null,
      content: content || null,
      videoUrl: videoUrl || null,
    }
  });

  revalidatePath(`/dashboard/admin/trilhas/${moduleId}/aulas`);
  revalidatePath(`/dashboard/trilhas/${moduleId}`);
  redirect(`/dashboard/admin/trilhas/${moduleId}/aulas`);
}

export async function deleteLesson(lessonId: string, moduleId: string) {
  await checkAdmin();

  // Deletar os progressos e materiais em cascata
  await prisma.userProgress.deleteMany({ where: { lessonId } });
  await prisma.material.deleteMany({ where: { lessonId } });

  await prisma.lesson.delete({
    where: { id: lessonId }
  });

  revalidatePath(`/dashboard/admin/trilhas/${moduleId}/aulas`);
  revalidatePath(`/dashboard/trilhas/${moduleId}`);
}
