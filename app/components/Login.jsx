import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Warehouse, LogIn, Mail, Lock } from "lucide-react";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  return <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {
    /* Logo & Header */
  }
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <Warehouse className="w-8 h-8" />
            </div>
          </Link>
          <h1 className="text-3xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your warehouse dashboard</p>
        </div>

        {
    /* Login Card */
  }
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
    placeholder="admin@warehouse.com"
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
    placeholder="Enter your password"
  />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
    type="checkbox"
    className="w-4 h-4 rounded border-border"
  />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <button
    type="submit"
    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
  >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Demo credentials: Any email/password will work
            </p>
          </div>
        </div>

        {
    /* Back to Home */
  }
        <div className="mt-6 text-center">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>;
}
export {
  Login
};
