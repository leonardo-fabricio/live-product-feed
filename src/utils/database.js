const db = require("better-sqlite3")("data.db", {});

function setupDatabase() {
  db.exec(`
            CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            `);
}

function createProduct(productId) {
  try {
    const stmt = db.prepare("INSERT INTO products (product_id) VALUES (?)");
    stmt.run(productId);
    return { status: "OK" };
  } catch (_) {
    return { status: "ERROR", code: _.code };
  }
}

function getProducts() {
  try {
    const stmt = db.prepare("SELECT * FROM products");
    return { status: "OK", data: stmt.all() };
  } catch (_) {
    return { status: "ERROR", code: _.code };
  }
}

module.exports = {
  setupDatabase,
  getProducts,
  createProduct,
};
