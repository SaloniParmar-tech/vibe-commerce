import express from "express";
import cors from "cors";
import cartRoutes from "./routes/cartRoutes.js";
import products from "./data.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Serve product images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "public/images")));

// ✅ Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ✅ Cart routes
app.use("/api/cart", cartRoutes);

// ✅ Checkout route (fixed payload + valid JSON response)
app.post("/api/checkout", (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty!" });
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    const receipt = {
      total: totalAmount,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(receipt);
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
