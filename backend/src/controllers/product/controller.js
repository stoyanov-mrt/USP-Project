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

        const product = await prisma.product.create({
            data: {
                name,
                sku,
                description,
            }
        })
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: `Error creating product: ${error}` });
    }
}

module.exports = {
    getProducts,
    createProduct,
}