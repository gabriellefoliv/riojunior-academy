"use client";

import { useState } from "react";
import { toggleModuleStatus } from "@/app/actions/modules";
import { Power, PowerOff } from "lucide-react";

export function ModuleStatusToggle({ moduleId, isActive }: { moduleId: string, isActive: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await toggleModuleStatus(moduleId, !isActive);
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={isActive ? "Desativar Trilha" : "Ativar Trilha"}
      className={`p-2 rounded-lg transition-colors ${
        isActive 
          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
          : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      }`}
    >
      {isActive ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
    </button>
  );
}
