"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Rocket, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="bg-accent/40 border border-white/5 p-8 rounded-3xl backdrop-blur-md shadow-2xl border-glow">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/50 mb-6 glow-primary">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
              Bem-vindo à <span className="text-primary">Academy</span>
            </h1>
            <p className="text-slate-400 text-center text-sm">
              Faça login com a conta da sua Empresa Júnior para acessar os conteúdos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="contato@suaej.com.br"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed glow-primary"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
