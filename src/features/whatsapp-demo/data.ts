export type SenderType = 'bot' | 'user';

export type FlowStep =
  | 'initial'
  | 'awaiting_notification_choice'
  | 'declined'
  | 'awaiting_neighborhood'
  | 'route_confirmed';

export interface QuickReplyOption {
  id: string;
  label: string;
  value: string;
  action?: 'navigate' | 'reset';
  to?: string;
}

export interface ChatMessage {
  id: string;
  sender: SenderType;
  text: string;
  timestamp: string;
}

export interface NeighborhoodRoute {
  id: string;
  bairro: string;
  diasSemana: string;
  horario: string;
  catadorResponsavel: string;
  ecopontoProximo: string;
  codigoEntregaDemo: string;
}

export const NEIGHBORHOOD_ROUTES: NeighborhoodRoute[] = [
  {
    id: 'centro',
    bairro: 'Centro',
    diasSemana: 'Segunda, Quarta e Sexta',
    horario: '07:30 as 10:30',
    catadorResponsavel: 'Maria do Socorro Lima',
    ecopontoProximo: 'Ecoponto QXD-01 (Praca Jose de Barros)',
    codigoEntregaDemo: 'CIRC-8421',
  },
  {
    id: 'planalto',
    bairro: 'Planalto Universitario',
    diasSemana: 'Terca e Quinta',
    horario: '08:00 as 11:00',
    catadorResponsavel: 'Francisco Alves Bezerra',
    ecopontoProximo: 'Ecoponto QXD-02 (Av. Universidade)',
    codigoEntregaDemo: 'CIRC-7354',
  },
  {
    id: 'combate',
    bairro: 'Combate',
    diasSemana: 'Segunda e Quinta',
    horario: '13:30 as 16:30',
    catadorResponsavel: 'Ana Paula Ferreira',
    ecopontoProximo: 'Ecoponto QXD-03 (Rua do Combate)',
    codigoEntregaDemo: 'CIRC-6198',
  },
  {
    id: 'campo-novo',
    bairro: 'Campo Novo',
    diasSemana: 'Terca e Sexta',
    horario: '08:00 as 11:00',
    catadorResponsavel: 'Joao Carlos Menezes',
    ecopontoProximo: 'Ecoponto QXD-04 (Campo Novo)',
    codigoEntregaDemo: 'CIRC-5032',
  },
  {
    id: 'alto-sao-francisco',
    bairro: 'Alto Sao Francisco',
    diasSemana: 'Quarta e Sabado',
    horario: '07:00 as 10:00',
    catadorResponsavel: 'Luciana Ribeiro Santos',
    ecopontoProximo: 'Ecoponto QXD-05 (Alto Sao Francisco)',
    codigoEntregaDemo: 'CIRC-4470',
  },
];

export const BOT_TEXT = {
  opening:
    'Ola! Sou o assistente virtual do CIRCULA em Quixada. Gostaria de receber notificacoes quando os catadores estarao na sua rota?',
  declined:
    'Tudo bem! Nenhuma notificacao de rota foi ativada. Sempre que quiser consultar os Ecopontos ativos em Quixada, acompanhar seus pontos ou resgatar beneficios, acesse o aplicativo CIRCULA.',
  askNeighborhood:
    'Excelente escolha! Assim voce evita o descarte misturado e fortalece a renda dos catadores da nossa cidade. Em qual bairro de Quixada voce esta?',
  routeConfirmed: (route: NeighborhoodRoute): string =>
    `Rota confirmada para o bairro **${route.bairro}**.\n\n` +
    `**Dias de coleta:** ${route.diasSemana}\n` +
    `**Horario:** ${route.horario}\n` +
    `**Catador responsavel:** ${route.catadorResponsavel}\n` +
    `**Ecoponto proximo:** ${route.ecopontoProximo}\n\n` +
    `**Lembrete de triagem limpa:** separe apenas materiais secos e limpos (cobre/fios, eletronicos, metais, plastico limpo e papelao), sem residuos organicos.\n\n` +
    `**Seu codigo de entrega:** ${route.codigoEntregaDemo}. Apresente este codigo na validacao presencial para acumular pontos na sua jornada de 5 niveis.\n\n` +
    `Notificacoes ativadas para o bairro ${route.bairro}! Voce recebera um alerta 30 minutos antes da passagem do catador. Deseja abrir sua carteira circular para ver seus pontos e cupons?`,
} as const;

export const INITIAL_OPTIONS: QuickReplyOption[] = [
  { id: 'opt-yes', label: 'Sim', value: 'Sim' },
  { id: 'opt-no', label: 'Nao', value: 'Nao' },
];

export const DECLINED_OPTIONS: QuickReplyOption[] = [
  { id: 'opt-home', label: 'Ir para inicio', value: 'home', action: 'navigate', to: '/' },
  { id: 'opt-cidadao', label: 'Painel do cidadao', value: 'cidadao', action: 'navigate', to: '/cidadao' },
  { id: 'opt-reset', label: 'Reiniciar conversa', value: 'reset', action: 'reset' },
];

export const NEIGHBORHOOD_OPTIONS: QuickReplyOption[] = NEIGHBORHOOD_ROUTES.map((route) => ({
  id: `opt-${route.id}`,
  label: route.bairro,
  value: route.bairro,
}));

export const FINAL_OPTIONS: QuickReplyOption[] = [
  { id: 'opt-open-cidadao', label: 'Abrir Visao Cidadao', value: 'cidadao', action: 'navigate', to: '/cidadao' },
  { id: 'opt-benefits', label: 'Ver Clube de Beneficios', value: 'home', action: 'navigate', to: '/' },
  { id: 'opt-restart', label: 'Reiniciar simulacao', value: 'reset', action: 'reset' },
];
