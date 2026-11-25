import React, { useState } from 'react';
import { createRootRoute, Link, Outlet, useNavigate } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Home,
  Landmark,
  LogIn,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  Sparkles,
  User,
  UserPlus,
  X,
} from 'lucide-react';
import { CirculaProvider } from '../lib/circulaStore';

export const Route = createRootRoute({
  component: RootLayout,
});

const BAIRROS_QUIXADA = [
  'Centro',
  'Cedro',
  'Combate',
  'Campo Velho',
  'São João',
  'Alto São Francisco',
  'Planalto Universitário',
  'Baviera',
];

type RotaPerfil = '/cidadao' | '/catador' | '/gestao';

function formatarCPF(valor: string) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);
  return numeros
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function RootLayout() {
  const navigate = useNavigate();
  const [loginAberto, setLoginAberto] = useState(false);
  const [abaAuth, setAbaAuth] = useState<'entrar' | 'cadastrar'>('entrar');

  const [usuarioLogado, setUsuarioLogado] = useState<{
    nome: string;
    papel: string;
    codigo: string;
    nivel: number;
  } | null>(null);

  // Estados de Entrar
  const [email, setEmail] = useState('');
  const [modoTelefone, setModoTelefone] = useState(false);
  const [telefone, setTelefone] = useState('');

  // Estados de Cadastro
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [cpfCadastro, setCpfCadastro] = useState('');
  const [perfilCadastro, setPerfilCadastro] = useState<RotaPerfil>('/cidadao');
  const [bairroCadastro, setBairroCadastro] = useState('Centro');
  const [contatoCadastro, setContatoCadastro] = useState('');

  const getRotuloPapel = (rota: RotaPerfil) => {
    if (rota === '/cidadao') return 'Colaborador • Nível 1';
    if (rota === '/catador') return 'Catador / Operador';
    return 'Gestão Pública';
  };

  const concluirAcesso = (
    nome: string,
    rota: RotaPerfil = '/cidadao',
    codigoCustom?: string
  ) => {
    const codigoGerado =
      codigoCustom || `QXD-${Math.floor(1000 + Math.random() * 9000)}`;

    setUsuarioLogado({
      nome,
      papel: getRotuloPapel(rota),
      codigo: codigoGerado,
      nivel: 1,
    });
    setLoginAberto(false);
    setEmail('');
    setTelefone('');
    setNomeCadastro('');
    setCpfCadastro('');
    setContatoCadastro('');
    setModoTelefone(false);
    navigate({ to: rota });
  };

  const handleSubmitEntrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (modoTelefone) {
      concluirAcesso(telefone || 'Colaborador Quixadá', '/cidadao', 'QXD-2026');
      return;
    }
    const nomeBase = email.includes('@') ? email.split('@')[0] : 'Colaborador Quixadá';
    concluirAcesso(nomeBase, '/cidadao', 'QXD-2026');
  };

  const handleSubmitCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    const nomeFinal = nomeCadastro.trim() || 'Novo Usuário';
    concluirAcesso(nomeFinal, perfilCadastro);
  };

  return (
    <CirculaProvider>
      <div className="min-h-screen bg-[#f6f9f3] text-[#123F1B] flex flex-col">
        {/* Cabeçalho Superior */}
        <header className="sticky top-0 z-40 border-b border-[#BDD3A7] bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            {/* Logo CIRCULA */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-xs transition group-hover:scale-105 overflow-hidden">
                <img src="/logo.png" alt="Logo CIRCULA" className="h-9 w-9 object-contain" />
              </div>
              <div>
                <span className="block text-base font-black tracking-tight text-[#123F1B] leading-none">
                  CIRCULA
                </span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#8D9864]">
                  A transformação começa por você!
                </span>
              </div>
            </Link>

            {/* Canto Direito: Botão Entrar / Perfil Ativo */}
            <div className="flex items-center gap-2">
              
              {usuarioLogado ? (
                <button
                  type="button"
                  onClick={() => setLoginAberto(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#90AD2E] bg-[#BDD3A7]/45 px-3.5 py-1.5 text-xs font-extrabold text-[#123F1B] transition hover:bg-[#BDD3A7]/75"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#123F1B]" />
                  <span className="max-w-[95px] truncate">{usuarioLogado.nome}</span>
                  <span className="hidden xs:inline rounded-full bg-[#123F1B] px-1.5 py-0.5 text-[9px] font-black text-[#90AD2E]">
                    Nv.{usuarioLogado.nivel}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAbaAuth('entrar');
                    setLoginAberto(true);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#123F1B] px-4 py-1.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-[#8D9864] active:scale-95"
                >
                  <LogIn className="h-3.5 w-3.5 text-[#90AD2E]" />
                  Entrar
                </button>
              )}
            </div>
          </div>
        </header>

        {/* POPUP (MODAL) DE LOGIN E CADASTRO */}
        <AnimatePresence>
          {loginAberto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLoginAberto(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative my-auto w-full max-w-[395px] rounded-[28px] bg-[#212121] px-6 py-7 text-white shadow-2xl border border-white/10"
              >
                {/* Botão Fechar (X) */}
                <button
                  type="button"
                  aria-label="Fechar"
                  onClick={() => setLoginAberto(false)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Cabeçalho */}
                <div className="text-center space-y-1.5">
                  <h2 className="text-[22px] font-semibold tracking-tight text-white">
                    {abaAuth === 'entrar' ? 'Entre ou cadastre-se' : 'Crie sua conta'}
                  </h2>
                  <p className="text-[12.5px] leading-relaxed text-zinc-300 px-1">
                    {abaAuth === 'entrar'
                      ? 'Acompanhe seus pontos, desbloqueie cupons em Quixadá e acesse seu código de entrega.'
                      : 'Preencha seus dados para acessar a plataforma circular de Quixadá.'}
                  </p>
                </div>

                {/* Alternador Principal: Já tenho conta vs Cadastrar-se */}
                <div className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-[#141414] p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setAbaAuth('entrar')}
                    className={`rounded-full py-1.5 text-xs font-bold transition ${
                      abaAuth === 'entrar'
                        ? 'bg-white text-zinc-950 shadow-xs'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Já tenho conta
                  </button>
                  <button
                    type="button"
                    onClick={() => setAbaAuth('cadastrar')}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-bold transition ${
                      abaAuth === 'cadastrar'
                        ? 'bg-[#90AD2E] text-[#123F1B] shadow-xs'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Cadastrar-se
                  </button>
                </div>

                {abaAuth === 'entrar' ? (
                  <>
                    {/* Botões Sociais em Pílula */}
                    <div className="mt-5 space-y-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          concluirAcesso('Usuário (Google)', '/cidadao', 'QXD-2026')
                        }
                        className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-[#2a2a2a] px-5 text-sm font-semibold text-white transition hover:bg-[#343434] active:scale-[0.99]"
                      >
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fill="#EA4335"
                            d="M12 5c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.79 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.91 6.16-4.91z"
                          />
                          <path
                            fill="#4285F4"
                            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.86 3c2.26-2.09 3.56-5.17 3.56-8.82z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-2.86 0-5.29-2.31-6.16-4.91l-3.66 2.84C3.99 20.53 7.7 23 12 23z"
                          />
                        </svg>
                        Continuar com o Google
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          concluirAcesso('Usuário (Apple)', '/cidadao', 'QXD-2026')
                        }
                        className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-[#2a2a2a] px-5 text-sm font-semibold text-white transition hover:bg-[#343434] active:scale-[0.99]"
                      >
                        <svg
                          className="h-4 w-4 shrink-0 fill-current"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        Continuar com a Apple
                      </button>

                      <button
                        type="button"
                        onClick={() => setModoTelefone((prev) => !prev)}
                        className="flex h-11 w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-[#2a2a2a] px-5 text-sm font-semibold text-white transition hover:bg-[#343434] active:scale-[0.99]"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-zinc-200" />
                        Continuar com um telefone
                      </button>
                    </div>

                    {/* Divisor OU */}
                    <div className="my-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/15" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                        OU
                      </span>
                      <div className="h-px flex-1 bg-white/15" />
                    </div>

                    {/* Formulário Entrar */}
                    <form onSubmit={handleSubmitEntrar} className="space-y-2.5">
                      {modoTelefone ? (
                        <input
                          type="tel"
                          required
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                          placeholder="(88) 99999-9999"
                          className="h-11 w-full rounded-full border border-white/15 bg-[#0d0d0d] px-5 text-sm text-white placeholder:text-zinc-400 focus:border-[#90AD2E] focus:outline-none"
                        />
                      ) : (
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Endereço de e-mail"
                          className="h-11 w-full rounded-full border border-white/15 bg-[#0d0d0d] px-5 text-sm text-white placeholder:text-zinc-400 focus:border-[#90AD2E] focus:outline-none"
                        />
                      )}

                      <button
                        type="submit"
                        className="h-11 w-full rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 active:scale-[0.99]"
                      >
                        Continuar
                      </button>
                    </form>
                  </>
                ) : (
                  /* FORMULÁRIO DE CADASTRO COM CPF E LISTA SUSPENSA DE PERFIL */
                  <form onSubmit={handleSubmitCadastro} className="mt-5 space-y-3">
                    <div>
                      <input
                        type="text"
                        required
                        value={nomeCadastro}
                        onChange={(e) => setNomeCadastro(e.target.value)}
                        placeholder="Nome completo ou apelido"
                        className="h-11 w-full rounded-full border border-white/15 bg-[#0d0d0d] px-5 text-sm text-white placeholder:text-zinc-400 focus:border-[#90AD2E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        value={cpfCadastro}
                        onChange={(e) => setCpfCadastro(formatarCPF(e.target.value))}
                        placeholder="CPF (000.000.000-00)"
                        className="h-11 w-full rounded-full border border-white/15 bg-[#0d0d0d] px-5 text-sm text-white placeholder:text-zinc-400 focus:border-[#90AD2E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <select
                        value={perfilCadastro}
                        onChange={(e) =>
                          setPerfilCadastro(e.target.value as RotaPerfil)
                        }
                        aria-label="Selecione o tipo de perfil"
                        className="h-11 w-full rounded-full border border-white/15 bg-[#0d0d0d] px-5 text-sm text-white focus:border-[#90AD2E] focus:outline-none"
                      >
                        <option value="/cidadao" className="bg-[#212121]">
                          Perfil: Colaborador
                        </option>
                        <option value="/catador" className="bg-[#212121]">
                          Perfil: Catador
                        </option>
                        <option value="/gestao" className="bg-[#212121]">
                          Perfil: Gestão
                        </option>
                      </select>
                    </div>

                    <div>
                      <select
                        value={bairroCadastro}
                        onChange={(e) => setBairroCadastro(e.target.value)}
                        aria-label="Selecione seu bairro em Quixadá"
                        className="h-11 w-full rounded-full border border-white/15 bg-[#0d0d0d] px-5 text-sm text-white focus:border-[#90AD2E] focus:outline-none"
                      >
                        {BAIRROS_QUIXADA.map((bairro) => (
                          <option key={bairro} value={bairro} className="bg-[#212121]">
                            Bairro {bairro} • Quixadá
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        value={contatoCadastro}
                        onChange={(e) => setContatoCadastro(e.target.value)}
                        placeholder="E-mail ou WhatsApp (88) 9..."
                        className="h-11 w-full rounded-full border border-white/15 bg-[#0d0d0d] px-5 text-sm text-white placeholder:text-zinc-400 focus:border-[#90AD2E] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#90AD2E] px-5 text-sm font-extrabold text-[#123F1B] transition hover:bg-[#BDD3A7] active:scale-[0.99]"
                    >
                      <Sparkles className="h-4 w-4" />
                      Finalizar Cadastro
                    </button>

                    <p className="text-center text-xs text-zinc-400">
                      Já possui cadastro?{' '}
                      <button
                        type="button"
                        onClick={() => setAbaAuth('entrar')}
                        className="font-bold text-white underline underline-offset-2"
                      >
                        Entrar agora
                      </button>
                    </p>
                  </form>
                )}

                {/* Nota LGPD */}
                <p className="mt-4 text-center text-[10px] text-zinc-500">
                  Protótipo LGPD • Dados sintéticos de demonstração (
                  <span className="font-mono">QXD-2026</span>)
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conteúdo das Rotas */}
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-5">
          <Outlet />
        </main>

        {/* Barra de Navegação Inferior Mobile */}
        <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-[#BDD3A7] bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-around py-2">
            <Link
              to="/"
              className="flex flex-col items-center gap-0.5 px-2.5 py-1 text-[11px] font-bold text-[#8D9864] [&.active]:text-[#123F1B]"
            >
              <Home className="h-5 w-5" />
              Início
            </Link>
            <Link
              to="/ecopontos"
              className="flex flex-col items-center gap-0.5 px-2.5 py-1 text-[11px] font-bold text-[#8D9864] [&.active]:text-[#123F1B]"
            >
              <MapPin className="h-5 w-5" />
              Ecopontos
            </Link>
            <Link
              to="/cidadao"
              className="flex flex-col items-center gap-0.5 px-2.5 py-1 text-[11px] font-bold text-[#8D9864] [&.active]:text-[#123F1B]"
            >
              <User className="h-5 w-5" />
              Colaborador
            </Link>
            <Link
              to="/catador"
              className="flex flex-col items-center gap-0.5 px-2.5 py-1 text-[11px] font-bold text-[#8D9864] [&.active]:text-[#123F1B]"
            >
              <Scale className="h-5 w-5" />
              Catador
            </Link>
            <Link
              to="/gestao"
              className="flex flex-col items-center gap-0.5 px-2.5 py-1 text-[11px] font-bold text-[#8D9864] [&.active]:text-[#123F1B]"
            >
              <Landmark className="h-5 w-5" />
              Gestão
            </Link>
            <Link
              to="/whatsapp"
              className="flex flex-col items-center gap-0.5 px-2.5 py-1 text-[11px] font-bold text-[#8D9864] [&.active]:text-[#123F1B]"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Link>
          </div>
        </nav>
      </div>
    </CirculaProvider>
  );
}