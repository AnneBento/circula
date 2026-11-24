import { createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';
import { Home, Landmark, Moon, Recycle, Scale, Sun, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CirculaProvider } from '../lib/circulaStore';

function ThemeToggle() {
  const [escuro, setEscuro] = useState(
    () => localStorage.getItem('circula-tema') === 'escuro'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', escuro);
    localStorage.setItem('circula-tema', escuro ? 'escuro' : 'claro');
  }, [escuro]);

  return (
    <button
      type="button"
      onClick={() => setEscuro((v) => !v)}
      aria-label={escuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition hover:bg-slate-50 dark:border-circula-olive/30 dark:bg-[#0b1a10] dark:text-circula-sage dark:hover:bg-circula-dark"
    >
      {escuro ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
    </button>
  );
}

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    { to: '/', label: 'Início', icon: Home },
    { to: '/cidadao', label: 'Cidadão', icon: User },
    { to: '/catador', label: 'Catador', icon: Scale },
    { to: '/gestao', label: 'Gestão', icon: Landmark },
  ] as const;

  return (
    <CirculaProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b1a10] dark:text-slate-100">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-circula-olive/20 dark:bg-[#123f1b]/90">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-circula-lime text-circula-dark shadow-xs">
                <Recycle className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-base font-black tracking-tight text-circula-dark dark:text-white">
                  CIRCULA
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-circula-olive dark:text-circula-sage">
                  A transformação começa por você!
                </span>
              </div>
            </Link>

            <ThemeToggle />
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="mx-auto max-w-3xl px-4 pt-5">
          <Outlet />
        </main>

        {/* Bottom Navigation Bar (Mobile PWA) */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md dark:border-circula-olive/20 dark:bg-[#123f1b]/95">
          <div className="mx-auto grid max-w-3xl grid-cols-4 px-2 py-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition ${
                    active
                      ? 'text-circula-dark bg-circula-sage/30 dark:text-circula-lime dark:bg-circula-lime/10'
                      : 'text-slate-500 hover:text-slate-800 dark:text-circula-sage/70 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-circula-lime' : ''}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </CirculaProvider>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
