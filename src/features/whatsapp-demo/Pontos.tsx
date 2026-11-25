import { ChatShell, Incoming, Outgoing, QuickReplies } from "./chat-kit";
import { DEMO } from "./data";

const VITRINES = [
  ["Dia a dia", "mercados, cafeterias, restaurantes, farmácias"],
  ["Cultura, educação e lazer", "cinema, teatro, cursos"],
  ["IPTU Verde, mobilidade e VIP", "desconto no IPTU, Uber e super vouchers"],
];

export function Pontos() {
  const pct = Math.round((DEMO.pontos / DEMO.meta) * 100);
  return (
    <ChatShell>
      <Outgoing time="09:53">Ver meus pontos</Outgoing>
      <Incoming time="09:53" width={88}>
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
                width: `${pct}%`,
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
      </Incoming>
      <Incoming time="09:53" width={88}>
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
      </Incoming>
      <QuickReplies width={88} items={["Aceitar desafio", "Agora não"]} />
      <Outgoing time="09:54">Vantagens</Outgoing>
      <Incoming time="09:54" width={88}>
        Escolha uma vitrine:
        {VITRINES.map(([titulo, desc]) => (
          <div
            key={titulo}
            style={{
              background: "#F1F5EC",
              borderRadius: 10,
              padding: "9px 12px",
              marginTop: 5,
              fontWeight: 700,
              fontSize: 14,
              color: "#123F23",
            }}
          >
            {titulo}
            <br />
            <span style={{ fontWeight: 600, fontSize: 12, color: "#5F6F5A" }}>
              {desc}
            </span>
          </div>
        ))}
      </Incoming>
    </ChatShell>
  );
}
