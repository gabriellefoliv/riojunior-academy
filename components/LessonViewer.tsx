"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, PlayCircle, FileText, Download } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";
import { MaterialCard } from "./MaterialCard";

interface LessonViewerProps {
  lesson: any;
  nextLessonId?: string;
  isCompleted: boolean;
}

export function LessonViewer({ lesson, nextLessonId, isCompleted }: LessonViewerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkComplete = async () => {
    setLoading(true);
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id, completed: true })
      });

      router.refresh();

      if (nextLessonId) {
        router.push(`/dashboard/trilhas/${lesson.moduleId}?lessonId=${nextLessonId}`);
      }
    } catch (error) {
      console.error("Erro ao salvar progresso", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      {lesson.videoUrl && (
        <div className="w-full">
          <VideoPlayer title={lesson.title} description="" videoUrl={lesson.videoUrl} />
        </div>
      )}

      <div className="bg-accent/20 border border-border rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{lesson.title}</h1>

        {lesson.content ? (
          <div
            className="prose prose-invert prose-primary max-w-none text-slate-300"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        ) : (
          <p className="text-slate-400">{lesson.description}</p>
        )}
      </div>

      {lesson.materials && lesson.materials.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Materiais Complementares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lesson.materials.map((material: any) => (
              <a
                key={material.id}
                href={material.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 bg-accent/30 border border-border p-4 rounded-xl hover:border-primary/50 hover:bg-white/5 transition-all"
              >
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{material.title}</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">{material.type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="pt-8 flex justify-end border-t border-border">
        <button
          onClick={handleMarkComplete}
          disabled={loading || isCompleted}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${isCompleted
              ? "bg-green-500/20 text-green-400 border border-green-500/50 cursor-default"
              : "bg-primary hover:bg-primary/90 text-background hover:scale-105 shadow-lg shadow-primary/20"
            }`}
        >
          {loading ? (
            <span className="animate-pulse">Salvando...</span>
          ) : isCompleted ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Aula Concluída
            </>
          ) : (
            <>
              Marcar como Concluída
              <CheckCircle className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
