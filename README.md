# Live Product Feed API

This is a simple API for distributing product data in real-time via WebSocket.

## Authentication

All `POST` requests to the API require authentication. Include your API key in the `X-Api-Key` header.

**Example header:**
```http
X-Api-Key: your_secret_key_here
```

## API Endpoints

### `POST /message`

Sends a new product to all connected WebSocket clients.

**Headers**
- `Content-Type: application/json`
- `X-Api-Key: [your_key]`

**Request Body**
```json
{
  "product": {
    "name": "Product Name",
    "id": "Product ID"
  }
}
```

**Responses**
- `200 OK`  
  ```json
  {"status": "Product sent successfully."}
  ```
- `400 Bad Request`  
  ```json
  {"error": "It is necessary to send the product data."}
  ```
- `401 Unauthorized`  
  ```json
  {"error": "API access key is invalid"}
  ```
- `500 Internal Server Error`  
  ```json
  {"error": "Internal server error while sending the product."}
  ```

**Example with cURL**
```bash
curl -X POST http://localhost:[PORT]/message   -H "Content-Type: application/json"   -H "X-Api-Key: [your_key]"   -d '{"product": {"name": "Laptop", "id": 1}}'
```

---

### `GET /message`

Retrieves the last product received by the API.

**Headers**
- `X-Api-Key: [your_key]`

**Responses**
- `200 OK` — Returns the last product object:
  ```json
  {
    "id": "12345",
    "name": "New Product"
  }
  ```
- `401 Unauthorized` — If the API key is missing or invalid:
  ```json
  {"error": "API Key is missing."}
  ```
- `404 Not Found` — If no products have been received yet:
  ```json
  {"error": "No products have been received yet."}
  ```

---

## WebSocket Connection

Connect to the WebSocket server to receive real-time product updates.

**Endpoint**
```
ws://localhost:[PORT]
```

**Received Data (JSON)**
```json
{
  "type": "new_product",
  "content": {
    "name": "Product Name",
    "id": 1
  }
}
```
