import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, List } from "lucide-react";
import { ModuleStatusToggle } from "@/components/ModuleStatusToggle";

export default async function AdminTrilhasPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const modules = await prisma.module.findMany({
    include: { axis: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Trilhas</h1>
          <p className="text-slate-400">Crie, edite ou desative trilhas de conteúdo.</p>
        </div>
        <Link 
          href="/dashboard/admin/trilhas/novo" 
          className="bg-primary text-background font-bold px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Trilha
        </Link>
      </div>

      <div className="bg-accent/20 border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-accent/40 border-b border-border">
              <th className="p-4 text-slate-300 font-semibold text-sm">Título</th>
              <th className="p-4 text-slate-300 font-semibold text-sm">Eixo</th>
              <th className="p-4 text-slate-300 font-semibold text-sm text-center">Status</th>
              <th className="p-4 text-slate-300 font-semibold text-sm text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod) => (
              <tr key={mod.id} className="border-b border-border/50 hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="text-white font-medium">{mod.title}</div>
                  <div className="text-xs text-slate-500 line-clamp-1">{mod.description}</div>
                </td>
                <td className="p-4">
                  <span className="bg-white/10 text-slate-300 px-2 py-1 rounded text-xs">
                    {mod.axis.title}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${mod.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {mod.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link 
                      href={`/dashboard/admin/trilhas/${mod.id}/aulas`}
                      className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                      title="Gerenciar Aulas"
                    >
                      <List className="w-4 h-4" />
                    </Link>
                    <Link 
                      href={`/dashboard/admin/trilhas/${mod.id}/editar`}
                      className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <ModuleStatusToggle moduleId={mod.id} isActive={mod.isActive} />
                  </div>
                </td>
              </tr>
            ))}
            {modules.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-400">
                  Nenhuma trilha encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
