import { useMemo, useState } from "react";
import { Package2, MapPin, Calendar, TrendingDown, Trash2, Search, X } from "lucide-react";

function InventoryList({ items, onDeleteItem, onUpdateQuantity }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))].sort(),
    [items]
  );

  const locations = useMemo(
    () => [...new Set(items.map((item) => item.location))].sort(),
    [items]
  );

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      if (query) {
        const matchesSearch =
          item.productName.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (categoryFilter && item.category !== categoryFilter) return false;
      if (locationFilter && item.location !== locationFilter) return false;

      const isLowStock = item.quantity <= item.minStock;
      if (stockFilter === "low" && !isLowStock) return false;
      if (stockFilter === "in-stock" && isLowStock) return false;

      return true;
    });
  }, [items, search, categoryFilter, locationFilter, stockFilter]);

  const hasActiveFilters =
    search.trim() !== "" ||
    categoryFilter !== "" ||
    locationFilter !== "" ||
    stockFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setLocationFilter("");
    setStockFilter("all");
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
        <p className="text-muted-foreground mt-1">
          Showing {filteredItems.length} of {items.length} items
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or SKU..."
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All stock levels</option>
              <option value="low">Low stock only</option>
              <option value="in-stock">In stock only</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="p-12 text-center">
          <Package2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-muted-foreground mb-2">No items match your filters</h3>
          <button
            type="button"
            onClick={clearFilters}
            className="text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
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
            {filteredItems.map((item) => {
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
      )}
    </div>;
}
export {
  InventoryList
};
