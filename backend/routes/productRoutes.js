const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();




// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", async (req, res) => {
    try {
        const {collection, size, color, minPrice, maxPrice, sortBy,
            search, category, material, brand, limit
        } = req.query;

        let query = {};

        // Filter logic 
        if(collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }

        if (category) {
            query.category = { $in: category.split(",") };
        }

        if (material) {
            query.material = { $in: material.split(",")};
        }

        if (brand) {
            query.brand = { $in: brand.split(",")};
        }

        if (size) {
            query.sizes = { $in: size.split(",")};
        }

        if (color) {
            query.colors = { $in: color.split(",") };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }

        if (search) {
            query.$text = { $search: search };
        }

        // Sort Logic
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = {price: 1};
                    break;
                    case "priceDesc":
                        sort = {price: -1};
                        break;
                        case "popularity":
                            sort = {rating: -1};
                            break;
                            default:
                                break;
            }
        }
        // If searching, sort results by text relevance
        if (search) {
            sort = { score: { $meta: "textScore" }, ...sort };
        }

        // Fetch products and apply sorrting and limit
        let products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 0)
        .exec();

    res.json(products);
} catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
}
});

// @route GET /api/products/best-seller
// @desc Retrieve the products with highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({rating: -1});
        if (bestSeller) {
            res.json(bestSeller);
        }else {
            res.status(404).json({message: "No Best Seller Found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route GET /api/products/new-arrvials
// @desc Retrieve latest 8 products - Creation date
// @access Public
router.get("/new-arrivals", async (req, res) => {
    try {
        // Fetch latest 8 products
        const newArrivals = await Product.find().sort({createdAt: -1}).limit(8);
        res.json(newArrivals);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route GET /api/products/:id
// @desc Get a single product by id
// @access Public
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        } else {
            res.status(404).json({message: "Product Not Found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        
        if(!product) {
            return res.status(404).json({message: "Product not found."});
        }

        const similarProducts = await Product.find({
            _id: { $ne: id}, // Exclude the current product ID
            category: product.category,
        }).limit(4);

        res.json(similarProducts)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


module.exports = router;