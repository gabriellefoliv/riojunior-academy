export default function ReconhecimentosPage() {
  return (
    <div className="w-full max-w-6xl mx-auto pb-20 pt-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Reconhecimentos</h1>
      <p className="text-slate-400 max-w-lg mx-auto">
        Em breve, este espaço será dedicado a celebrar as conquistas e marcos das EJs da nossa federação.
      </p>
    </div>
  );
}
