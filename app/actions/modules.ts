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

export async function createModule(formData: FormData) {
  await checkAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const coverUrl = formData.get("coverUrl") as string;
  const axisId = formData.get("axisId") as string;

  if (!title || !axisId) {
    throw new Error("Título e Eixo são obrigatórios.");
  }

  await prisma.module.create({
    data: {
      title,
      description,
      coverUrl: coverUrl || null,
      axisId,
      isActive: true,
    }
  });

  revalidatePath("/dashboard/admin/trilhas");
  revalidatePath("/dashboard/trilhas");
  redirect("/dashboard/admin/trilhas");
}

export async function updateModule(id: string, formData: FormData) {
  await checkAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const coverUrl = formData.get("coverUrl") as string;
  const axisId = formData.get("axisId") as string;

  if (!title || !axisId) {
    throw new Error("Título e Eixo são obrigatórios.");
  }

  await prisma.module.update({
    where: { id },
    data: {
      title,
      description,
      coverUrl: coverUrl || null,
      axisId,
    }
  });

  revalidatePath("/dashboard/admin/trilhas");
  revalidatePath("/dashboard/trilhas");
  redirect("/dashboard/admin/trilhas");
}

export async function toggleModuleStatus(id: string, isActive: boolean) {
  await checkAdmin();

  await prisma.module.update({
    where: { id },
    data: { isActive }
  });

  revalidatePath("/dashboard/admin/trilhas");
  revalidatePath("/dashboard/trilhas");
}
