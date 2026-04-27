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

const getProductById = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({ message: "Invalid product id!" });
        }

        const product = await prisma.product.findUnique({
            include: {
                stocks: true,
            },
            where: {
                id: productId,
            }
        })

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: `Error getting product: ${error.message}` });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        const { name, sku, description } = req.body;

        if (isNaN(productId)) {
            return res.status(400).json({ message: "Invalid product id!" });
        }
        if (!name || !sku) {
            return res.status(400).json({ message: "Name and SKU are required!" });
        }

        const trimmedName = name.trim();
        const trimmedSku = sku.trim();
        const trimmedDescription = description ? description.trim() : undefined;

        if (!trimmedName || !trimmedSku) {
            return res.status(400).json({ message: "Name and SKU cannot be empty!" });
        }


        const product = await prisma.product.update({
            where: {
                id: productId,
            },
            data: {
                name: trimmedName,
                sku: trimmedSku,
                description: trimmedDescription,
            }
        })

        res.status(200).json(product);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Product not found!" });
        }
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Product with this SKU already exists!" });
        }
        res.status(500).json({ message: `Error updating product: ${error.message}` });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (isNaN(productId)) {
            return res.status(400).json({ message: "Invalid product id!" });
        }

        await prisma.stock.deleteMany({
            where: {
                productId: productId,
            }
        });

        const deletedProduct = await prisma.product.delete({
            where: {
                id: productId,
            }
        });

        res.status(200).json(deletedProduct);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Product not found!" });
        }
        res.status(500).json({ message: `Error deleting product: ${error.message}!` });
    }

}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
}