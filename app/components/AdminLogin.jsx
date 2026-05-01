import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, LogIn, User, Lock, Warehouse } from "lucide-react";
import { adminLogin, getStoredAdminAuth } from "../src/api/api";

function AdminLogin() {
  const navigate = useNavigate();
  const existing = getStoredAdminAuth();

  const [formData, setFormData] = useState({
    username: "admin",
    password: "admin",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (existing?.token) {
    navigate("/admin");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(formData);
      navigate("/admin");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <Warehouse className="w-8 h-8" />
            </div>
          </Link>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-3">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Admin Panel</span>
          </div>
          <h1 className="text-3xl mb-2">Admin Sign In</h1>
          <p className="text-muted-foreground">
            Use the admin credentials to manage users and dashboard settings
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          {error ? (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-foreground">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="admin"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Credentials: <span className="font-medium text-foreground">admin / admin</span>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export { AdminLogin };

