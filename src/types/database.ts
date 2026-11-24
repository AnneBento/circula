export type MaterialCategoria =
  | 'Cobre/Fios'
  | 'Metais'
  | 'Eletrônicos'
  | 'Plástico Limpo'
  | 'Papelão';

export interface Ecoponto {
  id: string;
  codigo: string;
  nome: string;
  bairro: string;
  endereco: string;
  horario: string;
  materiais_aceitos: string[];
  capacidade_atual_kg: number;
  capacidade_maxima_kg: number;
  ativo: boolean;
  created_at?: string;
}

export interface Cidadao {
  id: string;
  codigo_entrega: string;
  nome_ficticio: string;
  bairro: string;
  pontos: number;
  nivel: 1 | 2 | 3;
  total_kg_entregue: number;
}

export interface Deposito {
  id: string;
  cidadao_id: string;
  ecoponto_id: string;
  catador_operador: string;
  categoria_material: MaterialCategoria;
  peso_kg: number;
  pontos_gerados: number;
  renda_catador_brl: number;
  economia_ppp_brl: number;
  inspecao_limpa: boolean;
  created_at: string;
}

export interface Voucher {
  id: string;
  titulo: string;
  parceiro: string;
  categoria: 'Educação' | 'Entretenimento' | 'Comércio Local';
  desconto: string;
  nivel_minimo: 1 | 2 | 3;
  custo_pontos: number;
  ativo: boolean;
}

export const TABELA_MATERIAIS: Record<
  MaterialCategoria,
  {
    pontosPorKg: number;
    precoCatadorKg: number;
    economiaPppKg: number;
    destaque: string;
    corBadge: string;
  }
> = {
  'Cobre/Fios': {
    pontosPorKg: 80,
    precoCatadorKg: 34.5,
    economiaPppKg: 1.85,
    destaque: 'Evita queima tóxica de cabos',
    corBadge: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  Eletrônicos: {
    pontosPorKg: 50,
    precoCatadorKg: 12.0,
    economiaPppKg: 1.6,
    destaque: 'Logística reversa segura',
    corBadge: 'bg-purple-100 text-purple-900 border-purple-300',
  },
  Metais: {
    pontosPorKg: 35,
    precoCatadorKg: 6.8,
    economiaPppKg: 1.2,
    destaque: 'Alumínio, ferro e aço limpos',
    corBadge: 'bg-slate-200 text-slate-900 border-slate-300',
  },
  'Plástico Limpo': {
    pontosPorKg: 20,
    precoCatadorKg: 2.4,
    economiaPppKg: 0.95,
    destaque: 'Sem contaminação orgânica',
    corBadge: 'bg-sky-100 text-sky-900 border-sky-300',
  },
  Papelão: {
    pontosPorKg: 15,
    precoCatadorKg: 0.85,
    economiaPppKg: 0.75,
    destaque: 'Seco e prensável',
    corBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  },
};

export function calcularNivel(pontos: number): 1 | 2 | 3 {
  if (pontos >= 800) return 3;
  if (pontos >= 300) return 2;
  return 1;
}

export function getInfoNivel(nivel: 1 | 2 | 3) {
  switch (nivel) {
    case 1:
      return {
        nome: 'Nível 1: Iniciante',
        proximo: 300,
        cor: 'from-emerald-500 to-teal-600',
        descricao: 'Primeiras entregas separadas nos Ecopontos de Quixadá.',
      };
    case 2:
      return {
        nome: 'Nível 2: Separador Consciente',
        proximo: 800,
        cor: 'from-teal-600 to-cyan-700',
        descricao: 'Separação recorrente sem contaminação orgânica.',
      };
    case 3:
      return {
        nome: 'Nível 3: Guardião de Quixadá',
        proximo: 1500,
        cor: 'from-amber-500 to-emerald-700',
        descricao: 'Referência comunitária em economia circular.',
      };
  }
}
