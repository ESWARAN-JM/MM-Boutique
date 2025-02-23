const express = require("express");
const Product = require("../models/Product");
const {protect, admin} = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// @route POST /api/admin/products
// @desc Create a new product
// @access Private/Admin
router.post("/add-product", protect, admin, async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        mrp, 
        countInStock,
        sku,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        images,
        rating,
        numReviews,
      } = req.body;
  
      // Validate required fields
      if (
        !name ||
        !description ||
        price === undefined ||
        mrp === undefined ||
        countInStock === undefined ||
        !sku ||
        !category ||
        !brand ||
        !sizes ||
        !colors ||
        !collections ||
        !material ||
        !images ||
        rating === undefined ||
        numReviews === undefined
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const product = new Product({
        name,
        description,
        price,
        mrp,
        countInStock,
        sku,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        images,
        rating,
        numReviews,
        user: req.user._id,
      });
  
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

module.exports = router;