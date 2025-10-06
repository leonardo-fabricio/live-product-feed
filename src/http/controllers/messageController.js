const { broadcastMessage, clients } = require("../../websocket/socket");

const handlePostMessage = (req, res) => {
  const { product } = req.body;

  if (!product || Object.keys(product).length === 0) {
    return res
      .status(400)
      .json({ error: "It is necessary to send the product data." });
  }

  try {
    broadcastMessage(product);
    return res.status(200).json({ status: "Product sent successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error while sending the product." });
  }
};

const handleGetMessage = (req, res) => {
  res.status(200).json({ message: [] });
};

const handleGetClients = (req, res) => {
  try {
    return res.status(200).json({ clients: clients.size });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error while fetching clients." });
  }
};

module.exports = {
  handlePostMessage,
  handleGetMessage,
  handleGetClients,
};
