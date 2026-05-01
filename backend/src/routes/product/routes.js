const express = require('express');
const router = express.Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
} = require("../../controllers/product/controller");
const { authRequired } = require("../../middleware/auth");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authRequired, createProduct);
router.put("/:id", authRequired, updateProduct);
router.delete("/:id", authRequired, deleteProduct);


module.exports = router;