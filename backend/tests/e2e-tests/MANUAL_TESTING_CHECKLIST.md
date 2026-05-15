# 🧪 Manual Testing Checklist — TASK-016.2 & 16.3

Checklist para validação manual dos fluxos críticos durante execução de testes automatizados.

## 📋 Cenário 1: Novo Usuário — Fluxo Completo

### Setup
- [ ] Backend rodando em `http://localhost:5000`
- [ ] Frontend acessível em `http://localhost:5000/frontend/tela-login.html`
- [ ] Navegador: Chrome/Firefox/Safari
- [ ] Console aberto para verificar erros (F12)

### Passo 1: Cadastro
```
URL: http://localhost:5000/frontend/tela-cadastro.html
```
- [ ] Página carrega corretamente
- [ ] Campos: Email, Senha, Confirmar Senha visíveis
- [ ] Preenchimento com dados válidos:
  - Email: `newuser@example.com`
  - Senha: `NewUser@12345`
  - Confirmar: `NewUser@12345`
- [ ] Clique em "Cadastrar"
- [ ] ✅ Sucesso: Redirecionado para login ou já logado
- [ ] ✅ Mensagem: "Cadastro realizado" ou similar
- [ ] ❌ Validação: Campos obrigatórios validados
- [ ] ❌ Validação: Senhas não coincidem → erro

### Passo 2: Login
```
URL: http://localhost:5000/frontend/tela-login.html
```
- [ ] Página carrega
- [ ] Campos: Email, Senha visíveis
- [ ] Login com `newuser@example.com` / `NewUser@12345`
- [ ] ✅ Redirecionado para dashboard
- [ ] ✅ Token JWT salvo em localStorage (F12 → Application → Storage → localStorage)
- [ ] ✅ Menu ou botão de logout visível

### Passo 3: Dashboard
```
URL: http://localhost:5000/frontend/tela-dashboard.html
```
- [ ] Página carrega (< 2 segundos)
- [ ] KPIs visíveis: Total, Saldo, Maior Gasto
- [ ] Valores começam em 0 (novo usuário)
- [ ] Links de navegação funcionam

### Passo 4: Criar Categorias
```
URL: http://localhost:5000/frontend/tela-categorias.html
```
- [ ] Página carrega
- [ ] Botão "Nova Categoria" visível
- [ ] Clique abre modal
- [ ] Preencher:
  - Nome: "Alimentação"
  - Limite: "500"
- [ ] Clique "Criar"
- [ ] ✅ Modal fecha
- [ ] ✅ Categoria aparece na lista
- [ ] ✅ Toast sucesso
- [ ] Repetir para "Transporte" (limite 300) e "Entretenimento" (limite 200)
- [ ] 3 categorias visíveis na tela

### Passo 5: Criar Despesas
```
URL: http://localhost:5000/frontend/tela-gastos.html
```
- [ ] Página carrega
- [ ] Tabela está vazia (novo usuário)
- [ ] Botão "Novo Gasto" visível
- [ ] Clique abre modal
- [ ] Preencher Gasto 1:
  - Valor: 50.00
  - Descrição: "Café da manhã"
  - Categoria: Alimentação
  - Data: Hoje
- [ ] Clique "Criar"
- [ ] ✅ Modal fecha
- [ ] ✅ Linha aparece na tabela
- [ ] ✅ Valores corretos exibidos
- [ ] Repetir para:
  - Gasto 2: R$ 25.50 - "Uber" - Transporte - Hoje
  - Gasto 3: R$ 150.00 - "Cinema" - Entretenimento - Hoje
- [ ] Tabela mostra 3 gastos
- [ ] Total calculado corretamente (225.50)

### Passo 6: Editar Gasto
```
Ainda em: tela-gastos.html
```
- [ ] Clique em botão "Editar" do primeiro gasto
- [ ] Modal abre com dados preenchidos
- [ ] Alterar Valor: 75.00
- [ ] Clique "Atualizar"
- [ ] ✅ Modal fecha
- [ ] ✅ Valor atualizado na tabela (75.00)
- [ ] ✅ Total recalculado (250.50)
- [ ] ✅ Toast sucesso

### Passo 7: Deletar Gasto
```
Ainda em: tela-gastos.html
```
- [ ] Clique em botão "Deletar" do gasto "Café"
- [ ] Modal de confirmação aparece
- [ ] Clique "Confirmar"
- [ ] ✅ Modal fecha
- [ ] ✅ Linha removida da tabela
- [ ] ✅ Total recalculado (200.50)
- [ ] ✅ Apenas 2 gastos restantes

### Passo 8: Dashboard Atualizado
```
URL: http://localhost:5000/frontend/tela-dashboard.html
```
- [ ] Recarregar página
- [ ] ✅ KPIs atualizados:
  - Total: 200.50
  - Maior gasto: 150.00 (Cinema)
  - Saldo: (dependendo da implementação)
- [ ] Valores não são 0 mais

### Passo 9: Relatórios
```
URL: http://localhost:5000/frontend/tela-relatorios.html
```
- [ ] Página carrega
- [ ] KPIs visíveis (Total, Saldo, Maior)
- [ ] Valores correspondem ao dashboard
- [ ] Filtros de período (se implementado)
- [ ] Se houver gráficos: dados visualizados

### Passo 10: Alertas
```
URL: http://localhost:5000/frontend/tela-alertas.html
```
- [ ] Página carrega
- [ ] Lista de alertas visível
- [ ] Se houver alertas (ex: limite da categoria):
  - [ ] Tipo visível (orçamento_excedido, gasto_alto, etc)
  - [ ] Botão "Marcar como Lido" funciona
  - [ ] Botão "Deletar" remove alerta
- [ ] Se vazio: mensagem "Nenhum alerta" ou similar

### Passo 11: Insights
```
URL: http://localhost:5000/frontend/tela-insights.html
```
- [ ] Página carrega
- [ ] Recomendações visíveis
- [ ] Pelo menos uma recomendação com base nos gastos criados

### Passo 12: Logout
```
Em qualquer página
```
- [ ] Botão "Sair" / "Logout" visível
- [ ] Clique
- [ ] ✅ Redirecionado para login
- [ ] ✅ localStorage limpo (sem token)
- [ ] ✅ Não consegue acessar dashboard sem fazer login

---

## 📋 Cenário 2: Usuário Existente — Operações Críticas

### Setup
- [ ] Usar credenciais: `test@example.com` / `Test@12345`
- [ ] Login realizado
- [ ] Dashboard carregado

### Validações Críticas
1. **Criar Gasto**
   - [ ] Modal abre ao clicar "Novo Gasto"
   - [ ] Todos os campos são preenchidos
   - [ ] Validação: valor deve ser > 0
   - [ ] Validação: data não pode ser no futuro
   - [ ] Validação: categoria obrigatória
   - [ ] Submissão com sucesso

2. **Editar Gasto**
   - [ ] Botão "Editar" abre modal com dados
   - [ ] Campos editáveis
   - [ ] Submissão atualiza imediatamente

3. **Deletar Gasto**
   - [ ] Botão "Deletar" mostra confirmação
   - [ ] Confirmação remove gasto
   - [ ] Negação cancela operação

4. **Filtrar Gastos**
   - [ ] Por categoria: mostra apenas daquela categoria
   - [ ] Por período: data de início e fim funcionam
   - [ ] Por valor: filtros de intervalo (se implementado)

5. **Categorias**
   - [ ] Criar: nome e limite obrigatórios
   - [ ] Editar: limite pode ser alterado
   - [ ] Deletar: confirmação aparece
   - [ ] Padrão: categorias não podem ser deletadas (se houver gastos)

---

## 🔒 Cenário 3: Validações de Segurança

### CSRF & XSS
- [ ] Não há erros de segurança no console (F12)
- [ ] Submissão de formulário funciona corretamente
- [ ] Tokens JWT válidos na requisição

### Autenticação
- [ ] Token JWT salvo em localStorage (não em cookie visível)
- [ ] Token enviado em header Authorization: `Bearer {token}`
- [ ] Login inválido: erro apropriado
- [ ] Logout: token removido

### Isolamento de Dados
- [ ] Login como User A: vê dados de User A
- [ ] Logout e login como User B: vê dados de User B
- [ ] User A não vê dados de User B

---

## ⚡ Cenário 4: Performance

### Carregamento de Página
- [ ] Login → Dashboard: < 2 segundos
- [ ] Gastos → Relatórios: < 1 segundo
- [ ] Criação de gasto → Aparição na tabela: < 2 segundos

### Responsividade
- [ ] Desktop (1920x1080): Layout correto
- [ ] Tablet (768x1024): Layout responsivo
- [ ] Mobile (375x667): Layout responsivo
  - Navegação em hamburger menu (se houver)
  - Botões toca  veis (min 44px)
  - Sem overflow horizontal

### Acessibilidade
- [ ] Navegação por Tab (teclado) funciona
- [ ] Labels associados aos inputs
- [ ] Contraste de cores: OK (F12 → Accessibility)
- [ ] Sem erros de acessibilidade

---

## 🐛 Registro de Bugs

Encontrou algo errado? Preencha:

```markdown
### Bug #001
**Descrição:** [O que aconteceu]
**Esperado:** [O que deveria acontecer]
**Reprodução:**
  1. ...
  2. ...
  3. ...
**Severidade:** 🔴 Crítica / 🟠 Alta / 🟡 Média / 🟢 Baixa
**Navegador:** [Chrome/Firefox/Safari]
**Dispositivo:** [Desktop/Mobile]
**Screenshot:** [Se aplicável]

---
```

## ✅ Checklist de Conclusão

Todos os cenários foram testados?
- [ ] Cenário 1: Novo Usuário (Fluxo Completo)
- [ ] Cenário 2: Operações Críticas
- [ ] Cenário 3: Segurança
- [ ] Cenário 4: Performance

Algum bug crítico encontrado?
- [ ] Sim → Documentar em "Registro de Bugs"
- [ ] Não → Prosseguir para próxima fase

---

**Data de Teste:** ___/___/______  
**Testador:** _________________________  
**Resultado:** ✅ PASSOU / ❌ FALHOU
