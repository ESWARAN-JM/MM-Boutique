const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    sku: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,

    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    collections: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    images: [{
        url: {
            type: String,
            required: true,
        },
        altText: {
            type: String,
            required: true, 
        },
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  weight: Number,
},
{ timestamps: true}
);

productSchema.index({ 
  name: "text", 
  description: "text", 
  category: "text",
  brand: "text",
  collections: "text",
  material: "text",
  tags: "text"
});

module.exports =  mongoose.model("Product", productSchema);