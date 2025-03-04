import { useEffect, useState } from "react";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import Hero from "../components/Products/Hero";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import {useDispatch, useSelector} from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";


const Home = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
       category: "Saree",
       limit: 8,
      })
    );
    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div className="pt-28 -mt-2">
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/*Best Seller */}
      <h2 className="text-3xl pt-8  text-center font-bold ">Best Deal</h2>
      {bestSellerProduct ? (
       <div className="-mt-20"> <ProductDetails  productId={bestSellerProduct._id}  /></div>
      ) : (
        <p className="text-center">Loading best deal product...</p>
      )}

      <div className="container pt-16 mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Collections
        </h2>
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
      <FeaturedCollection />
      <FeaturedSection />
      </div>
  )
}
export default Home;
