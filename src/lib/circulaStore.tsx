import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Cidadao,
  Deposito,
  Ecoponto,
  MaterialCategoria,
  ResgateVoucher,
  TABELA_MATERIAIS,
  Voucher,
  calcularNivel,
} from '../types/database';
import { isSupabaseConfigured, supabase } from './supabase';

const INITIAL_ECOPONTOS: Ecoponto[] = [
  {
    id: 'eco-1',
    codigo: 'QXD-01',
    nome: 'Ecoponto Praça José de Barros',
    bairro: 'Centro',
    endereco: 'Praça José de Barros, s/n - Centro, Quixadá/CE',
    horario: 'Seg a Sáb • 07h às 17h',
    materiais_aceitos: ['Cobre/Fios', 'Metais', 'Eletrônicos', 'Plástico Limpo', 'Papelão'],
    capacidade_atual_kg: 185,
    capacidade_maxima_kg: 500,
    ativo: true,
  },
  {
    id: 'eco-2',
    codigo: 'QXD-02',
    nome: 'Ecoponto IFCE / Cedro',
    bairro: 'Combate',
    endereco: 'Av. José de Freitas Queiroz, 5000 - Combate',
    horario: 'Seg a Sex • 08h às 18h',
    materiais_aceitos: ['Cobre/Fios', 'Eletrônicos', 'Plástico Limpo', 'Papelão'],
    capacidade_atual_kg: 240,
    capacidade_maxima_kg: 600,
    ativo: true,
  },
  {
    id: 'eco-3',
    codigo: 'QXD-03',
    nome: 'Ecoponto Campo Novo',
    bairro: 'Campo Novo',
    endereco: 'Rua Rodrigues Júnior, 1120 - Campo Novo',
    horario: 'Seg a Sáb • 07h30 às 16h30',
    materiais_aceitos: ['Cobre/Fios', 'Metais', 'Plástico Limpo', 'Papelão'],
    capacidade_atual_kg: 310,
    capacidade_maxima_kg: 450,
    ativo: true,
  },
];

const INITIAL_CIDADAOS: Cidadao[] = [
  {
    id: 'cid-1',
    codigo_entrega: '12345',
    nome_ficticio: 'Crislaynne',
    bairro: 'Centro',
    pontos: 800,
    nivel: 3,
    total_kg_entregue: 40.5,
  }
];

const INITIAL_DEPOSITOS: Deposito[] = [
  {
    id: 'dep-1',
    cidadao_id: 'cid-1',
    ecoponto_id: 'eco-1',
    catador_operador: 'Seu Antônio (Associação Quixadá Limpa)',
    categoria_material: 'Cobre/Fios',
    peso_kg: 2.5,
    pontos_gerados: 200,
    renda_catador_brl: 86.25,
    economia_ppp_brl: 4.63,
    inspecao_limpa: true,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'dep-2',
    cidadao_id: 'cid-2',
    ecoponto_id: 'eco-3',
    catador_operador: 'Dona Francisca (Cooperativa Sertão)',
    categoria_material: 'Plástico Limpo',
    peso_kg: 11.0,
    pontos_gerados: 220,
    renda_catador_brl: 26.4,
    economia_ppp_brl: 10.45,
    inspecao_limpa: true,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'vou-1',
    titulo: '15% OFF em Livros e Papelaria',
    parceiro: 'Livraria Monólitos',
    categoria: 'Comércio Local',
    desconto: '15% OFF',
    nivel_minimo: 1,
    custo_pontos: 100,
    ativo: true,
  },
  {
    id: 'vou-2',
    titulo: 'Ingresso Meia-Entrada Cultural',
    parceiro: 'Cine Teatro Quixadá',
    categoria: 'Entretenimento',
    desconto: '50% OFF',
    nivel_minimo: 2,
    custo_pontos: 250,
    ativo: true,
  },
  {
    id: 'vou-3',
    titulo: 'Bolsa 30% Curso Técnico & TI',
    parceiro: 'Instituto Educa Sertão',
    categoria: 'Educação',
    desconto: '30% OFF',
    nivel_minimo: 2,
    custo_pontos: 300,
    ativo: true,
  },
  {
    id: 'vou-4',
    titulo: 'Vale-Feira Produtos Regionais',
    parceiro: 'Associação Feira Limpa',
    categoria: 'Comércio Local',
    desconto: 'R$ 25,00',
    nivel_minimo: 3,
    custo_pontos: 500,
    ativo: true,
  },
  {
    id: 'vou-5',
    titulo: 'IPTU Verde Residencial',
    parceiro: 'Prefeitura de Quixadá • AMMA',
    categoria: 'Comércio Local',
    desconto: '30% OFF',
    nivel_minimo: 4,
    custo_pontos: 750,
    ativo: true,
  },
  {
    id: 'vou-6',
    titulo: 'Viagem Grátis no Uber',
    parceiro: 'Crédito Uber / Mobilidade Urbana',
    categoria: 'Entretenimento',
    desconto: 'R$ 20,00',
    nivel_minimo: 5,
    custo_pontos: 850,
    ativo: true,
  },
];

interface RegistrarEntregaInput {
  codigoCidadao: string;
  ecopontoId: string;
  categoria: MaterialCategoria;
  pesoKg: number;
  catadorOperador: string;
}

interface NovoEcopontoInput {
  nome: string;
  bairro: string;
  endereco: string;
  horario: string;
  capacidadeMaximaKg: number;
}

interface CirculaContextType {
  ecopontos: Ecoponto[];
  cidadaos: Cidadao[];
  cidadaoAtivo: Cidadao;
  selecionarCidadao: (id: string) => void;
  depositos: Deposito[];
  vouchers: Voucher[];
  vouchersResgatados: string[];
  avisoSupabase: string | null;
  resgatarVoucher: (voucherId: string) => Promise<{ ok: boolean; mensagem: string }>;
  registrarEntrega: (input: RegistrarEntregaInput) => Promise<{
    ok: boolean;
    mensagem: string;
    deposito?: Deposito;
  }>;
  cadastrarEcoponto: (
    input: NovoEcopontoInput
  ) => Promise<{ ok: boolean; mensagem: string; ecoponto?: Ecoponto }>;
  modoSupabase: boolean;
}

const CirculaContext = createContext<CirculaContextType | null>(null);

function proximoCodigoEcoponto(ecopontos: Ecoponto[], reservado: Set<string> = new Set()) {
  const max = ecopontos.reduce((acc, eco) => {
    const m = eco.codigo.match(/^QXD-(\d+)$/i);
    return m ? Math.max(acc, Number(m[1])) : acc;
  }, 0);
  let n = max + 1;
  let codigo = `QXD-${String(n).padStart(2, '0')}`;
  const usados = new Set(ecopontos.map((e) => e.codigo.toUpperCase()));
  reservado.forEach((c) => usados.add(c.toUpperCase()));
  while (usados.has(codigo.toUpperCase())) {
    n += 1;
    codigo = `QXD-${String(n).padStart(2, '0')}`;
  }
  return codigo;
}

export const CirculaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ecopontos, setEcopontos] = useState<Ecoponto[]>(INITIAL_ECOPONTOS);
  const [cidadaos, setCidadaos] = useState<Cidadao[]>(INITIAL_CIDADAOS);
  const [cidadaoAtivoId, setCidadaoAtivoId] = useState<string>('cid-1');
  const [depositos, setDepositos] = useState<Deposito[]>(INITIAL_DEPOSITOS);
  const [vouchers, setVouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);
  const [resgates, setResgates] = useState<ResgateVoucher[]>([]);
  const [supabaseAtivo, setSupabaseAtivo] = useState(isSupabaseConfigured);
  const [avisoSupabase, setAvisoSupabase] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const client = supabase;

    const ativarFallbackDemo = () => {
      setSupabaseAtivo(false);
      setAvisoSupabase('Conexão com Supabase indisponível. Exibindo dados de demonstração.');
    };

    const carregarDados = async () => {
      try {
        const [ecoRes, cidRes, depRes, vouRes, resRes] = await Promise.all([
          client.from('ecopontos').select('*').order('codigo'),
          client.from('cidadaos').select('*'),
          client.from('depositos').select('*').order('created_at', { ascending: false }).limit(20),
          client.from('vouchers').select('*').eq('ativo', true),
          client.from('resgates_vouchers').select('*'),
        ]);

        const erro = ecoRes.error || cidRes.error || depRes.error || vouRes.error || resRes.error;
        if (erro) {
          ativarFallbackDemo();
          return;
        }

        if (ecoRes.data?.length) setEcopontos(ecoRes.data as Ecoponto[]);
        if (cidRes.data?.length) setCidadaos(cidRes.data as Cidadao[]);
        if (depRes.data?.length) setDepositos(depRes.data as Deposito[]);
        if (vouRes.data?.length) setVouchers(vouRes.data as Voucher[]);
        if (resRes.data) setResgates(resRes.data as ResgateVoucher[]);
        setSupabaseAtivo(true);
        setAvisoSupabase(null);
      } catch {
        ativarFallbackDemo();
      }
    };

    carregarDados();

    const channel = client
      .channel('circula-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ecopontos' }, () => {
        void carregarDados();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cidadaos' }, () => {
        void carregarDados();
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'depositos' }, () => {
        void carregarDados();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'resgates_vouchers' }, () => {
        void carregarDados();
      })
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  }, []);

  const cidadaoAtivo =
    cidadaos.find((c) => c.id === cidadaoAtivoId) || cidadaos[0];

  const vouchersResgatados = resgates
    .filter((r) => r.cidadao_id === cidadaoAtivo?.id)
    .map((r) => r.voucher_id);

  const selecionarCidadao = (id: string) => {
    setCidadaoAtivoId(id);
  };

  const resgatarVoucher = async (voucherId: string) => {
    const voucher = vouchers.find((v) => v.id === voucherId);
    if (!voucher) return { ok: false, mensagem: 'Voucher não encontrado.' };
    if (vouchersResgatados.includes(voucherId)) {
      return { ok: false, mensagem: 'Este voucher já está ativo na sua carteira.' };
    }
    if (cidadaoAtivo.nivel < voucher.nivel_minimo) {
      return {
        ok: false,
        mensagem: `Requer Nível ${voucher.nivel_minimo} de Confiança.`,
      };
    }
    if (cidadaoAtivo.pontos < voucher.custo_pontos) {
      return {
        ok: false,
        mensagem: `Saldo insuficiente (${voucher.custo_pontos} pts necessários).`,
      };
    }

    const novosPontos = cidadaoAtivo.pontos - voucher.custo_pontos;
    const resgateLocal: ResgateVoucher = {
      id: `res-${Date.now()}`,
      cidadao_id: cidadaoAtivo.id,
      voucher_id: voucherId,
      custo_pontos: voucher.custo_pontos,
      created_at: new Date().toISOString(),
    };

    const rollback = () => {
      setCidadaos((prev) =>
        prev.map((c) => (c.id === cidadaoAtivo.id ? { ...c, pontos: cidadaoAtivo.pontos } : c))
      );
      setResgates((prev) => prev.filter((r) => r.id !== resgateLocal.id));
    };

    if (supabaseAtivo && supabase) {
      setCidadaos((prev) =>
        prev.map((c) => (c.id === cidadaoAtivo.id ? { ...c, pontos: novosPontos } : c))
      );
      setResgates((prev) => [...prev, resgateLocal]);

      try {
        const { error: resgateError } = await supabase.from('resgates_vouchers').insert({
          cidadao_id: cidadaoAtivo.id,
          voucher_id: voucherId,
          custo_pontos: voucher.custo_pontos,
        });
        if (resgateError) throw resgateError;

        const { error: pontosError } = await supabase
          .from('cidadaos')
          .update({ pontos: novosPontos })
          .eq('id', cidadaoAtivo.id);
        if (pontosError) throw pontosError;
      } catch {
        rollback();
        return { ok: false, mensagem: 'Não foi possível salvar o resgate. Tente novamente.' };
      }
    } else {
      setCidadaos((prev) =>
        prev.map((c) => (c.id === cidadaoAtivo.id ? { ...c, pontos: novosPontos } : c))
      );
      setResgates((prev) => [...prev, resgateLocal]);
    }

    return {
      ok: true,
      mensagem: `Voucher "${voucher.titulo}" desbloqueado! Apresente no parceiro.`,
    };
  };

  const registrarEntrega = async ({
    codigoCidadao,
    ecopontoId,
    categoria,
    pesoKg,
    catadorOperador,
  }: RegistrarEntregaInput) => {
    const normalizado = codigoCidadao.trim().toUpperCase();
    const cidadao = cidadaos.find((c) => c.codigo_entrega === normalizado);
    if (!cidadao) {
      return {
        ok: false,
        mensagem: `Código "${normalizado}" não encontrado. Use QXD-2026 ou QXD-8841.`,
      };
    }

    const regra = TABELA_MATERIAIS[categoria];
    const pontosGerados = Math.round(pesoKg * regra.pontosPorKg);
    const rendaCatador = Number((pesoKg * regra.precoCatadorKg).toFixed(2));
    const economiaPpp = Number((pesoKg * regra.economiaPppKg).toFixed(2));

    const novoDeposito: Deposito = {
      id: `dep-${Date.now()}`,
      cidadao_id: cidadao.id,
      ecoponto_id: ecopontoId,
      catador_operador: catadorOperador || 'Operador Ecoponto Quixadá',
      categoria_material: categoria,
      peso_kg: pesoKg,
      pontos_gerados: pontosGerados,
      renda_catador_brl: rendaCatador,
      economia_ppp_brl: economiaPpp,
      inspecao_limpa: true,
      created_at: new Date().toISOString(),
    };

    const novosPontos = cidadao.pontos + pontosGerados;
    const novoNivel = calcularNivel(novosPontos);
    const novoTotalKg = Number((cidadao.total_kg_entregue + pesoKg).toFixed(2));
    const ecopontoAlvo = ecopontos.find((e) => e.id === ecopontoId);
    const novaCapacidade = ecopontoAlvo
      ? Math.min(
          ecopontoAlvo.capacidade_maxima_kg,
          Number((ecopontoAlvo.capacidade_atual_kg + pesoKg).toFixed(2))
        )
      : null;

    if (supabaseAtivo && supabase) {
      try {
        const { error: depError } = await supabase.from('depositos').insert({
          cidadao_id: cidadao.id,
          ecoponto_id: ecopontoId,
          catador_operador: novoDeposito.catador_operador,
          categoria_material: categoria,
          peso_kg: pesoKg,
          pontos_gerados: pontosGerados,
          renda_catador_brl: rendaCatador,
          economia_ppp_brl: economiaPpp,
          inspecao_limpa: true,
        });
        if (depError) throw depError;

        const { error: cidError } = await supabase
          .from('cidadaos')
          .update({
            pontos: novosPontos,
            nivel: novoNivel,
            total_kg_entregue: novoTotalKg,
          })
          .eq('id', cidadao.id);
        if (cidError) throw cidError;

        if (novaCapacidade !== null) {
          const { error: ecoError } = await supabase
            .from('ecopontos')
            .update({ capacidade_atual_kg: novaCapacidade })
            .eq('id', ecopontoId);
          if (ecoError) throw ecoError;
        }
      } catch {
        return {
          ok: false,
          mensagem: 'Não foi possível registrar a entrega. Verifique a conexão e tente novamente.',
        };
      }
    }

    setDepositos((prev) => [novoDeposito, ...prev]);
    setCidadaos((prev) =>
      prev.map((c) =>
        c.id === cidadao.id
          ? {
              ...c,
              pontos: novosPontos,
              nivel: novoNivel,
              total_kg_entregue: novoTotalKg,
            }
          : c
      )
    );
    setEcopontos((prev) =>
      prev.map((e) =>
        e.id === ecopontoId && novaCapacidade !== null
          ? { ...e, capacidade_atual_kg: novaCapacidade }
          : e
      )
    );

    return {
      ok: true,
      mensagem: `Entrega validada! +${pontosGerados} pts para ${cidadao.nome_ficticio} e R$ ${rendaCatador.toFixed(2)} gerados.`,
      deposito: novoDeposito,
    };
  };

  const cadastrarEcoponto = async (
    input: NovoEcopontoInput
  ): Promise<{ ok: boolean; mensagem: string; ecoponto?: Ecoponto }> => {
    const montarEcoponto = (codigo: string): Ecoponto => ({
      id: `eco-${Date.now()}`,
      codigo,
      nome: input.nome,
      bairro: input.bairro,
      endereco: input.endereco,
      horario: input.horario,
      materiais_aceitos: ['Cobre/Fios', 'Metais', 'Eletrônicos', 'Plástico Limpo', 'Papelão'],
      capacidade_atual_kg: 0,
      capacidade_maxima_kg: input.capacidadeMaximaKg || 500,
      ativo: true,
    });

    if (supabaseAtivo && supabase) {
      const tentados = new Set<string>();
      for (let tentativa = 0; tentativa < 2; tentativa += 1) {
        const codigo = proximoCodigoEcoponto(ecopontos, tentados);
        tentados.add(codigo);
        const novo = montarEcoponto(codigo);
        try {
          const { data, error } = await supabase
            .from('ecopontos')
            .insert({
              codigo: novo.codigo,
              nome: novo.nome,
              bairro: novo.bairro,
              endereco: novo.endereco,
              horario: novo.horario,
              capacidade_maxima_kg: novo.capacidade_maxima_kg,
              ativo: true,
            })
            .select()
            .single();
          if (error) {
            if ((error as { code?: string }).code === '23505' && tentativa === 0) continue;
            if ((error as { code?: string }).code === '23505') {
              return { ok: false, mensagem: 'Já existe um ecoponto com esse código. Tente novamente.' };
            }
            throw error;
          }
          if (data) {
            const ecoponto = data as Ecoponto;
            setEcopontos((prev) => [...prev, ecoponto]);
            return { ok: true, mensagem: 'Ecoponto cadastrado com sucesso.', ecoponto };
          }
          return { ok: false, mensagem: 'Não foi possível cadastrar o ecoponto. Tente novamente.' };
        } catch (error) {
          if ((error as { code?: string }).code === '23505') {
            return { ok: false, mensagem: 'Já existe um ecoponto com esse código. Tente novamente.' };
          }
          return {
            ok: false,
            mensagem: 'Não foi possível cadastrar o ecoponto. Verifique a conexão e tente novamente.',
          };
        }
      }
      return { ok: false, mensagem: 'Já existe um ecoponto com esse código. Tente novamente.' };
    }

    const codigo = proximoCodigoEcoponto(ecopontos);
    const novo = montarEcoponto(codigo);
    setEcopontos((prev) => [...prev, novo]);
    return { ok: true, mensagem: 'Ecoponto cadastrado com sucesso.', ecoponto: novo };
  };

  return (
    <CirculaContext.Provider
      value={{
        ecopontos,
        cidadaos,
        cidadaoAtivo,
        selecionarCidadao,
        depositos,
        vouchers,
        vouchersResgatados,
        avisoSupabase,
        resgatarVoucher,
        registrarEntrega,
        cadastrarEcoponto,
        modoSupabase: supabaseAtivo,
      }}
    >
      {children}
    </CirculaContext.Provider>
  );
};

export function useCircula() {
  const ctx = useContext(CirculaContext);
  if (!ctx) throw new Error('useCircula deve ser usado dentro de CirculaProvider');
  return ctx;
}
