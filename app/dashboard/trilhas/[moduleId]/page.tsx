import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LessonViewer } from "@/components/LessonViewer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ModulePage({
  params,
  searchParams
}: {
  params: Promise<{ moduleId: string }>,
  searchParams: Promise<{ lessonId?: string }>
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const moduleData = await prisma.module.findUnique({
    where: { id: resolvedParams.moduleId },
    include: {
      lessons: {
        orderBy: { createdAt: 'asc' },
        include: {
          materials: true,
          progress: {
            where: { userId: (session.user as any).id }
          }
        }
      }
    }
  });

  if (!moduleData) return <div>Trilha não encontrada.</div>;

  const lessons = moduleData.lessons;
  if (lessons.length === 0) return <div>Nenhuma aula cadastrada nesta trilha.</div>;

  const activeLessonId = resolvedSearchParams.lessonId || lessons[0].id;
  const activeLessonIndex = lessons.findIndex((l: any) => l.id === activeLessonId);
  const activeLesson = lessons[activeLessonIndex] || lessons[0];

  const nextLessonId = activeLessonIndex < lessons.length - 1 ? lessons[activeLessonIndex + 1].id : undefined;
  const isCompleted = activeLesson.progress.length > 0 && activeLesson.progress[0].completed;

  const completedCount = lessons.filter((l: any) => l.progress.some((p: any) => p.completed)).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden -mx-6 -my-6">

      <div className="w-full lg:w-80 border-r border-border bg-background/50 flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <Link href="/dashboard/trilhas" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Trilhas
          </Link>
          <h2 className="text-xl font-bold text-white line-clamp-2">{moduleData.title}</h2>

          <div className="mt-4 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-xs text-slate-500 mt-2">{completedCount} de {lessons.length} aulas concluídas</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {lessons.map((lesson: any, idx: number) => {
            const isActive = lesson.id === activeLesson.id;
            const completed = lesson.progress.some((p: any) => p.completed);

            return (
              <Link
                key={lesson.id}
                href={`/dashboard/trilhas/${moduleData.id}?lessonId=${lesson.id}`}
                className={`flex items-start gap-3 p-3 rounded-lg transition-all ${isActive ? "bg-primary/10 border border-primary/30" : "hover:bg-white/5 border border-transparent"
                  }`}
              >
                <div className="shrink-0 mt-0.5">
                  {completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className={`w-5 h-5 ${isActive ? "text-primary" : "text-slate-600"}`} />
                  )}
                </div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? "text-primary" : "text-slate-500"}`}>
                    Aula {idx + 1}
                  </div>
                  <div className={`text-sm font-medium line-clamp-2 ${isActive ? "text-white" : "text-slate-400"}`}>
                    {lesson.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
        <LessonViewer
          lesson={activeLesson}
          nextLessonId={nextLessonId}
          isCompleted={isCompleted}
        />
      </div>

    </div>
  );
}
