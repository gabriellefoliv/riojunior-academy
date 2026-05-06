export default function FeedbacksPage() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-20 pt-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Caixa de Feedbacks</h1>
      <p className="text-slate-400 max-w-lg mx-auto">
        Ajude a melhorar a RioJunior Academy enviando sugestões, reportando bugs ou compartilhando o que você gostaria de ver aqui.
      </p>
    </div>
  );
}
