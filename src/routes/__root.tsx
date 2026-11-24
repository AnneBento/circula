import { createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router';
import { Home, Landmark, Recycle, Scale, User } from 'lucide-react';
import { CirculaProvider } from '../lib/circulaStore';

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
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                <Recycle className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-base font-black tracking-tight text-slate-900">
                  CIRCULA
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                  A transformação começa por você!
                </span>
              </div>
            </Link>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 border border-emerald-200">
              Quixadá • CE
            </span>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="mx-auto max-w-3xl px-4 pt-5">
          <Outlet />
        </main>

        {/* Bottom Navigation Bar (Mobile PWA) */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md">
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
                      ? 'text-emerald-700 bg-emerald-50/80'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-emerald-600' : ''}`} />
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
