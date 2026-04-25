import { Package2, MapPin, Calendar, TrendingDown, Trash2 } from "lucide-react";
function InventoryList({ items, onDeleteItem, onUpdateQuantity }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };
  if (items.length === 0) {
    return <div className="bg-card border border-border rounded-lg p-12 text-center">
        <Package2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-muted-foreground mb-2">No items in inventory</h3>
        <p className="text-muted-foreground">Add your first item using the form above</p>
      </div>;
  }
  return <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2>Current Inventory</h2>
        <p className="text-muted-foreground mt-1">Total items: {items.length}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4">Product</th>
              <th className="text-left p-4">SKU</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Quantity</th>
              <th className="text-left p-4">Added</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
    const isLowStock = item.quantity <= item.minStock;
    return <tr key={item.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary p-2 rounded">
                        <Package2 className="w-4 h-4" />
                      </div>
                      <span>{item.productName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{item.sku}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <input
      type="number"
      min="0"
      value={item.quantity}
      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
      className="w-20 px-2 py-1 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
    />
                      {isLowStock && <span className="inline-flex items-center gap-1 text-destructive">
                          <TrendingDown className="w-3.5 h-3.5" />
                          Low
                        </span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.dateAdded)}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
      onClick={() => onDeleteItem(item.id)}
      className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
      title="Delete item"
    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>;
  })}
          </tbody>
        </table>
      </div>
    </div>;
}
export {
  InventoryList
};
