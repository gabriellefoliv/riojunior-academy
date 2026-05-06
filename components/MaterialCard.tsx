import { FileText, Download } from "lucide-react";

interface MaterialCardProps {
  title: string;
  type?: "PDF" | "Template" | "Planilha";
  url?: string;
}

export function MaterialCard({ title, type = "PDF", url = "#" }: MaterialCardProps) {
  return (
    <a 
      href={url}
      className="group flex items-center justify-between p-4 bg-accent/40 border border-white/5 rounded-xl hover:bg-accent/80 hover:border-primary/50 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-medium text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">Formato: {type}</p>
        </div>
      </div>
      
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
        <Download className="w-4 h-4" />
      </div>
    </a>
  );
}
