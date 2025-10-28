import React, { useState } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = async (productId) => {
    const res = await axios.post("http://localhost:5000/api/cart", { productId, qty: 1 });
    setCart(res.data.cart);
  };

  const removeFromCart = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/cart/${id}`);
    setCart(res.data.cart);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Vibe Commerce</h1>
      <ProductList onAddToCart={addToCart} />
      <Cart cart={cart} onRemove={removeFromCart} />
    </div>
  );
}

export default App;
