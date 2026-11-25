import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Clock,
  Gift,
  ImagePlus,
  MapPin,
  Recycle,
  Ticket,
  X,
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

  const [fotoMaterial, setFotoMaterial] = useState<string | null>(null);
  const [feedbackVoucher, setFeedbackVoucher] = useState<{
    ok: boolean;
    mensagem: string;
  } | null>(null);

  const infoNivel = getInfoNivel(cidadaoAtivo.nivel);
  const progresso = Math.min(100, Math.round((cidadaoAtivo.pontos / infoNivel.proximo) * 100));

  useEffect(() => {
    return () => {
      if (fotoMaterial) URL.revokeObjectURL(fotoMaterial);
    };
  }, [fotoMaterial]);

  const handleFotoMaterial = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fotoMaterial) URL.revokeObjectURL(fotoMaterial);
    setFotoMaterial(URL.createObjectURL(file));
    e.target.value = '';
  };

  const removerFotoMaterial = () => {
    if (fotoMaterial) URL.revokeObjectURL(fotoMaterial);
    setFotoMaterial(null);
  };

  const handleResgatar = async (id: string) => {
    const res = await resgatarVoucher(id);
    setFeedbackVoucher(res);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Seletor rápido de perfil demo */}
      <div className="flex items-center justify-between gap-2 rounded-2xl bg-white p-3 shadow-xs border border-[#BDD3A7]">
        <span className="text-xs font-medium text-[#8D9864]">Perfil Demo (LGPD):</span>
        <div className="flex gap-1.5">
          {cidadaos.map((c) => (
            <button
              key={c.id}
              onClick={() => selecionarCidadao(c.id)}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition ${
                c.id === cidadaoAtivo.id
                  ? 'bg-[#123F1B] text-white shadow-xs'
                  : 'bg-[#BDD3A7]/35 text-[#123F1B] hover:bg-[#BDD3A7]/60'
              }`}
            >
              {c.nome_ficticio.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Cartão de Identidade Circular */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123F1B] via-[#275120] to-[#8D9864] p-6 text-white shadow-lg"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#BDD3A7]">
            Carteira Circular • Quixadá/CE
          </p>
          <h2 className="mt-1 text-xl font-bold">{cidadaoAtivo.nome_ficticio}</h2>
          <p className="text-xs text-[#BDD3A7]/90">Bairro {cidadaoAtivo.bairro}</p>
        </div>

        {/* Foto do material para pré-entrega */}
        <div className="mt-5 rounded-2xl bg-black/25 px-4 py-3 backdrop-blur-xs border border-[#BDD3A7]/20">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#BDD3A7]">
                Foto do material para entrega
              </span>
              <span className="mt-1 block text-xs text-[#BDD3A7]/90">
                Registre os recicláveis limpos antes de levar ao ecoponto.
              </span>
            </div>
            {fotoMaterial ? (
              <button
                type="button"
                onClick={removerFotoMaterial}
                className="inline-flex items-center gap-1 rounded-xl bg-black/20 px-2.5 py-2 text-[11px] font-bold text-[#BDD3A7] hover:bg-black/30 transition"
              >
                <X className="h-3.5 w-3.5" /> Remover
              </button>
            ) : null}
          </div>

          {fotoMaterial ? (
            <div className="mt-3 overflow-hidden rounded-xl border border-[#BDD3A7]/20">
              <img src={fotoMaterial} alt="Prévia do material para entrega" className="h-36 w-full object-cover" />
            </div>
          ) : (
            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#BDD3A7]/40 bg-black/10 px-3 py-4 text-xs font-bold text-[#BDD3A7] hover:bg-black/20 transition">
              <Camera className="h-4 w-4" />
              <span>Adicionar foto</span>
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFotoMaterial} />
            </label>
          )}
          {fotoMaterial ? (
            <label className="mt-2 inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-semibold text-[#90AD2E] hover:underline">
              <ImagePlus className="h-3.5 w-3.5" /> Trocar foto
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFotoMaterial} />
            </label>
          ) : null}
        </div>

        {/* Pontuação e Barra de Nível */}
        <div className="mt-5">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-black text-[#90AD2E]">{cidadaoAtivo.pontos}</span>
              <span className="ml-1.5 text-xs font-semibold text-[#BDD3A7]">
                pontos acumulados ({cidadaoAtivo.total_kg_entregue} kg limpos)
              </span>
            </div>
            <span className="text-xs font-bold text-[#BDD3A7]">{progresso}%</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-black/25">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full bg-[#90AD2E]"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <NivelBadge nivel={cidadaoAtivo.nivel} />
            <span className="text-[11px] text-[#BDD3A7]">
              Meta próximo marco: {infoNivel.proximo} pts
            </span>
          </div>
        </div>
      </motion.div>

      {/* Vitrine de Vouchers */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-bold text-[#123F1B]">
            <Gift className="h-5 w-5 text-[#90AD2E]" />
            Vouchers & Parceiros Locais
          </h3>
          <span className="text-xs font-medium text-[#8D9864]">
            {vouchersResgatados.length} resgatado(s)
          </span>
        </div>

        {feedbackVoucher && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl border p-3.5 text-xs font-semibold ${
              feedbackVoucher.ok
                ? 'border-[#90AD2E] bg-[#BDD3A7]/40 text-[#123F1B]'
                : 'border-[#8D9864] bg-[#BDD3A7]/25 text-[#123F1B]'
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
                    ? 'border-[#BDD3A7] bg-white shadow-xs'
                    : 'border-[#BDD3A7]/50 bg-[#BDD3A7]/15 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-[#BDD3A7]/45 px-2.5 py-1 text-[11px] font-bold text-[#123F1B]">
                      {voucher.categoria}
                    </span>
                    <span className="text-sm font-black text-[#123F1B]">
                      {voucher.desconto}
                    </span>
                  </div>
                  <h4 className="mt-2.5 font-bold text-[#123F1B]">{voucher.titulo}</h4>
                  <p className="text-xs text-[#8D9864]">{voucher.parceiro}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[#BDD3A7]/50 pt-3">
                  <span className="text-xs font-bold text-[#123F1B]">
                    {voucher.custo_pontos} pts • Nível {voucher.nivel_minimo}+
                  </span>
                  <button
                    disabled={!desbloqueado || jaResgatado}
                    onClick={() => handleResgatar(voucher.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      jaResgatado
                        ? 'bg-[#BDD3A7] text-[#123F1B]'
                        : desbloqueado
                        ? 'bg-[#123F1B] text-white hover:bg-[#8D9864] active:scale-95'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
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
          <h3 className="flex items-center gap-2 text-base font-bold text-[#123F1B]">
            <MapPin className="h-5 w-5 text-[#90AD2E]" />
            Ecopontos Ativos (AMMA / CONSERCE)
          </h3>
        </div>

        <div className="space-y-3">
          {ecopontos.map((eco) => (
            <div
              key={eco.id}
              className="rounded-2xl border border-[#BDD3A7] bg-white p-4 shadow-xs"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#8D9864]">
                  {eco.codigo} • Bairro {eco.bairro}
                </span>
                <h4 className="font-bold text-[#123F1B]">{eco.nome}</h4>
                <p className="mt-0.5 text-xs text-[#8D9864]">{eco.endereco}</p>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#123F1B]">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#8D9864]" />
                  {eco.horario}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Recycle className="h-3.5 w-3.5 text-[#90AD2E]" />
                  {eco.materiais_aceitos.slice(0, 3).join(', ')}...
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};