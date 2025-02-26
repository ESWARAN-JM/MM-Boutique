import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductGrid = ({ products, loading, error }) => {
  const calculateDiscountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  const getOptimizedImageUrl = (url, width = window.innerWidth < 768 ? 300 : 400, quality = "auto") => {
    return url.replace("/upload/", `/upload/w_${width},q_${quality},f_auto,dpr_auto/`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg animate-pulse flex flex-col">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        : error
        ? <div className="col-span-4 text-center text-red-700 font-semibold bg-red-100 px-4 py-2 rounded">
            ⚠️ Error: {error}
          </div>
        : products.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`} className="block">
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
                {/* Image Container */}
                <div className="w-full h-60 flex items-center justify-center mb-4">
                  <LazyLoadImage
                    src={getOptimizedImageUrl(product.images[0]?.url)}
                    alt={product.images[0]?.altText || product.name}
                    effect="blur"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-sm">₹ {product.mrp}</span>
                    {product.price && (
                      <span className="text-red-500 font-semibold text-sm">₹ {product.price}</span>
                    )}
                  </div>
                  {product.price && (
                    <span className="text-green-600 text-xs font-semibold">
                      {calculateDiscountPercentage(product.mrp, product.price)}% Off
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default ProductGrid;
