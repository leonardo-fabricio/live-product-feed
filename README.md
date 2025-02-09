# App realtime to alert about new products in the feed

Install all dependencies 

```Bash
npm i
```

Run websocket server

```Bash
npm run dev
```

Run API server

```Bash
npm run test
```

Try conection client

```Bash
npm run test
```

## API Endpoints

| Method | Route               | Description |
|--------|--------------------|-------------|
| `POST` | `/events/product`  | Receives new product notifications and emits a WebSocket event. |
| `GET`  | `/products`        | Returns the list of products (for clients that need to fetch data). |
