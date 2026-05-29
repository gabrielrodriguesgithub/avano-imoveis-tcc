# Avano Imóveis Backend

Backend completo para o projeto Avano Imóveis, construído com Node.js, Express, SQLite e JWT.

## Instalação

1. Navegue até a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicialize o banco de dados:

```bash
npm run init-db
```

4. Execute o servidor:

```bash
npm start
```

ou em modo de desenvolvimento:

```bash
npm run dev
```

## Configuração

O backend usa as variáveis de ambiente:

- `PORT` - porta do servidor (padrão: `4000`)
- `JWT_SECRET` - chave secreta para JWT

Crie um arquivo `.env` na pasta `backend` se quiser customizar estes valores.

## Endpoints principais

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`
- `GET /api/users`
- `POST /api/users`
- `GET /api/properties`
- `POST /api/properties`
- `GET /api/appointments`
- `POST /api/appointments`
- `GET /api/dashboard/stats`
- `GET /api/config`
- `PUT /api/config`
- `POST /api/support/messages`

Todas as respostas retornam o formato padrão:

```json
{
  "success": true,
  "data": null,
  "message": "Mensagem"
}
```
