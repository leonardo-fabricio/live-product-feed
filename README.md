# Live Product Feed API

This is a simple API for distributing product data in real-time via **WebSocket**.

---

## Authentication

All API requests require authentication.
Include your API key in the **`X-Api-Key`** header.

**Example:**

```http
X-Api-Key: your_secret_key_here
```

---

## Endpoints

### `POST /message`

Sends a new product to all connected WebSocket clients.

**Headers:**

* `Content-Type: application/json`
* `X-Api-Key: [your_key]`

**Body:**

```json
{
  "product": {
    "name": "Product Name",
    "id": "Product ID"
  }
}
```

**Responses:**

* `200 OK`

  ```json
  {"status": "Product sent successfully."}
  ```

* `400 Bad Request`

  ```json
  {"error": "It is necessary to send the product data."}
  ```

* `401 Unauthorized`

  ```json
  {"error": "API access key is invalid"}
  ```

* `500 Internal Server Error`

  ```json
  {"error": "Internal server error while sending the product."}
  ```

**Example with cURL:**

```bash
curl -X POST \
  http://localhost:[PORT]/message \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: [your_key]" \
  -d '{"product": {"name": "Laptop", "id": 1}}'
```

---

### `GET /message`

Retrieves the last product received by the API.

**Headers:**

* `X-Api-Key: [your_key]`

**Responses:**

* `200 OK`

  ```json
  {
    "id": "12345",
    "name": "New Product"
  }
  ```

* `401 Unauthorized`

  ```json
  {"error": "API Key is missing."}
  ```

* `404 Not Found`

  ```json
  {"error": "No products have been received yet."}
  ```

---

### `GET /clients`

Retrieves the number of clients connected to the socket.

**Headers:**

* `Content-Type: application/json`
* `X-Api-Key: [your_key]`

**Responses:**

* `200 OK`

  ```json
  {
    "clients": 0
  }
  ```

* `401 Unauthorized`

  ```json
  {"error": "API access key is invalid"}
  ```

* `500 Internal Server Error`

  ```json
  {"error": "Internal server error while fetching clients."}
  ```

**Example with cURL:**

```bash
curl -X GET \
  http://localhost:[PORT]/clients \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: [your_key]"
```

---

## WebSocket Connection

Connect to the WebSocket server to receive real-time product updates.
The API key must be passed as a query parameter named `token`.

**Endpoint:**

```bash
ws://localhost:[PORT]?token=your_secret_key
```

**Received Data (JSON):**

```json
{
  "type": "new_product",
  "content": {
    "id": "12345",
    "name": "Product Name"
  }
}
```

**Example with React:**

```javascript
useEffect(() => {
  const serverUrl = "ws://localhost:[PORT]?token=[token]";
  const ws = new WebSocket(serverUrl);

  ws.onopen = () => {
    console.log("Connected to WebSocket server.");
  };

  ws.onmessage = (event) => {
    console.log("Message received:", event.data);
  };
}, []);
```

---
