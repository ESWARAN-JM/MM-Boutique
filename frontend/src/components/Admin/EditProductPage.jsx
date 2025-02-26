import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {selectedProduct, loading, error} = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors:[],
        collections: "",
        material: "",
        images: [],
    });

    const [uploading, setUploading] = useState(false); // Image uploading state

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((preData) => ({...preData, [name]: value}));
    };

    const handleAltTextChange = (index, value) => {
        setProductData((prevData) => {
            const updatedImages = prevData.images.map((img, i) => 
                i === index ? { ...img, altText: value } : img
            );
            return { ...prevData, images: updatedImages };
        });
    };

    const handleImageUpload = async (e) => {
        const file =e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const {data} = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data"},
                }
            );
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, {url: data.imageUrl, altText: "Product Image" }],
            }));
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({id, productData}));
        navigate("/admin/products");
    };

    const handleRemoveImage = (index) => {
        setProductData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, i) => i !== index),
        }));
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error}</p>;

  return (
    <div className="max-w-5xl pt-16 mx-auto p-6 shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit}>
            {/*Name */}
            <div className="mb-6">
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

            {/*Description */}
            <div className="mb-6">
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

            {/*price */}
            <div className="mb-6">
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

            {/*Count in Stock */}
            <div className="mb-6">
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

            {/*SKU */}
            <div className="mb-6">
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

            {/*Sizes */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Sizes (comma-separated)</label>
                <input 
                type="text" 
                name="sizes"
                value={productData.sizes.join(",")}
                onChange={(e) => setProductData({
                    ...productData,
                    sizes: e.target.value.split(",").map((size)=> size.trim()),
                })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
                />
            </div>

            {/*Colors */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Colors (comma-separated)</label>
                <input 
                type="text" 
                name="colors"
                value={productData.colors.join(",")}
                onChange={(e) => setProductData({
                    ...productData,
                    colors: e.target.value.split(",").map((color)=> color.trim()),
                })}
                className="w-full border border-gray-300 rounded-md p-2"
                required
                />
            </div>

            {/*Image Upload */}
            <div className="mb-6">
    <label className="block font-semibold mb-2">Upload Image</label>
    <input type="file" onChange={handleImageUpload} />
    {uploading && <p>Uploading image...</p>}
    <div className="flex flex-wrap gap-4 mt-4">
        {productData.images.map((image, index) => (
            <div key={index} className="relative">
                <img 
                    src={image.url} 
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
                <button 
                    type="button" 
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                >
                    X
                </button>
            </div>
        ))}
    </div>
</div> 
            <button 
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
             Update Product    
            </button>  
        </form>
    </div>
  )
}

export default EditProductPage;
