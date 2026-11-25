import type { ReactNode, RefObject } from "react";

const SHADOW = "0 1px 1px rgba(18,63,35,.12)";
const FONT = "Nunito, system-ui, sans-serif";

function Logo() {
  return (
    <img
      src="/logo.png"
      alt="CIRCULA"
      width={30}
      height={30}
      style={{ objectFit: "contain" }}
    />
  );
}
export function ChatShell({
  children,
  scrollRef,
  footer,
}: {
  children: ReactNode;
  scrollRef?: RefObject<HTMLElement | null>;
  footer?: ReactNode;
}) {
  return (
    <div
      style={{
        width: 400,
        height: 860,
        boxSizing: "border-box",
        border: "3px solid #1B4D2B",
        borderRadius: 40,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "#E8EFDD",
        fontFamily: FONT,
        color: "#1B2A22",
      }}
    >
      <header
        style={{
          background: "#123F23",
          padding: "22px 16px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flex: "none",
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            background: "#F1F5EC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: "#fff" }}>
            Circula ✔
          </div>
          <div style={{ fontSize: 12, color: "#BFD3A8", fontWeight: 600 }}>
            rede oficial AMMA / CONSERCE
          </div>
        </div>
      </header>
      <main
        ref={scrollRef}
        style={{
          flex: 1,
          minHeight: 0,
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          overflowY: "auto",
        }}
      >
        {children}
      </main>
      <footer
        style={{
          background: "#F1F5EC",
          padding: "10px 12px 18px",
          display: "flex",
          gap: 8,
          flex: "none",
        }}
      >
        {footer ?? (
          <input
            type="text"
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
        )}
      </footer>
      <div
        style={{
          position: "absolute",
          inset: 5,
          pointerEvents: "none",
          border: "1.5px dashed #7C9A6A",
          borderRadius: 34,
        }}
      />
    </div>
  );
}
export const DateChip = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      alignSelf: "center",
      background: "#F7FAF2",
      borderRadius: 8,
      padding: "4px 10px",
      fontSize: 12,
      color: "#4A5A50",
      fontWeight: 700,
    }}
  >
    {children}
  </div>
);
export function Incoming({
  time,
  children,
  width = 86,
}: {
  time: string;
  children: ReactNode;
  width?: number;
}) {
  return (
    <div
      style={{
        alignSelf: "flex-start",
        width: `${width}%`,
        background: "#fff",
        borderRadius: "4px 16px 16px 16px",
        padding: "9px 12px 6px",
        boxShadow: SHADOW,
        fontSize: 15,
        lineHeight: 1.35,
      }}
    >
      {children}
      <div style={{ textAlign: "right", fontSize: 11, color: "#6B7A66", marginTop: 3 }}>
        {time}
      </div>
    </div>
  );
}
export function Outgoing({ time, children }: { time: string; children: ReactNode }) {
  return (
    <div
      style={{
        alignSelf: "flex-end",
        maxWidth: "78%",
        background: "#D5E6A8",
        borderRadius: "16px 4px 16px 16px",
        padding: "9px 12px 6px",
        boxShadow: SHADOW,
        fontSize: 15,
        lineHeight: 1.35,
      }}
    >
      {children}
      <div style={{ textAlign: "right", fontSize: 11, color: "#5F6F5A", marginTop: 3 }}>
        {time} <span style={{ color: "#2F8F4E" }}>✓✓</span>
      </div>
    </div>
  );
}
export function QuickReplies({
  items,
  width = 86,
  onSelect,
}: {
  items: string[];
  width?: number;
  onSelect?: (item: string) => void;
}) {
  return (
    <div
      style={{
        alignSelf: "flex-start",
        width: `${width}%`,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginTop: -2,
      }}
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect?.(item)}
          style={{
            border: 0,
            background: "#fff",
            borderRadius: 12,
            padding: 11,
            font: `800 14px ${FONT}`,
            color: "#1F6B3A",
            boxShadow: SHADOW,
            width: "100%",
            cursor: "pointer",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
export const Chip = ({
  children,
  white,
}: {
  children: ReactNode;
  white?: boolean;
}) => (
  <span
    style={{
      background: white ? "#fff" : "#D8EBC0",
      color: white ? "#123F23" : "#2F5D1E",
      borderRadius: 10,
      padding: "2px 8px",
      fontSize: 12,
      fontWeight: 700,
    }}
  >
    {children}
  </span>
);

export const InfoBox = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      marginTop: 8,
      background: "#F1F5EC",
      borderRadius: 12,
      padding: "10px 12px",
      fontSize: 14,
    }}
  >
    {children}
  </div>
);

export const InfoRow = ({
  a,
  b,
  total,
}: {
  a: string;
  b: string;
  total?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      marginTop: total ? 8 : 6,
      paddingTop: total ? 8 : 0,
      borderTop: total ? "1px solid #D0DDC0" : undefined,
      fontWeight: total ? 800 : 700,
      color: total ? "#1F6B3A" : "#123F23",
    }}
  >
    <span>{a}</span>
    <span>{b}</span>
  </div>
);
