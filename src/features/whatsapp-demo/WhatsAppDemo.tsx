import { Cadastro } from "./Cadastro";
import { Rotas } from "./Rotas";
import { Coleta } from "./Coleta";
import { Pontos } from "./Pontos";

const TELAS = [
  ["1 · Cadastro e rota", Cadastro],
  ["2 · Rotas e dias de coleta", Rotas],
  ["3 · Confirmar coleta e pontos", Coleta],
  ["4 · Pontuação e vantagens", Pontos],
] as const;

export function WhatsAppDemo() {
  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        padding: 32,
        flexWrap: "wrap",
        justifyContent: "center",
        background: "#F7FAF2",
        minHeight: "100vh",
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
  );
}
