const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => { 
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "mm_boutique_products", 
                        resource_type: "image",
                        quality: "auto:good", // Auto-optimize quality
                        format: "auto", // Deliver in best format
                        width: 500, // Resize if larger
                        crop: "limit", // Ensure images don't get cropped
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                // Use streamifier to convert file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // Call the streamUpload function
        const result = await streamUpload(req.file.buffer);

        // Respond with the uploaded image URL
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        res.status(500).json({ message: "Image upload failed", error: error.message });
    }
});

module.exports = router;
