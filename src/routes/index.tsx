import React, { useEffect, useRef, useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Bike,
  Building,
  Bus,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Cpu,
  Dumbbell,
  Film,
  Flame,
  Gift,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Leaf,
  MapPin,
  Scale,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Sprout,
  Store,
  Sun,
  Ticket,
  Timer,
  TreePine,
  User,
  Utensils,
  X,
  Zap,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomeLanding,
});

type NivelJornada = 1 | 2 | 3 | 4 | 5;

interface DesafioRelampago {
  id: string;
  titulo: string;
  dificuldade: 'Difícil' | 'Extremo' | 'Desafio Relâmpago';
  duracaoSegundos: number;
  pontosImediatos: number;
  recompensaExtra: string;
  descricao: string;
  meta: string;
  gradiente: string;
  icon: React.ElementType;
}

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

const DESAFIOS_RELAMPAGO: DesafioRelampago[] = [
  {
    id: 'des-cobre-24h',
    titulo: 'Mutirão Cobre & Fios 24h',
    dificuldade: 'Extremo',
    duracaoSegundos: 24 * 3600 - 1420,
    pontosImediatos: 650,
    recompensaExtra: 'Sobe para Nível 3 na hora',
    descricao:
      'Entregue 1,0 kg de fios desencapados, cabos antigos ou cobre limpo (sem queima) em qualquer Ecoponto de Quixadá.',
    meta: 'Meta: 1,0 kg de Cobre/Fios',
    gradiente: 'from-[#123F1B] via-[#1b5426] to-[#8D9864]',
    icon: Flame,
  },
  {
    id: 'des-eletronicos-12h',
    titulo: 'Resgate Tech 12h',
    dificuldade: 'Difícil',
    duracaoSegundos: 12 * 3600 - 630,
    pontosImediatos: 500,
    recompensaExtra: '+ Meia-Entrada Cine Pinheiro na hora',
    descricao:
      'Descarte corretamente 2,0 kg de eletrônicos parados em casa (carregadores, celulares antigos, fontes ou placas).',
    meta: 'Meta: 2,0 kg de Eletrônicos',
    gradiente: 'from-[#123F1B] via-[#4c6b24] to-[#90AD2E]',
    icon: Cpu,
  },
  {
    id: 'des-combo-24h',
    titulo: 'Combo 3 Materiais em 24h',
    dificuldade: 'Difícil',
    duracaoSegundos: 24 * 3600 - 310,
    pontosImediatos: 450,
    recompensaExtra: '+ R$ 25 OFF Supermercado Pinheiro',
    descricao:
      'Faça uma entrega única com 3 categorias separadas e 100% limpas (Alumínio/Metal + Plástico + Papelão).',
    meta: 'Meta: 3,5 kg combinados',
    gradiente: 'from-[#123F1B] to-[#8D9864]',
    icon: Zap,
  },
  {
    id: 'des-relampago-6h',
    titulo: 'Sprint Garrafa PET 6h',
    dificuldade: 'Desafio Relâmpago',
    duracaoSegundos: 6 * 3600 - 480,
    pontosImediatos: 350,
    recompensaExtra: '+ Voucher Cacau Show / Café na hora',
    descricao:
      'Entregue 2,5 kg de plástico PET limpo e amassado (cerca de 50 garrafas) no Ecoponto Praça José de Barros.',
    meta: 'Meta: 2,5 kg Plástico Limpo',
    gradiente: 'from-[#8D9864] via-[#4f6d27] to-[#123F1B]',
    icon: Timer,
  },
  {
    id: 'des-embaixador-48h',
    titulo: 'Mutirão Vizinhança 48h',
    dificuldade: 'Extremo',
    duracaoSegundos: 48 * 3600 - 2100,
    pontosImediatos: 1100,
    recompensaExtra: 'Viagem Grátis 99 + Selo VIP',
    descricao:
      'Junte os recicláveis limpos da sua casa e da vizinhança somando 6,0 kg (latinhas, papelão e eletrônicos) em 48h.',
    meta: 'Meta: 6,0 kg auditados',
    gradiente: 'from-[#123F1B] via-[#365a22] to-[#90AD2E]',
    icon: Award,
  },
];

const NIVEIS_INFO: Record<
  NivelJornada,
  { nome: string; cor: string; icon: React.ElementType }
> = {
  1: { nome: 'Nível 1 • Semente', cor: 'bg-[#BDD3A7]/60 text-[#123F1B]', icon: Sprout },
  2: { nome: 'Nível 2 • Broto', cor: 'bg-[#BDD3A7] text-[#123F1B]', icon: Leaf },
  3: { nome: 'Nível 3 • Árvore', cor: 'bg-[#90AD2E]/35 text-[#123F1B]', icon: TreePine },
  4: { nome: 'Nível 4 • Guardião', cor: 'bg-[#8D9864]/35 text-[#123F1B]', icon: ShieldCheck },
  5: { nome: 'Nível 5 • Embaixador', cor: 'bg-[#123F1B] text-[#BDD3A7]', icon: Award },
};

const CUPONS_CARROSSEL: CupomCarrossel[] = [
  // LINHA 1: DIA A DIA — SUPERMERCADOS, FARMÁCIAS, VAREJO E GASTRONOMIA DE QUIXADÁ
  {
    id: 'l1-pinheiro-super',
    linha: 1,
    categoria: 'Supermercado',
    titulo: 'Compras do Mês',
    destaque: 'R$ 25,00 OFF',
    parceiro: 'Supermercado Pinheiro',
    descricao:
      'Desconto direto no caixa do Supermercado Pinheiro (Quixadá) em compras a partir de R$ 120,00. Parceiro oficial na destinação de papelão e plástico filme.',
    nivel: 1,
    pontos: 150,
    gradiente: 'from-[#123F1B] to-[#90AD2E]',
    icon: ShoppingCart,
  },
  {
    id: 'l1-pague-menos',
    linha: 1,
    categoria: 'Farmácia & Saúde',
    titulo: 'Higiene & Bem-Estar',
    destaque: '20% OFF',
    parceiro: 'Farmácias Pague Menos',
    descricao:
      '20% de desconto em dermocosméticos, itens de higiene e perfumaria nas unidades Pague Menos do Centro de Quixadá.',
    nivel: 1,
    pontos: 120,
    gradiente: 'from-[#123F1B] to-[#8D9864]',
    icon: HeartPulse,
  },
  {
    id: 'l1-americanas',
    linha: 1,
    categoria: 'Varejo & Papelaria',
    titulo: 'Utilidades & Escolar',
    destaque: '15% OFF',
    parceiro: 'Lojas Americanas',
    descricao:
      'Cupom de 15% OFF em papelaria, utilidades domésticas e bomboniere na loja da Rua Rui Barbosa (Centro).',
    nivel: 2,
    pontos: 180,
    gradiente: 'from-[#8D9864] to-[#123F1B]',
    icon: Store,
  },
  {
    id: 'l1-santa-brasa',
    linha: 1,
    categoria: 'Restaurante',
    titulo: 'Almoço & Jantar',
    destaque: '20% OFF',
    parceiro: 'Restaurante Santa Brasa',
    descricao:
      'Desconto de 20% no consumo presencial no Restaurante Santa Brasa (Quixadá). Parceiro na logística reversa de garrafas de vidro e latinhas.',
    nivel: 2,
    pontos: 220,
    gradiente: 'from-[#123F1B] via-[#3b6123] to-[#90AD2E]',
    icon: Utensils,
  },
  {
    id: 'l1-sao-geraldo',
    linha: 1,
    categoria: 'Supermercado & Atacado',
    titulo: 'Feira Econômica',
    destaque: 'R$ 20,00 OFF',
    parceiro: 'Mercadinhos São Geraldo',
    descricao:
      'Abatimento de R$ 20,00 em compras acima de R$ 90,00, incentivando a devolução de caixas de papelão e embalagens limpas.',
    nivel: 2,
    pontos: 190,
    gradiente: 'from-[#90AD2E] to-[#123F1B]',
    icon: ShoppingBag,
  },
  {
    id: 'l1-cacau-show',
    linha: 1,
    categoria: 'Cafeteria & Chocolates',
    titulo: 'Pausa Doce & Café',
    destaque: 'CAFÉ + TRUFAS',
    parceiro: 'Cacau Show Quixadá',
    descricao:
      'Na compra de itens acima de R$ 35,00 na Cacau Show do Centro, ganhe um café expresso + 2 trufas artesanais.',
    nivel: 2,
    pontos: 160,
    gradiente: 'from-[#8D9864] to-[#90AD2E]',
    icon: Coffee,
  },
  {
    id: 'l1-boticario',
    linha: 1,
    categoria: 'Perfumaria & Logística Reversa',
    titulo: 'Boti Recicla Quixadá',
    destaque: '25% OFF',
    parceiro: 'O Boticário',
    descricao:
      '25% de desconto em linhas selecionadas ao combinar pontos CIRCULA com a entrega de frascos vazios limpos na loja.',
    nivel: 2,
    pontos: 210,
    gradiente: 'from-[#123F1B] to-[#8D9864]',
    icon: Sparkles,
  },

  // LINHA 2: CINEMA, ELETRO/TECH, ESPORTE E EDUCAÇÃO EM QUIXADÁ
  {
    id: 'l2-cine-pinheiro',
    linha: 2,
    categoria: 'Cinema • Pinheiro',
    titulo: 'Sessão Cine Pinheiro',
    destaque: 'MEIA-ENTRADA',
    parceiro: 'Cine Pinheiro (Supermercado Pinheiro)',
    descricao:
      'Ingresso com valor de meia-entrada garantido em qualquer sessão 2D ou 3D nas salas do Cine Pinheiro em Quixadá.',
    nivel: 3,
    pontos: 300,
    gradiente: 'from-[#123F1B] to-[#90AD2E]',
    icon: Film,
  },
  {
    id: 'l2-macavi',
    linha: 2,
    categoria: 'Eletro & Celulares',
    titulo: 'Bônus Troca Tech',
    destaque: 'R$ 50,00 OFF',
    parceiro: 'Lojas Macavi',
    descricao:
      'Voucher de R$ 50,00 de desconto em acessórios, eletroportáteis ou smartphones na Macavi Quixadá ao descartar lixo eletrônico.',
    nivel: 3,
    pontos: 380,
    gradiente: 'from-[#8D9864] to-[#123F1B]',
    icon: Cpu,
  },
  {
    id: 'l2-zenir',
    linha: 2,
    categoria: 'Móveis & Eletro',
    titulo: 'Casa Sustentável',
    destaque: '15% OFF',
    parceiro: 'Zenir Móveis e Eletros',
    descricao:
      'Desconto especial em eletrodomésticos com selo Procel A de economia de energia na loja Zenir de Quixadá.',
    nivel: 3,
    pontos: 350,
    gradiente: 'from-[#123F1B] via-[#4f6d27] to-[#8D9864]',
    icon: Store,
  },
  {
    id: 'l2-academia',
    linha: 2,
    categoria: 'Saúde & Esporte',
    titulo: 'Plano Fitness Mensal',
    destaque: '35% OFF MÊS',
    parceiro: 'Academias Parceiras Quixadá',
    descricao:
      'Desconto na mensalidade + isenção de taxa de matrícula para cidadãos ativos no programa CIRCULA.',
    nivel: 4,
    pontos: 450,
    gradiente: 'from-[#90AD2E] to-[#123F1B]',
    icon: Dumbbell,
  },
  {
    id: 'l2-educacao',
    linha: 2,
    categoria: 'Capacitação & Idiomas',
    titulo: 'Bolsa Cursos Técnicos',
    destaque: 'BOLSA 30%',
    parceiro: 'Polos EAD & Escolas Técnicas Quixadá',
    descricao:
      'Bolsa parcial em cursos de informática, gestão comercial e idiomas para jovens e adultos.',
    nivel: 3,
    pontos: 340,
    gradiente: 'from-[#123F1B] to-[#8D9864]',
    icon: GraduationCap,
  },
  {
    id: 'l2-esporte-lazer',
    linha: 2,
    categoria: 'Esporte & Trilhas',
    titulo: 'Ecoturismo Monólitos',
    destaque: 'DAY USE VIP',
    parceiro: 'Roteiro Pedra da Galinha Choca / Cedro',
    descricao:
      'Desconto exclusivo em passeios guiados, trilhas ecológicas e aluguel de bikes em Quixadá.',
    nivel: 3,
    pontos: 320,
    gradiente: 'from-[#8D9864] to-[#90AD2E]',
    icon: Bike,
  },
  {
    id: 'l2-otica',
    linha: 2,
    categoria: 'Óticas Locais',
    titulo: 'Óculos & Lentes',
    destaque: '30% OFF',
    parceiro: 'Óticas Diniz / Comércio Centro',
    descricao:
      '30% de desconto na armação na compra de óculos completos nas óticas parceiras do Centro.',
    nivel: 2,
    pontos: 240,
    gradiente: 'from-[#123F1B] to-[#90AD2E]',
    icon: Sun,
  },

  
  {
    id: 'l3-iptu-verde-1',
    linha: 3,
    categoria: 'Incentivo Fiscal • Prefeitura',
    titulo: 'IPTU Verde Residencial',
    destaque: 'ATÉ 10% OFF IPTU',
    parceiro: 'Prefeitura de Quixadá • AMMA',
    descricao:
      'Abatimento anual direto no IPTU para residências com histórico regular de entregas limpas nos Ecopontos.',
    nivel: 4,
    pontos: 750,
    gradiente: 'from-[#123F1B] via-[#2c5722] to-[#90AD2E]',
    icon: Home,
  },
  {
    id: 'l3-99-gratis',
    linha: 3,
    categoria: 'Mobilidade 99',
    titulo: 'Viagem Grátis no 99',
    destaque: '1 CORRIDA GRÁTIS',
    parceiro: '99 Quixadá',
    descricao:
      'Voucher de até R$ 25,00 para corrida grátis pelo aplicativo 99 dentro do perímetro urbano de Quixadá.',
    nivel: 5,
    pontos: 850,
    gradiente: 'from-[#123F1B] to-[#8D9864]',
    icon: Car,
  },
  {
    id: 'l3-voucher-pinheiro-100',
    linha: 3,
    categoria: 'Super Voucher VIP',
    titulo: 'Vale-Compras Pinheiro',
    destaque: 'R$ 100,00',
    parceiro: 'Supermercado Pinheiro',
    descricao:
      'Vale-compras integral de R$ 100,00 patrocinado pelo fundo de logística reversa para usar no Supermercado Pinheiro.',
    nivel: 5,
    pontos: 1000,
    gradiente: 'from-[#90AD2E] via-[#5e7c24] to-[#123F1B]',
    icon: ShoppingBag,
  },
  {
    id: 'l3-iptu-verde-2',
    linha: 3,
    categoria: 'Selo Empresa Sustentável',
    titulo: 'IPTU Verde Comércio',
    destaque: '15% OFF IPTU',
    parceiro: 'Secretaria de Finanças & AMMA Quixadá',
    descricao:
      'Incentivo fiscal para comércios locais que destinam 100% do papelão e plástico aos catadores credenciados.',
    nivel: 5,
    pontos: 1200,
    gradiente: 'from-[#123F1B] to-[#8D9864]',
    icon: Building,
  },
  {
    id: 'l3-99-desconto',
    linha: 3,
    categoria: 'Mobilidade Urbana',
    titulo: 'Pacote Desconto 99',
    destaque: '50% OFF (3X)',
    parceiro: '99 Quixadá',
    descricao:
      'Três corridas com 50% de desconto (limite de R$ 12 por viagem) para deslocamentos na cidade.',
    nivel: 4,
    pontos: 620,
    gradiente: 'from-[#8D9864] to-[#123F1B]',
    icon: Bus,
  },
  {
    id: 'l3-voucher-macavi-200',
    linha: 3,
    categoria: 'Prêmio Embaixador',
    titulo: 'Vale-Eletro Macavi',
    destaque: 'R$ 200,00',
    parceiro: 'Lojas Macavi • Patrocinador Oficial',
    descricao:
      'Crédito de R$ 200,00 na Macavi Quixadá para cidadãos Embaixadores que atingirem a meta trimestral.',
    nivel: 5,
    pontos: 1600,
    gradiente: 'from-[#123F1B] via-[#4c6b24] to-[#90AD2E]',
    icon: Award,
  },
];

function formatarCronometro(segundosRestantes: number) {
  const s = Math.max(0, segundosRestantes);
  const horas = Math.floor(s / 3600);
  const minutos = Math.floor((s % 3600) / 60);
  const segundos = s % 60;
  return `${String(horas).padStart(2, '0')}h ${String(minutos).padStart(2, '0')}m ${String(segundos).padStart(2, '0')}s`;
}

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
          <h3 className="text-xs sm:text-sm font-extrabold text-[#123F1B]">
            {tituloLinha}
          </h3>
          <p className="text-[11px] text-[#8D9864] font-medium">{subtituloLinha}</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => rolar('esquerda')}
            aria-label="Anterior"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#BDD3A7] bg-[#BDD3A7]/25 text-[#123F1B] hover:bg-[#90AD2E] hover:text-white transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => rolar('direita')}
            aria-label="Próximo"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#BDD3A7] bg-[#BDD3A7]/25 text-[#123F1B] hover:bg-[#90AD2E] hover:text-white transition"
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
              className="group relative w-[205px] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-[#BDD3A7] bg-white shadow-xs transition hover:border-[#123F1B] hover:shadow-md flex flex-col justify-between"
            >
              {/* Topo Colorido */}
              <div className={`bg-gradient-to-r ${cupom.gradiente} p-3 text-white`}>
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold backdrop-blur-xs">
                    {cupom.categoria}
                  </span>
                  <div className="shrink-0 rounded-lg bg-white/20 p-1 backdrop-blur-xs">
                    <Icon className="h-3.5 w-3.5 text-[#BDD3A7]" />
                  </div>
                </div>
                <div className="mt-2 text-lg font-black tracking-tight leading-none text-white">
                  {cupom.destaque}
                </div>
                <div className="mt-1 text-[11px] font-bold text-[#BDD3A7] truncate">
                  {cupom.titulo}
                </div>
              </div>

              {/* Picote de Ticket */}
              <div className="relative flex items-center justify-between bg-white">
                <span className="-ml-1.5 h-3 w-3 rounded-full border border-[#BDD3A7] bg-[#f6f9f3]" />
                <div className="w-full border-t border-dashed border-[#8D9864]/50" />
                <span className="-mr-1.5 h-3 w-3 rounded-full border border-[#BDD3A7] bg-[#f6f9f3]" />
              </div>

              {/* Base do Bloquinho */}
              <div className="flex flex-1 flex-col justify-between p-3 pt-1.5">
                <p className="text-[11px] font-bold text-[#123F1B] truncate">
                  {cupom.parceiro}
                </p>

                <div className="mt-2.5 pt-2 border-t border-[#BDD3A7]/50 flex items-center justify-between gap-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${nivelData.cor}`}
                  >
                    <NivelIcon className="h-2.5 w-2.5" />
                    Nível {cupom.nivel}
                  </span>
                  <span className="text-[11px] font-black text-[#123F1B]">
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
  const [indiceDesafio, setIndiceDesafio] = useState(0);
  const [segundosDecorridos, setSegundosDecorridos] = useState(0);
  const [desafiosAceitos, setDesafiosAceitos] = useState<string[]>([]);
  const [pausarDesafio, setPausarDesafio] = useState(false);
  const [cupomSelecionado, setCupomSelecionado] = useState<CupomCarrossel | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSegundosDecorridos((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (pausarDesafio) return;
    const auto = setInterval(() => {
      setIndiceDesafio((prev) => (prev + 1) % DESAFIOS_RELAMPAGO.length);
    }, 5500);
    return () => clearInterval(auto);
  }, [pausarDesafio]);

  const desafioAtual = DESAFIOS_RELAMPAGO[indiceDesafio];
  const IconeDesafio = desafioAtual.icon;
  const tempoRestante = Math.max(0, desafioAtual.duracaoSegundos - segundosDecorridos);
  const desafioJaAceito = desafiosAceitos.includes(desafioAtual.id);

  const toggleAceitarDesafio = (id: string) => {
    setDesafiosAceitos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const linha1 = CUPONS_CARROSSEL.filter((c) => c.linha === 1);
  const linha2 = CUPONS_CARROSSEL.filter((c) => c.linha === 2);
  const linha3 = CUPONS_CARROSSEL.filter((c) => c.linha === 3);

  const perfis = [
    {
      to: '/ecopontos',
      titulo: 'Locais de Ponto de Coleta (Ecopontos)',
      subtitulo: 'Endereços, horários, capacidade livre e materiais aceitos em Quixadá.',
      icon: MapPin,
      cor: 'bg-[#90AD2E] text-[#123F1B]',
    },
    {
      to: '/cidadao',
      titulo: 'Sou Cidadão',
      subtitulo: 'Foto do material, Níveis de Confiança, Ecopontos e resgate de cupons.',
      icon: User,
      cor: 'bg-[#123F1B] text-[#BDD3A7]',
    },
    {
      to: '/catador',
      titulo: 'Sou Catador / Operador',
      subtitulo: 'Validação presencial limpa, pesagem de cobre/metais e renda direta.',
      icon: Scale,
      cor: 'bg-[#8D9864] text-white',
    },
    {
      to: '/gestao',
      titulo: 'Gestão Pública (AMMA / CONSERCE)',
      subtitulo: 'Cadastro de Ecopontos, IPTU Verde, indicadores PPP e ranking.',
      icon: Landmark,
      cor: 'bg-[#123F1B] text-[#90AD2E]',
    },
  ] as const;

  return (
    <div className="space-y-6 pb-24">
      {/* CARROSSEL DE DESAFIOS RELÂMPAGO (24H / GANHO IMEDIATO) */}
      <section
        onMouseEnter={() => setPausarDesafio(true)}
        onMouseLeave={() => setPausarDesafio(false)}
        className="relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={desafioAtual.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${desafioAtual.gradiente} p-5 sm:p-6 text-white shadow-lg border border-[#8D9864]/40`}
          >
            {/* Selos de Dificuldade e Cronômetro Regressivo */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#BDD3A7] backdrop-blur-xs">
                <Zap className="h-3.5 w-3.5 text-[#90AD2E]" />
                Ganho Imediato • {desafioAtual.dificuldade}
              </span>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 font-mono text-xs font-black text-[#BDD3A7] border border-[#BDD3A7]/25">
                <Clock className="h-3.5 w-3.5 text-[#90AD2E] animate-pulse" />
                {formatarCronometro(tempoRestante)}
              </div>
            </div>

            {/* Título e Descrição do Desafio */}
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <h1 className="text-xl sm:text-2xl font-black leading-tight text-white">
                  {desafioAtual.titulo}
                </h1>
                <p className="text-xs sm:text-sm text-[#BDD3A7] leading-relaxed max-w-xl">
                  {desafioAtual.descricao}
                </p>
              </div>
              <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xs border border-white/15">
                <IconeDesafio className="h-7 w-7 text-[#BDD3A7]" />
              </div>
            </div>

            {/* Recompensa Imediata e Meta */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 rounded-2xl bg-black/25 p-3.5 backdrop-blur-xs border border-[#BDD3A7]/20">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#BDD3A7]/80">
                  Recompensa na Hora
                </span>
                <span className="text-lg font-black text-[#90AD2E]">
                  +{desafioAtual.pontosImediatos} pts{' '}
                  <span className="text-xs font-bold text-white">
                    ({desafioAtual.recompensaExtra})
                  </span>
                </span>
              </div>
              <div className="sm:text-right flex flex-col justify-center">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#BDD3A7]/80">
                  Objetivo para Validar
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  {desafioAtual.meta}
                </span>
              </div>
            </div>

            {/* Botões e Controles do Carrossel */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleAceitarDesafio(desafioAtual.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-extrabold transition shadow-xs ${
                    desafioJaAceito
                      ? 'bg-[#90AD2E] text-[#123F1B]'
                      : 'bg-[#BDD3A7] text-[#123F1B] hover:bg-white'
                  }`}
                >
                  {desafioJaAceito ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Desafio Ativo!
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Aceitar Desafio Agora
                    </>
                  )}
                </button>

                <Link
                  to="/cidadao"
                  className="rounded-xl bg-white/15 px-3 py-2 text-xs font-bold text-white hover:bg-white/25 transition"
                >
                  Ver Meu Código
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {DESAFIOS_RELAMPAGO.map((d, idx) => (
                    <button
                      key={d.id}
                      type="button"
                      aria-label={`Desafio ${idx + 1}`}
                      onClick={() => setIndiceDesafio(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === indiceDesafio ? 'w-6 bg-[#BDD3A7]' : 'w-2 bg-white/35'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1 ml-1">
                  <button
                    type="button"
                    aria-label="Desafio anterior"
                    onClick={() =>
                      setIndiceDesafio(
                        (prev) =>
                          (prev - 1 + DESAFIOS_RELAMPAGO.length) %
                          DESAFIOS_RELAMPAGO.length
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/25 text-white hover:bg-black/40 transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Próximo desafio"
                    onClick={() =>
                      setIndiceDesafio((prev) => (prev + 1) % DESAFIOS_RELAMPAGO.length)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/25 text-white hover:bg-black/40 transition"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* PAINEL COM 3 LINHAS DE CARROSSEL DE CUPONS (EMPRESAS REAIS DE QUIXADÁ) */}
      <section className="rounded-3xl border border-[#BDD3A7] bg-white p-4 sm:p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#BDD3A7]/60 pb-3">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-[#8D9864]">
              <Sparkles className="h-3.5 w-3.5 text-[#90AD2E]" />
              <h2 className="text-base sm:text-lg font-black text-[#123F1B]">
              Cupons, vouchers & Benefícios de Parceiros
              </h2>
            </span>
          </div>
          <Link
            to="/cidadao"
            className="rounded-xl bg-[#123F1B] px-3.5 py-2 text-xs font-extrabold text-white shadow-xs hover:bg-[#8D9864] transition"
          >
            Minha Carteira
          </Link>
        </div>

        {/* LINHA 1 */}
        <LinhaCarrossel
          tituloLinha="1. Supermercados, Farmácias, Varejo & Restaurantes"
          subtituloLinha="Dia a Dia"
          cupons={linha1}
          direcaoInicial="direita"
          intervaloMs={3400}
          onSelectCupom={setCupomSelecionado}
        />

        {/* LINHA 2 */}
        <LinhaCarrossel
          tituloLinha="2. Cinema, Eletro & Tech, Academias e Lazer"
          subtituloLinha="Entretenimento"
          cupons={linha2}
          direcaoInicial="direita"
          intervaloMs={4100}
          onSelectCupom={setCupomSelecionado}
        />

        {/* LINHA 3 */}
        <LinhaCarrossel
          tituloLinha="3. IPTU Verde, Mobilidade & Super Vouchers VIP"
          subtituloLinha="Para vips"
          cupons={linha3}
          direcaoInicial="direita"
          intervaloMs={4800}
          onSelectCupom={setCupomSelecionado}
        />

        {/* Rodapé Informativo */}
        <div className="flex items-center justify-between rounded-2xl bg-[#BDD3A7]/35 px-3.5 py-2.5 border border-[#BDD3A7]">
          <div className="flex items-center gap-2 text-xs text-[#123F1B] font-medium">
            <Gift className="h-4 w-4 text-[#123F1B] shrink-0" />
            <span>
              Toque em qualquer bloquinho para ver como a empresa parceira participa da logística reversa.
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#123F1B]/70 p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#BDD3A7]"
            >
              <div
                className={`bg-gradient-to-r ${cupomSelecionado.gradiente} p-5 text-white relative`}
              >
                <button
                  type="button"
                  onClick={() => setCupomSelecionado(null)}
                  className="absolute right-4 top-4 rounded-full bg-black/25 p-1.5 text-white hover:bg-black/40"
                >
                  <X className="h-4 w-4" />
                </button>
                <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold">
                  {cupomSelecionado.categoria}
                </span>
                <h3 className="mt-3 text-2xl font-black">{cupomSelecionado.destaque}</h3>
                <p className="text-sm font-bold text-[#BDD3A7]">
                  {cupomSelecionado.titulo}
                </p>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8D9864]">
                    Empresa Parceira / Órgão Responsável
                  </span>
                  <p className="text-sm font-extrabold text-[#123F1B]">
                    {cupomSelecionado.parceiro}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {cupomSelecionado.descricao}
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#BDD3A7]/30 p-3 border border-[#BDD3A7]">
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-[#8D9864]">
                      Requisito da Jornada
                    </span>
                    <span className="text-xs font-extrabold text-[#123F1B]">
                      {NIVEIS_INFO[cupomSelecionado.nivel].nome}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold uppercase text-[#8D9864]">
                      Troca
                    </span>
                    <span className="text-sm font-black text-[#123F1B]">
                      {cupomSelecionado.pontos} pts
                    </span>
                  </div>
                </div>

                <Link
                  to="/cidadao"
                  onClick={() => setCupomSelecionado(null)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123F1B] py-3 text-sm font-extrabold text-white hover:bg-[#8D9864] transition"
                >
                  <Ticket className="h-4 w-4 text-[#90AD2E]" />
                  Ir para Carteira e Resgatar
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seleção de Módulos do Sistema */}
      <section className="space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#8D9864]">
          Selecione o módulo de acesso
        </h2>

        <div className="space-y-3">
          {perfis.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.to}
                to={p.to}
                className="group flex items-center justify-between gap-4 rounded-3xl border border-[#BDD3A7] bg-white p-5 shadow-xs transition hover:border-[#123F1B] hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-2xl p-3.5 ${p.cor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#123F1B] group-hover:text-[#8D9864]">
                      {p.titulo}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {p.subtitulo}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-[#8D9864] transition group-hover:translate-x-1 group-hover:text-[#123F1B]" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Rodapé LGPD */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#BDD3A7] bg-white p-4 text-xs text-[#123F1B]">
        <ShieldCheck className="h-5 w-5 shrink-0 text-[#90AD2E]" />
        <p>
          <strong>Conformidade LGPD (Lei nº 13.709/2018):</strong> Este protótipo utiliza
          exclusivamente dados sintéticos de demonstração (
          <code className="font-mono font-bold">QXD-2026</code> e{' '}
          <code className="font-mono font-bold">QXD-8841</code>), sem coleta de dados pessoais reais.
        </p>
      </div>
    </div>
  );
}