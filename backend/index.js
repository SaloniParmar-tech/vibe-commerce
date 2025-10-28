const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Products mock data
const products = require("./data");

// Routes
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.use("/api/cart", cartRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
