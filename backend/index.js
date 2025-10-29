
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// 🛍 Mock product data with images
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 599,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b22?w=400",
  },
  {
    id: 2,
    name: "Keyboard",
    price: 999,
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 799,
    image: "https://images.unsplash.com/photo-1629904853891-44e636c61d4c?w=400",
  },
  {
    id: 4,
    name: "USB Cable",
    price: 199,
    image: "https://images.unsplash.com/photo-1606813907291-5c5f86e2f548?w=400",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 1499,
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400",
  },
];

// 🧾 API routes
app.get("/api/products", (req, res) => {
  res.json(products);
});

let cart = [];

app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
  }
  res.json(cart);
});

app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter((item) => item.id !== parseInt(id));
  res.json(cart);
});

app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ cart, total });
});

app.post("/api/checkout", (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const receipt = {
    total,
    timestamp: new Date().toISOString(),
  };
  cart = [];
  res.json(receipt);
});

// 🚀 Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
