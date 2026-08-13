# Plano: Gerenciamento de Vídeos do Portfólio

Este plano implementa um fluxo completo para gerenciar vídeos MP4 no portfólio, permitindo que o administrador envie vídeos, defina títulos, descrições e a ordem de exibição, com atualização automática no site.

## User Review Required

> [!IMPORTANT]
> A implementação usará a tabela `portfolio_slides` já existente, expandindo a interface administrativa para focar no fluxo de vídeos conforme solicitado.

## Proposed Changes

### Database & Backend
- Utilizar a tabela `portfolio_slides` que já suporta `media_type` ('image' ou 'video'), `media_url`, `poster_url`, `caption` e `order_index`.
- As RLS e permissões já estão configuradas para permitir leitura pública e gestão por admin.

### Admin Interface
- **Novo Tab de Vídeos:** Adicionar uma aba ou seção específica no painel `/admin` para gerenciar apenas os vídeos.
- **Upload de Vídeo:** Interface para selecionar arquivos MP4 e enviá-los diretamente para o bucket de storage do Lovable Cloud.
- **Campos de Edição:** Inputs para Título (salvo em `caption`), Descrição (salvo em `caption` ou nova coluna se necessário) e Ordem (`order_index`).
- **Preview:** Exibição do vídeo enviado diretamente no painel admin.

### Frontend (Página Principal/Portfólio)
- **Renderização Dinâmica:** Garantir que a página de Portfólio (ou seção na Home) consuma os dados do banco em tempo real.
- **Player de Vídeo:** Componente de vídeo otimizado para MP4 com suporte a poster (capa).

## Technical Details

### 1. Extensão do Admin (`src/routes/_authenticated/admin.tsx`)
- Adicionar suporte a múltiplos campos no `SlideCard` para separar Título de Descrição se o usuário desejar (usando um separador no campo `caption` ou simplificando).
- Melhorar a UX de upload para vídeos pesados.

### 2. Funções de Servidor (`src/lib/portfolio.functions.ts`)
- Manter a lógica de `listPortfolioSlidesPublic` que já gera URLs assinadas para acesso seguro aos arquivos no storage.

### 3. Integração com a Home/Portfólio
- Atualizar a `PortfolioPage` para priorizar vídeos marcados como ativos.

---
*Este plano foca em automatizar o que hoje é feito manualmente via código no arquivo `portfolio-videos.ts`.*
