"use client";

import { useState } from "react";
import { createLesson, updateLesson } from "@/app/actions/lessons";
import { useRouter } from "next/navigation";

interface LessonFormProps {
  moduleId: string;
  initialData?: any;
  lessonId?: string;
}

export function LessonForm({ moduleId, initialData, lessonId }: LessonFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      if (initialData && lessonId) {
        await updateLesson(lessonId, moduleId, formData);
      } else {
        await createLesson(moduleId, formData);
      }
      
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao salvar a aula.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-accent/20 border border-border p-8 rounded-xl max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Título da Aula *</label>
          <input 
            required 
            name="title" 
            defaultValue={initialData?.title}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
            placeholder="Ex: Aula 1 - Introdução"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Vídeo URL (Opcional)</label>
          <input 
            name="videoUrl" 
            defaultValue={initialData?.videoUrl}
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
            placeholder="Ex: https://www.youtube.com/watch?v=..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Descrição Curta</label>
        <textarea 
          name="description" 
          defaultValue={initialData?.description}
          rows={2}
          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          placeholder="Resumo que aparecerá na listagem..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Conteúdo da Aula (Opcional)</label>
        <p className="text-xs text-slate-500 mb-2">Suporta formatação HTML básica ou texto rico para criar aulas de leitura.</p>
        <textarea 
          name="content" 
          defaultValue={initialData?.content}
          rows={10}
          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary font-mono text-sm"
          placeholder="<h1>Bem-vindo!</h1><p>Conteúdo da aula aqui...</p>"
        />
      </div>

      <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg font-medium text-slate-300 hover:bg-white/5 transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-primary text-background px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar Aula"}
        </button>
      </div>
    </form>
  );
}
