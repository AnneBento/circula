# CIRCULA

> *"O que circula transforma."*

**CIRCULA** é uma plataforma Mobile PWA de economia circular desenvolvida durante o **Hackathon Estação Tecnológica 2026** (Quixadá/CE). O nome une **circularidade e movimento**, traduzindo uma rede viva onde **materiais recicláveis, pessoas, renda e benefícios circulam** de forma integrada entre cidadãos, catadores, parceiros locais e o poder público.

## O Problema e Nossa Solução

Com a transição do antigo lixão de Quixadá para a nova usina de processamento via Parceria Público-Privada (PPP), o município enfrenta um triplo desafio **social, ambiental e financeiro**:

1. **Social:** Catadores que antes passavam até 10 horas diárias no lixão buscando metais de alto valor (cobre, ferro, alumínio) perdem sua fonte direta de sustento, enquanto o auxílio atual possui cobertura limitada e o programa *Incentivo Verde* enfrenta gargalos logísticos.

2. **Ambiental:** A falta de separação na fonte contamina recicláveis com resíduos orgânicos (gerando chorume no solo) e leva à queima clandestina de cabos plásticos para extração de cobre, emitindo gases tóxicos.

3. **Financeiro:** O processamento de resíduos sólidos representa o maior desembolso financeiro do município. Cada tonelada de material reciclável que chega misturada ao lixo comum gera custo público desnecessário na usina.

### Como o CIRCULA Resolve

O **CIRCULA** intercepta os materiais recicláveis antes que sejam descartados no lixo comum, reorganizando a cadeia em três frentes conectadas:

* **Ecopontos Centralizados (Gestão AMMA / CONSERCE):** Pontos estratégicos distribuídos pelos bairros de Quixadá, cadastrados e divulgados em tempo real pela administração pública.

* **Jornada em 5 Níveis & Clube de Vantagens:** Cidadãos que entregam materiais limpos nos Ecopontos acumulam pontos e evoluem nos **5 Níveis de Participação** (*Semente, Broto, Árvore, Guardião e Embaixador*), desbloqueando cupons no comércio local, cultura, lazer, mobilidade (Uber) e descontos no **IPTU Verde**.

* **Validação Presencial pelo Catador (Dignidade e Renda):** O catador vinculado ao Ecoponto inspeciona a qualidade do material (garantindo 0% de contaminação orgânica) e registra o peso no aplicativo. Ele recebe matéria-prima limpa e de alto valor (como cobre e eletrônicos) sem precisar queimar plástico, sem depender de atravessadores e gerando histórico auditável de produtividade para políticas públicas.

## Módulos da Aplicação (Mobile PWA)

A aplicação foi projetada com foco *mobile-first* e experiência fluida de aplicativo nativo:

1. **Tela Inicial & Vitrine de Benefícios (`/`):**

   * **Painel Interativo com 3 Linhas de Carrossel:**

     * *Linha 1 (Dia a Dia):* Papelarias, cafeterias, restaurantes, mercados, hortifrúti orgânico, drogarias e comércio local.

     * *Linha 2 (Cultura, Educação & Lazer):* Meia-entrada em cinemas, teatro, eventos culturais, mensalidades promocionais em academias, clubes de lazer e bolsas em cursos de idiomas/TI.

     * *Linha 3 (IPTU Verde, Mobilidade & VIP):* Abatimento de até 10% a 15% no **IPTU Verde** (residencial e comercial), corrida grátis e pacotes de desconto no **Uber**, e Super Vouchers de alto valor (`R$ 100` e `R$ 250`).

   * Modal de pré-visualização detalhada com regras de troca, parceiro e requisito de nível.

2. **Visão Cidadão (`/cidadao`):**

   * Lista de Ecopontos ativos em Quixadá com lotação em tempo real, horários e materiais aceitos.

   * Cartão de identidade circular com **Código de Entrega** rápido.

   * Barra de progresso da jornada de participação e carteira de resgate de vouchers.

3. **Visão Catador / Operador (`/catador`):**

   * Terminal ágil de validação de entregas via código do cidadão e checklist de qualidade limpa.

   * Seleção de categoria de material (valorização diferenciada para **Cobre/Fios**, **Eletrônicos**, **Metais**, **Plástico Limpo** e **Papelão**) e pesagem.

   * Cálculo instantâneo de rendimento direto e atualização imediata da pontuação do cidadão.

4. **Painel Centralizado Gestão Pública (`/gestao`):**

   * Cadastro e ativação de novos Ecopontos com publicação instantânea para a comunidade.

   * Indicadores em tempo real: volume total (kg) desviado da usina PPP, economia financeira estimada para os cofres públicos, metais recuperados sem queima e ranking de engajamento.

## Stack Tecnológica

* **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/) (configurado como Mobile PWA instalável).

* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) com design system responsivo e de alto contraste para uso em campo.

* **Animações e Microinterações:** [Framer Motion](https://www.framer.com/motion/) para carrosséis, modais, transições de nível e feedback tátil.

* **Roteamento Tipado:** [TanStack Router](https://tanstack.com/router) com gerenciamento de estado na URL e carregamento otimizado.

* **Backend & Banco de Dados:** [Supabase](https://supabase.com/) (Plano Gratuito) utilizando PostgreSQL relacional e *Supabase Realtime* para sincronização instantânea entre o balcão do Ecoponto, o celular do cidadão e o painel da gestão.

## Estrutura do Projeto

```
circula/
├── public/
│   ├── manifest.webmanifest      # Configurações de instalação PWA (ícones, tema, display standalone)
│   ├── sw.js                     # Service Worker para cache de ativos essenciais
│   ├── icon-192.svg              # Ícone PWA 192x192
│   └── icon-512.svg              # Ícone PWA 512x512
├── supabase/
│   └── schema.sql                # Script SQL das tabelas, RLS, Realtime e dados demo
├── src/
│   ├── components/
│   │   ├── ui/Badges.tsx         # Badges visuais dos níveis da jornada
│   │   ├── CidadaoView.tsx       # Carteira circular, ecopontos e resgate de vouchers
│   │   ├── CatadorView.tsx       # Validador de triagem limpa e pesagem de materiais
│   │   └── GestaoView.tsx        # Painel AMMA/CONSERCE para cadastro de pontos e métricas
│   ├── lib/
│   │   ├── circulaStore.tsx      # Estado global híbrido (Demo Local + Supabase Realtime)
│   │   └── supabase.ts           # Cliente Supabase tipado
│   ├── routes/
│   │   ├── __root.tsx            # Layout base mobile com barra de navegação
│   │   ├── index.tsx             # Home com 3 carrosséis de cupons, IPTU Verde e perfis
│   │   ├── cidadao.tsx           # Rota /cidadao
│   │   ├── catador.tsx           # Rota /catador
│   │   └── gestao.tsx            # Rota /gestao
│   ├── types/
│   │   └── database.ts           # Tipagens TypeScript e tabelas de pontuação/preços
│   ├── index.css                 # Importação Tailwind CSS v4 (@import "tailwindcss";)
│   └── main.tsx                  # Ponto de entrada React 19 + RouterProvider
├── .env.example                  # Variáveis de ambiente necessárias
├── .gitignore                    # Arquivos e pastas ignorados pelo Git (node_modules, .env, dist)
├── package.json
└── vite.config.ts                # Configuração Vite + Tailwind v4 + TanStack Router Plugin

```

## Como Executar Localmente

### Pré-requisitos

* Node.js 20+ instalado

* Conta gratuita no [Supabase](https://supabase.com/) (opcional para rodar em modo demo local)

### Passo a Passo

1. **Clone o repositório e instale as dependências:**

   ```
   git clone https://github.com/AnneBento/circula
   cd circula
   npm install
   
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

   ```
   VITE_SUPABASE_URL=https://sua-instancia.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
   
   ```

3. **Configure o Banco de Dados no Supabase:**
   Acesse o **SQL Editor** no painel do seu projeto Supabase e execute o script `supabase/schema.sql` para criar as tabelas (`ecopontos`, `cidadaos`, `depositos` e `vouchers`) e os dados iniciais de demonstração.

4. **Inicie o servidor de desenvolvimento:**

   ```
   npm run dev
   
   ```

   Acesse `http://localhost:5173` no navegador (recomenda-se ativar o modo de visualização mobile no DevTools ou acessar pelo smartphone na mesma rede para instalar o PWA).

## Conformidade com o Edital (Hackathon Estação Tecnológica 2026)

* **Proteção de Dados (LGPD - Lei nº 13.709/2018):** Em estrita observância ao item 8.4 do Edital, este protótipo utiliza exclusivamente dados sintéticos e fictícios para demonstração, sem coleta ou exposição de dados pessoais reais de cidadãos.

* **Transparência Tecnológica e IA (Item 8.2):** Todo o código-fonte foi concebido e desenvolvido durante o período oficial do evento utilizando bibliotecas open-source listadas na seção de Stack Tecnológica e apoio de ferramentas de Inteligência Artificial Generativa para estruturação inicial de componentes, modelagem de dados e revisão documental.

* **Propriedade Intelectual (Item 15.1):** Solução desenvolvida pela equipe participante no âmbito do Hackathon Estação Tecnológica 2026 (HUBINE / Banco do Nordeste, Estação Tecnológica de Quixadá e IFCE Campus Quixadá).

## Equipe CIRCULA

* **Josias Batista** — Desenvolvimento Front-end, Arquitetura PWA & Integração

* **Anne Bento** — Desenvolvimento Front-end, UI/UX & Experiência do Usuário

Desenvolvido para transformar a gestão de resíduos sólidos e valorizar quem faz a reciclagem acontecer em Quixadá e no Sertão Central.

> **CIRCULA — O que circula transforma.**
