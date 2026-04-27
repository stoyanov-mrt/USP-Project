const BASE_URL = "http://localhost:5000";

export const getStocks = async () => {
    const res = await fetch(`${BASE_URL}/stocks`);

    if (!res.ok) {
        throw new Error("Failed to fetch stocks!");
    }

    return res.json();
};

export const getProducts = async () => {
    const res = await fetch(`${BASE_URL}/products`);

    if (!res.ok) {
        throw new Error("Failed to fetch products!");
    }

    return res.json();
}

export const createProduct = async (product) => {
    const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!res.ok) {
        throw new Error("Failed to create product!");
    }

    return res.json();
}

export const createStock = async (stock) => {
    const res = await fetch(`${BASE_URL}/stocks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stock),
    })

    if (!res.ok) {
        throw new Error("Failed to create stock!");
    }

    return res.json();
}

export const deleteStock = async (id) => {
    const res = await fetch(`${BASE_URL}/stocks/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete stock!");
    }

    return res.json();
}

export const updateStock = async (id, quantity) => {
    const res = await fetch(`${BASE_URL}/stocks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
    });

    if (!res.ok) {
        throw new Error("Failed to update stock!");
    }

    return res.json();
}
