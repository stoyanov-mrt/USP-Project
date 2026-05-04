import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Warehouse, FileText, Package, LogOut } from "lucide-react";
import { InventoryForm } from "./InventoryForm";
import { InventoryList } from "./InventoryList";
import { InventoryReport } from "./InventoryReport";
import { getStocks, createProduct, createStock, updateStock, deleteStock } from "../src/api/api";
import ThemeToggle from "./ThemeToggle";

function Dashboard() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("inventory");

    const [items, setItems] = useState([]);
    const [header, setHeader] = useState({
        title: "Warehouse Inventory System",
        subtitle: "Electronics Distribution Center",
    });

    const loadData = async () => {
        try {
            const data = await getStocks();

            const mappedItems = data.map((stock) => ({
                id: stock.id,
                productName: stock.product.name,
                sku: stock.product.sku,
                category: stock.product.category?.name || "Uncategorized",
                quantity: stock.quantity,
                location: stock.warehouse.name,
                minStock: 5,
                dateAdded: stock.product.createdAt,
            }));

            setItems(mappedItems);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const settings = await getDashboardSettings();
                setHeader({
                    title: settings?.title || "Warehouse Inventory System",
                    subtitle: settings?.subtitle || "Electronics Distribution Center",
                });
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

  const handleAddItem = async (item) => {

    const product = await createProduct({
        name: item.productName,
        sku: item.sku,
        description: item.category,
        categoryId: item.categoryId,
    });

    const productId = product.id;

    await createStock({
        productId: productId,
        warehouseId: item.warehouseId,
        quantity: item.quantity,
    });

    await loadData()
  };

    const handleDeleteItem = async (id) => {
        try {
            await deleteStock(id);
            await loadData();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleUpdateQuantity = async (id, newQuantity) => {
        try {
            if (newQuantity < 0) return;

            await updateStock(id, newQuantity);
            await loadData();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

  const handleLogout = () => {
    clearStoredAuth();
    navigate("/");
  };
  return <div className="min-h-screen bg-background">
      {
    /* Header */
  }
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <h1>{header.title}</h1>
                <p className="text-muted-foreground mt-1">{header.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
    onClick={handleLogout}
    className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
  >
              <LogOut className="w-4 h-4" />
              Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {
    /* Main Content */
  }
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {
    /* Tabs */
  }
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
    onClick={() => setActiveTab("inventory")}
    className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${activeTab === "inventory" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
  >
            <Package className="w-4 h-4" />
            Inventory Management
          </button>
          <button
    onClick={() => setActiveTab("report")}
    className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${activeTab === "report" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
  >
            <FileText className="w-4 h-4" />
            Inventory Report
          </button>
        </div>

        {
    /* Content */
  }
        {activeTab === "inventory" ? <div className="space-y-6">
            <InventoryForm onAddItem={handleAddItem} />
            <InventoryList
    items={items}
    onDeleteItem={handleDeleteItem}
    onUpdateQuantity={handleUpdateQuantity}
  />
          </div> : <InventoryReport items={items} />}
      </main>
    </div>;
}
export {
  Dashboard
};
