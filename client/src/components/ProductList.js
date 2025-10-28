import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>🛒 Products</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 10 }}>
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <button onClick={() => onAddToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
