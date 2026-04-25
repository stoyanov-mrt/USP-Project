import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Warehouse, FileText, Package, LogOut } from "lucide-react";
import { InventoryForm } from "./InventoryForm";
import { InventoryList } from "./InventoryList";
import { InventoryReport } from "./InventoryReport";
function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      id: "1",
      productName: "Dell UltraSharp U2723DE",
      sku: "MON-DL-U27-2024",
      category: "Monitors",
      quantity: 45,
      location: "B-08-15",
      minStock: 20,
      dateAdded: (/* @__PURE__ */ new Date("2026-04-15")).toISOString()
    },
    {
      id: "2",
      productName: "Logitech MX Master 3S",
      sku: "MSE-LG-MX3S",
      category: "Mice",
      quantity: 12,
      location: "C-03-22",
      minStock: 15,
      dateAdded: (/* @__PURE__ */ new Date("2026-04-18")).toISOString()
    },
    {
      id: "3",
      productName: 'MacBook Pro 16" M3',
      sku: "LPT-AP-MBP16",
      category: "Laptops",
      quantity: 8,
      location: "A-01-05",
      minStock: 10,
      dateAdded: (/* @__PURE__ */ new Date("2026-04-20")).toISOString()
    }
  ]);
  const [activeTab, setActiveTab] = useState("inventory");
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const handleUpdateQuantity = (id, newQuantity) => {
    setItems(items.map(
      (item) => item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  const handleLogout = () => {
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
                <h1>Warehouse Inventory System</h1>
                <p className="text-muted-foreground mt-1">Electronics Distribution Center</p>
              </div>
            </div>
            <button
    onClick={handleLogout}
    className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
  >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
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
