# Guia de Execução — Testes E2E TASK-016

## 🎯 Objetivo

Este guia explica passo a passo como executar os testes E2E da integração Frontend + Backend (TASK-016).

## 📋 Pré-requisitos

- ✅ Backend .NET rodando em `http://localhost:5000`
- ✅ Frontend acessível em `http://localhost:5000/frontend/`
- ✅ Node.js 16+ instalado
- ✅ npm ou yarn disponível

## 🚀 Setup Inicial (Uma Única Vez)

### 1. Navegar para diretório de testes
```bash
cd backend/tests/e2e-tests
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Instalar navegadores Playwright
```bash
npx playwright install
```

### 4. Verificar configuração
```bash
# Editar playwright.config.ts se necessário
# - Mudar baseURL se backend não está em localhost:5000
# - Ajustar credenciais de teste se necessário
```

## ▶️ Executar Testes

### Opção 1: Modo Headless (Recomendado para CI/CD)
```bash
npm test
```
**Resultado:** Rápido, sem interface gráfica, relatório HTML gerado

### Opção 2: Modo Com Browser (Debug)
```bash
npm run test:headed
```
**Resultado:** Visualizar em tempo real o que o teste está fazendo

### Opção 3: Debug Interativo
```bash
npm run test:debug
```
**Resultado:** Abre Playwright Inspector com pausa em cada etapa

### Opção 4: Modo UI (Recomendado para desenvolvimento)
```bash
npm run test:ui
```
**Resultado:** Interface web interativa para rodar testes

## 📊 Analisar Resultados

### Ver Relatório HTML
```bash
npm run report
```
Abre relatório em navegador com:
- ✅ Testes passados/falhados
- 📸 Screenshots de erros
- 🎥 Vídeos de execução
- ⏱️ Tempo de cada teste

### Ver Saída do Terminal
```
✅ 01-auth.spec.ts (4 tests)
✅ 02-expenses.spec.ts (5 tests)
✅ 03-categories.spec.ts (4 tests)
✅ 04-reports-alerts.spec.ts (6 tests)
✅ 05-complete-flow.spec.ts (2 tests)

TOTAL: 21 tests passed in 3 minutes 45 seconds
```

## 🔧 Troubleshooting

### ❌ Erro: "Backend não está rodando"
```bash
# Terminal 1: Rodar backend
cd backend
dotnet run

# Terminal 2: Rodar testes
cd backend/tests/e2e-tests
npm test
```

### ❌ Erro: "Seletor não encontrado"
```bash
# Usar modo headed para ver o seletor
npm run test:headed

# Se necessário, atualizar seletores em specs/
# Exemplo: 'button:has-text("Novo Gasto")' pode não existir
```

### ❌ Erro: "Timeout na navegação"
```bash
# Aumentar timeout em playwright.config.ts
timeout: 60 * 1000 // 60 segundos ao invés de 30

# Ou aumentar timeout específico em teste:
await page.waitForNavigation({ timeout: 60000 });
```

### ❌ Erro: "Credenciais inválidas"
```bash
# Verificar se usuário de teste existe no banco
# Email: test@example.com
# Senha: Test@12345

# Se não existir, criar manualmente ou ajustar em specs/01-auth.spec.ts
```

## 🧪 Executar Apenas Alguns Testes

### Apenas testes de autenticação
```bash
npx playwright test 01-auth
```

### Apenas testes de despesas
```bash
npx playwright test 02-expenses
```

### Um teste específico
```bash
npx playwright test -g "should create a new expense"
```

## 📈 Monitorar Performance

### Ver tempo de execução
```bash
npm test -- --reporter=verbose
```

### Perfis de device
Os testes rodam em:
- Desktop Chrome
- Desktop Firefox
- Desktop Safari
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

Para rodar apenas desktop:
```bash
npx playwright test --project=chromium
```

## 🎬 Gravar Novos Testes

Se precisa adicionar novo teste:
```bash
npx playwright codegen http://localhost:5000/frontend/tela-login.html
```

Playwright irá:
1. Abrir navegador
2. Gravar suas ações
3. Gerar código TypeScript automaticamente

## 📋 Checklist Antes de Commitar

- [ ] Todos os testes passam: `npm test`
- [ ] Relatório HTML gerado: `npm run report`
- [ ] Nenhuma captura de tela de erro nos screenshots
- [ ] Tempo total de execução < 5 minutos
- [ ] Sem erros de timeout

## 🚀 CI/CD Integration

### GitHub Actions
Arquivo: `.github/workflows/e2e.yml`

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
        working-directory: backend/tests/e2e-tests
      
      - run: npx playwright install
        working-directory: backend/tests/e2e-tests
      
      - run: npm test
        working-directory: backend/tests/e2e-tests
        
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: backend/tests/e2e-tests/playwright-report/
```

## 📞 Suporte

| Problema | Solução |
|----------|---------|
| Backend não inicia | Verificar porta 5000 ocupada: `netstat -ano \| findstr :5000` |
| Seletores errados | Usar `npm run test:headed` para debug |
| Flake tests | Aumentar timeout ou adicionar waits mais explícitos |
| Credenciais expiradas | Verificar JWT token em localStorage |

## 📚 Documentação Referência

- [Documentação Completa](./README.md)
- [Progress Tracker](.project/TASK-016-PROGRESS.md)
- [TASKS.md](../../docs/tasks/TASKS.md#task-016-integração-frontend--backend-e2e)

---

**Dúvidas?** Consultar [Playwright Docs](https://playwright.dev/)
