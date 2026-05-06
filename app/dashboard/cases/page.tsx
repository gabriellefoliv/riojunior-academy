export default function CasesPage() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-20 pt-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-500 mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Cases de Sucesso</h1>
      <p className="text-slate-400 max-w-lg mx-auto">
        Um repositório de projetos incríveis e soluções de alto impacto desenvolvidas pelas Empresas Júniores da rede.
      </p>
    </div>
  );
}
