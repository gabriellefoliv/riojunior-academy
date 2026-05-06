import { prisma } from "@/lib/prisma";
import { TrailCarousel } from "@/components/TrailCarousel";

export default async function TrilhasPage() {
  // Fetch all axes with their modules
  const axes = await prisma.axis.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      modules: {
        where: { isActive: true },
        orderBy: { createdAt: 'asc' },
        include: {
          lessons: {
            include: {
              progress: true // In a real app, filter progress by userId
            }
          }
        }
      }
    }
  });

  // Calculate progress for each module
  const axesWithProgress = axes.map(axis => {
    const modulesWithProgress = axis.modules.map(module => {
      let completedLessons = 0;
      let totalLessons = module.lessons.length;

      module.lessons.forEach(lesson => {
        // Assume first user's progress for mockup. 
        // Real logic: lesson.progress.find(p => p.userId === session.user.id)?.completed
        if (lesson.progress.length > 0 && lesson.progress[0].completed) {
          completedLessons++;
        }
      });

      const progressPercentage = totalLessons > 0 
        ? Math.round((completedLessons / totalLessons) * 100) 
        : 0; // Default 0 for new trails

      // Provide some dummy progress for the mockup if it's 0 to make it look nice
      const dummyProgress = Math.floor(Math.random() * 80);

      return {
        id: module.id,
        title: module.title,
        coverUrl: module.coverUrl,
        progressPercentage: progressPercentage > 0 ? progressPercentage : dummyProgress,
      };
    });

    return {
      ...axis,
      modules: modulesWithProgress
    };
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-20">
      <div className="mb-10 px-1">
        <h1 className="text-3xl font-bold text-white mb-2">Trilhas de Conteúdo</h1>
        <p className="text-slate-400">Escolha um eixo e continue sua jornada de aprendizado.</p>
      </div>

      <div className="space-y-4">
        {axesWithProgress.map(axis => (
          <TrailCarousel 
            key={axis.id}
            title={axis.title}
            modules={axis.modules}
          />
        ))}
      </div>
    </div>
  );
}
