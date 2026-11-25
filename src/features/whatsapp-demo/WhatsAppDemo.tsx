import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChatShell, DateChip, Incoming, Outgoing, QuickReplies } from "./chat-kit";
import { FLOW, resolveNext } from "./chat-flow";
import { Cadastro } from "./Cadastro";
import { Rotas } from "./Rotas";
import { Coleta } from "./Coleta";
import { Pontos } from "./Pontos";

interface Entry {
  from: "bot" | "user";
  content: ReactNode;
  time: string;
}

interface FlowState {
  log: Entry[];
  replies: string[];
  step: string;
  clock: number;
}

const makeTime = (clock: number) => {
  const total = 9 * 60 + 12 + clock;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const enterNode = (id: string, prev: FlowState, reply?: string): FlowState => {
  const node = FLOW[id];
  const log = [...prev.log];
  let clock = prev.clock;
  if (reply) {
    log.push({ from: "user", content: reply, time: makeTime(clock++) });
  }
  for (const content of node.bot) {
    log.push({ from: "bot", content, time: makeTime(clock++) });
  }
  return { log, replies: node.replies ?? [], step: id, clock };
};

const INITIAL: FlowState = enterNode("start", {
  log: [],
  replies: [],
  step: "start",
  clock: 0,
});

const TELAS = [
  ["1 · Cadastro e rota", Cadastro],
  ["2 · Rotas e dias de coleta", Rotas],
  ["3 · Confirmar coleta e pontos", Coleta],
  ["4 · Pontuação e vantagens", Pontos],
] as const;

export function WhatsAppDemo() {
  const [state, setState] = useState<FlowState>(INITIAL);
  const [input, setInput] = useState("");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state]);

  const onReply = (reply: string) => {
    setState((prev) => {
      const next = resolveNext(FLOW[prev.step], reply);
      return enterNode(next, prev, reply);
    });
  };

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setState((prev) => {
      const log = [...prev.log];
      let clock = prev.clock;
      log.push({ from: "user", content: text, time: makeTime(clock++) });
      log.push({
        from: "bot",
        content: "Não entendi 🤔 Toque em uma das opções abaixo para continuar.",
        time: makeTime(clock++),
      });
      return { ...prev, log, clock };
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        padding: "32px 32px 96px",
        background: "#F7FAF2",
        minHeight: "100vh",
      }}
    >
      <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="/logo.png" alt="CIRCULA" width={44} height={48} />
        <div>
          <h2
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: 20,
              color: "#123F23",
              margin: 0,
            }}
          >
            Bot Circula · protótipo interativo
          </h2>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: 13,
              color: "#5F6F5A",
              margin: "2px 0 0",
            }}
          >
            Toque nas respostas ou digite uma mensagem · dados fictícios
          </p>
        </div>
      </header>

      <ChatShell
        scrollRef={mainRef}
        footer={
          <form
            onSubmit={onSend}
            style={{ display: "flex", gap: 8, flex: 1 }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mensagem"
              aria-label="Mensagem"
              style={{
                flex: 1,
                minWidth: 0,
                border: "1px solid #D9E3CF",
                borderRadius: 22,
                padding: "11px 16px",
                fontSize: 15,
                fontFamily: "inherit",
                background: "#fff",
              }}
            />
            <button
              type="submit"
              style={{
                border: 0,
                borderRadius: 22,
                padding: "11px 18px",
                fontWeight: 800,
                fontSize: 14,
                fontFamily: "inherit",
                background: "#123F23",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Enviar
            </button>
          </form>
        }
      >
        <DateChip>Hoje</DateChip>
        {state.log.map((entry, i) =>
          entry.from === "bot" ? (
            <Incoming key={i} time={entry.time}>
              {entry.content}
            </Incoming>
          ) : (
            <Outgoing key={i} time={entry.time}>
              {entry.content}
            </Outgoing>
          )
        )}
        {state.replies.length > 0 && (
          <QuickReplies width={88} items={state.replies} onSelect={onReply} />
        )}
      </ChatShell>

      <section style={{ width: "100%" }}>
        <h3
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: 14,
            color: "#123F23",
            textAlign: "center",
            margin: "0 0 16px",
          }}
        >
          Telas de referência (fixtures)
        </h3>
        <div
          style={{
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {TELAS.map(([titulo, Tela]) => (
            <section key={titulo}>
              <h2
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: 14,
                  color: "#123F23",
                  marginBottom: 8,
                }}
              >
                {titulo}
              </h2>
              <Tela />
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
