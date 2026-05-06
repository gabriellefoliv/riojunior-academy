import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, ArrowLeft, Video, FileText } from "lucide-react";
import { LessonDeleteButton } from "@/components/LessonDeleteButton";

export default async function AdminAulasPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const moduleData = await prisma.module.findUnique({
    where: { id: resolvedParams.id },
    include: { 
      lessons: {
        orderBy: { createdAt: 'asc' },
        include: { materials: true }
      }
    }
  });

  if (!moduleData) {
    return <div>Trilha não encontrada.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Link href="/dashboard/admin/trilhas" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Trilhas
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Aulas: {moduleData.title}</h1>
          <p className="text-slate-400">Adicione ou organize o conteúdo desta trilha.</p>
        </div>
        <Link 
          href={`/dashboard/admin/trilhas/${moduleData.id}/aulas/nova`} 
          className="bg-primary text-background font-bold px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Aula
        </Link>
      </div>

      <div className="bg-accent/20 border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-accent/40 border-b border-border">
              <th className="p-4 text-slate-300 font-semibold text-sm">Aula</th>
              <th className="p-4 text-slate-300 font-semibold text-sm text-center">Vídeo</th>
              <th className="p-4 text-slate-300 font-semibold text-sm text-center">Materiais</th>
              <th className="p-4 text-slate-300 font-semibold text-sm text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {moduleData.lessons.map((lesson: any) => (
              <tr key={lesson.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="text-white font-medium">{lesson.title}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{lesson.description}</div>
                </td>
                <td className="p-4 text-center">
                  {lesson.videoUrl ? (
                    <Video className="w-4 h-4 text-primary mx-auto" title="Possui Vídeo" />
                  ) : (
                    <span className="text-slate-600">-</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {lesson.materials.length > 0 ? (
                    <div className="flex items-center justify-center gap-1 text-primary text-xs font-bold">
                      <FileText className="w-4 h-4" />
                      {lesson.materials.length}
                    </div>
                  ) : (
                    <span className="text-slate-600">-</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link 
                      href={`/dashboard/admin/trilhas/${moduleData.id}/aulas/${lesson.id}/editar`}
                      className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                      title="Editar Aula (e Materiais)"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <LessonDeleteButton lessonId={lesson.id} moduleId={moduleData.id} />
                  </div>
                </td>
              </tr>
            ))}
            {moduleData.lessons.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-400">
                  Nenhuma aula criada ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
