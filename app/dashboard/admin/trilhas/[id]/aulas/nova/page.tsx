import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LessonForm } from "@/components/LessonForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NovaAulaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <Link href={`/dashboard/admin/trilhas/${resolvedParams.id}/aulas`} className="inline-flex items-center text-sm text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Aulas
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Adicionar Aula</h1>
        <p className="text-slate-400">Insira as informações da aula para os membros consumirem.</p>
      </div>

      <LessonForm moduleId={resolvedParams.id} />
    </div>
  );
}
