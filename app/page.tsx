import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
      <main className="z-10 flex flex-col items-center text-center max-w-3xl space-y-8">

        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-150"></div>
          <div className="relative bg-accent/50 border border-white/10 p-4 rounded-2xl backdrop-blur-sm border-glow">
            <Rocket className="w-12 h-12 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-white">
            RioJunior <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-primary">Academy</span>
          </h1>
          <p className="text-xl sm:text-2xl font-light text-slate-300 italic tracking-wide opacity-80">
            "A coragem de sonhar e a ousadia de agir"
          </p>
        </div>

        <p className="text-lg text-slate-400 max-w-xl">
          A plataforma educacional definitiva para o desenvolvimento de Empresas Juniores.
          Acesse conteúdos exclusivos e impulsione os resultados da sua EJ.
        </p>

        <div className="pt-8">
          <Link
            href="/login"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium transition-all hover:scale-105 hover:bg-primary/90 glow-primary"
          >
            Acessar Plataforma
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_#fff]"></div>
        <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_15px_3px_var(--primary-glow)]"></div>
        <div className="absolute top-[30%] right-[20%] w-1 h-1 bg-secondary rounded-full shadow-[0_0_10px_2px_var(--secondary-glow)]"></div>
        <div className="absolute top-[70%] right-[15%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_2px_#fff]"></div>
      </div>
    </div>
  );
}
