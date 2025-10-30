import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill all fields!");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Checkout successful!");
        setReceipt(data);

        // ✅ Clear cart immediately after success
        clearCart();
      } else {
        toast.error(data.error || "Checkout failed!");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <Toaster />
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🧾 Checkout
        </h2>

        {receipt ? (
          <div className="text-center space-y-3">
            <h3 className="text-green-600 text-xl font-semibold">
              ✅ Checkout successful!
            </h3>
            <p className="text-gray-700">
              Thank you for shopping with{" "}
              <span className="font-bold text-blue-600">VibeCommerce</span>!
            </p>
            <div className="mt-4 bg-gray-50 border rounded-lg py-3">
              <p className="text-gray-700 font-medium">
                Total: <span className="text-blue-600">₹{receipt.total}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Order Time:{" "}
                {new Date(receipt.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold py-2 rounded-lg transition duration-300 transform hover:scale-105`}
            >
              {loading ? "Processing..." : "Complete Checkout"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;
