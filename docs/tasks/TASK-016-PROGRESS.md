# TASK-016: Integração Frontend + Backend (E2E) — Progress Tracker

**Data de Início:** 10/05/2026  
**Status:** 🟡 Em Andamento  
**Prioridade:** P0 (Crítica)

---

## 📋 Subtasks Status

### TASK-016.1: Teste End-to-End (E2E)
**Status:** 🟡 60% Completo

- [x] Login → Dashboard → Criar gasto → Ver em tabela
  - ✅ Teste de autenticação implementado
  - ✅ Teste de criação de despesa implementado
  - ✅ Teste de exibição em tabela implementado
  - ⏳ Execução e validação pendente

- [x] Editar gasto → Ver alteração
  - ✅ Teste de edição implementado
  - ⏳ Execução e validação pendente

- [x] Deletar gasto → Ver remoção
  - ✅ Teste de deleção implementado
  - ⏳ Execução e validação pendente

- [x] Gerar relatório
  - ✅ Teste de relatórios implementado
  - ⏳ Execução e validação pendente

### TASK-016.2: Teste de Fluxo Completo
**Status:** 🟡 70% Completo

- [x] Cadastro de novo usuário
  - ✅ Teste implementado (01-auth.spec.ts)
  - ⏳ Execução e validação pendente

- [x] Setup inicial (criar categorias)
  - ✅ Teste implementado (03-categories.spec.ts + 05-complete-flow.spec.ts)
  - ⏳ Execução e validação pendente

- [x] Registrar gastos
  - ✅ Teste implementado (02-expenses.spec.ts + 05-complete-flow.spec.ts)
  - ⏳ Execução e validação pendente

- [x] Ver relatórios
  - ✅ Teste implementado (04-reports-alerts.spec.ts)
  - ⏳ Execução e validação pendente

- [x] Receber alertas
  - ✅ Teste implementado (04-reports-alerts.spec.ts)
  - ⏳ Execução e validação pendente

### TASK-016.3: Ajustes Finais
**Status:** 🔲 0% Completo

- [ ] Correção de bugs encontrados
  - ⏳ Será executado após rodadas de teste

- [ ] Performance (< 2s load)
  - ⏳ Será medido durante testes

- [ ] Segurança (validação dados, headers)
  - ⏳ Será validado durante testes

---

## 🧪 Testes Implementados

### 01-auth.spec.ts (Autenticação)
```typescript
✅ should register a new user successfully
✅ should login with valid credentials
✅ should logout successfully
✅ should reject invalid login credentials
```

**Localização:** `backend/tests/e2e-tests/specs/01-auth.spec.ts`

### 02-expenses.spec.ts (Despesas)
```typescript
✅ should create a new expense
✅ should edit an existing expense
✅ should delete an expense with confirmation
✅ should validate required fields
✅ should filter expenses by category
```

**Localização:** `backend/tests/e2e-tests/specs/02-expenses.spec.ts`

### 03-categories.spec.ts (Categorias)
```typescript
✅ should display default categories
✅ should create a new category
✅ should edit a category
✅ should delete a category
```

**Localização:** `backend/tests/e2e-tests/specs/03-categories.spec.ts`

### 04-reports-alerts.spec.ts (Relatórios & Alertas)
```typescript
✅ should display dashboard KPIs
✅ should navigate to reports page and display data
✅ should filter reports by period
✅ should display alerts page
✅ should mark alert as read
✅ should display insights recommendations
```

**Localização:** `backend/tests/e2e-tests/specs/04-reports-alerts.spec.ts`

### 05-complete-flow.spec.ts (Fluxo Completo)
```typescript
✅ should complete full user journey
✅ should handle multi-step transaction editing
```

**Localização:** `backend/tests/e2e-tests/specs/05-complete-flow.spec.ts`

---

## 🛠 Arquivos Criados

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `playwright.config.ts` | ✅ | Configuração do Playwright |
| `package.json` | ✅ | Dependências (Playwright) |
| `specs/01-auth.spec.ts` | ✅ | Testes de autenticação |
| `specs/02-expenses.spec.ts` | ✅ | Testes de despesas |
| `specs/03-categories.spec.ts` | ✅ | Testes de categorias |
| `specs/04-reports-alerts.spec.ts` | ✅ | Testes de relatórios/alertas |
| `specs/05-complete-flow.spec.ts` | ✅ | Testes de fluxo completo |
| `README.md` | ✅ | Documentação de testes E2E |

---

## 🚀 Próximas Etapas

### Imediato (Hoje)
1. ⏳ Instalar dependências: `npm install` em `backend/tests/e2e-tests/`
2. ⏳ Instalar navegadores: `npx playwright install`
3. ⏳ Executar primeira rodada de testes: `npm test`

### Curto Prazo (Próximas Horas)
4. ⏳ Analisar resultados e falhas
5. ⏳ Ajustar seletores CSS/XPath conforme necessário
6. ⏳ Corrigir credenciais de teste no backend (seed data)

### Médio Prazo (Próximas Horas)
7. ⏳ Documentar bugs encontrados
8. ⏳ Executar em múltiplos navegadores (Chromium, Firefox, WebKit)
9. ⏳ Testar em mobile (Pixel 5, iPhone 12)

### Longo Prazo (Depois dos testes)
10. ⏳ Implementar correções
11. ⏳ Re-executar testes completos
12. ⏳ Validar performance (< 2s load)
13. ⏳ Gerar relatório final

---

## 📊 Acompanhamento de Bugs

### Bugs Encontrados
*(Será preenchido após execução dos testes)*

| ID | Titulo | Severidade | Status | Notas |
|----|--------|-----------|--------|-------|
| - | - | - | - | - |

---

## 📈 Métricas de Teste

*(Será preenchido após execução dos testes)*

| Métrica | Target | Atual | Status |
|---------|--------|-------|--------|
| Tests Passados | 100% | - | ⏳ |
| Tests Falhados | 0% | - | ⏳ |
| Performance (load) | < 2s | - | ⏳ |
| Cobertura de Casos | 100% | ~95% | 🟡 |
| Navegadores | 3+ | - | ⏳ |

---

## 🔧 Tecnologia Stack

- **Teste Framework:** Playwright v1.40.0
- **Linguagem:** TypeScript
- **Navegadores:** Chromium, Firefox, WebKit
- **Devices:** Desktop + Mobile
- **Reporter:** HTML + Screenshots + Videos

---

## 📖 Documentação

- [Playwright Official Docs](https://playwright.dev/)
- [README.md local](./e2e-tests/README.md)
- [TASKS.md](./TASKS.md#task-016-integração-frontend--backend-e2e)

---

## 🔗 Referências

**Backend API Base URL:** `http://localhost:5000`  
**Frontend Base URL:** `http://localhost:5000/frontend/`

**Credenciais de Teste:**
- Email: `test@example.com`
- Senha: `Test@12345`

---

## ✅ Checklist de Entrega

- [x] Testes implementados (5 arquivos, 20+ cenários)
- [x] Documentação criada (README.md)
- [x] Configuração Playwright completa
- [ ] Testes executados e validados
- [ ] Bugs documentados
- [ ] Performance validada
- [ ] TASK-016 marcada como completa

---

**Última atualização:** 10/05/2026 às 14:30  
**Próxima revisão:** Após execução de primeira rodada de testes
