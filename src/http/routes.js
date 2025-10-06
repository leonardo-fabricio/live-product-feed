const {
  handlePostMessage,
  handleGetMessage,
  handleGetClients,
} = require("./controllers/messageController");
const authenticateApiKey = require("../midlleware/authMiddleware");
const validationMiddleware = require("../midlleware/validationMiddleware");
const productSchema = require("../validations/productSchema");
const express = require("express");
const router = express.Router();

router.post(
  "/message",
  authenticateApiKey,
  validationMiddleware(productSchema),
  handlePostMessage,
);
router.get("/message", authenticateApiKey, handleGetMessage);
router.get("/clients", authenticateApiKey, handleGetClients);

module.exports = router;
