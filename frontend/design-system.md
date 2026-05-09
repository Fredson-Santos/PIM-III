# 🎨 Design System — ConektaFinance

**Versão:** 1.0  
**Última atualização:** 2026  
**Status:** MVP

---

## 📑 Índice

1. [Cores](#cores)
2. [Tipografia](#tipografia)
3. [Grid & Espaçamento](#grid--espaçamento)
4. [Componentes Base](#componentes-base)
5. [Breakpoints Responsivos](#breakpoints-responsivos)
6. [Temas & Variações](#temas--variações)

---

## 🎨 Cores

### Paleta Principal

#### Verde (Primária)
```css
--green-50:  #EAF3DE   /* Light bg */
--green-100: #C0DD97   /* Accent light */
--green-200: #97C459   /* Hover states */
--green-400: #639922   /* Secondary */
--green-600: #3B6D11   /* Primary action */
--green-800: #27500A   /* Dark sidebar */
```

#### Teal (Secundária)
```css
--teal-50:  #E1F5EE    /* Light bg */
--teal-100: #9FE1CB    /* Hover */
--teal-400: #1D9E75    /* Primary */
--teal-600: #0F6E56    /* Dark */
```

#### Status - Amber (Aviso)
```css
--amber-50:  #FAEEDA   /* Light bg */
--amber-100: #FAC775   /* Light */
--amber-400: #BA7517   /* Primary */
--amber-600: #854F0B   /* Dark */
```

#### Status - Red (Erro)
```css
--red-50:  #FCEBEB     /* Light bg */
--red-100: #F7C1C1     /* Light */
--red-400: #E24B4A     /* Primary (negative amounts) */
--red-600: #A32D2D     /* Dark */
```

#### Neutras (Gray)
```css
--gray-50:  #F1EFE8    /* Very light bg */
--gray-100: #D3D1C7    /* Light border */
--gray-200: #B4B2A9    /* Medium border */
--gray-600: #5F5E5A    /* Muted text */
--gray-800: #444441    /* Dark text */
```

#### Semânticas
```css
--text:       #1a1a18   /* Texto principal */
--text-muted: #5F5E5A   /* Texto secundário */
--bg:         #f4f3ef   /* Background principal */
--white:      #ffffff   /* Branco */
--accent:     #3B6D11   /* Verde primário */
--border:     rgba(0,0,0,0.08) /* Bordas */
--sidebar-bg: #27500A   /* Barra lateral */
```

---

## 📝 Tipografia

### Fontes

**Headers (DM Serif Display)**
- Elegante, serif, ótima para títulos
- Uso: H1, H2, H3, branding

**Body (DM Sans)**
- Clean, sans-serif, legível
- Uso: Corpo de texto, labels, botões

### Escalas de Tamanho

| Contexto | Size | Weight | Line-height |
|----------|------|--------|-------------|
| H1 (Hero) | 2.8rem | 400 (DM Serif) | 1.15 |
| H1 (Page) | 1.6-1.7rem | 400 (DM Serif) | 1.3 |
| H2 | 1.25rem | 400 (DM Serif) | 1.4 |
| Label | 14px | 500 (DM Sans) | 1.4 |
| Body | 13-15px | 400 (DM Sans) | 1.5-1.7 |
| Small | 11-12px | 400 (DM Sans) | 1.4 |
| Tiny | 10px | 500 (DM Sans) | 1.4 |

---

## 🔲 Grid & Espaçamento

### Grid System

**12 Colunas** (desktop 1024px+)
```css
max-width: 1400px;
padding: 0 2.5rem;
```

**6 Colunas** (tablet 768px)
```css
padding: 0 2rem;
```

**1 Coluna** (mobile 375px)
```css
padding: 0 1rem;
```

### Spacing Scale

```css
--space-xs:   4px   /* Micro spacing */
--space-sm:   8px   /* Small gaps */
--space-md:   12px  /* Standard gaps */
--space-lg:   1rem  /* 16px */
--space-xl:   1.4rem /* 22px */
--space-2xl:  1.8rem /* 28px */
--space-3xl:  2.5rem /* 40px */
```

**Uso:**
- Padding componentes: 1rem, 1.2rem, 1.4rem
- Margin vertical: 1.2rem, 1.4rem, 2rem
- Gaps (flex/grid): 12px, 14px, 20px

---

## 🧩 Componentes Base

### Button — Primary

**Estado Normal**
```css
background: var(--accent);
color: #fff;
height: 46px;
padding: 0 1rem;
border-radius: 8px;
font-weight: 500;
```

**Hover**
```css
background: var(--green-600);
```

**Estados Visuais:**
- Default: `--accent` (#3B6D11)
- Hover: `--green-600` (#3B6D11 mais escuro)
- Disabled: `--gray-200` com 50% opacity

### Button — Secondary

```css
background: var(--white);
color: var(--text);
border: 1px solid var(--border);
```

### Input Field

```css
height: 44px;
border: 1px solid var(--border);
border-radius: 8px;
padding: 0 14px;
background: var(--bg);
font-size: 14px;
```

**Focus State**
```css
border-color: var(--accent);
background: #fff;
```

**Placeholder**
```css
color: var(--gray-200);
```

### Card

```css
background: var(--white);
border-radius: 12px;
border: 1px solid var(--border);
padding: 1.2rem - 1.6rem;
```

### Modal / Overlay

```css
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.4);
display: flex;
align-items: center;
justify-content: center;
z-index: 1000;
```

**Modal Box**
```css
background: var(--white);
border-radius: 12px;
padding: 2rem;
max-width: 500px;
width: 90%;
```

### Badge / Tag

```css
display: inline-flex;
align-items: center;
gap: 5px;
padding: 3px 9px;
border-radius: 20px;
font-size: 11px;
font-weight: 500;
```

**Categoria Food (Teal)**
```css
background: var(--teal-50);
color: var(--teal-600);
```

**Categoria Transport (Amber)**
```css
background: var(--amber-50);
color: var(--amber-600);
```

**Categoria Leisure (Green)**
```css
background: var(--green-50);
color: var(--green-600);
```

**Categoria Health (Red)**
```css
background: var(--red-50);
color: var(--red-600);
```

**Categoria Housing (Gray)**
```css
background: #F1EFE8;
color: #444441;
```

### Toast Notification

```css
position: fixed;
bottom: 20px;
right: 20px;
background: var(--white);
border: 1px solid var(--border);
border-radius: 8px;
padding: 1rem 1.4rem;
max-width: 400px;
box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
```

**Toast Success**
```css
border-left: 4px solid var(--teal-400);
```

**Toast Error**
```css
border-left: 4px solid var(--red-400);
```

**Toast Warning**
```css
border-left: 4px solid var(--amber-400);
```

---

## 📱 Breakpoints Responsivos

### Desktop (1024px+)

- **Sidebar:** 220px fixo
- **Main content:** Full flex
- **Grid cards:** 4 colunas
- **Padding:** 2.5rem
- **Fonte base:** 16px

**Media Query**
```css
@media (min-width: 1024px) {
  /* Desktop styles */
}
```

### Tablet (768px - 1023px)

- **Sidebar:** Colapsível (icon-only mode)
- **Main content:** Full
- **Grid cards:** 2 colunas
- **Padding:** 2rem
- **Fonte base:** 15px

**Media Query**
```css
@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet styles */
}
```

### Mobile (375px - 767px)

- **Sidebar:** Drawer/hamburger menu
- **Main content:** Full
- **Grid cards:** 1 coluna
- **Padding:** 1rem
- **Fonte base:** 14px
- **Height inputs:** 40px

**Media Query**
```css
@media (max-width: 767px) {
  /* Mobile styles */
}
```

---

## 🎭 Temas & Variações

### Modo Light (Padrão)

```css
:root {
  --bg: #f4f3ef;
  --white: #ffffff;
  --text: #1a1a18;
  --text-muted: #5F5E5A;
}
```

### Sidebar (Dark)

```css
.sidebar {
  background: var(--sidebar-bg);
  color: #fff;
}

.sidebar .text {
  color: rgba(255, 255, 255, 0.55);
}

.sidebar .text-strong {
  color: #fff;
}
```

### Card Accent (Green Dark)

```css
.metric-card.accent-green {
  background: var(--green-800);
  border-color: var(--green-800);
}

.metric-card.accent-green .mc-value {
  color: var(--green-100);
}
```

---

## ✅ Padrões de Uso

### Layout Principal (Dashboard/Gastos)

```
┌─────────────────────────────────────┐
│ Sidebar (220px) │ Main (flex)       │
│  • Logo         │ ┌───────────────┐ │
│  • Nav items    │ │  Topbar       │ │
│  • Active state │ ├───────────────┤ │
│                 │ │  Content      │ │
│                 │ │  (Cards/Table)│ │
│                 │ └───────────────┘ │
└─────────────────────────────────────┘
```

### Layout Login

```
┌──────────────────┬──────────────────┐
│  Left Panel      │  Right Panel     │
│  (42%, dark)     │  (58%, white)    │
│  • Logo          │  • Tabs          │
│  • Hero text     │  • Form          │
│  • Stats         │  • CTA           │
└──────────────────┴──────────────────┘
```

### Responsive Behavior

**Desktop (1024px+)**
- Sidebar sempre visível
- Layouts em grid multi-coluna
- Menus expansivos

**Tablet (768px)**
- Sidebar colapsível
- Grid 2 colunas máximo
- Drawer para navegação

**Mobile (375px)**
- Sidebar como drawer/hamburger
- Grid 1 coluna
- Botões full-width
- Toque-friendly (min 44px altura)

---

## 🔧 Implementação

### Variáveis CSS

Todas as cores e tamanhos usam variáveis CSS no `:root` para fácil manutenção:

```css
:root {
  --green-50: #EAF3DE;
  --green-100: #C0DD97;
  /* ... mais cores ... */
  --border: rgba(0,0,0,0.08);
}
```

### Reutilização

**Em componentes:**
```css
.button {
  background: var(--accent);
  border-radius: 8px;
  padding: 0.55rem 1rem;
}
```

**Em media queries:**
```css
@media (max-width: 767px) {
  .sidebar { width: 100%; }
  .main { padding: 1rem; }
}
```

---

## 📐 Checklist de Qualidade

- ✅ Cores contrastadas (WCAG AA)
- ✅ Tipografia escalável e legível
- ✅ Espaçamento consistente
- ✅ Componentes reutilizáveis
- ✅ Responsivo em 375px, 768px, 1024px
- ✅ Mobile-first approach
- ✅ Acessibilidade (aria-labels, focus states)
- ✅ Performance (CSS variables, minimal DOM)

---

## 📚 Referências

- **Google Fonts:** DM Serif Display, DM Sans
- **Chart.js:** Para gráficos interativos
- **WCAG 2.1 AA:** Padrão de acessibilidade
- **CSS Grid & Flexbox:** Layout moderno

