export default function RankingPage() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-20 pt-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-500 mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Ranking Oficial</h1>
      <p className="text-slate-400 max-w-lg mx-auto">
        Acompanhe em tempo real a pontuação e o desenvolvimento das EJs através do nosso sistema de gamificação.
      </p>
    </div>
  );
}
