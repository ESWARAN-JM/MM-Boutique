import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collection/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {isOpen ? (
        <div className="fixed -mt-6 left-0 w-full bg-white shadow-md z-50 p-4 flex items-center justify-between">
          <form onSubmit={handleSearch} className="relative flex-1 flex items-center">
            {/* Input Field */}
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              required
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 px-4 py-2 rounded-full pl-12 pr-20 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            />
            {/* Search Icon inside input */}
            <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            
            {/* Clear Button */}
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <HiMiniXMark className="h-5 w-5" />
              </button>
            )}

            {/* Search Button */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-rabbit-red text-white px-4 py-1 rounded-full hover:bg-green-700 transition-all"
            >
              Search
            </button>
          </form>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="ml-4 text-gray-600 hover:text-gray-800 transition-all"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="text-gray-800 hover:text-gray-800 transition-all flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
