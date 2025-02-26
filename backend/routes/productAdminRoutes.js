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

// @route DELETE /api/products/:id
// @desc Delete a product
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
      // Find the product by ID
      const product = await Product.findById(req.params.id);

      if(product) {
          //Remove the product from DB
          await product.deleteOne();
          res.json({ message: " Product removed"})
      } else {
          res.status(404).json({ message: "Product not found"});
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
});


// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req,res) => {
  try {
      const {
          name, 
          description,
          price,
          discountPrice,
          countInStock,
          category,
          brand,
          sizes,
          colors,
          collections,
          material,
          images,
          isFeatured,
          isPublished,
          tags,
          dimensions,
          weight,
          sku,
      } = req.body;

      // Find product by ID
      const product = await Product.findById(req.params.id);

      if (product) {
          // Update product fields
          product.name = name || product.name;
          product.description = description || product.description;
          product.price = price || product.price;
          product.discountPrice = discountPrice || product.discountPrice;
          product.countInStock = countInStock || product.countInStock;
          product.category = category || product.category;
          product.brand = brand || product.brand;
          product.sizes = sizes || product.sizes;
          product.colors = colors || product.colors;
          product.collections = collections || product.collections;
          product.material = material || product.material;
          product.images = images || product.images;
          product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
          product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
          product.tags = tags || product.tags;
          product.dimensions = dimensions || product.dimensions;
          product.weight = weight || product.weight;
          product.sku = sku || product.sku;

          // Save the updated product
          const updatedProduct = await product.save();
          res.json(updatedProduct);
      } else {
          res.status(404).json({ message: " Product not found"});
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
});
