import React, { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  QrCode,
  Recycle,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';

export const Route = createFileRoute('/ecopontos')({
  component: EcopontosPage,
});

interface PontoColeta {
  id: string;
  codigo: string;
  nome: string;
  bairro: string;
  endereco: string;
  referencia: string;
  horario: string;
  status: 'Aberto agora' | 'Lotação moderada' | 'Abre amanhã';
  ocupacaoPercent: number;
  operador: string;
  materiais: string[];
  destaque?: string;
}

const ECOPONTOS_QUIXADA: PontoColeta[] = [
  {
    id: 'eco-01',
    codigo: 'QXD-01',
    nome: 'Ecoponto Central — Praça José de Barros',
    bairro: 'Centro',
    endereco: 'Av. Plácido Castelo, s/n — Centro, Quixadá/CE',
    referencia: 'Ao lado do Coreto / Estação Tecnológica',
    horario: 'Seg a Sáb • 07h00 às 18h00',
    status: 'Aberto agora',
    ocupacaoPercent: 38,
    operador: 'Associação Catadores do Sertão (Turno Manhã/Tarde)',
    materiais: ['Plástico PET', 'Papelão', 'Alumínio', 'Cobre/Fios', 'Eletrônicos'],
    destaque: 'Ponto Principal • Aceita Eletrônicos e Cobre',
  },
  {
    id: 'eco-02',
    codigo: 'QXD-02',
    nome: 'Ecoponto Cedro — Campus Universitário',
    bairro: 'Cedro',
    endereco: 'Estrada do Açude Cedro, km 05 — Cedro, Quixadá/CE',
    referencia: 'Próximo ao IFCE / UFC Quixadá',
    horario: 'Seg a Sex • 07h30 às 17h30',
    status: 'Aberto agora',
    ocupacaoPercent: 25,
    operador: 'Cooperativa Verde Monólitos',
    materiais: ['Papel/Livros', 'Plástico Limpo', 'Eletrônicos', 'Latinhas'],
    destaque: 'Ideal para papelaria, apostilas e eletrônicos',
  },
  {
    id: 'eco-03',
    codigo: 'QXD-03',
    nome: 'Ecoponto Combate — Praça da Matriz',
    bairro: 'Combate',
    endereco: 'Rua José de Queiroz Pessoa, 412 — Combate, Quixadá/CE',
    referencia: 'Em frente à quadra poliesportiva do bairro',
    horario: 'Seg a Sáb • 07h00 às 17h00',
    status: 'Lotação moderada',
    ocupacaoPercent: 68,
    operador: 'Núcleo Comunitário Combate Limpo',
    materiais: ['Plástico', 'Papelão', 'Vidro', 'Metais'],
  },
  {
    id: 'eco-04',
    codigo: 'QXD-04',
    nome: 'Ecoponto Campo Velho — Polo Esportivo',
    bairro: 'Campo Velho',
    endereco: 'Rua Basílio Pinto, 890 — Campo Velho, Quixadá/CE',
    referencia: 'Próximo à Areninha Campo Velho',
    horario: 'Ter a Dom • 08h00 às 17h00',
    status: 'Aberto agora',
    ocupacaoPercent: 30,
    operador: 'Associação Catadores do Sertão',
    materiais: ['Plástico PET', 'Alumínio', 'Papelão', 'Cobre/Fios'],
  },
  {
    id: 'eco-05',
    codigo: 'QXD-05',
    nome: 'Ecoponto São João — Feira Comunitária',
    bairro: 'São João',
    endereco: 'Av. Francisco Pinheiro de Almeida, 1120 — São João, Quixadá/CE',
    referencia: 'Ao lado do Mercado Comunitário',
    horario: 'Seg a Sáb • 06h30 às 16h30',
    status: 'Aberto agora',
    ocupacaoPercent: 42,
    operador: 'Rede Circular São João',
    materiais: ['Papelão', 'Plástico', 'Latinhas', 'Óleo de Cozinha'],
  },
];

const BAIRROS = ['Todos', 'Centro', 'Cedro', 'Combate', 'Campo Velho', 'São João'];

function EcopontosPage() {
  const [busca, setBusca] = useState('');
  const [bairroFiltro, setBairroFiltro] = useState('Todos');
  const [materialFiltro, setMaterialFiltro] = useState('Todos');

  const materiaisOpcoes = [
    'Todos',
    'Plástico',
    'Papelão',
    'Alumínio',
    'Cobre/Fios',
    'Eletrônicos',
  ];

  const pontosFiltrados = ECOPONTOS_QUIXADA.filter((ponto) => {
    const matchBairro = bairroFiltro === 'Todos' || ponto.bairro === bairroFiltro;
    const matchMaterial =
      materialFiltro === 'Todos' ||
      ponto.materiais.some((m) =>
        m.toLowerCase().includes(materialFiltro.toLowerCase())
      );
    const termo = busca.trim().toLowerCase();
    const matchBusca =
      !termo ||
      ponto.nome.toLowerCase().includes(termo) ||
      ponto.bairro.toLowerCase().includes(termo) ||
      ponto.endereco.toLowerCase().includes(termo) ||
      ponto.codigo.toLowerCase().includes(termo);

    return matchBairro && matchMaterial && matchBusca;
  });

  return (
    <div className="space-y-5 pb-24">
      {/* Cabeçalho da Página */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-[#123F1B] via-[#275120] to-[#8D9864] p-5 sm:p-6 text-white shadow-lg"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#BDD3A7] backdrop-blur-xs">
            <MapPin className="h-3.5 w-3.5 text-[#90AD2E]" />
            Rede Oficial AMMA / CONSERCE
          </span>
          <span className="rounded-full bg-[#90AD2E]/25 px-3 py-1 text-xs font-bold text-[#BDD3A7] border border-[#BDD3A7]/30">
            {ECOPONTOS_QUIXADA.length} Ecopontos Ativos
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
          Pontos de Coleta em Quixadá
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-[#BDD3A7] leading-relaxed">
          Encontre o Ecoponto mais próximo, confira os materiais limpos aceitos e
          apresente seu código ao catador operador para pontuar na hora.
        </p>

        {/* Barra de Busca */}
        <div className="mt-4 relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8D9864]" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por bairro, rua ou código (ex: Centro, QXD-01)..."
            className="w-full rounded-2xl bg-white py-3 pl-10 pr-4 text-xs sm:text-sm font-medium text-[#123F1B] placeholder:text-[#8D9864] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#90AD2E]"
          />
        </div>
      </motion.section>

      {/* Filtros */}
      <section className="space-y-2.5 rounded-3xl border border-[#BDD3A7] bg-white p-4 shadow-xs">
        <div>
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#8D9864] mb-1.5">
            Filtrar por Bairro
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {BAIRROS.map((bairro) => (
              <button
                key={bairro}
                type="button"
                onClick={() => setBairroFiltro(bairro)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  bairroFiltro === bairro
                    ? 'bg-[#123F1B] text-white shadow-2xs'
                    : 'bg-[#BDD3A7]/35 text-[#123F1B] hover:bg-[#BDD3A7]/70'
                }`}
              >
                {bairro}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#8D9864] mb-1.5">
            Tipo de Material Limpo
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {materiaisOpcoes.map((mat) => (
              <button
                key={mat}
                type="button"
                onClick={() => setMaterialFiltro(mat)}
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold transition ${
                  materialFiltro === mat
                    ? 'bg-[#90AD2E] text-[#123F1B]'
                    : 'bg-[#BDD3A7]/25 text-[#123F1B] hover:bg-[#BDD3A7]/60'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de Ecopontos */}
      <section className="space-y-3.5">
        {pontosFiltrados.length === 0 ? (
          <div className="rounded-3xl border border-[#BDD3A7] bg-white p-8 text-center space-y-2">
            <Recycle className="mx-auto h-8 w-8 text-[#8D9864]" />
            <p className="text-sm font-extrabold text-[#123F1B]">
              Nenhum Ecoponto encontrado com esse filtro
            </p>
            <button
              type="button"
              onClick={() => {
                setBusca('');
                setBairroFiltro('Todos');
                setMaterialFiltro('Todos');
              }}
              className="rounded-xl bg-[#123F1B] px-4 py-2 text-xs font-bold text-white"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          pontosFiltrados.map((ponto, index) => {
            const isModerada = ponto.status === 'Lotação moderada';
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${ponto.nome} ${ponto.endereco}`
            )}`;

            return (
              <motion.article
                key={ponto.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl border border-[#BDD3A7] bg-white p-5 shadow-xs transition hover:border-[#123F1B] hover:shadow-md space-y-4"
              >
                {/* Topo do Card */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-[#123F1B] px-2 py-0.5 font-mono text-[11px] font-black text-[#BDD3A7]">
                        {ponto.codigo}
                      </span>
                      <span className="rounded-lg bg-[#BDD3A7]/45 px-2.5 py-0.5 text-[11px] font-extrabold text-[#123F1B]">
                        Bairro {ponto.bairro}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-[#123F1B] leading-snug">
                      {ponto.nome}
                    </h2>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold ${
                      isModerada
                        ? 'bg-[#8D9864]/30 text-[#123F1B]'
                        : 'bg-[#90AD2E]/35 text-[#123F1B]'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#123F1B]" />
                    {ponto.status}
                  </span>
                </div>

                {/* Destaque */}
                {ponto.destaque && (
                  <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#BDD3A7]/40 border border-[#90AD2E]/60 px-3 py-1.5 text-[11px] font-extrabold text-[#123F1B]">
                    <Sparkles className="h-3.5 w-3.5 text-[#123F1B] shrink-0" />
                    {ponto.destaque}
                  </div>
                )}

                {/* Endereço, Horário e Operador */}
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-[#123F1B] mt-0.5" />
                    <div>
                      <p className="font-bold text-[#123F1B]">{ponto.endereco}</p>
                      <p className="text-[11px] text-[#8D9864]">
                        Ref.: {ponto.referencia}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-[#123F1B]" />
                    <span className="font-semibold text-[#123F1B]">{ponto.horario}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 shrink-0 text-[#123F1B]" />
                    <span>
                      Triagem: <strong className="text-[#123F1B]">{ponto.operador}</strong>
                    </span>
                  </div>
                </div>

                {/* Barra de Capacidade */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#8D9864]">Capacidade de recebimento</span>
                    <span className="text-[#123F1B]">
                      {100 - ponto.ocupacaoPercent}% livre
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#BDD3A7]/40">
                    <div
                      className={`h-full rounded-full ${
                        isModerada ? 'bg-[#8D9864]' : 'bg-[#90AD2E]'
                      }`}
                      style={{ width: `${ponto.ocupacaoPercent}%` }}
                    />
                  </div>
                </div>

                {/* Tags de Materiais Aceitos */}
                <div>
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#8D9864] mb-1.5">
                    Materiais Limpos Aceitos
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ponto.materiais.map((mat) => (
                      <span
                        key={mat}
                        className="rounded-lg border border-[#BDD3A7] bg-[#BDD3A7]/25 px-2.5 py-1 text-[11px] font-bold text-[#123F1B]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="pt-2 border-t border-[#BDD3A7]/60 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#8D9864] bg-white py-2.5 text-xs font-extrabold text-[#123F1B] transition hover:bg-[#BDD3A7]/30"
                  >
                    <Navigation className="h-4 w-4 text-[#123F1B]" />
                    Traçar Rota no Mapa
                    <ExternalLink className="h-3 w-3 text-[#8D9864]" />
                  </a>

                  <Link
                    to="/cidadao"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#123F1B] py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-[#8D9864]"
                  >
                    <QrCode className="h-4 w-4 text-[#90AD2E]" />
                    Gerar Código de Entrega
                  </Link>
                </div>
              </motion.article>
            );
          })
        )}
      </section>

      {/* Aviso de Separação Limpa */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#BDD3A7] bg-[#BDD3A7]/35 p-4 text-xs text-[#123F1B]">
        <ShieldCheck className="h-5 w-5 shrink-0 text-[#123F1B]" />
        <p>
          <strong>Lembrete de Triagem Limpa:</strong> Entregue os recicláveis secos e
          sem restos de comida para garantir 100% da pontuação e valorizar o trabalho
          dos catadores.
        </p>
      </div>
    </div>
  );
}