import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5"
import { Link } from "react-router-dom";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
 
   const navigate = useNavigate();
   const {user, guestId} = useSelector((state) => state.auth);
   const {cart} = useSelector((state) => state.cart);
   const userId = user ? user._id : null;
   
   const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=ConfirmOrder");
    } else {
      navigate("/ConfirmOrder");
    }
   };

 return ( <div className={`fixed top-0 right-0 w-full h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col z-50 ${
  drawerOpen ? "translate-x-0" : "translate-x-full"
}`}>

{/* Close Button */}
   <div className="flex justify-end p-4">
    <button onClick={toggleCartDrawer}>
        <IoMdClose className="h-6 w-6 text-gray-600" /> </button>
   </div>
   {/*Cart contents with scrolable area*/}
   <div className="flex-grow p-4 overflow-y-auto">
      <h2 className="text-xl flex  font-bold mb-4">Your Cart<IoCartOutline className="mt-1 ml-1"/></h2>
      {cart && cart?.products?.length > 0 ? (
        <CartContent cart={cart} userId={userId} guestId={guestId} />
      ) : (
        <p className="text-center mt-20">Your cart is empty! What are waiting for? Add your favorite styles now and elevate your look.!
        <Link to="/collection/all" onClick={toggleCartDrawer}
                    className="text-gray-900 flex justify-center pt-10 underline">
                        Shop Now <IoCartOutline className="mt-1"/>
                    </Link></p>
      )}
      
  </div>

  {/* Checkout button fixed at the bottom*/}
   <div className="p-4 bg-white sticky bottom-0">
    {cart && cart?.products?.length > 0  && (
      <>
      <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
      Checkout
      </button>
    <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
      Shipping, taxes, and discount codes calculated at checkout.
    </p>
      </>
    )}
    
   </div>
  </div> 
 );
};

export default CartDrawer;
