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
import { DEMO, PTS_POR_KG } from "./data";

export function Rotas() {
  return (
    <ChatShell>
      <DateChip>Segunda-feira</DateChip>
      <Outgoing time="18:02">Quando passa a coleta?</Outgoing>
      <Incoming time="18:02">
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
      </Incoming>
      <Incoming time="18:02" width={84}>
        Quer receber um aviso na véspera de cada coleta?
      </Incoming>
      <QuickReplies width={84} items={["Sim, avisar", "Só no dia"]} />
      <Outgoing time="18:03">Sim, avisar</Outgoing>
      <Incoming time="18:03" width={84}>
        Combinado. Eu aviso e pergunto se você vai ter material. Assim a
        equipe sabe se vale parar na sua casa.
      </Incoming>
      <Incoming time="18:03" width={88}>
        O que entra na coleta:
        <InfoBox>
          {Object.entries(PTS_POR_KG).map(([nome, pts]) => (
            <InfoRow key={nome} a={nome} b={`${pts} pts/kg`} />
          ))}
        </InfoBox>
      </Incoming>
    </ChatShell>
  );
}
