import {
  ChatShell,
  DateChip,
  Incoming,
  Outgoing,
  QuickReplies,
  Chip,
  InfoBox,
  InfoRow,
} from "./chat-kit";
import { fmtKg, pontosDe } from "./data";

const ITENS = [
  { material: "Metais", kg: 2.0 },
  { material: "Plástico limpo", kg: 3.0 },
];

export function Coleta() {
  const total = ITENS.reduce((s, i) => s + pontosDe(i.material, i.kg), 0);
  return (
    <ChatShell>
      <DateChip>Terça-feira</DateChip>
      <Incoming time="07:00" width={88}>
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
        Bom dia, Carlos! A coleta passa hoje entre <strong>8h e 11h</strong>.
        Vai ter material para entregar?
      </Incoming>
      <QuickReplies width={88} items={["Sim, vou deixar", "Hoje não"]} />
      <Outgoing time="07:04">Sim, vou deixar</Outgoing>
      <Incoming time="07:04">
        Coleta <strong>confirmada</strong> para a sua casa. Deixe o material
        limpo e seco na calçada, separado por tipo. Eu aviso quando a equipe
        estiver perto.
      </Incoming>
      <Incoming time="09:40" width={84}>
        A equipe da Rota 3 está a 3 casas da sua. Pode deixar o material na
        calçada.
      </Incoming>
      <Incoming time="09:52" width={88}>
        Coleta <strong>feita</strong>. Material conferido e pesado pela equipe:
        <InfoBox>
          {ITENS.map((i) => (
            <InfoRow
              key={i.material}
              a={`${i.material} · ${fmtKg(i.kg)} kg`}
              b={`+${pontosDe(i.material, i.kg)} pts`}
            />
          ))}
          <InfoRow total a="Total da coleta" b={`+${total} pts`} />
        </InfoBox>
        <div style={{ marginTop: 8 }}>
          <Chip>Material limpo · sem contaminação</Chip>
        </div>
      </Incoming>
      <QuickReplies width={88} items={["Ver meus pontos", "Não coletaram tudo"]} />
    </ChatShell>
  );
}
