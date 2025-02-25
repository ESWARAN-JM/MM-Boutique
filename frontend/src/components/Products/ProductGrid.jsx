import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return (
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-white shadow-md px-6 py-3 rounded-lg flex items-center gap-2">
      <div className="w-5 h-5 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
      <span className="text-gray-700 font-medium">Loading...</span>
    </div>
  );
  
  if (error) return (
    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-red-100 shadow-md px-6 py-3 rounded-lg text-red-700 font-semibold">
      ⚠️ Error: {error}
    </div>
  );
  const calculateDiscountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        { products.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`} className="block">
               <div className="bg-white p-4 rounded-lg">
                <div className="w-full h-50 mb-4">
                    <img 
                       src={product.images[0].url} 
                       alt={product.images[0].alText || product.name}
                       className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <h3 className="text-sm mb-2">{product.name}</h3>
                <p className="text-gray-500 font-medium text-sm tracking-tighter">
                  <span className="text-gray-400 line-through">₹ {product.mrp}</span>
                  {product.price && (
                    <span className="text-red-500 font-semibold ml-2">₹ {product.price}</span>
                  )}
                  {product.price && (
                    <span className="text-green-600 ml-2">{calculateDiscountPercentage(product.mrp, product.price)}% Off</span>
                  )}
                </p>
               </div>
            </Link>
        ))}
    </div>
  );
};
export default ProductGrid;
