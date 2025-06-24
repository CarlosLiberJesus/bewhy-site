# BeWhyOrg 🇵🇹

Primeiro front-end em Tailwind CSS - Projeto desenvolvido em **português**.

## 🚀 Sobre o Projeto

Este é um projeto Angular moderno que simula um IDE/editor de código, desenvolvido inteiramente em português. O projeto apresenta uma estrutura organizada com diferentes secções para projetos de IA, aplicações web e páginas públicas.

## 📋 Características

- ✅ Interface em **português**
- ✅ Tema escuro/claro
- ✅ Navegação por tabs
- ✅ Estrutura de ficheiros simulada
- ✅ Routing Angular moderno
- ✅ Design responsivo com Tailwind CSS

## 🏗️ Estrutura do Projeto

```
src/app/
├── layout/              # Componentes de layout
│   ├── file-tree/       # Árvore de ficheiros
│   ├── tab-bar/         # Barra de tabs
│   ├── sidebar-footer/  # Rodapé da sidebar
│   └── system-messages/ # Mensagens do sistema
├── pages/               # Páginas da aplicação
│   ├── src/
│   │   ├── webapp/      # Aplicações web
│   │   └── ai-agents/   # Agentes de IA
│   └── public/          # Páginas públicas
└── services/            # Serviços Angular
```

## 🛠️ Tecnologias

- **Angular 20** (Standalone Components)
- **Tailwind CSS** com Fluid Tailwind
- **Lucide Angular** (Ícones)
- **TypeScript** (Strict Mode)
- **SCSS** para estilos customizados

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm start

# Build para produção
npm run build
```

## 📖 Desenvolvimento

### ⚠️ IMPORTANTE para Contribuidores/IAs

**LEIA SEMPRE** o ficheiro `CONTRIBUTING.md` antes de fazer alterações!

### Regras Fundamentais:

1. 🇵🇹 **Manter português** em toda a interface
2. 🏗️ **Preservar estrutura** existente
3. 🎯 **Mudanças mínimas** - apenas o solicitado
4. ❓ **Perguntar** antes de grandes alterações

## 📁 Páginas Principais

- **src/web-app/index-angular** - Página inicial Angular
- **src/web-app/laravel-php** - Projeto Laravel
- **src/ai-agent/site-bot** - Bot do site
- **src/ai-agent/moodle-agent/** - Agentes Moodle
  - moodle-chat
  - moodle-langchain
  - moodle-mcp
- **public/sobre-org** - Sobre a organização
- **public/contacte-nos** - Contactos
- **public/politicas-md** - Contactos
- **404** - Not Found

## 🎨 Design

O projeto utiliza um design moderno inspirado em IDEs como VS Code, com:

- Sidebar com árvore de ficheiros
- Sistema de tabs
- Tema escuro/claro
- Layout responsivo
- Micro-interações

## Cores

A cores têm de usar o `ThemeService` para actualizar as mesmas:
`<span [ngClass]="isDarkTheme ? 'text-gray-200' : 'text-gray-700'">Texto</span>`

### ThemeDark

- bg-black
- bg-gray-800 (hover:bg-gray-700)
- border-gray-800
- text-gray-200
- text-gray-400

### ThemeLight

- bg-white
- bg-gray-200 (hover:bg-gray-100)
- border-gray-200
- text-gray-700
- text-gray-400

### Cores Accent

- yellow-500 (Principal)
- teal-500
- blue-500
- emerald-500

## 📄 Licença

GNU General Public License v3.0

---

**Desenvolvido com ❤️ em português para a comunidade BeWhyOrg**
