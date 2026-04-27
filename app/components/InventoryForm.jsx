import {useEffect, useState, useRef } from "react";
import { Package, Plus } from "lucide-react";
import { getWarehouses, getCategories, createCategory } from "../src/api/api.js";

function InventoryForm({ onAddItem }) {
    const dropdownRef = useRef(null);

    const [warehouses, setWarehouses] = useState([]);

    const [categories, setCategories] = useState([]);
    const [categorySearch, setCategorySearch] = useState("");
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(categorySearch);
        }, 300);

        return () => clearTimeout(timer);
    }, [categorySearch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowCategoryDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    const filteredCategories = categories
        .filter((category) =>
            category.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        .slice(0, 5);


    const loadWarehouses = async () => {
        try {
            const data = await getWarehouses();

            setWarehouses(data);
            console.log(data);

        } catch (error) {
            console.error(`Error loading Warehouse: ${error.message}`);
        }
    }

    const handleAddCategory = async () => {
        try {
            if (!categorySearch.trim()) return;

            const newCategory = await createCategory({
                name: categorySearch,
            });

            await loadCategories();

            setFormData({
                ...formData,
                categoryId: newCategory.id,
            });

            setCategorySearch(newCategory.name);
            setShowCategoryDropdown(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadWarehouses();
        loadCategories();
    }, [])

  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    categoryId: "",
    quantity: "",
    location: "",
      warehouseId: "",
    minStock: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now().toString(),
      ...formData,
        quantity: Number(formData.quantity),
        minStock: Number(formData.minStock),
      dateAdded: (/* @__PURE__ */ new Date()).toISOString()
    };
    onAddItem(newItem);
    setFormData({
      productName: "",
      sku: "",
      categoryId: "",
      quantity: "",
      location: "",
        warehouseId: "",
      minStock: ""
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

            <div className="relative" ref={dropdownRef}>
                <label className="block mb-2 text-foreground">Category</label>

                <input
                    type="text"
                    required
                    value={categorySearch}
                    onFocus={() => setShowCategoryDropdown(true)}
                    onChange={(e) => {
                        setCategorySearch(e.target.value);
                        setShowCategoryDropdown(true);
                        setFormData({ ...formData, categoryId: "" });
                    }}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Search category..."
                />

                {showCategoryDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-card border border-border rounded-lg max-h-48 overflow-y-auto shadow-lg">
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => {
                                        setFormData({ ...formData, categoryId: category.id });
                                        setCategorySearch(category.name);
                                        setShowCategoryDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-muted"
                                >
                                    {category.name}
                                </button>
                            ))
                        ) : (
                            <button
                                type="button"
                                onClick={handleAddCategory}
                                className="w-full text-left px-4 py-2 text-primary hover:bg-muted"
                            >
                                + Add "{categorySearch}"
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div>
                <label className="block mb-2 text-foreground">Warehouse Location</label>
                <select
                    required
                    value={formData.warehouseId}
                    onChange={(e) =>
                        setFormData({ ...formData, warehouseId: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="">Select warehouse</option>

                    {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                            {warehouse.name} {warehouse.location ? `- ${warehouse.location}` : ""}
                        </option>
                    ))}
                </select>
            </div>

          <div>
            <label className="block mb-2 text-foreground">Quantity</label>
            <input
    type="number"
    required
    min="0"
    value={formData.quantity}
    onChange={(e) =>
        setFormData({ ...formData, quantity: e.target.value })
    }
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
    onChange={(e) =>
        setFormData({ ...formData, minStock: e.target.value })
    }
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
