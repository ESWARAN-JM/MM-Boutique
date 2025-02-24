import {Link} from "react-router-dom";
import {
    HiOutlineUser,
    HiOutlineShoppingBag,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const {cart} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);
 
  const cartItemCount = 
    cart?.products?.reduce((total,product) => total + product.quantity, 0) ||
    0;
  
  const  toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };
  
  const  toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  return (
    <>
    <nav className="container mx-auto  flex items-center justify-between h-14  py-4 px-6 ">
        {/*Left-Logo */}
        <div className="   ">
            <Link to="/" >
            <img src="/mm.png" alt="M.M Boutique" className="h-40 -ml-8 w-auto object-contain"/>
            </Link>
        </div>
        {/*Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
            <Link to="/collection/all?category=Salwar" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
            Salwar
            </Link>
            <Link to="/collection/all?category=Saree" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
              Saree
            </Link>
            <Link to="/collection/all?category=Gown" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
              Gown
            </Link>
            <Link to="/collection/all?category=Aari Blouse" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
              Aari Blouse
            </Link>
            <Link to="/collection/all?category=Inner Wear" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
              Inner Wear
            </Link>
            </div>
            {/* Right - Icons */}
            <div className="flex items-center space-x-4">
              {user && user.role === "admin" && (
                <Link to="/admin" className="block bg-black px-2 rounded text-sm text-white">
              Admin</Link>
              )}
              {/* Search  */}
            <div className="overflow-hidden">
            <SearchBar className="h=6 w-6 "  /></div>
            
                
                <button onClick={toggleCartDrawer} className="relative text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
  <HiOutlineShoppingBag className="h-6 w-6" />
  
  {cartItemCount > 0 && (
    <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-rabbit-red text-white text-xs font-bold rounded-full px-2 py-0.5">
      {cartItemCount}
    </span>
  )}
</button>
<Link to="/profile" className=" text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
                  <HiOutlineUser className="h-6 w-6 text-gray-900"/>
                </Link>
<button onClick={toggleNavDrawer} className=" md:hidden text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
              <FaBars  className="   h-6 w-5" />
            </button>
            
        </div>
    </nav>
    <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>

    {/*Mobile Navigation */}
    <div 
    className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${ navDrawerOpen ? "translate-x-0" : " -translate-x-full "
      }`}>
       <div className="flex justify-end p-4">
        <button onClick={toggleNavDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
       </div>
       <div className="p-4">
        <h2 className="text-xl font-extrabold mb-8">Menu</h2>
        <nav className="space-y-5">
          <Link to="/collection/all?category=Salwar" onClick={toggleNavDrawer} className="block font-semibold text-gray-800 hover:text-black">Salwar</Link>
          <Link to="/collection/all?category=Saree" onClick={toggleNavDrawer} className="block font-semibold text-gray-800 hover:text-black">Saree</Link>
          <Link to="/collection/all?category=Gown" onClick={toggleNavDrawer} className="block font-semibold text-gray-800 hover:text-black">Gown</Link>
          <Link to="/collection/all?category=Aari Blouse" onClick={toggleNavDrawer} className="block font-semibold text-gray-800 hover:text-black">Aari Blouse</Link>
          <Link to="/collection/all?category=Inner Wear" onClick={toggleNavDrawer} className="block font-semibold text-gray-800 hover:text-black">Inner wear</Link>
       </nav>
       </div>

      </div>
    </>
  ); 
};
export default Navbar;