import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="bg-gray-600 text-white w-full shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          Portfolio Tracker{" "}
        </Link>

        <div className="hidden md:flex space-x-6">
          <a href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </a>
          <a href="/portfolio" className="hover:text-gray-300">
            Portfolio
          </a>
        </div>

        {/* Searchbar */}
        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <div className="relative">
            <button className="flex items-center space-x-2 hover:text-gray-300">
              <FaRegUserCircle style={{ height: 30, width: 30 }} />
              <span>William Serif</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
