# Regras de Desenvolvimento - BeWhyOrg

## 🎯 Objetivo
Manter a consistência e evitar mudanças desnecessárias no projeto.

## 🔒 Regras Fundamentais

### 1. IDIOMA PORTUGUÊS 🇵🇹
- **OBRIGATÓRIO**: Toda a interface em português
- **PROIBIDO**: Traduzir textos existentes
- **INCLUÍ**: Comentários, variáveis, mensagens

### 2. ESTRUTURA PRESERVADA
- **NÃO ALTERAR**: Organização de pastas
- **NÃO RENOMEAR**: Componentes existentes  
- **NÃO MOVER**: Ficheiros sem necessidade

### 3. MUDANÇAS MÍNIMAS
- Fazer apenas o que foi pedido
- Não "otimizar" código não solicitado
- Preservar funcionalidades existentes

## ⚡ Para Assistentes IA

### Antes de Qualquer Alteração:
1. ✅ Foi especificamente solicitado?
2. ✅ Mantém português na interface?
3. ✅ Preserva estrutura existente?
4. ✅ É a mudança mínima necessária?

### Se Alguma Resposta for NÃO:
**🛑 PARAR e PERGUNTAR primeiro!**

## 📁 Estrutura Protegida

```
src/app/
├── layout/          # 🔒 NÃO ALTERAR
├── pages/           # ✅ Pode adicionar conteúdo
├── services/        # 🔒 NÃO ALTERAR sem permissão
└── app.routes.ts    # 🔒 NÃO ALTERAR rotas
```

## 🚨 Mudanças Proibidas
- Traduzir interface para inglês
- Reestruturar sem permissão
- Alterar tema/design
- Remover funcionalidades
- Mudar nomes estabelecidos

---
**LEMBRETE**: Em caso de dúvida, SEMPRE perguntar!