import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const cartDrawerRef = useRef(null);
  const navDrawerRef = useRef(null);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
    if (!navDrawerOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (!drawerOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }
  };

  // Close drawers when clicking outside
  const handleClickOutside = (e) => {
    if (drawerOpen && cartDrawerRef.current && !cartDrawerRef.current.contains(e.target)) {
      setDrawerOpen(false);
      document.body.style.overflow = ""; // Enable scrolling
    }
    if (navDrawerOpen && navDrawerRef.current && !navDrawerRef.current.contains(e.target)) {
      setNavDrawerOpen(false);
      document.body.style.overflow = ""; // Enable scrolling
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = ""; // Ensure scrolling is enabled when unmounting
    };
  }, [drawerOpen, navDrawerOpen]);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between h-14 py-4 px-6">
        {/* Left - Logo */}
        <Link to="/">
          <img
            src="/mm.png"
            alt="M.M Boutique"
            className="h-40 -ml-8 w-auto pointer-events-none object-contain"
          />
        </Link>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {["Salwar", "Saree", "Gown", "Aari Blouse", "Inner Wear"].map(
            (category) => (
              <Link
                key={category}
                to={`/collection/all?category=${category}`}
                className="text-gray-700 hover:text-black text-sm font-medium uppercase"
              >
                {category}
              </Link>
            )
          )}
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === "admin" && (
            <Link to="/admin" className="block bg-black px-2 rounded text-sm text-white">
              Admin
            </Link>
          )}

          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar className="h=6 w-6" />
          </div>

          {/* Cart */}
          <button
            onClick={toggleCartDrawer}
            className="relative text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          >
            <HiOutlineShoppingBag className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-rabbit-red text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <Link
            to="/profile"
            className="text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          >
            <HiOutlineUser className="h-6 w-6 text-gray-900" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNavDrawer}
            className="md:hidden text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          >
            <FaBars className="h-6 w-5" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleCartDrawer}></div>
      )}
      <div
        ref={cartDrawerRef}
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      </div>

      {/* Mobile Navigation & Overlay */}
      {navDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleNavDrawer}></div>
      )}

      <div
        ref={navDrawerRef}
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={toggleNavDrawer}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6">
          <nav className="space-y-6 text-lg font-medium text-gray-700">
            {["Salwar", "Saree", "Gown", "Aari Blouse", "Inner Wear"].map(
              (category) => (
                <Link
                  key={category}
                  to={`/collection/all?category=${category}`}
                  onClick={toggleNavDrawer}
                  className="block py-2 px-4 rounded-lg hover:bg-gray-100 transition"
                >
                  {category}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
