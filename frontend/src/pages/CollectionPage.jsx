import { useEffect, useState,useRef  } from "react";
import {FaFilter} from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
  const {collection} = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
    
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
      dispatch(fetchProductsByFilters({collection, ...queryParams}));
    }, [dispatch, collection, searchParams]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    //Close sidebar if clicked outside
    if(sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
   };

   useEffect(() => {
    //Add Event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    //clean event listener 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
   }, []);

  

  return (
    <div className="flex flex-col lg:flex-row pt-28 lg:pt-6">
      {/*Mobile Filter button */}
      <button onClick={toggleSidebar} className="lg:hidden bg-white border w-full p-2 flex justify-center shadow-md  items-center  ">
        <FaFilter className="mr-2 "/>Filters
      </button>

      {/*Filter Sidebar*/}
      <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0  left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
        <FilterSidebar />
      </div>
      
      <div className="flex-grow p-4 pt-4 lg:pt-24">
        
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        {/*Sort OPtions*/}
        <SortOptions />

        {/*Product Grid */}
        <ProductGrid products={products}  loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
