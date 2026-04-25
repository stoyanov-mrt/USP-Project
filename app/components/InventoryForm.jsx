import { useState } from "react";
import { Package, Plus } from "lucide-react";
function InventoryForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    category: "Laptops",
    quantity: 0,
    location: "",
    minStock: 0
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now().toString(),
      ...formData,
      dateAdded: (/* @__PURE__ */ new Date()).toISOString()
    };
    onAddItem(newItem);
    setFormData({
      productName: "",
      sku: "",
      category: "Laptops",
      quantity: 0,
      location: "",
      minStock: 0
    });
  };
  return <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary text-primary-foreground p-2 rounded-lg">
          <Package className="w-5 h-5" />
        </div>
        <h2>Add New Item</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-foreground">Product Name</label>
            <input
    type="text"
    required
    value={formData.productName}
    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
    placeholder="e.g., ThinkPad X1 Carbon"
  />
          </div>

          <div>
            <label className="block mb-2 text-foreground">SKU / Model</label>
            <input
    type="text"
    required
    value={formData.sku}
    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
    placeholder="e.g., LPT-X1C-2024"
  />
          </div>

          <div>
            <label className="block mb-2 text-foreground">Category</label>
            <select
    value={formData.category}
    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
  >
              <option>Laptops</option>
              <option>Monitors</option>
              <option>Keyboards</option>
              <option>Mice</option>
              <option>Accessories</option>
              <option>Storage</option>
              <option>Networking</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-foreground">Warehouse Location</label>
            <input
    type="text"
    required
    value={formData.location}
    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
    placeholder="e.g., A-12-03"
  />
          </div>

          <div>
            <label className="block mb-2 text-foreground">Quantity</label>
            <input
    type="number"
    required
    min="0"
    value={formData.quantity}
    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
  />
          </div>

          <div>
            <label className="block mb-2 text-foreground">Minimum Stock Level</label>
            <input
    type="number"
    required
    min="0"
    value={formData.minStock}
    onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) || 0 })}
    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
  />
          </div>
        </div>

        <button
    type="submit"
    className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
  >
          <Plus className="w-4 h-4" />
          Add Item to Inventory
        </button>
      </form>
    </div>;
}
export {
  InventoryForm
};
