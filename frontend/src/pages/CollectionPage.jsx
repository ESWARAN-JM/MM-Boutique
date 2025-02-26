import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const containerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside it
  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  // Close sidebar when scrolling outside the filter section
  const handleScroll = (e) => {
    if (isSidebarOpen && containerRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.classList.add("overflow-hidden"); // Stop page scroll
      window.addEventListener("scroll", handleScroll);
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row pt-28 lg:pt-12">
      {/* Mobile Filter Button */}
      

      {/* Filter Sidebar */}
      <div 
        ref={sidebarRef} 
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed z-40 top-16 left-0 w-64 h-[90vh] bg-white overflow-y-auto transition-transform duration-300 
        lg:static lg:translate-x-0 lg:h-[90vh] lg:w-64`}
      >
        <FilterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Products Section */}
      <div className={`flex-grow p-4 pt-4 lg:pt-24 ${isSidebarOpen ? "overflow-hidden" : ""}`}>
        <h2 className="text-2xl uppercase mb-4">Collections</h2>
       <div className="flex justify-between mb-8 lg:justify-end">
  <button 
    onClick={toggleSidebar} 
    className="lg:hidden bg-white border w-40  rounded-lg  flex  justify-center shadow-md items-center"
  >
    <FaFilter className="mr-2" /> Filters
  </button>
   <div className="mr-4 ">
        <SortOptions /></div></div>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
