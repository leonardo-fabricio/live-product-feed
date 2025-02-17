# App realtime to alert about new products in the feed

Install all dependencies 

```Bash
npm i
```

Run websocket server

```Bash
npm run socket
```

Run API server

```Bash
npm run api
```

Run the application NEXTJS with

```Bash
npm run consumer
```

Try conection client

```Bash
npm run test
```

## API Endpoints

| Method | Route               | Description | Params |
|--------|--------------------|-------------| -------------|
| `POST` | `/events/product`  | Receives new product notifications and emits a WebSocket event. | `product_id: NUMBER`|
| `GET`  | `/products`        | Returns the list of products (for clients that need to fetch data). | `Nothing` |
