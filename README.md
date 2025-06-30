# 🔧 Guia de Instalação - Crypto Tracker Fullstack

Este guia fornece instruções detalhadas para instalar e executar o projeto Crypto Tracker Fullstack.

## 📋 Pré-requisitos

### Software Necessário
- **Node.js** versão 18 ou superior
- **npm** (incluído com Node.js) ou **yarn**
- **Git** (para clonar o repositório)

### Verificar Instalações
```bash
node --version    # Deve mostrar v18.x.x ou superior
npm --version     # Deve mostrar versão do npm
git --version     # Deve mostrar versão do git
```

## 📥 Download do Projeto

### Opção 1: Clonar Repositório (se disponível)
```bash
git clone [URL_DO_REPOSITORIO]
cd crypto-tracker-fullstack
```

### Opção 2: Extrair Arquivo Compactado
```bash
# Extrair o arquivo crypto-tracker-fullstack.zip
unzip crypto-tracker-fullstack.zip
cd crypto-tracker-fullstack
```

## 🚀 Instalação e Execução

### 1. Configurar Backend

```bash
# Navegar para o diretório do backend
cd backend

# Instalar dependências
npm install

# Verificar se a instalação foi bem-sucedida
npm list --depth=0

# Iniciar o servidor backend
npm start
```

**Saída esperada:**
```
info: Banco de dados inicializado com sucesso
info: Servidor rodando na porta 3001
info: Health check: http://localhost:3001/health
```

### 2. Configurar Frontend (Nova aba/terminal)

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Verificar se a instalação foi bem-sucedida
npm list --depth=0

# Iniciar o servidor de desenvolvimento
npm run dev
```

**Saída esperada:**
```
VITE v6.x.x ready in XXXms
➜ Local: http://localhost:5173/crypto-tracker/
➜ Network: use --host to expose
```

## 🌐 Acessar a Aplicação

1. **Backend API**: http://localhost:3001
2. **Frontend Web**: http://localhost:5173/crypto-tracker/
3. **Health Check**: http://localhost:3001/health

## 👤 Login no Sistema

Use um dos usuários pré-cadastrados:

| Usuário | Senha    |
|---------|----------|
| admin   | admin123 |
| user1   | user123  |
| test    | test123  |

## 🔍 Testando as Funcionalidades

### 1. Login
- Acesse http://localhost:5173/crypto-tracker/
- Use as credenciais: `admin` / `admin123`
- Clique em "Entrar"

### 2. Busca de Criptomoedas
- Digite "bitcoin" no campo de busca
- Clique em "Buscar"
- Verifique se os dados aparecem

### 3. Favoritos
- Clique em "⭐ Favoritar" em uma criptomoeda
- Acesse a aba "Favoritos"
- Verifique se a moeda foi adicionada

## 🛠️ Solução de Problemas

### Erro: "EADDRINUSE: address already in use"
```bash
# Verificar processos usando as portas
lsof -i :3001  # Backend
lsof -i :5173  # Frontend

# Matar processo se necessário
kill -9 [PID]
```

### Erro: "Cannot connect to backend"
1. Verificar se o backend está rodando na porta 3001
2. Verificar logs do backend para erros
3. Testar health check: `curl http://localhost:3001/health`

### Erro: "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Database locked"
```bash
# Parar o backend e remover o banco
cd backend
rm -f database.sqlite
npm start  # Recriará o banco automaticamente
```

## 📁 Estrutura de Arquivos

```
crypto-tracker-fullstack/
├── backend/
│   ├── src/
│   │   ├── routes/          # Rotas da API
│   │   │   ├── auth.js      # Autenticação
│   │   │   ├── crypto.js    # Criptomoedas
│   │   │   └── favorites.js # Favoritos
│   │   ├── models/          # Modelos de dados
│   │   │   ├── User.js      # Usuários
│   │   │   ├── Favorite.js  # Favoritos
│   │   │   └── SecurityLog.js # Logs
│   │   ├── config/          # Configurações
│   │   │   ├── database.js  # Banco de dados
│   │   │   └── cache.js     # Cache
│   │   └── app.js           # Servidor principal
│   ├── logs/                # Logs do sistema
│   ├── database.sqlite      # Banco de dados
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── contexts/        # Contextos
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🔧 Configurações Avançadas

### Variáveis de Ambiente (Backend)
Criar arquivo `.env` no diretório `backend/`:
```bash
PORT=3001
JWT_SECRET=sua-chave-secreta-aqui
NODE_ENV=development
```

### Configurar CORS (se necessário)
Editar `backend/src/app.js` para adicionar sua origem:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://seu-dominio.com'  // Adicionar aqui
];
```

## 📊 Monitoramento

### Logs do Backend
```bash
# Ver logs em tempo real
tail -f backend/logs/combined.log

# Ver apenas erros
tail -f backend/logs/error.log
```

### Status da API
```bash
# Health check completo
curl http://localhost:3001/health

# Status da API
curl http://localhost:3001/api/health
```

### Estatísticas de Cache
```bash
# Ver estatísticas do cache
curl http://localhost:3001/health | jq '.cache'
```

## 🚀 Deploy em Produção

### Backend
```bash
cd backend
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm run build
# Servir arquivos da pasta dist/
```

## 📞 Suporte

### Logs Importantes
- `backend/logs/error.log` - Erros do sistema
- `backend/logs/combined.log` - Todos os logs
- Console do navegador - Erros do frontend

### Comandos Úteis
```bash
# Verificar status dos serviços
ps aux | grep node

# Verificar portas em uso
netstat -tulpn | grep :3001
netstat -tulpn | grep :5173

# Reiniciar tudo
pkill -f node
cd backend && npm start &
cd frontend && npm run dev &
```

---

**Em caso de problemas, verifique os logs e consulte a documentação técnica no README.md**

