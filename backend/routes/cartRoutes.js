import express from "express";
import products from "../data.js";

const router = express.Router();

let cart = [];

// ✅ Fetch all products
router.get("/products", (req, res) => {
  res.json(products);
});

// ✅ Get all items in cart
router.get("/", (req, res) => {
  res.json(cart);
});

// ✅ Add product to cart
router.post("/add", (req, res) => {
  const { id } = req.body;
  const product = products.find((p) => p.id === id);
  if (product) {
    cart.push(product);
    res.json({ message: "Product added to cart", cart });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// ✅ Remove product from cart
router.post("/remove", (req, res) => {
  const { id } = req.body;
  cart = cart.filter((p) => p.id !== id);
  res.json({ message: "Product removed", cart });
});

export default router;
