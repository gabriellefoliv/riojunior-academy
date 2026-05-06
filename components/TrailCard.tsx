import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface TrailCardProps {
  id: string;
  title: string;
  coverUrl?: string | null;
  progressPercentage?: number;
}

export function TrailCard({ id, title, coverUrl, progressPercentage = 0 }: TrailCardProps) {
  const fallbackImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80";

  return (
    <Link href={`/dashboard/trilhas/${id}`} className="group/card relative shrink-0 snap-start">
      <div className="w-[280px] h-[158px] sm:w-[320px] sm:h-[180px] rounded-lg overflow-hidden relative shadow-lg bg-accent/20 border border-border/50 transition-all duration-300 group-hover/card:scale-105 group-hover/card:border-primary/50 group-hover/card:shadow-primary/20 z-10">

        <Image
          src={coverUrl || fallbackImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover/card:scale-110"
          sizes="(max-width: 640px) 280px, 320px"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover/card:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 transform scale-75 group-hover/card:scale-100">
          <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-sm line-clamp-2 drop-shadow-md">
            {title}
          </h3>

          <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progressPercentage, 0)}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
