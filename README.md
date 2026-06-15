# 💪 Shape 404 - Guia de Exercícios PWA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8.svg)](https://web.dev/progressive-web-apps/)

## 📱 Sobre o Projeto

**Shape 404** é um aplicativo web progressivo (PWA) para acompanhamento de exercícios de academia. Desenvolvido com React e Vite, o app permite que você consulte exercícios, monte treinos personalizados, registre séries e controle o tempo de descanso com alarme.

> **Diferencial:** Ao contrário de apps nativos, este PWA não precisa da Apple Store, nunca expira e funciona offline - basta instalar direto do navegador!

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| **React 18** | Biblioteca para construção da interface |
| **Vite** | Build tool rápida e moderna |
| **Framer Motion** | Animações fluidas e interações |
| **Lucide React** | Ícones elegantes e consistentes |
| **Vite PWA Plugin** | Transforma o app em PWA instalável |
| **LocalStorage** | Persistência de dados (favoritos e treinos) |
| **Web Audio API** | Geração de alarme sonoro (fallback) |

---

## ✨ Funcionalidades Completas

### 📚 Biblioteca de Exercícios
- 8+ exercícios pré-cadastrados (peito, costas, pernas, ombros)
- Filtros por categoria muscular
- Busca por nome ou descrição em tempo real
- Expansão para detalhes (músculos, equipamento, dicas, vídeo)

### ❤️ Favoritos
- Salve seus exercícios favoritos com um clique
- Persistência automática no localStorage
- Filtro para exibir apenas favoritos
- Ícone visual de coração preenchido/vazio

### 🏋️ Treino Ativo
- Selecione exercícios apenas da sua lista de favoritos
- Registre cada série com repetições e peso
- Acompanhamento visual do progresso (exercícios concluídos)
- Timer de descanso entre séries (30s, 60s, 90s, 120s)

### 🔔 Alarme Sonoro
- Suporte para MP3 personalizado
- Fallback para sirene sintetizada (funciona sempre)
- Vibração no iPhone
- Botão de teste para verificar o som

### 🌓 Tema
- Alternância entre modo claro e escuro
- Persistência automática da preferência
- Transição suave entre temas

### 📱 PWA
- Instalável na tela inicial do iPhone/Android
- Funciona offline (Service Worker)
- Ícone nativo na home do celular
- Experiência de tela cheia sem barra de endereço

---

## 📸 Demonstração das Telas

### Tela Principal




---

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+ ou 20+
- npm ou yarn

### Passos para desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/meu-treino-pwa.git
cd meu-treino-pwa

# Instale as dependências
npm install

# Instale dependências adicionais
npm install framer-motion lucide-react
npm install -D vite-plugin-pwa

# Execute em modo desenvolvimento
npm run dev

# Acesse no navegador
# http://localhost:xxxx