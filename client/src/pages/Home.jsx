import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("✅ Added to cart!");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading products...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-6 md:px-12">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        🛍️ Explore Our Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    product.image
                      ? `http://localhost:5000/images/${product.image}`
                      : "https://via.placeholder.com/300x200?text=Product+Image"
                  }
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  New
                </span>
              </div>

              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {product.description || "A high-quality product you'll love!"}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-xl font-bold text-blue-600 mb-3">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
