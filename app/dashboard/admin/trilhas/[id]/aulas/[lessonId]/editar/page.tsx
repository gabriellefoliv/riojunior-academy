import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LessonForm } from "@/components/LessonForm";
import { MaterialsManager } from "@/components/MaterialsManager";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditarAulaPage({ params }: { params: Promise<{ id: string, lessonId: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const lessonData = await prisma.lesson.findUnique({
    where: { id: resolvedParams.lessonId },
    include: { materials: true }
  });

  if (!lessonData || lessonData.moduleId !== resolvedParams.id) {
    return <div>Aula não encontrada.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Link href={`/dashboard/admin/trilhas/${resolvedParams.id}/aulas`} className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Aulas
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Editar Aula</h1>
        <p className="text-slate-400">Atualize os dados da aula e gerencie seus materiais.</p>
      </div>

      <LessonForm moduleId={resolvedParams.id} initialData={lessonData} lessonId={lessonData.id} />
      
      <MaterialsManager 
        lessonId={lessonData.id} 
        moduleId={resolvedParams.id} 
        materials={lessonData.materials} 
      />
    </div>
  );
}
