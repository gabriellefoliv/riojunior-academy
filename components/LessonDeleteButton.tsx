"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteLesson } from "@/app/actions/lessons";
import { Trash2 } from "lucide-react";

export function LessonDeleteButton({ lessonId, moduleId }: { lessonId: string, moduleId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Atenção! Ao excluir esta aula, o histórico de quem já a concluiu será apagado, assim como os anexos. Deseja continuar?")) {
      return;
    }
    
    setLoading(true);
    try {
      await deleteLesson(lessonId, moduleId);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir a aula.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
      title="Excluir Aula"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
