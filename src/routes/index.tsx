import React, { useEffect, useRef, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Bike,
  BookOpen,
  Building,
  Bus,
  Car,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Dumbbell,
  Film,
  Gift,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Languages,
  Leaf,
  Recycle,
  Scale,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Sprout,
  Store,
  Sun,
  Theater,
  Ticket,
  TreePine,
  User,
  Utensils,
  X,
} from 'lucide-react';
import type { Nivel as NivelJornada } from '../types/database';

export const Route = createFileRoute('/')({
  component: HomeLanding,
});

interface CupomCarrossel {
  id: string;
  linha: 1 | 2 | 3;
  categoria: string;
  titulo: string;
  destaque: string;
  parceiro: string;
  descricao: string;
  nivel: NivelJornada;
  pontos: number;
  gradiente: string;
  icon: React.ElementType;
}

const NIVEIS_INFO: Record<
  NivelJornada,
  { nome: string; cor: string; icon: React.ElementType }
> = {
  1: { nome: 'Nível 1 • Semente', cor: 'bg-circula-sage/40 text-circula-dark dark:bg-circula-lime/15 dark:text-circula-sage', icon: Sprout },
  2: { nome: 'Nível 2 • Broto', cor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-100', icon: Leaf },
  3: { nome: 'Nível 3 • Árvore', cor: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-100', icon: TreePine },
  4: { nome: 'Nível 4 • Guardião', cor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-100', icon: ShieldCheck },
  5: { nome: 'Nível 5 • Embaixador', cor: 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100', icon: Award },
};

const CUPONS_CARROSSEL: CupomCarrossel[] = [
  // =========================================================================
  // LINHA 1: DIA A DIA — PAPELARIAS, CAFETERIAS, RESTAURANTES E MERCADOS
  // =========================================================================
  {
    id: 'l1-papelaria',
    linha: 1,
    categoria: 'Papelarias',
    titulo: 'Papelaria & Escolar',
    destaque: '15% OFF',
    parceiro: 'Livraria & Papelaria Monólitos',
    descricao: 'Desconto em cadernos, mochilas, livros paradidáticos e materiais de escritório.',
    nivel: 1,
    pontos: 100,
    gradiente: 'from-emerald-500 to-teal-600',
    icon: BookOpen,
  },
  {
    id: 'l1-cafeteria',
    categoria: 'Cafeterias',
    linha: 1,
    titulo: 'Combo Cafeteria',
    destaque: 'CAFÉ GRÁTIS',
    parceiro: 'Café do Sertão & Padaria Central',
    descricao: 'Na compra de um salgado ou tapioca recheada, ganhe um café expresso ou coado.',
    nivel: 2,
    pontos: 150,
    gradiente: 'from-amber-600 to-orange-600',
    icon: Coffee,
  },
  {
    id: 'l1-restaurante',
    linha: 1,
    categoria: 'Restaurantes',
    titulo: 'Almoço & Jantar',
    destaque: '20% OFF',
    parceiro: 'Rede Gastronômica Quixadá',
    descricao: 'Desconto direto na conta em restaurantes e lanchonetes parceiras da cidade.',
    nivel: 2,
    pontos: 200,
    gradiente: 'from-orange-500 to-rose-600',
    icon: Utensils,
  },
  {
    id: 'l1-mercado-1',
    linha: 1,
    categoria: 'Mercados',
    titulo: 'Feira & Supermercado',
    destaque: 'R$ 25,00 OFF',
    parceiro: 'Supermercados & Mercadinhos Locais',
    descricao: 'Abatimento direto no caixa em compras acima de R$ 100,00.',
    nivel: 2,
    pontos: 250,
    gradiente: 'from-lime-600 to-emerald-700',
    icon: ShoppingCart,
  },
  {
    id: 'l1-hortifruti',
    linha: 1,
    categoria: 'Alimentação Saudável',
    titulo: 'Cesta Verde Orgânica',
    destaque: '30% OFF',
    parceiro: 'Associação Feira Limpa Quixadá',
    descricao: 'Desconto em frutas, verduras e produtos da agricultura familiar local.',
    nivel: 2,
    pontos: 220,
    gradiente: 'from-green-600 to-emerald-800',
    icon: Sprout,
  },
  {
    id: 'l1-comercio',
    linha: 1,
    categoria: 'Comércio Local',
    titulo: 'Lojas & Serviços',
    destaque: '25% OFF',
    parceiro: 'Comércio do Centro e Bairros',
    descricao: 'Cupons em vestuário, calçados, óticas, barbearias e salões credenciados.',
    nivel: 3,
    pontos: 300,
    gradiente: 'from-cyan-600 to-blue-700',
    icon: Store,
  },
  {
    id: 'l1-farmacia',
    linha: 1,
    categoria: 'Saúde & Bem-estar',
    titulo: 'Drogarias Parceiras',
    destaque: '20% OFF',
    parceiro: 'Rede Farmácias do Sertão',
    descricao: 'Desconto em itens de higiene, dermocosméticos e perfumaria.',
    nivel: 2,
    pontos: 190,
    gradiente: 'from-teal-500 to-cyan-700',
    icon: HeartPulse,
  },

  // =========================================================================
  // LINHA 2: CULTURA, EDUCAÇÃO, ESPORTE E LAZER
  // =========================================================================
  {
    id: 'l2-cinema',
    linha: 2,
    categoria: 'Cinemas',
    titulo: 'Cinema Parceiro',
    destaque: 'MEIA-ENTRADA',
    parceiro: 'Cine Teatro & Salas Parceiras',
    descricao: 'Meia-entrada garantida ou 50% de desconto em qualquer sessão da semana.',
    nivel: 3,
    pontos: 320,
    gradiente: 'from-purple-600 to-indigo-700',
    icon: Film,
  },
  {
    id: 'l2-teatro',
    linha: 2,
    categoria: 'Teatro & Cultura',
    titulo: 'Teatro & Eventos Culturais',
    destaque: '40% OFF',
    parceiro: 'Agenda Cultural & Festivais',
    descricao: 'Ingressos promocionais para peças teatrais, shows regionais e exposições.',
    nivel: 3,
    pontos: 340,
    gradiente: 'from-fuchsia-600 to-pink-600',
    icon: Theater,
  },
  {
    id: 'l2-academia',
    linha: 2,
    categoria: 'Academias',
    titulo: 'Mensalidade Promocional',
    destaque: '35% OFF MÊS',
    parceiro: 'Academias & Centros Fitness',
    descricao: 'Mensalidade reduzida + isenção da taxa de matrícula para usuários ativos.',
    nivel: 4,
    pontos: 480,
    gradiente: 'from-blue-600 to-indigo-800',
    icon: Dumbbell,
  },
  {
    id: 'l2-lazer',
    linha: 2,
    categoria: 'Programas de Lazer',
    titulo: 'Clubes & Trilhas Ecológicas',
    destaque: 'DAY USE VIP',
    parceiro: 'Parques, Clubes & Roteiro Monólitos',
    descricao: 'Acesso gratuito ou com desconto especial a clubes recreativos e ecoturismo.',
    nivel: 4,
    pontos: 520,
    gradiente: 'from-teal-600 to-emerald-800',
    icon: Sun,
  },
  {
    id: 'l2-idiomas',
    linha: 2,
    categoria: 'Educação',
    titulo: 'Curso de Idiomas & TI',
    destaque: 'BOLSA 30%',
    parceiro: 'Instituto Educa Sertão',
    descricao: 'Bolsa parcial em cursos de inglês, espanhol, informática e programação.',
    nivel: 3,
    pontos: 360,
    gradiente: 'from-sky-600 to-blue-800',
    icon: Languages,
  },
  {
    id: 'l2-profissional',
    linha: 2,
    categoria: 'Capacitação',
    titulo: 'Cursos Profissionalizantes',
    destaque: '40% OFF',
    parceiro: 'Escolas Técnicas & Parceiros',
    descricao: 'Desconto em cursos rápidos de gestão, vendas, estética e manutenção.',
    nivel: 3,
    pontos: 390,
    gradiente: 'from-violet-600 to-purple-800',
    icon: GraduationCap,
  },
  {
    id: 'l2-esporte',
    linha: 2,
    categoria: 'Esporte',
    titulo: 'Aulas Experimentais',
    destaque: '3 AULAS GRÁTIS',
    parceiro: 'Arenas Society, Cross & Funcional',
    descricao: 'Pacote de aulas experimentais em modalidades esportivas parceiras.',
    nivel: 2,
    pontos: 210,
    gradiente: 'from-emerald-600 to-green-700',
    icon: Bike,
  },

  // =========================================================================
  // LINHA 3: IPTU VERDE, MOBILIDADE UBER E VOUCHERS DE ALTO VALOR
  // =========================================================================
  {
    id: 'l3-iptu-verde-1',
    linha: 3,
    categoria: 'Incentivo Fiscal • Prefeitura',
    titulo: 'IPTU Verde Residencial',
    destaque: 'ATÉ 10% OFF IPTU',
    parceiro: 'Prefeitura de Quixadá • AMMA',
    descricao: 'Abatimento anual no IPTU para residências com entregas regulares comprovadas.',
    nivel: 4,
    pontos: 750,
    gradiente: 'from-emerald-700 via-green-700 to-teal-900',
    icon: Home,
  },
  {
    id: 'l3-uber-gratis',
    linha: 3,
    categoria: 'Mobilidade Uber',
    titulo: 'Viagem Grátis no Uber',
    destaque: '1 CORRIDA GRÁTIS',
    parceiro: 'Crédito Uber / Mobilidade Urbana',
    descricao: 'Voucher de até R$ 30,00 para corrida grátis pelo aplicativo Uber.',
    nivel: 5,
    pontos: 850,
    gradiente: 'from-slate-800 to-zinc-950',
    icon: Car,
  },
  {
    id: 'l3-voucher-100',
    linha: 3,
    categoria: 'Super Voucher VIP',
    titulo: 'Vale-Compras Alto Valor',
    destaque: 'R$ 100,00',
    parceiro: 'Rede Multi-Parceiros CIRCULA',
    descricao: 'Voucher premium de R$ 100 para usar livremente em supermercados ou lojas.',
    nivel: 5,
    pontos: 1000,
    gradiente: 'from-amber-500 via-yellow-600 to-amber-700',
    icon: ShoppingBag,
  },
  {
    id: 'l3-iptu-verde-2',
    linha: 3,
    categoria: 'Selo Empresa Sustentável',
    titulo: 'IPTU Verde Comércio',
    destaque: '15% OFF IPTU',
    parceiro: 'Secretaria de Finanças & AMMA',
    descricao: 'Incentivo fiscal para comércios locais que destinam 100% dos recicláveis limpos.',
    nivel: 5,
    pontos: 1200,
    gradiente: 'from-teal-700 to-emerald-950',
    icon: Building,
  },
  {
    id: 'l3-uber-desconto',
    linha: 3,
    categoria: 'Mobilidade Urbana',
    titulo: 'Pacote Desconto Uber',
    destaque: '50% OFF (3X)',
    parceiro: 'Parceria Mobilidade Inteligente',
    descricao: 'Três corridas com 50% de desconto (limite de R$ 15 por viagem).',
    nivel: 4,
    pontos: 620,
    gradiente: 'from-zinc-700 to-slate-900',
    icon: Bus,
  },
  {
    id: 'l3-voucher-250',
    linha: 3,
    categoria: 'Prêmio Embaixador',
    titulo: 'Super Voucher Família',
    destaque: 'R$ 250,00',
    parceiro: 'Fundo Ambiental & Patrocinadores',
    descricao: 'Vale-compras especial para famílias embaixadoras com meta trimestral batida.',
    nivel: 5,
    pontos: 1800,
    gradiente: 'from-rose-600 via-amber-600 to-yellow-600',
    icon: Award,
  },
];

interface LinhaCarrosselProps {
  tituloLinha: string;
  subtituloLinha: string;
  cupons: CupomCarrossel[];
  direcaoInicial: 'direita' | 'esquerda';
  intervaloMs: number;
  onSelectCupom: (c: CupomCarrossel) => void;
}

const LinhaCarrossel: React.FC<LinhaCarrosselProps> = ({
  tituloLinha,
  subtituloLinha,
  cupons,
  direcaoInicial,
  intervaloMs,
  onSelectCupom,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [pausado, setPausado] = useState(false);

  const rolar = (direcao: 'esquerda' | 'direita') => {
    const el = trackRef.current;
    if (!el) return;
    const passo = 225;
    if (direcao === 'direita') {
      const noFim = el.scrollLeft + el.clientWidth >= el.scrollWidth - 12;
      el.scrollTo({ left: noFim ? 0 : el.scrollLeft + passo, behavior: 'smooth' });
    } else {
      const noInicio = el.scrollLeft <= 12;
      el.scrollTo({
        left: noInicio ? el.scrollWidth : el.scrollLeft - passo,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (pausado) return;
    const id = setInterval(() => {
      rolar(direcaoInicial);
    }, intervaloMs);
    return () => clearInterval(id);
  }, [pausado, direcaoInicial, intervaloMs]);

  return (
    <div
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onTouchStart={() => setPausado(true)}
      className="space-y-2"
    >
      {/* Cabeçalho da Linha */}
      <div className="flex items-center justify-between gap-2 px-0.5">
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100">
            {tituloLinha}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{subtituloLinha}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => rolar('esquerda')}
            aria-label="Anterior"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => rolar('direita')}
            aria-label="Próximo"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Trilha Horizontal de Bloquinhos */}
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-1.5 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {cupons.map((cupom) => {
          const Icon = cupom.icon;
          const nivelData = NIVEIS_INFO[cupom.nivel];
          const NivelIcon = nivelData.icon;

          return (
            <motion.div
              key={cupom.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCupom(cupom)}
              className="group relative w-[205px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs transition hover:border-emerald-400 hover:shadow-md flex flex-col justify-between"
            >
              {/* Topo Colorido */}
              <div className={`bg-gradient-to-r ${cupom.gradiente} p-3 text-white`}>
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold backdrop-blur-xs">
                    {cupom.categoria}
                  </span>
                  <div className="shrink-0 rounded-lg bg-white/20 p-1 backdrop-blur-xs">
                    <Icon className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
                <div className="mt-2 text-lg font-black tracking-tight leading-none">
                  {cupom.destaque}
                </div>
                <div className="mt-1 text-[11px] font-bold text-white/95 truncate">
                  {cupom.titulo}
                </div>
              </div>

              {/* Picote de Ticket */}
              <div className="relative flex items-center justify-between bg-white dark:bg-slate-900">
                <span className="-ml-1.5 h-3 w-3 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
                <div className="w-full border-t border-dashed border-slate-300" />
                <span className="-mr-1.5 h-3 w-3 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
              </div>

              {/* Base do Bloquinho */}
              <div className="flex flex-1 flex-col justify-between p-3 pt-1.5">
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">
                  {cupom.parceiro}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${nivelData.cor}`}
                  >
                    <NivelIcon className="h-2.5 w-2.5" />
                    Nível {cupom.nivel}
                  </span>
                  <span className="text-[11px] font-black text-emerald-700">
                    {cupom.pontos} pts
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

function HomeLanding() {
  const [cupomSelecionado, setCupomSelecionado] = useState<CupomCarrossel | null>(null);

  const linha1 = CUPONS_CARROSSEL.filter((c) => c.linha === 1);
  const linha2 = CUPONS_CARROSSEL.filter((c) => c.linha === 2);
  const linha3 = CUPONS_CARROSSEL.filter((c) => c.linha === 3);

  const perfis = [
    {
      to: '/cidadao',
      titulo: 'Sou Cidadão',
      subtitulo: 'Código de entrega, Níveis de Confiança, Ecopontos e resgate de cupons.',
      icon: User,
      cor: 'bg-circula-lime text-circula-dark',
    },
    {
      to: '/catador',
      titulo: 'Sou Catador / Operador',
      subtitulo: 'Validação presencial limpa, pesagem de cobre/metais e renda direta.',
      icon: Scale,
      cor: 'bg-slate-900 text-white',
    },
    {
      to: '/gestao',
      titulo: 'Gestão Pública (AMMA / CONSERCE)',
      subtitulo: 'Cadastro de Ecopontos, IPTU Verde, indicadores PPP e ranking.',
      icon: Landmark,
      cor: 'bg-teal-700 text-white',
    },
  ] as const;

  return (
    <div className="space-y-6 pb-24">
      {/* Banner Principal */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-6 text-white shadow-lg"
      >
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
          <Recycle className="h-3.5 w-3.5" />
          Hackathon Estação Tecnológica 2026
        </div>
        <h1 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
          O que circula transforma.
        </h1>
        <p className="mt-2 text-sm text-emerald-50/90 leading-relaxed">
          Separe recicláveis limpos, gere renda digna para os catadores de Quixadá e
          troque seus pontos por descontos em mercados, cinema, IPTU Verde, Uber e
          vouchers de alto valor.
        </p>
      </motion.section>

      {/* PAINEL COM 3 LINHAS DE CARROSSEL DE CUPONS */}
      <section className="rounded-3xl border border-slate-200/90 dark:border-slate-700/90 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              Vitrine de Recompensas • 5 Níveis
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
              Cupons, IPTU Verde & Benefícios Parceiros
            </h2>
          </div>
          <Link
            to="/cidadao"
            className="rounded-xl bg-circula-lime px-3.5 py-2 text-xs font-extrabold text-circula-dark shadow-xs hover:bg-[#7da01f] transition"
          >
            Minha Carteira
          </Link>
        </div>

        {/* LINHA 1 */}
        <LinhaCarrossel
          tituloLinha="1. Papelarias, Mercados, Cafeterias & Comércio"
          subtituloLinha="Benefícios imediatos"
          cupons={linha1}
          direcaoInicial="direita"
          intervaloMs={3400}
          onSelectCupom={setCupomSelecionado}
        />

        {/* LINHA 2 */}
        <LinhaCarrossel
          tituloLinha="2. Cultura, Educação, Academias & Lazer"
          subtituloLinha="Meia-entrada no cinema, teatro, cursos e mensalidades promocionais"
          cupons={linha2}
          direcaoInicial="direita"
          intervaloMs={4100}
          onSelectCupom={setCupomSelecionado}
        />

        {/* LINHA 3 */}
        <LinhaCarrossel
          tituloLinha="3. IPTU Verde, Mobilidade Uber & Super Vouchers VIP"
          subtituloLinha="Incentivo fiscal municipal, corrida grátis no Uber e vales de alto valor"
          cupons={linha3}
          direcaoInicial="direita"
          intervaloMs={4800}
          onSelectCupom={setCupomSelecionado}
        />

        {/* Rodapé Informativo */}
        <div className="flex items-center justify-between rounded-2xl bg-emerald-50/80 px-3.5 py-2.5 border border-emerald-200/70 dark:bg-circula-lime/10 dark:border-circula-lime/30">
          <div className="flex items-center gap-2 text-xs text-emerald-900 dark:text-circula-sage">
            <Gift className="h-4 w-4 text-emerald-600 dark:text-circula-lime shrink-0" />
            <span>
              Toque em qualquer bloquinho para conferir as regras e o nível necessário.
            </span>
          </div>
        </div>
      </section>

      {/* Modal de Detalhes do Cupom */}
      <AnimatePresence>
        {cupomSelecionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCupomSelecionado(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl"
            >
              <div
                className={`bg-gradient-to-r ${cupomSelecionado.gradiente} p-5 text-white relative`}
              >
                <button
                  type="button"
                  onClick={() => setCupomSelecionado(null)}
                  className="absolute right-4 top-4 rounded-full bg-black/20 p-1.5 text-white hover:bg-black/30"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold">
                  {cupomSelecionado.categoria}
                </span>
                <h3 className="mt-3 text-2xl font-black">{cupomSelecionado.destaque}</h3>
                <p className="text-sm font-bold text-white/95">
                  {cupomSelecionado.titulo}
                </p>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Parceiro / Órgão Responsável
                  </span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {cupomSelecionado.parceiro}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cupomSelecionado.descricao}
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-slate-800 p-3 border border-slate-200/80 dark:border-slate-700/80">
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      Requisito da Jornada
                    </span>
                    <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                      {NIVEIS_INFO[cupomSelecionado.nivel].nome}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold uppercase text-slate-400">
                      Troca
                    </span>
                    <span className="text-sm font-black text-emerald-700">
                      {cupomSelecionado.pontos} pts
                    </span>
                  </div>
                </div>

                <Link
                  to="/cidadao"
                  onClick={() => setCupomSelecionado(null)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-circula-lime py-3 text-sm font-extrabold text-circula-dark hover:bg-[#7da01f] transition"
                >
                  <Ticket className="h-4 w-4" />
                  Ir para Carteira e Resgatar
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seleção de Módulos do Sistema */}
      <section className="space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Selecione o módulo de acesso
        </h2>

        <div className="space-y-3">
          {perfis.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.to}
                to={p.to}
                className="group flex items-center justify-between gap-4 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-xs transition hover:border-emerald-400 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-2xl p-3.5 ${p.cor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700">
                      {p.titulo}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {p.subtitulo}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Rodapé LGPD */}
      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-xs text-slate-600 dark:text-slate-300">
        <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
        <p>
          <strong>Conformidade LGPD (Lei nº 13.709/2018):</strong> Este protótipo utiliza
          exclusivamente dados sintéticos de demonstração (
          <code className="font-mono">QXD-2026</code> e{' '}
          <code className="font-mono">QXD-8841</code>), sem coleta de dados pessoais reais.
        </p>
      </div>
    </div>
  );
}