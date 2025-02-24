import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [newArrivals, setNewArrivals] = useState([]);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
                );
                setNewArrivals(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNewArrivals();
    }, []);

    useEffect(() => {
        if (isUserInteracting) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
                if (scrollLeft + clientWidth >= scrollWidth) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [isUserInteracting]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setIsUserInteracting(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const calculateDiscountPercentage = (originalPrice, discountPrice) => {
        return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
      };

    return (
        <section className="py-16 pt-8 px-4 lg:px-0 relative" onMouseEnter={() => setIsUserInteracting(true)} onMouseLeave={() => setIsUserInteracting(false)}>
            <div className="container mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
                </p>
            </div>
            <div className="relative">
                <button
                    onClick={() => {
                        scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: "smooth" });
                        setIsUserInteracting(true);
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded bg-transparent text-white text-2xl z-10 opacity-70 hover:opacity-100"
                >
                    <FiChevronLeft />
                </button>
                <div
                    ref={scrollRef}
                    className={`container mx-auto overflow-x-scroll flex space-x-6 relative items-center scrollbar-hide cursor-grab active:cursor-grabbing transition-transform duration-300 ease-in-out ${isMobile ? 'snap-x snap-mandatory' : ''}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                >
                    {newArrivals.map((product) => (
                        <div key={product._id} className={`relative select-none flex justify-center ${isMobile ? 'snap-center min-w-full' : 'min-w-[30%] aspect-square'}`} draggable="false">
                            <img
                                src={product.images[0]?.url}
                                alt={product.images[0]?.altText || product.name}
                                className="w-full h-full object-cover rounded-lg pointer-events-none"
                                draggable="false"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg pointer-events-auto flex justify-between items-center">
                                <Link to={`/product/${product._id}`} className="w-full">
                                    <div className="flex justify-between items-center w-full">
                                        <div>
                                            <h4 className="font-medium">{product.name}</h4>
                                            <p className="mt-1">
                                            <span className="text-gray-400 line-through">₹ {product.mrp}</span>
                  {product.price && (
                    <span className=" font-semibold ml-2">₹ {product.price}</span>
                  )}
                  {product.price && (
                    <span className="text-green-600 ml-2">{calculateDiscountPercentage(product.mrp, product.price)}% Off</span>
                  )}
                                            </p>
                                        </div>
                                        <span className="text-sm opacity-70">Tap to view</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => {
                        scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: "smooth" });
                        setIsUserInteracting(true);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded bg-transparent text-white text-2xl z-10 opacity-70 hover:opacity-100"
                >
                    <FiChevronRight />
                </button>
            </div>
        </section>
    );
};

export default NewArrivals;
