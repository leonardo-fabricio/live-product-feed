require("dotenv").config();
const express = require("express");
const {
  setupDatabase,
  getProducts,
  createProduct,
} = require("./utils/database");

const app = express();
const API_PORT = process.env.API_PORT;
const API_TOKEN = process.env.API_TOKEN;

setupDatabase();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  //MIDDLEAWARE
  const { token } = req.query;
  if (token && token == API_TOKEN) return next();
  return res.status(403).json({ status: "ERROR", message: "Token not valid" });
});

app.get("/products", (req, res) => {
  const queryResponse = getProducts();
  if (queryResponse.status == "OK") {
    return res.status(200).json({
      results: queryResponse.data,
    });
  }
  return res
    .status(400)
    .json({ ...queryResponse, message: "Try again in a few moments" });
});

app.post("/events/product", (req, res) => {
  const { product_id } = req.body;
  const queryResponse = createProduct(product_id);
  if (queryResponse.status == "OK")
    return res.status(201).json({ status: "OK", message: "Product created" });
  return res
    .status(400)
    .json({ ...queryResponse, message: "Failure to create product" });
});

app.listen(API_PORT, () => {
  console.log(
    `| \x1b[32mAPI Listening\x1b[0m\n| \x1b[33mhttp://localhost:${API_PORT}\x1b[0m`
  );
});
