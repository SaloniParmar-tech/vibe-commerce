import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b">
      <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
        Vibe<span className="text-gray-800">Commerce</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 font-medium hover:text-blue-600 transition">
          Home
        </Link>

        <Link to="/cart" className="relative flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition">
          <ShoppingCart size={22} />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
