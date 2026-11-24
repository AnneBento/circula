# CIRCULA

> "O que circula transforma."

Automação de WhatsApp para catadores, associação, gestores públicos e população, integrada a um painel de gestão e a um aplicativo web (PWA) para cidadãos que desejam acompanhar seu impacto ambiental e comprovar participação no IPTU Verde.

Projeto concebido e desenvolvido durante o **Hackathon Estação Tecnológica 2026** (Quixadá/CE), realizado pelo HUBINE (Banco do Nordeste), Estação Tecnológica de Quixadá e IFCE Campus Quixadá.

## Proposta de Valor Única

> "Um número de WhatsApp que organiza a coleta seletiva inteira: avisa o morador, orienta o catador e dá os dados ao gestor."

* **Zero barreira de entrada:** Funciona sem exigir instalação de aplicativo pela maioria da população e sem exigir smartphones avançados dos catadores.
* **Inclusão com protagonismo da associação:** Opera em conjunto com a associação de catadores e a Autarquia Municipal do Meio Ambiente (AMMA), fortalecendo o trabalho coletivo sem "uberizar" a categoria.
* **Engajamento progressivo:** Para moradores que desejam ir além, o aplicativo web (PWA) oferece acompanhamento de impacto ambiental, acúmulo de pontos e comprovação auditável de peso e rota por domicílio para o **IPTU Verde**.
* **Conceito de alto nível:** Une a lógica operacional do Re-ciclo (Fortaleza) com a simplicidade do agendamento por WhatsApp (São Luís), adaptado à realidade de Quixadá sem depender de triciclos ou infraestrutura complexa.

## O Problema e Alternativas Existentes

### Dores Identificadas
1. **Desinformação e baixa cobertura:** A população não sabe os dias de coleta, o que separar nem como solicitar o recolhimento. Atualmente, a coleta seletiva cobre apenas 5 bairros e possui baixa divulgação.
2. **Operação manual e sem rastreabilidade:** Os catadores mobilizam-se manualmente em grupos de WhatsApp da associação e da AMMA, sem registro estruturado do que foi coletado.
3. **Ausência de dados para gestão:** A associação e os gestores públicos não dispõem de indicadores consolidados de peso, rota e renda para planejar operações, remunerar com precisão e comprovar resultados ambientais e financeiros.
4. **Falta de incentivo contínuo:** Os Pontos de Entrega Voluntária (PEVs) foram depredados e não houve adoção sustentável por parte da população.

### Alternativas Existentes Mapeadas
* **Em Quixadá:** Grupos manuais de WhatsApp, coleta com carrinhos em 5 bairros, PEVs depredados e auxílio municipal de R$ 300,00 restrito a parte dos catadores.
* **Referências externas:** Re-ciclo (Fortaleza), Cataki e agendamento via WhatsApp (São Luís).

## Solução e Arquitetura Funcional

O **CIRCULA** organiza a cadeia de reciclagem em quatro frentes integradas, além de uma segunda fase voltada ao beneficiamento de metais:

1. **WhatsApp da População (Bot Automatizado):**
   * Informa o dia e turno da coleta seletiva no bairro do morador.
   * Envia lembretes automáticos e orientações práticas sobre como separar resíduos secos (evitando contaminação orgânica e chorume).
   * Permite solicitar coleta sob demanda de forma conversacional, sem baixar nenhum aplicativo.
2. **WhatsApp de Catadores e Associação:**
   * Gera listas de rotas e avisos prontos para o coordenador encaminhar diretamente aos grupos já utilizados pelos catadores.
   * Organiza as solicitações por proximidade e turno, otimizando o tempo de trabalho em campo.
3. **Painel dos Gestores (Associação e AMMA):**
   * Registro de pesagem dos materiais recolhidos por rota e por catador.
   * Geração de relatório transparente de produtividade e pagamento.
   * Monitoramento em tempo real de quilogramas e toneladas desviadas do aterro/usina e economia financeira gerada ao município.
4. **App Web / PWA para a População Engajada:**
   * Painel individual com histórico de entregas, impacto ambiental gerado e pontuação acumulada.
   * Emissão de comprovante de participação recorrente na coleta seletiva para habilitação no **IPTU Verde** e benefícios em comércios parceiros.
5. **Roadmap Fase 2 (Beneficiamento de Metais):**
   * Implantação de ponto especializado de recebimento de metais e disponibilização de descascador mecânico de fios na associação, eliminando a queima clandestina de plástico para extração de cobre e aumentando a margem de venda direta.

## Público, Canais e Vantagem Competitiva

### Segmentos de Clientes e Adotantes Iniciais
* **Contratantes e Parceiros:** AMMA, Prefeitura de Quixadá e estabelecimentos comerciais integrantes do *Recicla Comércio*.
* **Operação:** Associação de catadores, coordenador operacional e gestores públicos.
* **Catadores:** Recebem rotas estruturadas e avisos diretamente nos grupos de WhatsApp.
* **População:** Atendimento universal via WhatsApp, com migração opcional para o App PWA pelos moradores mais engajados.
* **Adotantes Iniciais (Early Adopters):** Associação e catadores já organizados em grupos, moradores dos 5 bairros com coleta seletiva atual, escolas locais e cidadãos interessados nos descontos do IPTU Verde.

### Canais de Aquisição e Mobilização
* QR Code e link direto do WhatsApp impressos em materiais de escolas, comércios parceiros e contas de água ou IPTU.
* Cadastro ativo realizado pelos próprios catadores durante as abordagens porta a porta.
* Divulgação nos grupos de WhatsApp já existentes da associação e da AMMA.
* Campanhas locais via carro de som, rádio comunitária e redes oficiais da Prefeitura.
* Convite automatizado enviado pelo próprio bot do WhatsApp para moradores que participam com frequência conhecerem o App PWA.

### Vantagem Competitiva
* **Adoção imediata:** Utiliza o canal de comunicação (WhatsApp) que catadores, coordenadores e AMMA já dominam e validaram em campo.
* **Proteção social:** Opera sob gestão da associação de catadores, evitando a precarização ou uberização do trabalho.
* **Lastro para políticas públicas:** Gera dados auditáveis de peso e rota por domicílio que servem como prova documental para concessão do IPTU Verde.
* **Inclusão digital real:** Funciona integralmente sem aplicativo para a maioria da população; o app atua como camada complementar de engajamento.

## Métricas-Chave e Sustentabilidade

### Indicadores de Desempenho (KPIs)
* Total de moradores cadastrados no WhatsApp e percentual que solicita coleta regularmente.
* Produtividade operacional medida em quilogramas coletados por hora de trabalho do catador.
* Volume total de toneladas desviadas por mês e economia financeira gerada por tonelada ao município.
* Número de catadores com renda e produtividade formalmente registradas.
* Usuários ativos no App PWA e taxa de conversão a partir do canal WhatsApp.

### Modelo de Receita e Estrutura de Custos

| Dimensão | Componentes Previstos |
| :--- | :--- |
| **Fontes de Receita** | Convênio com a AMMA ou Prefeitura (mensalidade ou remuneração por tonelada desviada); adesão e patrocínio de comércios parceiros; captação via verbas e editais (Auxílio Catador, PSA Estadual, Cataforte); e, na Fase 2, venda direta de metais e cobre limpo pela associação. |
| **Estrutura de Custos** | Desenvolvimento e manutenção do bot de WhatsApp, painel gestor e App PWA; custos de mensageria da API oficial do WhatsApp; hospedagem em nuvem, suporte e conta comercial verificada; aquisição de balança, computador e treinamento do coordenador na associação; e ações de mobilização (cartazes, QR codes, carro de som e visitas). |

## Stack Tecnológica do MVP

* **Frontend (Painel Gestor e App PWA):** React 19, TypeScript e Vite, estruturados como Progressive Web App (PWA) instalável.
* **Interface e Animações:** Tailwind CSS v4 para estilização responsiva de alto contraste, TanStack Router para roteamento tipado entre visões e Framer Motion para transições e microinterações.
* **Backend, Banco de Dados e Automação:** Supabase (PostgreSQL, Supabase Realtime para atualização ao vivo entre pesagem e painel gestor, e Edge Functions para integração com webhook da API do WhatsApp).

## Estrutura do Projeto

```text
circula/
├── public/
│   ├── manifest.webmanifest      # Configuração de instalação Mobile PWA
│   └── sw.js                     # Service Worker para cache básico
├── src/
│   ├── components/
│   │   ├── GestorPanel.tsx       # Registro de pesagem, rotas e economia municipal
│   │   ├── CidadaoApp.tsx        # Extrato de impacto, pontuação e comprovante IPTU Verde
│   │   └── WhatsAppSim.tsx       # Simulador interativo do fluxo conversacional para demonstração
│   ├── lib/
│   │   └── supabase.ts           # Cliente Supabase tipado
│   ├── routes/
│   │   ├── __root.tsx            # Layout base e navegação
│   │   ├── index.tsx             # Visão geral e acesso rápido aos módulos
│   │   ├── gestor.tsx            # Rota /gestor
│   │   └── app.tsx               # Rota /app
│   ├── index.css                 # Configuração Tailwind CSS v4
│   └── main.tsx                  # Ponto de entrada React 19 + TanStack Router
├── .env.example
├── package.json
└── vite.config.ts
```

## Como Executar Localmente

1. **Instale as dependências:**
   ```bash
   git clone https://github.com/seu-usuario/circula.git
   cd circula
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as credenciais da sua instância gratuita do Supabase:
   ```env
   VITE_SUPABASE_URL=https://sua-instancia.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
   ```

3. **Inicie o ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```

## Conformidade com o Edital (Hackathon Estação Tecnológica 2026)

* **Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018):** Em atendimento ao item 8.4 do Edital, este protótipo utiliza exclusivamente dados sintéticos e fictícios para demonstração de rotas, pesagens e cadastros, sem coleta ou exposição de dados pessoais reais.
* **Transparência Tecnológica e Uso de IA (Item 8.2):** Todo o código-fonte deste MVP foi concebido e desenvolvido durante o período oficial do evento utilizando bibliotecas de código aberto e ferramentas de inteligência artificial generativa (Google Gemini) como suporte na estruturação de código, síntese documental e revisão técnica.
