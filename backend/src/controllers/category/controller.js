const prisma = require("../../prisma/prismaClient");

const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: `Error getting categories: ${error.message}` });
    }
}

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const trimmedName = name.trim();

        if (!trimmedName) {
            return res.status(400).json({ message: "Name cannot be empty!" });
        }

        const category = await prisma.category.create({
            data: {
                name: trimmedName,
            }
        })

        res.status(201).json(category);
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "Category with this name already exists!" });        }

        res.status(500).json({ message: `Error creating category: ${error.message}` });
    }
}

module.exports = {
    getCategories,
    createCategory,
}