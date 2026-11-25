import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  MapPinPlus,
  Trophy,
} from 'lucide-react';
import { useCircula } from '../lib/circulaStore';
import { NivelBadge } from './ui/Badges';

export const GestaoView: React.FC = () => {
  const { ecopontos, cidadaos, cadastrarEcoponto } = useCircula();

  const [nome, setNome] = useState('');
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [horario] = useState('Seg a Sáb • 07h às 17h');
  const [capacidade, setCapacidade] = useState('500');
  const [feedback, setFeedback] = useState<{ ok: boolean; mensagem: string } | null>(null);
  const [enviando, setEnviando] = useState(false);

  const rankingCidadaos = [...cidadaos].sort((a, b) => b.pontos - a.pontos);

  const handleCriarEcoponto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    if (!nome.trim() || !bairro.trim() || !endereco.trim()) return;

    setEnviando(true);
    try {
      const res = await cadastrarEcoponto({
        nome: nome.trim(),
        bairro: bairro.trim(),
        endereco: endereco.trim(),
        horario: horario.trim(),
        capacidadeMaximaKg: Number(capacidade) || 500,
      });

      if (!res.ok || !res.ecoponto) {
        setFeedback({ ok: false, mensagem: res.mensagem });
        return;
      }

      setFeedback({
        ok: true,
        mensagem: `${res.ecoponto.codigo} (${res.ecoponto.nome}) publicado instantaneamente na visão do Cidadão e do Catador!`,
      });
      setNome('');
      setBairro('');
      setEndereco('');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Cadastro e Ativação de Novo Ecoponto */}
      <form
        onSubmit={handleCriarEcoponto}
        className="space-y-4 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-xs"
      >
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-100">
          <MapPinPlus className="h-5 w-5 text-emerald-600" />
          Cadastrar e Ativar Novo Ecoponto
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Nome do Ecoponto
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Ecoponto Alto São Francisco"
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 text-sm focus:border-circula-lime focus:outline-none dark:[color-scheme:dark]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Bairro</label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Ex: Alto São Francisco"
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 text-sm focus:border-circula-lime focus:outline-none dark:[color-scheme:dark]"
              required
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Endereço Completo
            </label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Rua / Referência em Quixadá"
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 text-sm focus:border-circula-lime focus:outline-none dark:[color-scheme:dark]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Capacidade (kg)
            </label>
            <input
              type="number"
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 text-sm font-bold focus:border-circula-lime focus:outline-none dark:[color-scheme:dark]"
            />
          </div>
        </div>

        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-2xl border p-3 text-xs font-semibold ${
              feedback.ok
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
                : 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100'
            }`}
          >
            {feedback.mensagem}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 text-sm font-extrabold text-white hover:bg-slate-800 active:scale-[0.99] transition disabled:opacity-60"
        >
          <Building2 className="h-4 w-4 text-emerald-400" />
          {enviando ? 'Publicando...' : 'Publicar Ecoponto na Rede Municipal'}
        </button>
      </form>

      {/* Ranking de Engajamento Comunitário */}
      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-100">
          <Trophy className="h-5 w-5 text-amber-500" />
          Ranking de Engajamento Cidadão
        </h3>
        <div className="space-y-2.5">
          {rankingCidadaos.map((cid, index) => (
            <div
              key={cid.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800 dark:bg-circula-lime/20 dark:text-circula-sage">
                  #{index + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{cid.nome_ficticio}</h4>
                  <div className="mt-1">
                    <NivelBadge nivel={cid.nivel} />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-base font-black text-emerald-700">
                  {cid.pontos} pts
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {cid.total_kg_entregue} kg
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Monitoramento da Rede de Ecopontos */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Capacidade dos Ecopontos ({ecopontos.length} ativos)
        </h3>
        {ecopontos.map((eco) => {
          const pct = Math.min(
            100,
            Math.round((eco.capacidade_atual_kg / eco.capacidade_maxima_kg) * 100)
          );
          return (
            <div
              key={eco.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3.5 text-xs"
            >
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>
                  {eco.codigo} • {eco.nome}
                </span>
                <span>
                  {eco.capacidade_atual_kg} / {eco.capacidade_maxima_kg} kg ({pct}%)
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    pct > 80 ? 'bg-amber-500' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};