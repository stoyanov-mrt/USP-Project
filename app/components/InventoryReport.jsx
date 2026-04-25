import { BarChart3, AlertTriangle, Package, TrendingUp } from "lucide-react";
function InventoryReport({ items }) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = items.filter((item) => item.quantity <= item.minStock);
  const categoryCounts = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {});
  const categoryKeys = Object.keys(categoryCounts);
  return <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2>Inventory Report</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-accent/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Total Units</span>
              </div>
              <div className="text-2xl font-semibold">{totalItems}</div>
            </div>

            <div className="bg-accent/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Product Lines</span>
              </div>
              <div className="text-2xl font-semibold">{items.length}</div>
            </div>

            <div className="bg-accent/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Categories</span>
              </div>
              <div className="text-2xl font-semibold">{Object.keys(categoryCounts).length}</div>
            </div>

            <div className="bg-accent/50 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-muted-foreground">Low Stock</span>
              </div>
              <div className="text-2xl font-semibold text-destructive">{lowStockItems.length}</div>
            </div>
          </div>

          {Object.keys(categoryCounts).length > 0 && <div className="mb-8">
                <h3 className="mb-4">Inventory by Category</h3>
                <div className="space-y-3">
                  {Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]).map((category) => {
    const count = categoryCounts[category];
    const percentage = totalItems > 0 ? count / totalItems * 100 : 0;
    return <div key={category} className="space-y-1">
                              <div className="flex justify-between">
                                <span>{category}</span>
                                <span className="text-muted-foreground">
                  {count} units ({percentage.toFixed(1)}%)
                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
      className="bg-primary h-2 rounded-full transition-all"
      style={{ width: `${percentage}%` }}
    />
                              </div>
                            </div>;
  })}
                </div>
              </div>}

          {lowStockItems.length > 0 && <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="text-destructive">Low Stock Alerts</h3>
                </div>
                <div className="space-y-2">
                  {lowStockItems.map((item) => <div
    key={item.id}
    className="flex justify-between items-center py-2 border-b border-destructive/10 last:border-0"
  >
                        <div>
                          <span className="font-medium">{item.productName}</span>
                          <span className="text-muted-foreground"> ({item.sku})</span>
                        </div>
                        <div className="text-right">
                          <div className="text-destructive font-medium">{item.quantity} units</div>
                          <div className="text-muted-foreground">Min: {item.minStock}</div>
                        </div>
                      </div>)}
                </div>
              </div>}

          {items.length === 0 && <div className="text-center py-8 text-muted-foreground">
                No data available. Add items to see the report.
              </div>}
        </div>
      </div>;
}
export {
  InventoryReport
};
