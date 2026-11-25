// Dados FICTÍCIOS de demonstração (edital item 8.4).
export const DEMO = {
  nome: "Carlos",
  rota: "Rota 3 · Campo Novo",
  dias: ["terça", "sexta"],
  janela: "8h às 11h",
  codigo: "QXD-2026",
  pontos: 1110,
  meta: 1500,
  nivel: "Nível 4 · Guardião",
} as const;
// Pontos por kg (README / app).
export const PTS_POR_KG: Record<string, number> = {
  "Cobre e fios": 80,
  "Eletrônicos": 50,
  "Metais": 35,
  "Plástico limpo": 20,
};
export const pontosDe = (material: string, kg: number) =>
  Math.round((PTS_POR_KG[material] ?? 0) * kg);
export const fmtKg = (kg: number) => kg.toFixed(1).replace(".", ",");
