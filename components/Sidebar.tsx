import Link from "next/link";
import { LogOut, Home, PlaySquare, BookOpen, Award, Star, Trophy, Wrench, MessageSquare, ShieldCheck } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  userRole?: string;
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const menuSections = [
    {
      title: "Plataforma",
      items: [
        { name: "Início", href: "/dashboard", icon: Home },
      ]
    },
    {
      title: "Capacitação",
      items: [
        { name: "Trilhas de Conteúdo", href: "/dashboard/trilhas", icon: PlaySquare },
      ]
    },
    {
      title: "Comunidade & MEJ",
      items: [
        { name: "Reconhecimentos", href: "/dashboard/reconhecimentos", icon: Award },
        { name: "Ranking", href: "/dashboard/ranking", icon: Trophy },
        { name: "Cases de Sucesso", href: "/dashboard/cases", icon: Star },
        { name: "História", href: "/dashboard/historia", icon: BookOpen },
      ]
    },
    {
      title: "Geral",
      items: [
        { name: "Ferramentas", href: "/dashboard/ferramentas", icon: Wrench, badge: "Em Breve" },
        { name: "Feedbacks", href: "/dashboard/feedbacks", icon: MessageSquare },
      ]
    }
  ];

  if (userRole === "ADMIN") {
    menuSections.push({
      title: "Administração",
      items: [
        { name: "Gerenciar Trilhas", href: "/dashboard/admin/trilhas", icon: ShieldCheck },
      ]
    });
  }

  return (
    <aside className="w-64 bg-accent/30 border-r border-border backdrop-blur-md hidden md:flex flex-col h-full">
      <div className="p-6 shrink-0">
        <h2 className="text-xl font-bold text-white tracking-tight">
          RioJunior <span className="text-primary glow-primary">Academy</span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <nav className="px-4 pb-6 space-y-6 mt-2">
          {menuSections.map((section) => (
            <div key={section.title}>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const IconComponent = item.icon;
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all text-sm font-medium group ${
                        isActive 
                          ? "bg-primary/20 text-white border-l-2 border-primary glow-primary" 
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 transition-colors ${isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300"}`} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold bg-white/10 text-slate-300 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border shrink-0 bg-background/50">
        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
