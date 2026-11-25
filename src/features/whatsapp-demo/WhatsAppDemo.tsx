import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChatShell, DateChip, Incoming, Outgoing, QuickReplies } from "./chat-kit";
import { FLOW, resolveNext } from "./chat-flow";

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
        justifyContent: "center",
        padding: "8px 0 96px",
        background: "#F7FAF2",
        minHeight: "100%",
      }}
    >
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
    </div>
  );
}
