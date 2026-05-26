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

const getWarehouseById = async (req, res) => {
    try {
        const warehouseId = Number(req.params.id);

        if (isNaN(warehouseId)) {
            return res.status(400).json({ message: "Invalid warehouse id!" });
        }

        const warehouse = await prisma.warehouse.findUnique({
            where: {
                id: warehouseId,
            },
            include: {
                stocks: true,
            }
        });

        if (!warehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }

        res.status(200).json(warehouse);
    } catch (error) {
        res.status(500).json({ message: `Error getting warehouse: ${error.message}` });
    }
}

const updateWarehouse = async (req, res) => {
    try {
        const warehouseId = Number(req.params.id);

        const { name, location } = req.body;

        if (isNaN(warehouseId)) {
            return res.status(400).json({ message: "Invalid warehouse id!" });
        }

        if (!name) {
            return res.status(400).json({ message: "Warehouse name is required!" });
        }

        const trimmedName = name.trim();
        const trimmedLocation = location ? location.trim() : undefined;

        if (!trimmedName) {
            return res.status(400).json({ message: "Warehouse name cannot be empty" });
        }

        const warehouse = await prisma.warehouse.update({
            where: {
                id: warehouseId,
            },
            data: {
                name: trimmedName,
                location: trimmedLocation,
            }
        })

        res.status(200).json(warehouse);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Warehouse not found!" });
        }
        res.status(500).json({ message: `Error updating warehouse ${error}` });
    }
}

const deleteWarehouse = async (req, res) => {
    try {
        const warehouseId = Number(req.params.id);

        if (isNaN(warehouseId)) {
            return res.status(400).json({ message: "Invalid warehouse id!" });
        }

        await prisma.stock.deleteMany({
            where: {
                warehouseId: warehouseId,
            }
        })

        const deletedWarehouse = await prisma.warehouse.delete({
            where: {
                id: warehouseId,
            }
        })

        res.status(200).json(deletedWarehouse);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Warehouse not found!" });
        }

        res.status(500).json({ message: `Error deleting warehouse: ${error.message}` });
    }
}

module.exports = {
    getWarehouses,
    createWarehouse,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse,
}