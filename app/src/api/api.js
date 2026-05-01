const BASE_URL = (import.meta?.env?.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

const AUTH_STORAGE_KEY = "usp_auth";
const ADMIN_AUTH_STORAGE_KEY = "usp_admin_auth";

export const getStoredAuth = () => {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const setStoredAuth = (auth) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearStoredAuth = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getStoredAdminAuth = () => {
    try {
        const raw = localStorage.getItem(ADMIN_AUTH_STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const setStoredAdminAuth = (auth) => {
    localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearStoredAdminAuth = () => {
    localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
};

const authHeaders = () => {
    const auth = getStoredAuth();
    if (!auth?.token) return {};
    return { Authorization: `Bearer ${auth.token}` };
};

const adminHeaders = () => {
    const auth = getStoredAdminAuth();
    if (!auth?.token) return {};
    return { Authorization: `Bearer ${auth.token}` };
};

export const login = async ({ email, password }) => {
    let res;
    try {
        res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
    } catch {
        throw new Error(`Backend not reachable at ${BASE_URL}. Is the backend running?`);
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data?.message || "Login failed");
    }
    setStoredAuth(data);
    return data;
};

export const adminLogin = async ({ username, password }) => {
    let res;
    try {
        res = await fetch(`${BASE_URL}/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
    } catch {
        throw new Error(`Backend not reachable at ${BASE_URL}. Is the backend running?`);
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data?.message || "Admin login failed");
    }
    setStoredAdminAuth(data);
    return data;
};

export const getDashboardSettings = async () => {
    const res = await fetch(`${BASE_URL}/settings/dashboard`);
    if (!res.ok) throw new Error("Failed to load dashboard settings");
    return res.json();
};

export const adminGetUsers = async () => {
    const res = await fetch(`${BASE_URL}/admin/users`, { headers: { ...adminHeaders() } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Failed to load users");
    return data;
};

export const adminCreateUser = async ({ email, password, role = "USER", isActive = true }) => {
    const res = await fetch(`${BASE_URL}/admin/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...adminHeaders() },
        body: JSON.stringify({ email, password, role, isActive }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Failed to create user");
    return data;
};

export const adminUpdateUser = async (id, updates) => {
    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...adminHeaders() },
        body: JSON.stringify(updates),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Failed to update user");
    return data;
};

export const adminDeleteUser = async (id) => {
    const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: { ...adminHeaders() },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Failed to delete user");
    return data;
};

export const adminGetDashboardSettings = async () => {
    const res = await fetch(`${BASE_URL}/admin/dashboard-settings`, { headers: { ...adminHeaders() } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Failed to load settings");
    return data;
};

export const adminUpdateDashboardSettings = async ({ title, subtitle }) => {
    const res = await fetch(`${BASE_URL}/admin/dashboard-settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...adminHeaders() },
        body: JSON.stringify({ title, subtitle }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message || "Failed to update settings");
    return data;
};

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
            ...authHeaders(),
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
            ...authHeaders(),
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
        headers: {
            ...authHeaders(),
        },
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
            ...authHeaders(),
        },
        body: JSON.stringify({ quantity }),
    });

    if (!res.ok) {
        throw new Error("Failed to update stock!");
    }

    return res.json();
}

export const getWarehouses = async () => {
    const res = await fetch(`${BASE_URL}/warehouses`);

    if (!res.ok) {
        throw new Error("Failed to get warehouse!");
    }

    return res.json();
}

export const getCategories = async () => {
    const res = await fetch(`${BASE_URL}/categories`);

    if (!res.ok) {
        throw new Error("Failed to fetch categories!");
    }

    return res.json();
};

export const createCategory = async (category) => {
    const res = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
        },
        body: JSON.stringify(category),
    });

    if (!res.ok) {
        throw new Error("Failed to create category!");
    }

    return res.json();
};
