import { Link } from "react-router";
import { Warehouse, BarChart3, Package, Shield, ArrowRight, CheckCircle } from "lucide-react";
import warehouseImage from "../../Warehouse MGM.png";

function Home() {
  return <div className="min-h-screen bg-background">
      <header className="bg-background/95 border-b border-border sticky top-0 z-10 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-foreground">
            <Warehouse className="w-5 h-5 text-primary" />
            <span className="font-medium">Warehouse Management</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link
    to="/login"
    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
  >
              Login
            </Link>
            <Link
    to="/contact"
    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
  >
              Contact Us
            </Link>
          </nav>
        </div>
      </header>
      {
    /* Hero Section */
  }
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-foreground/10 backdrop-blur-sm p-4 rounded-2xl">
                <Warehouse className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-5xl mb-6">Warehouse Management System</h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Streamline your inventory operations with our comprehensive warehouse management solution.
              Track, manage, and optimize your electronics inventory in real-time.
            </p>
            <div className="flex gap-4 justify-center">
              <a
    href="#features"
    className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20"
  >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {
    /* Features Section */
  }
      <div id="features" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Powerful Features</h2>
            <p className="text-muted-foreground text-xl">Everything you need to manage your warehouse efficiently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="mb-3">Inventory Management</h3>
              <p className="text-muted-foreground">
                Track all your products with detailed information including SKU, quantity,location, minimum stock levels and incoming stocks.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="mb-3">Real-time Reports</h3>
              <p className="text-muted-foreground">
                Generate comprehensive inventory reports with category breakdowns, stock levels, and visual analytics.
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="mb-3">Low Stock Alerts</h3>
              <p className="text-muted-foreground">
                Automatic notifications when inventory falls below minimum thresholds to prevent stockouts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {
    /* Benefits Section */
  }
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <h2 className="text-4xl mb-6">Why Choose Our System?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="mb-1">Easy to Use</h4>
                    <p className="text-muted-foreground">Intuitive interface designed for warehouse staff of all technical levels</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="mb-1">Real-time Updates</h4>
                    <p className="text-muted-foreground">See inventory changes instantly across all devices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="mb-1">Comprehensive Analytics</h4>
                    <p className="text-muted-foreground">Make data-driven decisions with detailed reports and insights</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="mb-1">Scalable Solution</h4>
                    <p className="text-muted-foreground">Grows with your business from small operations to enterprise scale</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 bg-card border border-border rounded-xl p-3 md:p-4">
              <div className="h-[420px] md:h-[520px] rounded-lg overflow-hidden bg-background flex items-center justify-center">
                <img
    src={warehouseImage}
    alt="Warehouse operations"
    className="w-full h-full object-contain"
  />
              </div>
            </div>
          </div>
        </div>
      </div>

      {
    /* CTA Section */
  }
      <div className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-xl mb-8">
            Join thousands of warehouses already using our system
          </p>
          <Link
    to="/login"
    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
  >
            Access Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {
    /* Footer */
  }
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2026 Warehouse Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>;
}
export {
  Home
};
