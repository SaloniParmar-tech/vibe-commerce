import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const fetchCart = () => {
    fetch("http://localhost:5000/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error("Error fetching cart:", err));
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" })
      .then(() => fetchCart());
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Please enter your name and email!");
      return;
    }

    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        cartItems: cart.items,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReceipt(data);
        setShowReceipt(true);
        setCart({ items: [], total: 0 });
      })
      .catch((err) => console.error("Checkout error:", err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.items && cart.items.length > 0 ? (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Qty: {item.qty}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 font-medium hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="text-lg font-semibold text-right">
            Total: ${cart.total}
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handleCheckout}
            className="mt-6 bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Checkout</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border rounded-lg p-2 focus:ring focus:ring-blue-300 outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Confirm Checkout
            </button>
          </form>
        </div>
      ) : (
        <p>Your cart is empty 😢</p>
      )}

      {/* Receipt Modal */}
      {showReceipt && receipt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg text-center">
            <h3 className="text-xl font-bold mb-2 text-green-600">Order Successful!</h3>
            <p className="text-gray-700 mb-2">
              Thank you, <span className="font-semibold">{form.name}</span>!
            </p>
            <p className="text-gray-700 mb-2">Total: ${receipt.total}</p>
            <p className="text-sm text-gray-500 mb-4">
              Time: {new Date(receipt.timestamp).toLocaleString()}
            </p>
            <button
              onClick={() => setShowReceipt(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
