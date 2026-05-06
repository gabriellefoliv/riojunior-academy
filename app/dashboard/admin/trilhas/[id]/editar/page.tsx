import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ModuleForm } from "@/components/ModuleForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditarModuloPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [axes, moduleData] = await Promise.all([
    prisma.axis.findMany({ orderBy: { title: 'asc' } }),
    prisma.module.findUnique({ where: { id: resolvedParams.id } })
  ]);

  if (!moduleData) {
    return <div>Trilha não encontrada.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Link href="/dashboard/admin/trilhas" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Trilhas
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Editar Trilha</h1>
        <p className="text-slate-400">Altere os detalhes do curso.</p>
      </div>

      <ModuleForm axes={axes} initialData={moduleData} moduleId={moduleData.id} />
    </div>
  );
}
