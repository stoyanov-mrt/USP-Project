const prisma = require("../../prisma/prismaClient");


const getWarehouses = async (req, res) => {
    try {
        const warehouses = await prisma.warehouse.findMany({
            include: {
                stocks: true,
            },
        });

        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ message: `Error getting warehouses ${error}` });
    }
}

const createWarehouse = async (req, res) => {
    try {
        const { name, location } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Warehouse name is required!" });
        }

        const trimmedName = name.trim();
        const trimmedLocation = location ? location.trim() : undefined;

        if (!trimmedName) {
            return res.status(400).json({ message: "Warehouse name cannot be empty" });
        }

        const warehouse = await prisma.warehouse.create({
            data: {
                name: trimmedName,
                location: trimmedLocation,
            }
        })

        res.status(201).json(warehouse);
    } catch (error) {
        res.status(500).json({ message: `Error creating warehouse ${error.message}` });
    }
}

module.exports = {
    getWarehouses,
    createWarehouse,
}