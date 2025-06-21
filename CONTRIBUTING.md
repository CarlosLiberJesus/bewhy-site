# Guia de Contribuição - BeWhyOrg

## 🇵🇹 Idioma do Projeto
**IMPORTANTE**: Este projeto é desenvolvido em **PORTUGUÊS**. Todas as interfaces, comentários, documentação e mensagens devem manter-se em português.

### ❌ Não Alterar:
- Textos da interface de utilizador
- Comentários em português
- Nomes de variáveis em português
- Mensagens de sistema
- Documentação existente

## 🏗️ Estrutura do Projeto

### Estrutura de Pastas Estabelecida:
```
src/app/
├── layout/           # Componentes de layout (não alterar estrutura)
├── pages/            # Páginas do projeto
│   ├── src/
│   │   ├── webapp/   # Aplicações web
│   │   └── ai-agents/ # Agentes de IA
│   └── public/       # Páginas públicas
├── services/         # Serviços Angular
└── ...
```

### ⚠️ Regras de Modificação:

#### 🚫 NUNCA Alterar Sem Permissão:
1. **Estrutura de pastas existente**
2. **Nomes de componentes já estabelecidos**
3. **Rotas já definidas**
4. **Idioma da interface (deve manter português)**
5. **Tema e design já aprovado**
6. **Configurações do Tailwind/Angular**

#### ✅ Pode Alterar/Adicionar:
1. **Conteúdo específico de páginas** (quando solicitado)
2. **Novos componentes** (seguindo a estrutura)
3. **Estilos específicos** (sem quebrar o tema)
4. **Funcionalidades novas** (seguindo padrões)

## 🎯 Princípios de Desenvolvimento

### 1. Mudanças Mínimas
- Fazer apenas as alterações solicitadas
- Não "melhorar" código que não foi pedido
- Manter consistência com o existente

### 2. Preservar Contexto
- Manter nomes em português
- Preservar estrutura de navegação
- Não alterar rotas sem necessidade

### 3. Confirmar Antes de Grandes Mudanças
- Perguntar antes de reestruturar
- Explicar impacto das mudanças
- Sugerir alternativas menos invasivas

## 🔧 Padrões Técnicos

### Angular:
- Usar standalone components
- Lazy loading para páginas
- Serviços injetáveis
- TypeScript strict mode

### Styling:
- Tailwind CSS (configuração existente)
- Tema escuro/claro já implementado
- Componentes responsivos
- Ícones Lucide Angular

### Estrutura de Ficheiros:
```
component-name/
├── component-name.ts
├── component-name.html
├── component-name.scss
└── component-name.spec.ts
```

## 📋 Checklist Antes de Modificar

- [ ] A alteração foi especificamente solicitada?
- [ ] Mantém o idioma português?
- [ ] Preserva a estrutura existente?
- [ ] Segue os padrões estabelecidos?
- [ ] Não quebra funcionalidades existentes?
- [ ] É a mudança mínima necessária?

## 🚨 Avisos Importantes

### Para IAs/Assistentes:
1. **LER SEMPRE** este ficheiro antes de fazer alterações
2. **PERGUNTAR** se não tiver certeza sobre uma mudança
3. **MANTER** português em toda a interface
4. **PRESERVAR** estrutura e rotas existentes
5. **FOCAR** apenas no que foi pedido

### Exemplos de Mudanças Proibidas:
- ❌ Traduzir interface para inglês
- ❌ Reestruturar pastas sem permissão
- ❌ Alterar nomes de componentes estabelecidos
- ❌ Mudar tema/design sem solicitação
- ❌ Remover funcionalidades existentes

## 📞 Em Caso de Dúvida
**SEMPRE perguntar antes de fazer mudanças significativas!**

---
*Este documento deve ser consultado antes de qualquer modificação no projeto.*