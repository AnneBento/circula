# CIRCULA

> *"O que circula transforma."*

![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-v1-FF4154?style=for-the-badge&logo=reactrouter&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Free_Tier-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PWA](https://img.shields.io/badge/Mobile-PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

**CIRCULA** é uma plataforma Mobile PWA de economia circular desenvolvida durante o **Hackathon Estação Tecnológica 2026** (Quixadá/CE). O nome une **circularidade e movimento**, traduzindo uma rede viva onde **materiais recicláveis, pessoas, renda e benefícios circulam** de forma integrada entre cidadãos, catadores, parceiros locais e o poder público.

---

<<<<<<< HEAD
##  O Problema e Nossa Solução
=======
## O Problema e Nossa Solução
>>>>>>> 0fd3f5a (docs: Atualizando documentação do projeto.)

Com a transição do antigo lixão de Quixadá para a nova usina de processamento via Parceria Público-Privada (PPP), o município enfrenta um triplo desafio **social, ambiental e financeiro**:

1. **Social:** Catadores que antes passavam até 10 horas diárias no lixão buscando metais de alto valor (cobre, ferro, alumínio) perdem sua fonte direta de sustento, enquanto o auxílio atual possui cobertura limitada e o programa *Incentivo Verde* enfrenta gargalos logísticos.
2. **Ambiental:** A falta de separação na fonte contamina recicláveis com resíduos orgânicos (gerando chorume no solo) e leva à queima clandestina de cabos plásticos para extração de cobre, emitindo gases tóxicos.
3. **Financeiro:** O processamento de resíduos sólidos representa o maior desembolso financeiro do município. Cada tonelada de material reciclável que chega misturada ao lixo comum gera custo público desnecessário na usina.

### Como o CIRCULA Resolve
O **CIRCULA** intercepta os materiais recicláveis antes que sejam descartados no lixo comum, reorganizando a cadeia em três frentes conectadas:

<<<<<<< HEAD
* ** Ecopontos Centralizados (Gestão AMMA / CONSERCE):** Pontos estratégicos distribuídos pelos bairros de Quixadá, cadastrados e divulgados em tempo real pela administração pública.
* ** Níveis de Confiança & Vouchers (Engajamento Cidadão):** Cidadãos que entregam materiais limpos e separados nos Ecopontos acumulam pontos e sobem de **Nível de Confiança**, desbloqueando vouchers e descontos em parceiros de **educação, entretenimento e comércio local**.
* ** Validação Presencial pelo Catador (Dignidade e Renda):** O catador vinculado ao Ecoponto inspeciona a qualidade do material (garantindo que não haja contaminação orgânica) e registra o peso no aplicativo. Ele recebe matéria-prima limpa e de alto valor (como cobre e eletrônicos) sem precisar queimar plástico, sem depender de atravessadores e gerando histórico auditável de produtividade para políticas públicas.

---

##  Módulos da Aplicação (Mobile PWA)
=======
* **Ecopontos Centralizados (Gestão AMMA / CONSERCE):** Pontos estratégicos distribuídos pelos bairros de Quixadá, cadastrados e divulgados em tempo real pela administração pública.
* **Níveis de Confiança & Vouchers (Engajamento Cidadão):** Cidadãos que entregam materiais limpos e separados nos Ecopontos acumulam pontos e sobem de **Nível de Confiança**, desbloqueando vouchers e descontos em parceiros de **educação, entretenimento e comércio local**.
* **Validação Presencial pelo Catador (Dignidade e Renda):** O catador vinculado ao Ecoponto inspeciona a qualidade do material (garantindo que não haja contaminação orgânica) e registra o peso no aplicativo. Ele recebe matéria-prima limpa e de alto valor (como cobre e eletrônicos) sem precisar queimar plástico, sem depender de atravessadores e gerando histórico auditável de produtividade para políticas públicas.

---

## Módulos da Aplicação (Mobile PWA)
>>>>>>> 0fd3f5a (docs: Atualizando documentação do projeto.)

A aplicação foi projetada com foco *mobile-first* e experiência fluida de aplicativo nativo:

1. **Visão Cidadão (`/cidadao`):**
   * Mapa/lista de Ecopontos ativos em Quixadá com horários e materiais aceitos.
   * Cartão de identidade circular com **Código de Entrega** rápido.
   * Barra de progresso do **Nível de Confiança** (*Nível 1: Iniciante*, *Nível 2: Separador Consciente*, *Nível 3: Guardião de Quixadá*).
   * Vitrine interativa de vouchers desbloqueados conforme o nível atingido.
2. **Visão Catador / Operador (`/catador`):**
   * Terminal ágil de validação de entregas via código do cidadão.
   * Seleção de categoria de material (com valorização diferenciada para Cobre/Fios, Metais, Eletrônicos, Plástico Limpo e Papelão) e pesagem.
   * Cálculo instantâneo de rendimento direto e atualização imediata da pontuação do cidadão.
3. **Painel Centralizado Gestão Pública (`/gestao`):**
   * Cadastro e ativação de novos Ecopontos com publicação instantânea para a comunidade.
   * Indicadores em tempo real: volume total (kg) desviado da usina PPP, economia financeira estimada para os cofres públicos, metais recuperados sem queima e ranking de engajamento.

---

<<<<<<< HEAD
##  Stack Tecnológica
=======
## Stack Tecnológica
>>>>>>> 0fd3f5a (docs: Atualizando documentação do projeto.)

* **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/) (configurado como Mobile PWA instalável).
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) com design system responsivo e de alto contraste para uso em campo.
* **Animações e Microinterações:** [Framer Motion](https://www.framer.com/motion/) para transições de nível, feedback de validação e navegação fluida.
* **Roteamento Tipado:** [TanStack Router](https://tanstack.com/router) com gerenciamento de estado na URL e carregamento otimizado.
* **Backend & Banco de Dados:** [Supabase](https://supabase.com/) (Plano Gratuito) utilizando PostgreSQL relacional e *Supabase Realtime* para sincronização instantânea entre o balcão do Ecoponto, o celular do cidadão e o painel da gestão.

---

<<<<<<< HEAD
##  Estrutura do Projeto
=======
## Estrutura do Projeto
>>>>>>> 0fd3f5a (docs: Atualizando documentação do projeto.)

```text
circula/
├── public/
│   ├── manifest.webmanifest      # Configurações de instalação PWA (ícones, tema, display standalone)
│   └── sw.js                     # Service Worker para cache de ativos essenciais
├── src/
│   ├── components/
│   │   ├── ui/                   # Botões, cards animados (Framer Motion) e badges de nível
│   │   ├── CidadaoView.tsx       # Carteira de confiança, ecopontos e vitrine de vouchers
│   │   ├── CatadorView.tsx       # Validador de triagem limpa e pesagem de materiais
│   │   └── GestaoView.tsx        # Painel AMMA/CONSERCE para cadastro de pontos e métricas
│   ├── lib/
│   │   └── supabase.ts           # Cliente Supabase tipado
│   ├── routes/
│   │   ├── __root.tsx            # Layout base mobile com barra de navegação
│   │   ├── index.tsx             # Landing / Seleção rápida de perfil
│   │   ├── cidadao.tsx           # Rota /cidadao
│   │   ├── catador.tsx           # Rota /catador
│   │   └── gestao.tsx            # Rota /gestao
│   ├── types/
│   │   └── database.ts           # Tipagens TypeScript das entidades do Supabase
│   ├── index.css                 # Importação Tailwind CSS v4 (@import "tailwindcss";)
│   └── main.tsx                  # Ponto de entrada React 19 + RouterProvider
├── .env.example                  # Variáveis de ambiente necessárias
├── package.json
└── vite.config.ts                # Configuração Vite + Tailwind v4 + TanStack Router Plugin
```

---

<<<<<<< HEAD
##  Como Executar Localmente
=======
## Como Executar Localmente
>>>>>>> 0fd3f5a (docs: Atualizando documentação do projeto.)

### Pré-requisitos
* Node.js 20+ instalado
* Conta gratuita no [Supabase](https://supabase.com/)

### Passo a Passo

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone https://github.com/AnneBento/circula
   cd circula
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://sua-instancia.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
   ```

3. **Configure o Banco de Dados no Supabase:**
   Acesse o **SQL Editor** no painel do seu projeto Supabase e execute o script de criação das tabelas (`ecopontos`, `cidadaos`, `depositos` e `vouchers`) e dados iniciais de demonstração.

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:5173` no navegador (recomenda-se ativar o modo de visualização mobile no DevTools ou acessar pelo smartphone na mesma rede para instalar o PWA).

---

## Conformidade com o Edital (Hackathon Estação Tecnológica 2026)

* **Proteção de Dados (LGPD - Lei nº 13.709/2018):** Em estrita observância ao item 8.4 do Edital, este protótipo utiliza exclusivamente dados sintéticos e fictícios para demonstração, sem coleta ou exposição de dados pessoais reais de cidadãos.
* **Transparência Tecnológica e IA (Item 8.2):** Todo o código-fonte foi concebido e desenvolvido durante o período oficial do evento utilizando bibliotecas open-source listadas na seção de Stack Tecnológica e apoio de ferramentas de Inteligência Artificial Generativa para estruturação inicial de componentes, modelagem de dados e revisão documental.
* **Propriedade Intelectual (Item 15.1):** Solução desenvolvida pela equipe participante no âmbito do Hackathon Estação Tecnológica 2026 (HUBINE / Banco do Nordeste, Estação Tecnológica de Quixadá e IFCE Campus Quixadá).

---

## Equipe CIRCULA
- Josias Batista

Desenvolvido para transformar a gestão de resíduos sólidos e valorizar quem faz a reciclagem acontecer em Quixadá e no Sertão Central.

> **CIRCULA — O que circula transforma.**
