"use client";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface DashboardShellProps {
  children: React.ReactNode;
  user: any;
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar userRole={user?.role} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header userRole={user?.role || "EJ"} ejName={user?.name || "RioJunior"} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 relative z-10">
          {children}
        </main>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}
