# Live Product Feed API

Esta é uma API simples para distribuir dados de produtos em tempo real via WebSocket.

---

## Autenticação

Todas as requisições POST para a API precisam de autenticação. Inclua a sua chave de API no cabeçalho `X-Api-Key`.

**Exemplo:**
`X-Api-Key: sua_chave_secreta_aqui`

---

## Endpoints da API

### `POST /message`

Envia um novo produto para todos os clientes conectados via WebSocket.

**Header:**

- `Content-Type: application/json`
- `X-Api-Key: [sua_chave]`

**Corpo da Requisição:**

```json
{
  "product": {
    "name": "Nome do Produto",
    "id": "Id do produto"
  }
}
```

**Respostas:**

200 OK: {"status": "Product sent successfully."}

400 Bad Request: {"error": "It is necessary to send the product data."}

401 Unauthorized: {"error": "API Key is missing."}
