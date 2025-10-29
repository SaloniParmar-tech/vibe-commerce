import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          VibeCommerce
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Cart 🛒
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
