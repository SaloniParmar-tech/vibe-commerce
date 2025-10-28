import React from "react";

const Cart = ({ cart, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.qty * 100, 0);

  return (
    <div>
      <h2>🛍️ Cart</h2>
      {cart.map(item => (
        <div key={item.productId}>
          Product ID: {item.productId} | Qty: {item.qty}
          <button onClick={() => onRemove(item.productId)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;
