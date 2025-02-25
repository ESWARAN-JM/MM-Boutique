import {RiDeleteBin3Line}  from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContent = ({cart, userId, guestId}) => {
    const dispatch = useDispatch();

    // Handle adding or substracting to cart
    const handleAddToCart =  (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            dispatch(
                updateCartItemQuantity({
                    productId,
                    quantity: newQuantity,
                    guestId,
                    userId,
                    size,
                    color,
                })
            );
        }
    };

    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({productId, guestId, userId, size, color}));
    };

  return (
  <div>
        {cart.products.map((product, index) => (
            <div key={index} className="flex items-start justify-between py-4 border-b">
            {/* Left - Image */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-20 h-24 object-cover rounded"
            />
          
            {/* Right - Product Details */}
            <div className="flex-1 flex flex-col justify-between ml-3">
              {/* Product Name */}
              <h3 className="text-sm font-medium">{product.name}</h3>
          
              {/* Size & Color */}
              <p className="text-xs text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
          
              {/* Price */}
              <p className="text-sm font-semibold mt-1">₹ {product.price.toLocaleString()}</p>
          
              {/* Quantity & Delete Button (Flex row on mobile) */}
              <div className="flex items-center justify-between w-full mt-2">
                {/* Quantity Section */}
                <div className="flex items-center">
                  <button 
                    onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)}
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button 
                    onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    +
                  </button>
                </div>
          
                {/* Delete Button */}
                <button 
                  onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
                >
                  <RiDeleteBin3Line className="h-6 w-6 text-red-600"/>
                </button>
              </div>
            </div>
          </div>
            
        ))}
    </div >
  );
};

export default CartContent;
