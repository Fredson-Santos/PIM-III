# 🐛 Bug Report Template — TASK-016.3

Formato padrão para documentar bugs encontrados durante testes E2E.

---

## Bug #001
**Status:** ⏳ Aberto / 🔧 Em Investigação / ✅ Resolvido / ❌ Rejeitado

### Informações Básicas
- **Título:** [Descrever bug em uma linha]
- **Severidade:** 🔴 Crítica / 🟠 Alta / 🟡 Média / 🟢 Baixa
- **Componente:** Frontend / Backend / API
- **Data Encontrada:** DD/MM/YYYY

### Descrição
[O que é o problema? O que não está funcionando como esperado?]

**Exemplo:**
> Ao criar um novo gasto com valor negativo (-50.00), o sistema aceita e exibe na tabela, contrariando a validação esperada de valores positivos.

### Comportamento Esperado
[Como deveria funcionar?]

**Exemplo:**
> O sistema deveria rejeitar valores negativos com mensagem de erro "Valor deve ser maior que zero".

### Comportamento Atual
[O que realmente acontece?]

**Exemplo:**
> O gasto é criado com sucesso e exibido na tabela com valor "-50.00".

### Passos para Reprodução
```
1. Navegar para http://localhost:5000/frontend/tela-gastos.html
2. Clicar em "Novo Gasto"
3. Preencher:
   - Valor: -50.00
   - Descrição: Teste
   - Categoria: Alimentação
   - Data: Hoje
4. Clique "Criar"
5. Gasto aparece na tabela
```

### Informações Adicionais

**Navegador:** Chrome 120.0 / Firefox 121.0 / Safari 17.2  
**SO:** Windows 11 / macOS 14 / Ubuntu 22.04  
**Dispositivo:** Desktop / Mobile (Pixel 5) / Tablet (iPad)  
**Resolução:** 1920x1080 / 1024x768 / 375x667

**Ambiente:** Local / Staging / Produção  
**Versão Backend:** .NET 10.0.7  
**Versão Frontend:** v0.4.0

### Logs & Evidência

#### Console (F12)
```javascript
// Erro capturado:
[Error] XHR failed: POST http://localhost:5000/api/expenses
Response: {"errors":{"value":["O valor deve ser positivo"]}}

// Mas a resposta HTTP é 200 OK (deveria ser 400 Bad Request)
```

#### Network (F12 → Network)
```
POST /api/expenses
Status: 200 OK ← ERRO: Deveria ser 400 Bad Request
Response: {"id":123,"value":-50.00,...}
```

#### Screenshot
[Se aplicável, capturar tela mostrando o problema]

### Impacto
- [ ] Bloqueia funcionalidade crítica
- [ ] Afeta experiência do usuário
- [ ] Comportamento inesperado
- [ ] Violação de validação
- [ ] Possível vulnerabilidade de segurança

### Root Cause (Análise)
[Investigação inicial - por que acontece?]

**Hipótese Frontend:** Validação client-side incompleta em `js/api.js`

**Hipótese Backend:** Validador não está validando corretamente em `CreateExpenseValidator.cs`

**Próximas Investigações:**
- [ ] Verificar `CreateExpenseValidator.cs`
- [ ] Testar diretamente em Postman
- [ ] Verificar regras de negócio

### Solução Proposta
[Como corrigir?]

**Opção 1 - Frontend:**
```javascript
// Em js/api.js, antes de POST
if (data.amount <= 0) {
  throw new Error('Valor deve ser maior que zero');
}
```

**Opção 2 - Backend:**
```csharp
// Em CreateExpenseValidator.cs
RuleFor(x => x.Amount)
  .GreaterThan(0)
  .WithMessage("O valor deve ser maior que zero");
```

**Recomendação:** Ambas (validação em frontend + backend)

### Atribuição & Seguimento
- **Reportado por:** [Nome]
- **Atribuído para:** [Dev]
- **Data Alvo de Correção:** DD/MM/YYYY
- **PR de Correção:** #123 (se houver)

### Comentários
[Adicionar atualizações conforme o bug é investigado]

---

## Bug #002
[Repetir template acima]

---

## Bug #003
[Repetir template acima]

---

## 📊 Resumo de Bugs

| # | Título | Severidade | Status | Componente |
|---|--------|-----------|--------|-----------|
| 001 | Aceita valor negativo em gasto | 🔴 Crítica | ⏳ Aberto | Frontend + Backend |
| 002 | [Titulo] | [Severidade] | [Status] | [Comp] |
| 003 | [Titulo] | [Severidade] | [Status] | [Comp] |

**Total:** 3 bugs  
**Críticas:** 1  
**Altas:** 0  
**Médias:** 2  
**Baixas:** 0

---

## 📈 Trending

### Por Severidade
```
Crítica:  ██ (2)
Alta:     ░░ (0)
Média:    ████ (2)
Baixa:    ░ (1)
```

### Por Componente
```
Frontend: ███ (3)
Backend:  ██ (2)
API:      █ (1)
```

### Por Status
```
Aberto:        ███ (3)
Investigação:  ██ (2)
Resolvido:     █ (1)
Rejeitado:     ░ (0)
```

---

## ✅ Checklist para Fechar Bug

Antes de marcar bug como "Resolvido":

- [ ] Código corrigido e testado
- [ ] Teste E2E atualizado para validar correção
- [ ] Teste passa em múltiplos navegadores
- [ ] Sem regressões (testes anteriores ainda passam)
- [ ] PR revisado e aprovado
- [ ] Commit referencia o número do bug
- [ ] Documentação atualizada (se necessário)
- [ ] Release notes incluem bugfix

---

**Fonte:** TASK-016 E2E Tests  
**Data de Criação:** 10/05/2026  
**Última Atualização:** [Data]
