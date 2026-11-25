import type { ReactNode } from "react";
import { Chip, InfoBox, InfoRow } from "./chat-kit";
import { DEMO, PTS_POR_KG, fmtKg, pontosDe } from "./data";

// Fluxo do protótipo interativo do bot (dados fictícios, edital 8.4).
export interface FlowNode {
  bot: ReactNode[];
  replies?: string[];
  next?: string | Record<string, string>;
}

const ITENS_COLETA = [
  { material: "Metais", kg: 2.0 },
  { material: "Plástico limpo", kg: 3.0 },
];
const TOTAL_COLETA = ITENS_COLETA.reduce(
  (s, i) => s + pontosDe(i.material, i.kg),
  0
);
const PCT = Math.round((DEMO.pontos / DEMO.meta) * 100);

export const FLOW: Record<string, FlowNode> = {
  start: {
    bot: [
      <>
        Oi! Aqui é o Circula, a coleta seletiva de Quixadá. Vou cadastrar sua
        casa na rota do seu bairro. Seus dados só servem para a coleta e para
        os seus pontos (LGPD).
      </>,
      <>Em qual bairro você mora?</>,
    ],
    replies: ["Campo Novo", "Centro", "Cedro", "Ver todos os bairros"],
    next: "cadastro_ok",
  },
  cadastro_ok: {
    bot: [
      <>
        Pronto, {DEMO.nome}! Sua casa entrou na <strong>{DEMO.rota}</strong>.
        <InfoBox>
          <InfoRow a="Coleta" b={DEMO.dias.join(" e ")} />
          <InfoRow a="Janela" b={DEMO.janela} />
          <InfoRow a="Seu código" b={DEMO.codigo} />
        </InfoBox>
        <div style={{ marginTop: 6, fontSize: 12, color: "#5F6F5A" }}>
          Dias e horários de exemplo. Valem os definidos pela AMMA.
        </div>
      </>,
    ],
    replies: ["Quando passa a coleta?", "Como separar o material"],
    next: { "Quando passa a coleta?": "rotas", "Como separar o material": "separar" },
  },
  separar: {
    bot: [
      <>
        Separe por tipo: papelão, plástico, metal e vidro. Deixe tudo{" "}
        <strong>limpo e seco</strong>, sem gordura ou resíduo de comida. Assim
        o material vale mais e rende mais pontos.
      </>,
    ],
    replies: ["Quando passa a coleta?"],
    next: "rotas",
  },
  rotas: {
    bot: [
      <>
        {DEMO.nome}, a coleta no <strong>Campo Novo</strong> passa em:
        <InfoBox>
          <InfoRow a="Terça" b={DEMO.janela} />
          <InfoRow a="Sexta" b={DEMO.janela} />
          <InfoRow a="Rota" b="3 · Campo Novo" />
        </InfoBox>
        <div style={{ marginTop: 8, display: "flex", gap: 4, flexWrap: "wrap" }}>
          <Chip>Próxima: amanhã</Chip>
          <Chip white>Material limpo e seco</Chip>
        </div>
      </>,
      <>Quer receber um aviso na véspera de cada coleta?</>,
    ],
    replies: ["Sim, avisar", "Só no dia"],
    next: "aviso",
  },
  aviso: {
    bot: [
      <>
        Combinado. Eu aviso e pergunto se você vai ter material. Assim a
        equipe sabe se vale parar na sua casa.
      </>,
      <>
        O que entra na coleta:
        <InfoBox>
          {Object.entries(PTS_POR_KG).map(([nome, pts]) => (
            <InfoRow key={nome} a={nome} b={`${pts} pts/kg`} />
          ))}
        </InfoBox>
      </>,
    ],
    replies: ["Ver lembrete da coleta"],
    next: "lembrete",
  },
  lembrete: {
    bot: [
      <>
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "#4F7A1E",
            marginBottom: 4,
          }}
        >
          Lembrete da Rota 3
        </div>
        Bom dia, {DEMO.nome}! A coleta passa hoje entre <strong>8h e 11h</strong>.
        Vai ter material para entregar?
      </>,
    ],
    replies: ["Sim, vou deixar", "Hoje não"],
    next: { "Sim, vou deixar": "confirmada", "Hoje não": "hoje_nao" },
  },
  hoje_nao: {
    bot: [
      <>
        Tudo bem! Te aviso na próxima terça. Se sobrar material, pode deixar
        no ecoponto QXD-001 (Centro) a qualquer momento.
      </>,
    ],
    replies: ["Ver meus pontos"],
    next: "pontos",
  },
  confirmada: {
    bot: [
      <>
        Coleta <strong>confirmada</strong> para a sua casa. Deixe o material
        limpo e seco na calçada, separado por tipo. Eu aviso quando a equipe
        estiver perto.
      </>,
      <>
        Coleta <strong>feita</strong>. Material conferido e pesado pela equipe:
        <InfoBox>
          {ITENS_COLETA.map((i) => (
            <InfoRow
              key={i.material}
              a={`${i.material} · ${fmtKg(i.kg)} kg`}
              b={`+${pontosDe(i.material, i.kg)} pts`}
            />
          ))}
          <InfoRow total a="Total da coleta" b={`+${TOTAL_COLETA} pts`} />
        </InfoBox>
        <div style={{ marginTop: 8 }}>
          <Chip>Material limpo · sem contaminação</Chip>
        </div>
      </>,
    ],
    replies: ["Ver meus pontos"],
    next: "pontos",
  },
  pontos: {
    bot: [
      <>
        Sua jornada:
        <div
          style={{
            marginTop: 6,
            background: "#123F23",
            borderRadius: 12,
            padding: 12,
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontWeight: 800, fontSize: 26, color: "#C6DE7A" }}>
              {DEMO.pontos.toLocaleString("pt-BR")}
            </span>
            <span style={{ fontSize: 12, color: "#BFD3A8", fontWeight: 700 }}>
              pontos acumulados
            </span>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 4,
              background: "#2D5A3A",
              marginTop: 8,
            }}
          >
            <div
              style={{
                width: `${PCT}%`,
                height: 8,
                borderRadius: 4,
                background: "#9BC53D",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontSize: 12,
              color: "#BFD3A8",
              fontWeight: 600,
            }}
          >
            <span>{DEMO.nivel}</span>
            <span>próximo marco: {DEMO.meta} pts</span>
          </div>
        </div>
      </>,
      <>
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            color: "#4F7A1E",
            marginBottom: 4,
          }}
        >
          Desafio ativo
        </div>
        <strong>Combo 3 Materiais em 24h.</strong> Deixe 3 tipos de material
        limpo na mesma coleta e ganhe <strong>+450 pts</strong> e R$ 25 de
        desconto no Supermercado Pinheiro.
      </>,
    ],
    replies: ["Aceitar desafio"],
    next: { "Aceitar desafio": "desafio_ok" },
  },
  desafio_ok: {
    bot: [
      <>
        Desafio <strong>aceito</strong>! Complete a coleta com 3 categorias
        limpas em até 24h e o bônus de <strong>+450 pts</strong> cai na sua
        carteira automaticamente.
      </>,
    ],
    replies: ["Começar de novo"],
    next: "start",
  },
};

export const resolveNext = (node: FlowNode, reply: string): string => {
  if (typeof node.next === "string") return node.next;
  if (node.next) return node.next[reply] ?? Object.values(node.next)[0];
  return "start";
};
