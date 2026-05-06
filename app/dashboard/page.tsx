import Link from "next/link";
import { PlayCircle, Award, TrendingUp } from "lucide-react";

export default function DashboardWelcomePage() {
  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-12">

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-background to-background border border-primary/20 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Bem-vindo à <span className="text-primary glow-primary">RioJunior Academy</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed">
            A plataforma de capacitação do Movimento Empresa Júnior Fluminense.
            Desenvolva seu time, escale seus resultados e faça história.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard/trilhas"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-background font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <PlayCircle className="w-5 h-5" />
              Explorar Trilhas
            </Link>
          </div>
        </div>

        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-accent/20 border border-border p-6 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Seu Progresso</h3>
            <p className="text-sm text-slate-400">Continue aprendendo. Você tem trilhas em andamento.</p>
          </div>
        </div>

        <div className="bg-accent/20 border border-border p-6 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <PlayCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Novos Conteúdos</h3>
            <p className="text-sm text-slate-400">Confira as masterclasses e workshops recém adicionados.</p>
          </div>
        </div>

        <div className="bg-accent/20 border border-border p-6 rounded-xl flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">Gamificação</h3>
            <p className="text-sm text-slate-400">Complete trilhas para ganhar reconhecimentos no MEJ.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
