import { TrailCard } from "./TrailCard";

interface Module {
  id: string;
  title: string;
  coverUrl: string | null;
  progressPercentage?: number;
}

interface TrailCarouselProps {
  title: string;
  modules: Module[];
}

export function TrailCarousel({ title, modules }: TrailCarouselProps) {
  if (!modules || modules.length === 0) return null;

  return (
    <div className="mb-10 w-full">
      <h2 className="text-xl font-bold text-white mb-4 px-1">{title}</h2>

      <div className="relative">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 px-1 custom-scrollbar">
          {modules.map((module) => (
            <TrailCard
              key={module.id}
              id={module.id}
              title={module.title}
              coverUrl={module.coverUrl}
              progressPercentage={module.progressPercentage}
            />
          ))}
        </div>

        <div className="absolute top-0 right-0 bottom-6 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
