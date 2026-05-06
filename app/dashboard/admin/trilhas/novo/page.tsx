import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ModuleForm } from "@/components/ModuleForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NovoModuloPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const axes = await prisma.axis.findMany({
    orderBy: { title: 'asc' }
  });

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Link href="/dashboard/admin/trilhas" className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Trilhas
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Criar Nova Trilha</h1>
        <p className="text-slate-400">Preencha os dados abaixo para criar um novo curso no sistema.</p>
      </div>

      <ModuleForm axes={axes} />
    </div>
  );
}
