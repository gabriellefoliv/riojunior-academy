"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMaterial, deleteMaterial } from "@/app/actions/materials";
import { FileText, Trash2, Link as LinkIcon, Plus } from "lucide-react";

interface MaterialsManagerProps {
  lessonId: string;
  moduleId: string;
  materials: any[];
}

export function MaterialsManager({ lessonId, moduleId, materials }: MaterialsManagerProps) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await createMaterial(lessonId, moduleId, formData);
      (e.target as HTMLFormElement).reset();
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar material.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (materialId: string) => {
    if (!window.confirm("Deseja realmente remover este material?")) return;
    setLoading(true);

    try {
      await deleteMaterial(materialId, lessonId, moduleId);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erro ao remover material.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-accent/20 border border-border p-8 rounded-xl max-w-4xl mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Gerenciar Materiais (Anexos)
        </h2>
        <p className="text-sm text-slate-400">Arraste arquivos ou clique para anexar documentos diretamente do seu computador.</p>
      </div>

      <div className="space-y-3 mb-8">
        {materials.length === 0 ? (
          <p className="text-slate-500 text-sm italic">Nenhum material anexado nesta aula.</p>
        ) : (
          materials.map(mat => (
            <div key={mat.id} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded text-primary">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{mat.title}</h4>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{mat.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={mat.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Ver Arquivo
                </a>
                <button
                  onClick={() => handleDelete(mat.id)}
                  disabled={loading}
                  className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                  title="Remover Material"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleAdd} className="bg-background/50 border border-border p-6 rounded-lg">
        <h3 className="text-sm font-bold text-white mb-4">Novo Anexo</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Nome do Arquivo</label>
            <input
              required
              name="title"
              placeholder="Ex: Apostila Aula 1"
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Categoria</label>
            <select
              required
              name="type"
              defaultValue=""
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
            >
              <option value="" disabled>Selecione</option>
              <option value="PDF">PDF</option>
              <option value="Planilha">Planilha</option>
              <option value="Slide">Slide (PPT)</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1">Arquivo</label>
          <div className="relative border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-6 text-center cursor-pointer bg-white/5 group">
            <input
              type="file"
              name="file"
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            {selectedFile ? (
              <div className="text-primary font-medium text-sm flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-300 font-medium group-hover:text-primary transition-colors">
                  Clique ou arraste o arquivo aqui
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Tamanho máximo recomendado: 100MB
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !selectedFile}
          className="w-full bg-primary text-background font-bold rounded-lg px-4 py-3 text-sm hover:bg-primary/90 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <span className="animate-pulse">Enviando para Nuvem...</span>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Fazer Upload e Anexar
            </>
          )}
        </button>
      </form>
    </div>
  );
}
