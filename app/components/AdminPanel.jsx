import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Warehouse,
  Users,
  LayoutDashboard,
  LogOut,
  Plus,
  Trash2,
  Save,
  RefreshCw,
} from "lucide-react";
import {
  adminCreateUser,
  adminDeleteUser,
  adminGetDashboardSettings,
  adminGetUsers,
  adminUpdateDashboardSettings,
  adminUpdateUser,
  clearStoredAdminAuth,
  getStoredAdminAuth,
} from "../src/api/api";

function AdminPanel() {
  const navigate = useNavigate();
  const adminAuth = getStoredAdminAuth();

  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");

  const [newUser, setNewUser] = useState({ email: "", password: "", role: "USER", isActive: true });
  const [createError, setCreateError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  const [settings, setSettings] = useState({ title: "", subtitle: "" });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState("");
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (!adminAuth?.token) navigate("/admin/login");
  }, [adminAuth?.token, navigate]);

  const loadUsers = async () => {
    setUsersError("");
    setUsersLoading(true);
    try {
      const data = await adminGetUsers();
      setUsers(data);
    } catch (err) {
      setUsersError(err?.message || "Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  };

  const loadSettings = async () => {
    setSettingsError("");
    setSettingsLoading(true);
    try {
      const data = await adminGetDashboardSettings();
      setSettings({ title: data?.title || "", subtitle: data?.subtitle || "" });
    } catch (err) {
      setSettingsError(err?.message || "Failed to load settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  useEffect(() => {
    if (!adminAuth?.token) return;
    loadUsers();
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminAuth?.token]);

  const onLogout = () => {
    clearStoredAdminAuth();
    navigate("/");
  };

  const canCreate = useMemo(() => {
    return newUser.email.trim() && newUser.password.trim();
  }, [newUser.email, newUser.password]);

  const onCreateUser = async (e) => {
    e.preventDefault();
    setCreateError("");
    setCreateLoading(true);
    try {
      await adminCreateUser(newUser);
      setNewUser({ email: "", password: "", role: "USER", isActive: true });
      await loadUsers();
    } catch (err) {
      setCreateError(err?.message || "Failed to create user");
    } finally {
      setCreateLoading(false);
    }
  };

  const onToggleActive = async (u) => {
    try {
      const updated = await adminUpdateUser(u.id, { isActive: !u.isActive });
      setUsers((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    } catch (err) {
      setUsersError(err?.message || "Failed to update user");
    }
  };

  const onChangeRole = async (u, role) => {
    try {
      const updated = await adminUpdateUser(u.id, { role });
      setUsers((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    } catch (err) {
      setUsersError(err?.message || "Failed to update user");
    }
  };

  const onDeleteUser = async (u) => {
    if (!confirm(`Delete user ${u.email}?`)) return;
    try {
      await adminDeleteUser(u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
    } catch (err) {
      setUsersError(err?.message || "Failed to delete user");
    }
  };

  const onSaveSettings = async () => {
    setSettingsSaved(false);
    setSettingsError("");
    setSettingsSaving(true);
    try {
      const updated = await adminUpdateDashboardSettings(settings);
      setSettings({ title: updated?.title || "", subtitle: updated?.subtitle || "" });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 1500);
    } catch (err) {
      setSettingsError(err?.message || "Failed to save settings");
    } finally {
      setSettingsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                <Warehouse className="w-6 h-6" />
              </div>
              <div>
                <h1>Admin Panel</h1>
                <p className="text-muted-foreground mt-1">User management and dashboard settings</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
              >
                Open Dashboard
              </Link>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === "users"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4" />
            Users
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
              activeTab === "dashboard"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        {activeTab === "users" ? (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl">Create user</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    These accounts can sign in on the normal login page.
                  </p>
                </div>
                <button
                  onClick={loadUsers}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>

              {createError ? (
                <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {createError}
                </div>
              ) : null}

              <form onSubmit={onCreateUser} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5">
                  <label className="block mb-2 text-foreground">Email</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="user@company.com"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block mb-2 text-foreground">Password</label>
                  <input
                    type="text"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="temporary password"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-foreground">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-end">
                  <button
                    type="submit"
                    disabled={!canCreate || createLoading}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    <Plus className="w-4 h-4" />
                    {createLoading ? "Creating..." : "Add user"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl">User profiles</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Toggle access, change roles, or remove users.
                  </p>
                </div>
              </div>

              {usersError ? (
                <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {usersError}
                </div>
              ) : null}

              {usersLoading ? (
                <div className="text-muted-foreground">Loading users…</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <th className="text-left py-3 pr-4 font-medium">Email</th>
                        <th className="text-left py-3 pr-4 font-medium">Role</th>
                        <th className="text-left py-3 pr-4 font-medium">Active</th>
                        <th className="text-right py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b border-border/60">
                          <td className="py-3 pr-4">{u.email}</td>
                          <td className="py-3 pr-4">
                            <select
                              value={u.role}
                              onChange={(e) => onChangeRole(u, e.target.value)}
                              className="px-3 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                              <option value="USER">USER</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                          </td>
                          <td className="py-3 pr-4">
                            <button
                              onClick={() => onToggleActive(u)}
                              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                                u.isActive
                                  ? "border-border hover:bg-accent"
                                  : "border-destructive/30 text-destructive hover:bg-destructive/10"
                              }`}
                            >
                              {u.isActive ? "Enabled" : "Disabled"}
                            </button>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => onDeleteUser(u)}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {!users.length ? (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-muted-foreground">
                            No users yet. Create one above.
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl">Dashboard editor</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Edit the title and subtitle shown on the standard dashboard.
                  </p>
                </div>
                <button
                  onClick={loadSettings}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reload
                </button>
              </div>

              {settingsError ? (
                <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {settingsError}
                </div>
              ) : null}

              {settingsLoading ? (
                <div className="text-muted-foreground">Loading settings…</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6">
                    <label className="block mb-2 text-foreground">Title</label>
                    <input
                      value={settings.title}
                      onChange={(e) => setSettings((p) => ({ ...p, title: e.target.value }))}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Warehouse Inventory System"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label className="block mb-2 text-foreground">Subtitle</label>
                    <input
                      value={settings.subtitle}
                      onChange={(e) => setSettings((p) => ({ ...p, subtitle: e.target.value }))}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Electronics Distribution Center"
                    />
                  </div>
                  <div className="md:col-span-12 flex items-center gap-3">
                    <button
                      onClick={onSaveSettings}
                      disabled={settingsSaving}
                      className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                      <Save className="w-4 h-4" />
                      {settingsSaving ? "Saving..." : "Save changes"}
                    </button>
                    {settingsSaved ? (
                      <span className="text-sm text-muted-foreground">Saved</span>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl mb-2">Preview</h2>
              <p className="text-muted-foreground text-sm mb-6">
                This is how the header will look in the standard dashboard.
              </p>

              <div className="border border-border rounded-xl p-6 bg-background">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                    <Warehouse className="w-6 h-6" />
                  </div>
                  <div>
                    <h1>{settings.title || "Warehouse Inventory System"}</h1>
                    <p className="text-muted-foreground mt-1">
                      {settings.subtitle || "Electronics Distribution Center"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export { AdminPanel };

