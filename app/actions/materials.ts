"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { uploadFileToR2 } from "@/lib/s3";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Não autorizado.");
  }
}

export async function createMaterial(lessonId: string, moduleId: string, formData: FormData) {
  await checkAdmin();

  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const file = formData.get("file") as File | null;

  if (!title || !type || !file || file.size === 0) {
    throw new Error("Preencha todos os campos e selecione um arquivo.");
  }

  const folderPath = `trilhas/${moduleId}/${lessonId}`;
  const publicUrl = await uploadFileToR2(file, folderPath);

  await prisma.material.create({
    data: {
      title,
      type,
      url: publicUrl,
      lessonId,
    }
  });

  revalidatePath(`/dashboard/admin/trilhas/${moduleId}/aulas/${lessonId}/editar`);
  revalidatePath(`/dashboard/admin/trilhas/${moduleId}/aulas`);
  revalidatePath(`/dashboard/trilhas/${moduleId}`);
}

export async function deleteMaterial(materialId: string, lessonId: string, moduleId: string) {
  await checkAdmin();

  await prisma.material.delete({
    where: { id: materialId }
  });

  revalidatePath(`/dashboard/admin/trilhas/${moduleId}/aulas/${lessonId}/editar`);
  revalidatePath(`/dashboard/admin/trilhas/${moduleId}/aulas`);
  revalidatePath(`/dashboard/trilhas/${moduleId}`);
}
