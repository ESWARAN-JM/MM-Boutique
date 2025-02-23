import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        category: [],
        color: [],
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 5000,
    });

    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [isDragging, setIsDragging] = useState(false);
    const [expanded, setExpanded] = useState({});

    const categories = ["Salwar", "Saree", "Gown", "Aari Blouse", "Inner Wear"];
    const colors = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Orange", "Navy"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    const materials = ["Cotton", "Rayon", "Netted Fabric","Georgette", "Silk"];
    const brands = ["Liva", "Avaasa", "Pranjul", "Softy", "Twin birds", "Prithvi", "Mahavir"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category ? params.category.split(",") : [],
            color: params.color ? params.color.split(",") : [],
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 5000,
        });
        setPriceRange([0, params.maxPrice || 5000]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked } = e.target;
        let newFilters = { ...filters };
    
        if (checked) {
            newFilters[name] = [...new Set([...newFilters[name], value])]; 
        } else {
            newFilters[name] = newFilters[name].filter((item) => item !== value);
        }
    
        setFilters(newFilters);
        updateURLParams(newFilters);
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
        navigate(`?${params.toString()}`);
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice]);
        setIsDragging(true);
    };

    const handlePriceCommit = () => {
        setIsDragging(false);
        const newFilters = { ...filters, minPrice: 0, maxPrice: priceRange[1] };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    return (
        <div className="p-4 py-28">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Filters</h3>
            {[{ label: "Category", options: categories, key: "category", type: "checkbox"  },
              { label: "Colors", options: colors, key: "color", type: "checkbox"  },
              { label: "Size", options: sizes, key: "size", type: "checkbox" },
              { label: "Material", options: materials, key: "material", type: "checkbox" },
              { label: "Brand", options: brands, key: "brand", type: "checkbox" }].map(({ label, options, key, type }) => (
                <div key={key} className="mb-6">
                    <button onClick={() => setExpanded({ ...expanded, [key]: !expanded[key] })} className="flex items-center justify-between w-full text-gray-600 font-medium mb-2">
                        {label} {expanded[key] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {expanded[key] && (
                        <div>
                            {options.map((option) => (
    <div key={option} className="flex items-center mb-1">
        <input
            type="checkbox"
            name={key}
            value={option}
            onChange={handleFilterChange}
            checked={filters[key]?.includes(option)}
            className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
        />
        <span className="text-gray-700">{option}</span>
    </div>
))}
                        </div>
                    )}
                </div>
            ))}
            <div className="mb-8">
                <label className="block text-gray-600 font-medium mb-2">Price Range</label>
                <input
                    type="range"
                    name="priceRange"
                    min={0}
                    max={5000}
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
