import { PlayCircle } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  description: string;
  videoUrl?: string;
}

export function VideoPlayer({ title, description, videoUrl }: VideoPlayerProps) {
  const getEmbedUrl = (url?: string) => {
    if (!url) return "";

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }

    return url;
  };

  const finalVideoUrl = getEmbedUrl(videoUrl);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="relative w-full rounded-2xl overflow-hidden bg-accent/50 border border-white/5 aspect-video shadow-2xl flex items-center justify-center group">

        {finalVideoUrl ? (
          <iframe
            src={finalVideoUrl}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <div className="flex flex-col items-center gap-4 text-slate-500">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300 cursor-pointer glow-primary">
              <PlayCircle className="w-10 h-10 ml-1" />
            </div>
            <p className="text-sm font-medium">O vídeo será exibido aqui</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
        <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
