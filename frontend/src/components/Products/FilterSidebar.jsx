import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = ({ isOpen, onClose }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        category: [],
        color: [],
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 10000,
    });

    const [expanded, setExpanded] = useState({});
    const [priceRange, setPriceRange] = useState([0, 10000]);

    const categories = ["Salwar", "Saree", "Gown", "Aari Blouse", "Inner Wear"];
    const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Orange", "Navy"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    const materials = ["Cotton", "Rayon", "Netted Fabric", "Georgette", "Silk"];
    const brands = ["Liva", "Avaasa", "Pranjul", "Softy", "Twin birds", "Prithvi", "Mahavir"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category ? params.category.split(",") : [],
            color: params.color ? params.color.split(",") : [],
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: Number(params.minPrice) || 0,
            maxPrice: Number(params.maxPrice) || 10000,
        });
        setPriceRange([0, Number(params.maxPrice) || 10000]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;
        let updatedFilters = { ...filters };

        if (checked) {
            updatedFilters[name] = [...new Set([...updatedFilters[name], value])];
        } else {
            updatedFilters[name] = updatedFilters[name].filter((item) => item !== value);
        }

        setFilters(updatedFilters);
        updateURLParams(updatedFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.set(key, newFilters[key].join(","));
            } else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });
        setSearchParams(params);
    };

    const handlePriceChange = (e) => {
        const newMaxPrice = Number(e.target.value);
        setPriceRange([0, newMaxPrice]);
        setFilters({ ...filters, maxPrice: newMaxPrice });
    };

    const handlePriceCommit = () => {
        updateURLParams({ ...filters, maxPrice: priceRange[1] });
    };

    return (
        <div
            className={`bg-white shadow-lg p-4 pt-24 transition-transform duration-300 overflow-y-auto
                ${isOpen ? "fixed top-0 left-0 z-50 w-64 h-full lg:static" : "hidden"} 
                lg:block lg:h-[90vh] lg:w-64`}
        >
            {/* Close Button (Only for Mobile) */}
            <button className="lg:hidden absolute top-16 right-4" onClick={onClose}>
                <X size={24} />
            </button>

            <h3 className="text-xl font-medium text-gray-800 mb-8">Filters</h3>

            {[{ label: "Category", options: categories, key: "category" },
              { label: "Colors", options: colors, key: "color" },
              { label: "Size", options: sizes, key: "size" },
              { label: "Material", options: materials, key: "material" },
              { label: "Brand", options: brands, key: "brand" }].map(({ label, options, key }) => (
                <div key={key} className="mb-6">
                    <button
                        onClick={() => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))}
                        className="flex items-center justify-between w-full text-gray-600 font-medium mb-2"
                    >
                        {label} {expanded[key] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {expanded[key] && (
                        <div>
                            {options.map((option) => (
                                <div key={option} className="flex items-center mb-1">
                                    <input type="checkbox" name={key} value={option} onChange={handleFilterChange} checked={filters[key]?.includes(option)}
                                        className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                                    <span className="text-gray-700">{option}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Price Range Filter */}
            <div className="mb-20">
                <label className="block text-gray-600 font-medium mb-2">Price Range</label>
                <input
                    type="range"
                    min={0}
                    max={10000}
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    onMouseUp={handlePriceCommit}
                    onTouchEnd={handlePriceCommit}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-gray-600 mt-2">
                    <span>₹0</span>
                    <span>₹{priceRange[1]}</span>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
