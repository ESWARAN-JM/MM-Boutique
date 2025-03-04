import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductGrid = ({ products, loading, error }) => {
  const calculateDiscountPercentage = (originalPrice, discountPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  const getOptimizedImageUrl = (url, width = 300, quality = "auto") => {
    return url.replace("/upload/", `/upload/w_${width},q_${quality},f_auto,dpr_auto/`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg animate-pulse flex flex-col">
              <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        : error
        ? <div className="col-span-4 text-center text-red-700 font-semibold bg-red-100 px-4 py-2 rounded">
            ⚠️ Error: {error}
          </div>
        : products.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`} className="block">
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                {/* Image Container with Fixed Size */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 overflow-hidden rounded-lg mb-2">
                  <LazyLoadImage
                    src={getOptimizedImageUrl(product.images[0]?.url)}
                    alt={product.images[0]?.altText || product.name}
                    effect="blur"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-sm font-semibold text-gray-800 text-center">{product.name}</h3>
                <div className="flex items-center gap-1 text-center">
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
            </Link>
          ))}
    </div>
  );
};

export default ProductGrid;
