const prisma = require("../../prisma/prismaClient");

const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                stocks: true,
            },
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: `Error fetching products: ${error}` });
    }
}
// http://localhost:5000/products postman
const createProduct = async (req, res) => {
    try {
        const { name, sku, description } = req.body;

        if (!name || !sku) {
            return res.status(400).json({ message: `Name and SKU are required!` });
        }

        const trimmedName = name.trim();
        const trimmedSku = sku.trim();

        if (!trimmedName || !trimmedSku) {
            return res.status(400).json({ message: "Name and SKU cannot be empty!" });
        }

        const product = await prisma.product.create({
            data: {
                name: trimmedName,
                sku: trimmedSku,
                description,
            }
        })
        res.status(201).json(product);
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Product with this SKU already exists!" });
        }
        res.status(500).json({ message: `Error creating product: ${error.message}` });
    }
}

module.exports = {
    getProducts,
    createProduct,
}