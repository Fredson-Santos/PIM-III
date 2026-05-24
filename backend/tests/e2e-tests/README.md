# PIM III E2E Tests — Testes End-to-End

Testes automatizados end-to-end (E2E) para validar a integração completa do sistema PIM III.

## 📋 Objetivo

Validar os fluxos críticos do sistema:
- ✅ Autenticação (login, cadastro, logout)
- ✅ CRUD de Despesas
- ✅ CRUD de Categorias
- ✅ Relatórios e Alertas
- ✅ Fluxo completo de novo usuário

## 🛠 Tecnologia

- **Framework:** [Playwright](https://playwright.dev/)
- **Linguagem:** TypeScript
- **Navegadores:** Chromium, Firefox, WebKit
- **Devices:** Desktop + Mobile

## 📦 Instalação

### Prerequisites
- Node.js 16+
- Backend .NET rodando em `http://localhost:5000`
- Frontend disponível em `http://localhost:5000/frontend/`

### Setup

```bash
# Instalar dependências
npm install

# Instalar navegadores Playwright
npx playwright install
```

## 🚀 Executar Testes

### Modo Padrão (Headless)
```bash
npm test
```

### Modo Visual (COM Browser)
```bash
npm run test:headed
```

### Debug Mode
```bash
npm run test:debug
```

### UI Mode (Interativo)
```bash
npm run test:ui
```

### Ver Relatório HTML
```bash
npm run report
```

## 📝 Estrutura dos Testes

```
specs/
├── 01-auth.spec.ts              # Testes de autenticação
├── 02-expenses.spec.ts          # Testes de despesas (CRUD)
├── 03-categories.spec.ts        # Testes de categorias (CRUD)
├── 04-reports-alerts.spec.ts    # Testes de relatórios e alertas
└── 05-complete-flow.spec.ts     # Fluxo completo do usuário
```

## 🧪 Testes Incluídos

### 01-auth.spec.ts
- ✅ Registrar novo usuário
- ✅ Login com credenciais válidas
- ✅ Logout
- ✅ Rejeitar credenciais inválidas

### 02-expenses.spec.ts
- ✅ Criar nova despesa
- ✅ Editar despesa existente
- ✅ Deletar despesa com confirmação
- ✅ Validação de campos obrigatórios
- ✅ Filtrar por categoria

### 03-categories.spec.ts
- ✅ Exibir categorias padrão
- ✅ Criar nova categoria
- ✅ Editar categoria
- ✅ Deletar categoria

### 04-reports-alerts.spec.ts
- ✅ Exibir KPIs do dashboard
- ✅ Navegar para relatórios
- ✅ Filtrar relatórios por período
- ✅ Exibir página de alertas
- ✅ Marcar alerta como lido
- ✅ Exibir insights e recomendações

### 05-complete-flow.spec.ts
- ✅ **Jornada Completa:** Cadastro → Setup → Despesas → Relatórios → Alertas
- ✅ Editar transações em multi-passos

## ⚙️ Configuração

### playwright.config.ts

Configurações principais:
- **baseURL:** `http://localhost:5000` (local development)
- **webServer:** Inicia backend automaticamente
- **projects:** Chromium, Firefox, WebKit + Mobile
- **reporter:** HTML reports
- **screenshot:** Capturado em caso de falha
- **video:** Capturado em caso de falha

### Customizar Base URL
Editar `playwright.config.ts`:
```typescript
use: {
  baseURL: 'http://seu-dominio.com',
}
```

## 🔧 Troubleshooting

### Teste falha em "Backend não está rodando"
```bash
# Certifique-se que o backend está rodando
cd ../../../ # Voltar para raiz
dotnet run
```

### Selectors não encontrados
- Verifique os nomes dos atributos (name, id, class) no HTML
- Use `npm run test:headed` para ver em tempo real
- Atualize os seletores nos testes conforme necessário

### Timeout em Navegação
Aumentar timeout em `playwright.config.ts`:
```typescript
timeout: 30 * 1000, // 30 segundos
```

## 📊 Relatórios

Após executar testes, gerar relatório HTML:

```bash
npm run report
```

Relatório incluirá:
- ✅ Testes passados/falhados
- 📸 Screenshots de falhas
- 🎥 Videos de execução
- ⏱️ Timing de cada teste

## 🔍 Debug Avançado

### Ver logs de rede
```bash
PLAYWRIGHT_DEBUG=1 npm test
```

### Usar Playwright Inspector
```bash
npx playwright test --debug
```

### Gravar novo teste
```bash
npx playwright codegen http://localhost:5000/frontend/tela-login.html
```

## 🔐 Credenciais de Teste

### Usuário de Teste Padrão
```
Email: test@example.com
Senha: Test@12345
```

### Novo Usuário (criado dinamicamente)
- Email: `newuser{timestamp}@example.com`
- Senha: `NewUser@12345`

## 📈 CI/CD Integration

### GitHub Actions
Exemplo de workflow em `.github/workflows/e2e.yml`:

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npx playwright install
      
      - name: Start backend
        run: dotnet run &
      
      - run: npm test
```

## 📚 Documentação Adicional

- [Playwright Docs](https://playwright.dev/)
- [Test Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/locators)

## ⚠️ Notas Importantes

1. **Testes são Destrutivos:** Criam e deletam dados no banco
2. **Ordem de Execução:** Testes são independentes (não dependem de ordem)
3. **Isolamento:** Cada teste faz login separadamente
4. **Performance:** Timeout padrão 30s por teste

## 🤝 Contribuindo

Ao adicionar novos testes:
1. Seguir padrão de nomes: `NN-feature.spec.ts`
2. Usar seletores acessíveis (data-testid preferido)
3. Adicionar comentários explicativos
4. Testar em múltiplos navegadores

## 📋 Checklist de QA — TASK-016

- [x] TASK-016.1: Testes E2E implementados
  - [x] Login → Dashboard → Criar gasto → Ver em tabela
  - [x] Editar gasto → Ver alteração
  - [x] Deletar gasto → Ver remoção
  - [x] Gerar relatório

- [x] TASK-016.2: Teste de fluxo completo
  - [x] Cadastro de novo usuário
  - [x] Setup inicial (criar categorias)
  - [x] Registrar gastos
  - [x] Ver relatórios
  - [x] Receber alertas

- [ ] TASK-016.3: Ajustes finais
  - [ ] Correção de bugs encontrados (via testes)
  - [ ] Performance (< 2s load)
  - [ ] Segurança (validação dados, headers)

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar logs: `npm run test:headed`
2. Usar debug mode: `npm run test:debug`
3. Consultar Playwright docs

---

**Última atualização:** 10/05/2026  
**Status:** ✅ Pronto para execução
