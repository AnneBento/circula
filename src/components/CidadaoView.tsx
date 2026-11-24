import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Copy,
  Gift,
  MapPin,
  QrCode,
  Recycle,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { useCircula } from '../lib/circulaStore';
import { getInfoNivel } from '../types/database';
import { NivelBadge } from './ui/Badges';

export const CidadaoView: React.FC = () => {
  const {
    cidadaos,
    cidadaoAtivo,
    selecionarCidadao,
    ecopontos,
    vouchers,
    vouchersResgatados,
    resgatarVoucher,
  } = useCircula();

  const [copiado, setCopiado] = useState(false);
  const [feedbackVoucher, setFeedbackVoucher] = useState<{
    ok: boolean;
    mensagem: string;
  } | null>(null);

  const infoNivel = getInfoNivel(cidadaoAtivo.nivel);
  const progresso = Math.min(100, Math.round((cidadaoAtivo.pontos / infoNivel.proximo) * 100));

  const copiarCodigo = () => {
    navigator.clipboard?.writeText(cidadaoAtivo.codigo_entrega);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleResgatar = async (id: string) => {
    const res = await resgatarVoucher(id);
    setFeedbackVoucher(res);
    setTimeout(() => setFeedbackVoucher(null), 4000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Seletor rápido de perfil demo */}
      <div className="flex items-center justify-between gap-2 rounded-2xl bg-white dark:bg-slate-900 p-3 shadow-xs border border-slate-200/80 dark:border-slate-700/80">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Perfil Demo (LGPD):</span>
        <div className="flex gap-1.5">
          {cidadaos.map((c) => (
            <button
              key={c.id}
              onClick={() => selecionarCidadao(c.codigo_entrega)}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition ${
                c.codigo_entrega === cidadaoAtivo.codigo_entrega
                  ? 'bg-circula-lime text-circula-dark shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c.codigo_entrega}
            </button>
          ))}
        </div>
      </div>

      {/* Cartão de Identidade Circular */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${infoNivel.cor} p-6 text-white shadow-lg`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
              Carteira Circular • Quixadá/CE
            </p>
            <h2 className="mt-1 text-xl font-bold">{cidadaoAtivo.nome_ficticio}</h2>
            <p className="text-xs text-emerald-50/90">Bairro {cidadaoAtivo.bairro}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-xs">
            <QrCode className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Código de Entrega Rápido */}
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3 backdrop-blur-xs">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-emerald-100">
              Código de Entrega no Ecoponto
            </span>
            <span className="font-mono text-2xl font-black tracking-widest">
              {cidadaoAtivo.codigo_entrega}
            </span>
          </div>
          <button
            onClick={copiarCodigo}
            className="flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-emerald-900 dark:text-emerald-100 shadow-xs active:scale-95 transition"
          >
            {copiado ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar
              </>
            )}
          </button>
        </div>

        {/* Pontuação e Barra de Nível */}
        <div className="mt-5">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-black">{cidadaoAtivo.pontos}</span>
              <span className="ml-1.5 text-xs font-semibold text-emerald-100">
                pontos acumulados ({cidadaoAtivo.total_kg_entregue} kg limpos)
              </span>
            </div>
            <span className="text-xs font-bold">{progresso}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-black/25">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full bg-white dark:bg-slate-900"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <NivelBadge nivel={cidadaoAtivo.nivel} />
            <span className="text-[11px] text-emerald-50">
              Meta próximo marco: {infoNivel.proximo} pts
            </span>
          </div>
        </div>
      </motion.div>

      {/* Vitrine de Vouchers */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-100">
            <Gift className="h-5 w-5 text-emerald-600" />
            Vouchers & Parceiros Locais
          </h3>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {vouchersResgatados.length} resgatado(s)
          </span>
        </div>

        {feedbackVoucher && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl border p-3.5 text-xs font-semibold ${
              feedbackVoucher.ok
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
                : 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100'
            }`}
          >
            {feedbackVoucher.mensagem}
          </motion.div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {vouchers.map((voucher) => {
            const desbloqueado = cidadaoAtivo.nivel >= voucher.nivel_minimo;
            const jaResgatado = vouchersResgatados.includes(voucher.id);

            return (
              <div
                key={voucher.id}
                className={`flex flex-col justify-between rounded-2xl border p-4 transition ${
                  desbloqueado
                    ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs'
                    : 'border-slate-200/60 dark:border-slate-700/60 bg-slate-100/70 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                      {voucher.categoria}
                    </span>
                    <span className="text-sm font-black text-emerald-600">
                      {voucher.desconto}
                    </span>
                  </div>
                  <h4 className="mt-2.5 font-bold text-slate-900 dark:text-slate-100">{voucher.titulo}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{voucher.parceiro}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {voucher.custo_pontos} pts • Nível {voucher.nivel_minimo}+
                  </span>
                  <button
                    disabled={!desbloqueado || jaResgatado}
                    onClick={() => handleResgatar(voucher.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      jaResgatado
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100'
                        : desbloqueado
                        ? 'bg-circula-lime text-circula-dark hover:bg-[#7da01f] active:scale-95'
                        : 'bg-slate-200 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Ticket className="h-3.5 w-3.5" />
                    {jaResgatado ? 'Na Carteira' : desbloqueado ? 'Resgatar' : 'Bloqueado'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ecopontos Ativos em Quixadá */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-100">
            <MapPin className="h-5 w-5 text-emerald-600" />
            Ecopontos Ativos (AMMA / CONSERCE)
          </h3>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Tempo real
          </span>
        </div>

        <div className="space-y-3">
          {ecopontos.map((eco) => {
            const ocupacao = Math.round(
              (eco.capacidade_atual_kg / eco.capacidade_maxima_kg) * 100
            );
            return (
              <div
                key={eco.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-700">
                      {eco.codigo} • Bairro {eco.bairro}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{eco.nome}</h4>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{eco.endereco}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    {ocupacao}% ocupado
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    {eco.horario}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Recycle className="h-3.5 w-3.5 text-emerald-600" />
                    {eco.materiais_aceitos.slice(0, 3).join(', ')}...
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
