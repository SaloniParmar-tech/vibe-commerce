const express = require("express");
const router = express.Router();

let cart = [];

// Add item to cart
router.post("/", (req, res) => {
  const { productId, qty } = req.body;
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) existingItem.qty += qty;
  else cart.push({ productId, qty });
  
  res.json({ message: "Item added to cart", cart });
});

// Get cart
router.get("/", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.qty * 100, 0); // mock total
  res.json({ cart, total });
});

// Delete item
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.productId !== id);
  res.json({ message: "Item removed", cart });
});

// Checkout
router.post("/checkout", (req, res) => {
  const timestamp = new Date().toLocaleString();
  res.json({ message: "Checkout successful", total: 1000, timestamp });
});

module.exports = router;
