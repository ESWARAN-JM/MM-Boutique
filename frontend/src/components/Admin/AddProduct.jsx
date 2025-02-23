import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        mrp: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        images: [],
        rating: 0,
        numReviews: 0
    });

    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: name === "sizes" || name === "colors"
                ? value.split(",").map(item => item.trim())  // Convert comma-separated values to an array
                : value
        }));
    };
    

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "Product image" }],
            }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleAltTextChange = (index, value) => {
        setProductData((prevData) => {
            const updatedImages = prevData.images.map((img, i) => 
                i === index ? { ...img, altText: value } : img
            );
            return { ...prevData, images: updatedImages };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createProduct(productData)).unwrap(); // Ensure the product is created before navigating
            navigate("/admin/products");
        } catch (error) {
            console.error("Failed to create product:", error);
        }
    };

    
    
    return (
        <div className="max-w-5xl pt-16 mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-3xl font-bold mb-6">Add Product</h2>
            <form onSubmit={handleSubmit}>
                
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">Product Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={productData.name} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea 
                        name="description" 
                        value={productData.description} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-md p-2" 
                        rows={4} 
                        required
                    />
                </div>
                <div className="mb-5">
                        <label className="block font-semibold mb-2">Price</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={productData.price} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">MRP</label>
                        <input 
                            type="number" 
                            name="mrp" 
                            value={productData.mrp} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">Count in Stock</label>
                        <input 
                            type="number" 
                            name="countInStock" 
                            value={productData.countInStock} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">SKU</label>
                        <input 
                            type="text" 
                            name="sku" 
                            value={productData.sku} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">Category</label>
                        <input 
                            type="text" 
                            name="category" 
                            value={productData.category} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                <div className="mb-5">
                        <label className="block font-semibold mb-2">Brand</label>
                        <input 
                            type="text" 
                            name="brand" 
                            value={productData.brand} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
                        <input 
                            type="text" 
                            name="sizes" 
                            value={productData.sizes} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">Colors (comma-separated)</label>
                        <input 
                            type="text" 
                            name="colors" 
                            value={productData.colors} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">Collections</label>
                        <input 
                            type="text" 
                            name="collections" 
                            value={productData.collections} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">Material</label>
                        <input 
                            type="text" 
                            name="material" 
                            value={productData.material} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">Rating</label>
                        <input 
                            type="number" 
                            name="rating" 
                            value={productData.rating} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block font-semibold mb-2">numReviews</label>
                        <input 
                            type="number" 
                            name="numReviews" 
                            value={productData.numReviews} 
                            onChange={handleChange} 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            required
                        />
                    </div>
                    
                
                    <div className="mb-6">
                    <label className="block font-semibold mb-2">Upload Image</label>
                    <input type="file" onChange={handleImageUpload} />
                    {uploading && <p>Uploading image...</p>}
                    <div className="flex gap-4 mt-4">
                        {productData.images.map((image, index) => (
                            <div key={index}>
                                <img src={image.url} 
                                    alt={image.altText || "Product Image"} 
                                    className="w-20 h-20 object-cover rounded-md shadow-md"
                                />
                                <input 
                                    type="text" 
                                    placeholder="Alt text" 
                                    value={image.altText} 
                                    onChange={(e) => handleAltTextChange(index, e.target.value)} 
                                    className="mt-2 border border-gray-300 rounded-md p-1 w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
