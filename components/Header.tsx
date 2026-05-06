import { Settings, UserCircle } from "lucide-react";

interface HeaderProps {
  userRole: "ADMIN" | "EJ";
  ejName: string;
}

export function Header({ userRole, ejName }: HeaderProps) {
  return (
    <header className="h-16 bg-background/80 border-b border-border backdrop-blur-sm sticky top-0 z-20 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
      </div>

      <div className="flex items-center gap-4">
        {userRole === "ADMIN" && (
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary/10 border border-primary/50 rounded-lg hover:bg-primary/20 transition-colors border-glow">
            <Settings className="w-4 h-4 text-primary" />
            Gerenciar Conteúdos
          </button>
        )}

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{ejName}</p>
            <p className="text-xs text-slate-400">{userRole === "ADMIN" ? "Administrador" : "Acesso EJ"}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/50 glow-secondary">
            <UserCircle className="w-6 h-6 text-secondary" />
          </div>
        </div>
      </div>
    </header>
  );
}
