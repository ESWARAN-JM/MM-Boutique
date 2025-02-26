import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const cartDrawerRef = useRef(null);
  const navDrawerRef = useRef(null);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  // Prevent scrolling when a drawer is open
  useEffect(() => {
    if (drawerOpen || navDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [drawerOpen, navDrawerOpen]);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
    setDrawerOpen(false); // Close cart drawer when opening menu
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
    setNavDrawerOpen(false); // Close menu when opening cart drawer
  };

  // Close drawers when clicking outside
  const handleClickOutside = (e) => {
    if (drawerOpen && cartDrawerRef.current && !cartDrawerRef.current.contains(e.target)) {
      setDrawerOpen(false);
    }
    if (navDrawerOpen && navDrawerRef.current && !navDrawerRef.current.contains(e.target)) {
      setNavDrawerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen, navDrawerOpen]);

  return (
    <>
      <nav className="fixed top-10 left-0 w-full bg-white shadow-md z-40 flex items-center justify-between h-14 py-4 px-6">
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
            <SearchBar className="h-6 w-6" />
          </div>


          {/* Profile */}
          <Link
            to="/profile"
            className="text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          >
            <HiOutlineUser className="h-6 w-6 text-gray-900" />
          </Link>

          
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNavDrawer}
            className="md:hidden text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
          >
            <FaBars className="h-6 w-5" />
          </button>
        </div>

      </nav>
      

      {/* Overlay to prevent scrolling outside */}
      {(drawerOpen || navDrawerOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={handleClickOutside}></div>
      )}

      {/* Cart Drawer */}
      
      <div
        ref={cartDrawerRef}
        className={`fixed  right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-30 overflow-y-auto ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      > 
        <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      </div>
        
      {/* Mobile Navigation */}
      <div
        ref={navDrawerRef}
        className={`fixed  left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-30 overflow-y-auto ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      ><div className="pt-12">
        {/* Close Button */}
        <div className="flex justify-between  items-center p-4 border-b">
          <h2 className="text-xl pt-2 font-bold text-gray-800">Menu</h2>
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
          {/* Home Button Inside the Menu Bar */}
  <div className=" bottom-0 mt-4  flex flex-col  items-center ">
    <Link
      to="/"
      onClick={toggleNavDrawer}
      className="flex items-center space-x-2 bg-rabbit-red text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-800 transition"
    >
      < IoHome  className="h-6 w-6 text-white" />
      <span className="text-lg font-semibold">Home</span>
    </Link>

    {/* Instructional Paragraph */}
    <p className="mt-2 mb-8 text-center text-sm text-gray-500">
      You can also click on the logo in the navbar to return homepage.
    </p>
  </div>
  </div>
      </div>
    </>
  );
};

export default Navbar;
