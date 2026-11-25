import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Coins,
  FlameKindling,
  Scale,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useCircula } from '../lib/circulaStore';
import { MaterialCategoria, TABELA_MATERIAIS } from '../types/database';

const CATEGORIAS = Object.keys(TABELA_MATERIAIS) as MaterialCategoria[];

export const CatadorView: React.FC = () => {
  const { ecopontos, depositos, registrarEntrega } = useCircula();

  const [codigoCidadao, setCodigoCidadao] = useState('12345');
  const [ecopontoId, setEcopontoId] = useState(ecopontos[0]?.id || 'eco-1');
  const [categoria, setCategoria] = useState<MaterialCategoria>('Cobre/Fios');
  const [pesoKg, setPesoKg] = useState('2.5');
  const [inspecaoLimpa, setInspecaoLimpa] = useState(true);
  const [catadorOperador, setCatadorOperador] = useState(
    'CLOVIS'
  );
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ ok: boolean; mensagem: string } | null>(
    null
  );

  const pesoNumerico = Math.max(0, parseFloat(pesoKg) || 0);
  const regraAtual = TABELA_MATERIAIS[categoria];
  const previsaoRenda = (pesoNumerico * regraAtual.precoCatadorKg).toFixed(2);
  const previsaoPontos = Math.round(pesoNumerico * regraAtual.pontosPorKg);

  const rendaTotalAcumulada = depositos.reduce((acc, d) => acc + d.renda_catador_brl, 0);

  const handleValidar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspecaoLimpa) {
      setResultado({
        ok: false,
        mensagem:
          'Material com contaminação orgânica não pode ser validado. Oriente o cidadão a separar na fonte.',
      });
      return;
    }
    if (pesoNumerico <= 0) {
      setResultado({ ok: false, mensagem: 'Informe um peso válido maior que 0 kg.' });
      return;
    }

    setEnviando(true);
    const res = await registrarEntrega({
      codigoCidadao,
      ecopontoId,
      categoria,
      pesoKg: pesoNumerico,
      catadorOperador,
    });
    setEnviando(false);
    setResultado(res);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Resumo de Dignidade e Renda Direta */}
      <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Terminal de Triagem Limpa • Sem Atravessadores
            </p>
            <h2 className="mt-1 text-xl font-bold">Validação Presencial</h2>
          </div>
          <div className="rounded-2xl bg-emerald-500/20 p-3 text-emerald-300">
            <Coins className="h-7 w-7" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/10 p-3.5">
            <span className="text-xs text-slate-300">Renda Direta Gerada</span>
            <p className="mt-1 text-2xl font-black text-emerald-400">
              R$ {rendaTotalAcumulada.toFixed(2)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3.5">
            <span className="text-xs text-slate-300">Entregas Auditadas</span>
            <p className="mt-1 text-2xl font-black text-white">{depositos.length}</p>
          </div>
        </div>
      </div>

      {/* Formulário de Validação */}
      <form
        onSubmit={handleValidar}
        className="space-y-4 rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-xs"
      >
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-slate-100">
          <UserCheck className="h-5 w-5 text-emerald-600" />
          Registrar Recebimento no Ecoponto
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Código do Cidadão
            </label>
            <input
              type="text"
              value={codigoCidadao}
              onChange={(e) => setCodigoCidadao(e.target.value)}
              placeholder="Ex: 12345"
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 font-mono text-sm font-bold uppercase focus:border-circula-lime focus:outline-none dark:[color-scheme:dark]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Ecoponto de Operação
            </label>
            <select
              value={ecopontoId}
              onChange={(e) => setEcopontoId(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 text-sm font-medium focus:border-circula-lime focus:outline-none dark:[color-scheme:dark]"
            >
              {ecopontos.map((eco) => (
                <option key={eco.id} value={eco.id}>
                  {eco.codigo} - {eco.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Seleção de Categoria com Valorização de Cobre e Eletrônicos */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Categoria do Material (Valorização por Pureza)
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CATEGORIAS.map((cat) => {
              const info = TABELA_MATERIAIS[cat];
              const ativo = categoria === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategoria(cat)}
                  className={`rounded-2xl border p-3 text-left transition ${
                    ativo
                      ? 'border-circula-lime bg-circula-sage/20 ring-2 ring-circula-lime/30 dark:bg-circula-lime/15 dark:border-circula-lime'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{cat}</div>
                  <div className="mt-1 text-[11px] font-bold text-emerald-700 dark:text-circula-lime">
                    R$ {info.precoCatadorKg.toFixed(2)}/kg • {info.pontosPorKg} pts/kg
                  </div>
                </button>
              );
            })}
          </div>
          {categoria === 'Cobre/Fios' && (
            <p className="mt-2 flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-800">
              <FlameKindling className="h-4 w-4 text-amber-600 shrink-0" />
              Recebimento direto sem queima de plástico: preserva a saúde do catador e evita gases tóxicos.
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Peso Aferido (kg)
            </label>
            <div className="relative mt-1">
              <Scale className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={pesoKg}
                onChange={(e) => setPesoKg(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-10 pr-4 py-2.5 text-sm font-bold focus:border-circula-lime focus:outline-none dark:[color-scheme:dark]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Catador / Associação Responsável
            </label>
            <input
              type="text"
              value={catadorOperador}
              onChange={(e) => setCatadorOperador(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 text-sm focus:border-circula-lime focus:outline-none dark:[color-scheme:dark]"
            />
          </div>
        </div>

        {/* Checklist de Qualidade */}
        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3.5">
          <input
            type="checkbox"
            checked={inspecaoLimpa}
            onChange={(e) => setInspecaoLimpa(e.target.checked)}
            className="h-5 w-5 rounded accent-emerald-600"
          />
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Inspeção visual aprovada (0% resíduo orgânico)
            </span>
            <p className="text-slate-500 dark:text-slate-400">
              Garante matéria-prima limpa e evita chorume na cadeia de reciclagem.
            </p>
          </div>
        </label>

        {/* Simulação em tempo real */}
        <div className="flex items-center justify-between rounded-2xl bg-emerald-950 px-4 py-3 text-white">
          <div>
            <span className="block text-[11px] text-emerald-300">Rendimento Catador</span>
            <span className="text-lg font-black">R$ {previsaoRenda}</span>
          </div>
          <div className="text-right">
            <span className="block text-[11px] text-emerald-300">Crédito Cidadão</span>
            <span className="text-lg font-black">+{previsaoPontos} pts</span>
          </div>
        </div>

        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-3.5 text-xs font-semibold ${
              resultado.ok
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
                : 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100'
            }`}
          >
            {resultado.mensagem}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-circula-lime py-3.5 text-sm font-extrabold text-circula-dark shadow-md hover:bg-[#7da01f] active:scale-[0.99] transition disabled:opacity-60"
        >
          <ShieldCheck className="h-5 w-5" />
          {enviando ? 'Validando...' : 'Validar Entrega e Liberar Pontos'}
        </button>
      </form>

      {/* Histórico Auditável */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Últimas Pesagens Auditadas
        </h3>
        <div className="space-y-2.5">
          {depositos.slice(0, 5).map((dep) => (
            <div
              key={dep.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3.5 text-xs"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {dep.categoria_material} • {dep.peso_kg} kg
                </span>
                <p className="text-slate-500 dark:text-slate-400">{dep.catador_operador}</p>
              </div>
              <div className="text-right">
                <span className="block font-extrabold text-emerald-700">
                  +R$ {dep.renda_catador_brl.toFixed(2)}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />+{dep.pontos_gerados} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
