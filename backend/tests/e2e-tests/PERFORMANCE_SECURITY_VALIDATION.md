# 🔒 Performance & Security Validation — TASK-016.3

Guia para validar performance e segurança durante testes E2E.

---

## ⚡ Performance Validation

### 1. Métricas de Carregamento

#### Objetivo
- ✅ Page Load Time (PLT): < 2 segundos
- ✅ Time to Interactive (TTI): < 3 segundos
- ✅ Largest Contentful Paint (LCP): < 2.5 segundos
- ✅ First Input Delay (FID): < 100 ms

#### Como Medir

**Opção 1: DevTools (Chrome)**
```
1. F12 → Performance
2. Clique em record
3. Realize ação (ex: navegar para dashboard)
4. Clique em stop
5. Analise métrica "Main Thread"
```

**Opção 2: Lighthouse**
```
1. F12 → Lighthouse
2. Clique "Analyze page load"
3. Observe Performance score
```

**Opção 3: Playwright**
```typescript
// Adicionar a tests/e2e-tests/specs/06-performance.spec.ts
test('should load dashboard in under 2 seconds', async ({ page }) => {
  const start = Date.now();
  await page.goto('http://localhost:5000/frontend/tela-dashboard.html');
  await page.waitForLoadState('networkidle');
  const duration = Date.now() - start;
  
  expect(duration).toBeLessThan(2000);
  console.log(`Dashboard loaded in ${duration}ms`);
});
```

### 2. Network Performance

#### Verificar Requisições
```
F12 → Network
1. Recarregar página
2. Observar:
   - Número de requisições (quanto menos, melhor)
   - Tamanho dos arquivos (minify CSS/JS)
   - Cache de recursos (304 Not Modified)
   - Gzip compression (Content-Encoding: gzip)
```

#### Métricas Esperadas
- Arquivo HTML: < 50 KB
- CSS total: < 100 KB
- JavaScript total: < 200 KB
- Imagens: < 100 KB (otimizadas)
- Total de requisições: < 30

### 3. Backend Performance

#### API Response Time
```
GET /api/expenses        → < 500 ms
GET /api/categories      → < 300 ms
GET /reports/summary     → < 800 ms
POST /api/expenses       → < 1000 ms
```

#### Como Testar
```bash
# Usando curl
time curl -H "Authorization: Bearer $TOKEN" http://localhost:5000/api/expenses

# Output esperado:
# real    0m0.523s
# user    0m0.031s
# sys     0m0.015s
```

#### Teste de Carga
```bash
# Usando Apache Bench (instalar: apt-get install apache2-utils)
ab -n 100 -c 10 -H "Authorization: Bearer $TOKEN" \
   http://localhost:5000/api/expenses

# Esperado:
# Requests per second: > 100
# Time per request: < 100 ms (mean)
```

### 4. Database Performance

#### Queries Lentas
```sql
-- Ver tempo de execução
-- SQLite não tem EXPLAIN PLAN, mas pode-se usar:
PRAGMA query_only = OFF;
EXPLAIN QUERY PLAN SELECT * FROM expenses WHERE user_id = 1;
```

#### Índices
Verificar se estão criados:
```csharp
// Em Infrastructure/Persistence/Configurations/
// Deve haver índices em:
// - Expenses: userId, categoryId, date
// - Categories: userId
// - Alerts: userId
```

---

## 🔐 Security Validation

### 1. Authentication & Authorization

#### JWT Token
```javascript
// F12 → Application → Storage → localStorage
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Verificar estrutura:
// 1. Não armazenar em cookie visível (seguro contra XSS)
// ✅ Correto: localStorage (protegido com HttpOnly em cookies)
// ✅ Correto: Environment var no .env
// ❌ Errado: sessionStorage sem proteção
```

#### Token Validation
```bash
# Decodificar token (usar jwt.io ou jq)
echo "token_aqui" | jwt decode

# Esperado:
# {
#   "sub": "user@example.com",
#   "iat": 1715345400,
#   "exp": 1715348400,
#   "iss": "PIM-III-Backend",
#   "aud": "pim-iii-frontend"
# }

# Validar:
# ✅ exp > now (token válido)
# ✅ iss = "PIM-III-Backend"
# ✅ aud = "pim-iii-frontend"
```

#### Teste de Autorização
```bash
# 1. Sem token
curl http://localhost:5000/api/expenses
# Esperado: 401 Unauthorized

# 2. Com token inválido
curl -H "Authorization: Bearer invalid-token" http://localhost:5000/api/expenses
# Esperado: 401 Unauthorized

# 3. Com token expirado
# Experado: 401 Unauthorized

# 4. Com token válido de outro usuário
# Esperado: 403 Forbidden (dados do outro usuário não acessíveis)
```

### 2. Input Validation

#### SQL Injection
```javascript
// Teste: E-mail com SQL
Email: "test@example.com' OR '1'='1"
Senha: "anything"

// Esperado: Rejeitar com erro de validação
// ✅ Correto: FluentValidation valida email format
// ❌ Errado: Aceita como usuário válido
```

#### XSS (Cross-Site Scripting)
```javascript
// Teste: Descrição com script
Descrição: "<script>alert('XSS')</script>"

// Esperado: Script é escapado/removido
// Verificar em F12 → Elements (HTML não contém <script>)

// ✅ Correto: <script> aparece como texto
// ❌ Errado: Alert pop-up aparece
```

#### NoSQL Injection (se usasse MongoDB)
```javascript
// Não aplicável com SQLite, mas se migrar para NoSQL:
Email: {"$ne": null}
// Esperado: Rejeitar como email inválido
```

### 3. Data Validation

#### Tipos de Dados
```bash
# Teste: Campo numérico com string
POST /api/expenses
{
  "amount": "not a number",
  "description": "Test",
  "categoryId": 1,
  "date": "2024-05-10"
}

# Esperado:
# 400 Bad Request
# {
#   "errors": {
#     "amount": ["O valor deve ser um número"]
#   }
# }
```

#### Range Validation
```bash
# Teste: Valor negativo
{
  "amount": -50.00
}

# Esperado: 400 Bad Request com erro "Valor deve ser maior que zero"

# Teste: Valor muito grande
{
  "amount": 999999999999.99
}

# Esperado: 400 Bad Request com erro "Valor não pode exceder limite"
```

#### Data Validation
```bash
# Teste: Data no futuro
{
  "date": "2099-05-10"
}

# Esperado: 400 Bad Request (se não permitir futuro)

# Teste: Data inválida
{
  "date": "99-13-45"
}

# Esperado: 400 Bad Request
```

### 4. CORS & Headers

#### Teste CORS
```bash
# Request de origem diferente
curl -H "Origin: http://example.com" \
     -H "Access-Control-Request-Method: POST" \
     http://localhost:5000/api/expenses -v

# Esperado (baseado em configuração):
# ✅ Access-Control-Allow-Origin: * (ou domínio específico)
# ✅ Access-Control-Allow-Methods: GET, POST, PUT, DELETE
# ✅ Access-Control-Allow-Headers: Content-Type, Authorization
```

#### Security Headers
```bash
# Verificar headers de resposta
curl -i http://localhost:5000/api/expenses | grep -i "x-\|strict\|content"

# Esperado:
# ✅ X-Content-Type-Options: nosniff
# ✅ X-Frame-Options: DENY
# ✅ Strict-Transport-Security: max-age=31536000
# ✅ Content-Security-Policy: (restrições script/style)
```

### 5. Password Security

#### Teste de Hash
```bash
# Verificar se senhas são hasheadas
# No banco SQLite: sqlite3 financeiro.db "SELECT password FROM users LIMIT 1;"

# ✅ Correto: $2b$12$abc123def456... (BCrypt)
# ❌ Errado: "password123" (texto plano)
```

#### Teste de Força de Senha
```javascript
// Testar senhas fracas
Senhas testadas:
"123456"      → ✅ Rejeitar
"password"    → ✅ Rejeitar  
"Pass123"     → ✅ Aceitar (se min 8 chars, upper, lower, number)
"P@ssw0rd"    → ✅ Aceitar
```

### 6. API Rate Limiting

#### Teste de Rate Limit
```bash
# Fazer muitas requisições rapidamente
for i in {1..100}; do
  curl -H "Authorization: Bearer $TOKEN" \
       http://localhost:5000/api/expenses
done

# Esperado:
# ✅ Após X requisições (ex: 100/min): 429 Too Many Requests
# ❌ Sem limite: Todas as requisições passam (vulnerável a brute force)
```

### 7. HTTPS & SSL/TLS

#### Teste de Certificado (Produção)
```bash
# Verificar certificado SSL
openssl s_client -connect seu-dominio.com:443

# Esperado:
# ✅ Certificado válido
# ✅ CN (Common Name) = seu-dominio.com
# ✅ Data de expiração no futuro
```

---

## 📋 Checklist de Segurança

### Authentication
- [ ] Login funciona com credenciais válidas
- [ ] Logout limpa token
- [ ] Requisições sem token: 401
- [ ] Requisições com token inválido: 401
- [ ] Token expira após tempo configurado

### Authorization
- [ ] User A não acessa dados de User B
- [ ] User A não consegue editar gasto de User B
- [ ] Admin endpoints (se houver) requerem role

### Input Validation
- [ ] Email válido obrigatório
- [ ] Senha validada (min 8 chars, maiúscula, número)
- [ ] Valor positivo apenas
- [ ] Data válida e não no futuro
- [ ] Descrição com limite de caracteres

### Output Encoding
- [ ] HTML escapado em descrições
- [ ] Sem <script> tags visíveis
- [ ] Sem event handlers inline (onclick, onload, etc)

### Database
- [ ] Prepared statements (não string concatenation)
- [ ] Parametrized queries (evita SQL injection)
- [ ] Senhas com BCrypt hash
- [ ] Conexões SSL (se remoto)

### API Security
- [ ] CORS configurado corretamente
- [ ] Content-Type validado (JSON apenas)
- [ ] Content-Length validado (evita bomb)
- [ ] Rate limiting implementado
- [ ] Request timeout configurado

### Logging & Monitoring
- [ ] Logs não expõem senhas/tokens
- [ ] Logs incluem timestamp e usuário
- [ ] Erros 400/401/403/500 são logados
- [ ] Tentativas de acesso negado são logadas

---

## 📊 Resultado Final

### Performance ✅
- [ ] Carregamento < 2s
- [ ] API response < 500ms
- [ ] Sem memory leaks
- [ ] Caching funcionando

### Security ✅
- [ ] Autenticação robusta
- [ ] Autorização validada
- [ ] Inputs sanitizados
- [ ] Sem vulnerabilidades OWASP Top 10
- [ ] Senhas hasheadas

### Aprovação para Deploy
- [ ] ✅ Todos os testes passam
- [ ] ✅ Sem bugs críticos
- [ ] ✅ Performance aceita  
- [ ] ✅ Segurança validada
- [ ] ✅ Documentação completa

---

**Data de Validação:** ___/___/______  
**Validador:** _________________________  
**Status:** ✅ APROVADO / 🔧 PRECISA AJUSTE / ❌ BLOQUEADO
