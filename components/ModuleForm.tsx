"use client";

import { useState } from "react";
import { createModule, updateModule } from "@/app/actions/modules";
import { useRouter } from "next/navigation";

interface ModuleFormProps {
  axes: { id: string; title: string }[];
  initialData?: any;
  moduleId?: string;
}

export function ModuleForm({ axes, initialData, moduleId }: ModuleFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      
      if (initialData && moduleId) {
        await updateModule(moduleId, formData);
      } else {
        await createModule(formData);
      }
      
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao salvar a trilha.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-accent/20 border border-border p-8 rounded-xl max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Título da Trilha *</label>
        <input 
          required 
          name="title" 
          defaultValue={initialData?.title}
          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          placeholder="Ex: Liderança Avançada"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Descrição</label>
        <textarea 
          name="description" 
          defaultValue={initialData?.description}
          rows={3}
          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          placeholder="Descreva o foco desta trilha..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">Eixo da Federação *</label>
        <select 
          required 
          name="axisId" 
          defaultValue={initialData?.axisId || ""}
          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
        >
          <option value="" disabled>Selecione um Eixo</option>
          {axes.map(axis => (
            <option key={axis.id} value={axis.id}>{axis.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">URL da Imagem de Capa (Opcional)</label>
        <input 
          name="coverUrl" 
          defaultValue={initialData?.coverUrl}
          className="w-full bg-background border border-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          placeholder="Ex: https://images.unsplash.com/..."
        />
        <p className="text-xs text-slate-500 mt-1">Se deixar em branco, usará uma capa genérica.</p>
      </div>

      <div className="pt-4 flex justify-end gap-3">
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
          {loading ? "Salvando..." : "Salvar Trilha"}
        </button>
      </div>
    </form>
  );
}
