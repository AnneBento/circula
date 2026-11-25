import {
  ChatShell,
  DateChip,
  Incoming,
  Outgoing,
  QuickReplies,
  InfoBox,
  InfoRow,
} from "./chat-kit";
import { DEMO } from "./data";

export function Cadastro() {
  return (
    <ChatShell>
      <DateChip>Protótipo · dados fictícios</DateChip>
      <Outgoing time="09:12">Quero a coleta seletiva</Outgoing>
      <Incoming time="09:12" width={84}>
        Oi! Aqui é o Circula, a coleta seletiva de Quixadá. Vou cadastrar sua
        casa na rota do seu bairro. Seus dados só servem para a coleta e para
        os seus pontos (LGPD).
      </Incoming>
      <Incoming time="09:12" width={84}>Em qual bairro você mora?</Incoming>
      <QuickReplies
        width={84}
        items={["Campo Novo", "Centro", "Cedro", "Ver todos os bairros"]}
      />
      <Outgoing time="09:13">Campo Novo</Outgoing>
      <Incoming time="09:13">
        Pronto, {DEMO.nome}! Sua casa entrou na <strong>{DEMO.rota}</strong>.
        <InfoBox>
          <InfoRow a="Coleta" b={DEMO.dias.join(" e ")} />
          <InfoRow a="Janela" b={DEMO.janela} />
          <InfoRow a="Seu código" b={DEMO.codigo} />
        </InfoBox>
        <div style={{ marginTop: 6, fontSize: 12, color: "#5F6F5A" }}>
          Dias e horários de exemplo. Valem os definidos pela AMMA.
        </div>
      </Incoming>
      <QuickReplies items={["Abrir meu app", "Como separar o material"]} />
    </ChatShell>
  );
}
