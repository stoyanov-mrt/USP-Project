const express = require('express');
const router = express.Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
} = require("../../controllers/product/controller");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;