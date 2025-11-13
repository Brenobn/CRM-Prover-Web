# CRM Prover Web - Painel Administrativo do Fornecedor

## Visao Geral

O **CRM Prover Web** e um painel administrativo white-label voltado a fornecedores integrados ao ecossistema CRM Prover. A aplicação oferece experiencia consistente com o portal principal, permitindo customizações de branding, fluxos operacionais e niveis de acesso. Todo o front-end foi construido com tecnologias modernas (React 19, Vite 7 e TypeScript) para garantir desempenho, manutencao agil e escalabilidade.

## Stack e Ferramentas

- **React 19 + Vite 7** - SPA moderna, HMR rapido e build otimizado.
- **TypeScript 5.8** - tipagem estatica e DX aprimorada.
- **Tailwind CSS 4 + shadcn/ui + Radix UI** - sistema de design componivel, acessivel e responsivo.
- **React Hook Form + Zod** - formularios performaticos com validacao declarativa.
- **TanStack Table, jsPDF, XLSX** - listagens com filtros/exportacao para PDF/Excel.
- **Axios + React Router 7** - consumo de APIs REST e protecao de rotas.
- **ESLint + Typescript-ESLint** - padronizacao e gate de qualidade no CI.
- **SonarQube** - analise estatica continua em todas as integracoes.

## Estrutura do Projeto

```
src/
 +- components/        # formularios (UsersForm, LeadsForm, etc.), layout e UI primitives
 +- components/ui/     # biblioteca shadcn/ui adaptada (inputs, select, dialog, tabs, etc.)
 +- hooks/             # useAuth, useTheme e outros hooks compartilhados
 +- lib/               # utilitarios e helpers compartilhados
 +- pages/             # telas de alto nivel (SignIn, dashboards, cadastros)
 +- routes/            # controle de rotas e guards (ProtectedRoute)
 +- main.tsx / app.tsx # bootstrap da aplicacao
```

- **Core/Shared**: componentes globais de layout (Sidebar, Header) e servicos base.
- **Modules**: telas de negocio (dashboard, gestao de usuarios, leads, atividades, clientes).
- **UI**: abstracoes em cima de Radix UI com estilizacao Tailwind consistente.

## Funcionalidades

- **Dashboard Operacional**: indicadores de desempenho, alertas e atividades recentes.
- **Gestao de Usuarios**: cadastro, edicao e controle de perfis/permissoes com validacoes Zod (ex.: `UsersForm`).
- **Configuracoes Comerciais**: formularios para fases de venda, motivos de status, tarefas e equipes (`SalesPhaseForm`, `TaskTypeForm`, etc.).
- **Relatorios e Exportacoes**: filtros avancados nas tabelas, exportacao PDF/Excel e impressao.
- **Fluxos Customizaveis**: formularios com campos dinamicos e selecao rica via shadcn Select.
- **Responsividade Total**: layout fluido em desktop, tablet e mobile.
- **Integracao Segura**: rotas protegidas (`ProtectedRoute`) e hooks de autenticacao centralizados (`useAuth`).

## Qualidade, Documentacao e Padroes

- **ESLint + TypeScript** bloqueiam padroes incorretos (`npm run lint`).
- **SonarQube** acompanha cobertura, complexidade e vulnerabilidades em cada pipeline.
- **TSDoc/JSDoc** descreve contratos publicos de hooks, servicos e componentes.
- **Confluence** consolida diagramas, decisoes arquiteturais e guias de implementacao.

## Configuracao do Ambiente

### Pre-requisitos

- Node.js 20+
- npm 10+ (ou pnpm/yarn, conforme o time)
- Variaveis de ambiente em `.env.local` (endpoints da API, chaves e toggles de features)

### Extensoes VS Code Recomendadas

- Tailwind CSS IntelliSense
- ESLint
- SVG Preview
- PostCSS Sorting
- GitLens (opcional)

## Como Rodar

1. **Clone o repositorio**
   ```bash
   git clone https://github.com/seu-usuario/crm-prover-web.git
   cd crm-prover-web
   ```

2. **Instale as dependencias**
   ```bash
   npm install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   yarn dev
   ```
   A aplicação estara disponivel em `http://localhost:5173`.

4. **Scripts adicionais**
   ```bash
   npm run build    # build de producao (tsc + vite build)
   npm run preview  # serve o build localmente
   npm run lint     # garante conformidade com o padrao ESLint
   ```

## Fluxo de Contribuicao

1. Faca um **fork** e crie uma branch (`git checkout -b feature/nome-feature`).
2. Implemente a feature/correção seguindo os padrões de codigo e design system.
3. Rode `npm run lint` (e os testes disponiveis) antes do commit.
4. Abra uma **Pull Request** documentando contexto, passos de validação e evidencias.
5. Atualize a documentação no Confluence sempre que necessario.

---
