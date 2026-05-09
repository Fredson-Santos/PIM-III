# Instruções do Projeto PIM III — Para o Agente

Este arquivo define como o agente deve proceder ao trabalhar no projeto PIM III.

---

## 1. Padrão de Commits (Git Skill)

Sempre que o agente processa ou trabalha com commits, deve seguir o padrão definido em [git_skill.md](./git_skill.md):

- **Idioma**: Português (pt-BR)
- **Formato**: `tipo(escopo): descrição`
- **Atomicidade**: Commits separados por área (frontend, backend, docs, design)
- **TASK IDs**: Incluir `TASK-###` em commits relacionados a tarefas

### Exemplo Correto
```bash
git commit -m "frontend: TASK-010 - implementa estrutura responsiva"
```

---

## 2. Automação: Update Tasks Skill

**IMPORTANTE**: Após executar commits seguindo o padrão de git_skill.md, o agente DEVE automaticamente invocar a skill update-tasks:

```
/update-tasks
```

### O que acontece automaticamente:

1. ✅ Analisa últimos 10 commits
2. ✅ Extrai referências `TASK-###`
3. ✅ Mapeia arquivos modificados para tasks
4. ✅ Atualiza checkboxes em `docs/tasks/TASKS.md`: `[ ]` → `[x]`
5. ✅ Valida markdown (evita corrupção)
6. ✅ Auto-commita mudanças: `docs(tasks): sincroniza TASKS.md`

### Quando Invocar

- ✅ Após fazer 1+ commits com TASK IDs
- ✅ Ao final de uma sessão de trabalho
- ✅ Antes de criar um Pull Request

### Quando NÃO Invocar

- ❌ Para commits sem referência de TASK-###
- ❌ Para commits de documentação rápida (tipo diária)
- ❌ Se não há mudanças significativas

---

## 3. Workflow Recomendado para o Agente

```
1. Usuário pede alteração/feature
   ↓
2. Verificar se corresponde a alguma TASK em docs/tasks/TASKS.md
   ↓
3. Criar branch: git checkout -b tipo/TASK-XXX-descricao
   ↓
4. Fazer commits atomizados com padrão tipo(escopo): TASK-XXX
   ↓
5. Ao final: executar /update-tasks
   ↓
6. Verificar se TASKS.md foi atualizado corretamente
   ↓
7. Pronto para merge/deploy
```

---

## 4. Checklist de Integração

Quando o agente vê `@file:git_skill.md` referenciado:

- [ ] Ler e entender o padrão de commits
- [ ] Verificar se está sendo seguido nos commits recentes
- [ ] **Automaticamente invocar `/update-tasks`** para sincronizar
- [ ] Confirmar que TASKS.md foi atualizado
- [ ] Se houver erros, reportar e corrigir manualmente

---

## 5. Mapeamento de Arquivos → Tasks

Consulte [update-tasks-skill.md](./update-tasks-skill.md) para ver qual arquivo corresponde a qual TASK:

| Arquivo | Tasks |
|---------|-------|
| `frontend/tela-*.html` | TASK-010, 011, 012, 013, 014, 015 |
| `frontend/*.css` | TASK-010, 017, 018 |
| `backend/**/*.cs` | TASK-019, 020, 021, 022, 023 |
| `docs/design-system.md` | TASK-007 |
| Etc... | [Ver tabela completa](./update-tasks-skill.md#mapeamento-de-arquivos-para-tasks) |

---

## 6. Comandos Úteis para o Agente

```bash
# Ver commits recentes com TASK IDs
git log --oneline -10

# Ver quais arquivos foram modificados
git diff --name-only HEAD~5..HEAD

# Preview de mudanças (sem salvar)
python .github/skills/update-tasks-from-git/update_tasks.py --dry-run

# Sincronizar tasks (invocado automaticamente)
/update-tasks
```

---

## 7. Exceções e Casos Especiais

### Commits Rápidos de Documentação
```bash
# Permitido para atualizações rápidas
git commit -m "docs: atualiza progresso diário"

# Mas prefira sempre com escopo
git commit -m "docs(tasks): atualiza TASK-010"
```

### Breaking Changes
```bash
git commit -m "feat(api)!: altera estrutura de resposta"
```

### Commits sem TASK ID
```bash
# Bugfixes rápidos sem task específica
git commit -m "fix: corrige cálculo de saldo"

# Não dispara automação de update-tasks (sem TASK-###)
```

---

## 8. Troubleshooting para o Agente

**Se `/update-tasks` falhar:**
1. Verificar se TASKS.md existe em `docs/tasks/TASKS.md`
2. Verificar se commits incluem `TASK-###` exato (maiúsculas, 3 dígitos)
3. Executar com `--dry-run` primeiro para preview
4. Se markdown está corrompido, corrigir manualmente

**Se checkbox não atualizar:**
1. Arquivo relacionado não combina com padrão de mapeamento
2. Commit não menciona TASK ID
3. Usar `--task TASK-XXX` para forçar atualização específica

---

## 9. Indicadores de Sucesso

✅ **Funcionando corretamente quando:**
- Commits têm padrão `tipo(escopo): TASK-###`
- `/update-tasks` executa sem erros
- TASKS.md mostra checkboxes `[x]` atualizados
- Auto-commit é feito: `docs(tasks): sincroniza TASKS.md`
- `git log` mostra histórico limpo e rastreável

---

**Última atualização:** 08/05/2026  
**Responsável:** Tech Lead  
**Versão:** 1.0
