import React from "react";
import axios from "axios";

const ProductCard = ({ product, refreshCart }) => {
  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/add", product);
      refreshCart && refreshCart();
      alert("✅ Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        padding: "1rem",
        textAlign: "center",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
      }}
    >
      <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "1rem",
        }}
      />
      <h3 style={{ color: "#333", fontSize: "1.2rem" }}>{product.name}</h3>
      <p style={{ color: "#777", margin: "0.5rem 0" }}>₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        style={{
          background: "#ff5252",
          color: "white",
          border: "none",
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#ff7373")}
        onMouseLeave={(e) => (e.target.style.background = "#ff5252")}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
