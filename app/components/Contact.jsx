import { Link } from "react-router";
import { Warehouse, Mail, Phone, MapPin, Clock } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const CONTACT_DETAILS = {
  email: "vikikavaldjiev@gmail.com",
  phone: "+389 876 80 9892",
  address: "Varna, Bulgaria, ul. Prilep 12",
  hours: "Mon - Fri, 09:00 - 17:00"
};

function Contact() {
  return <div className="min-h-screen bg-background">
      <header className="bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <Warehouse className="w-5 h-5 text-primary" />
            <span className="font-medium">Warehouse Management</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
    to="/login"
    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-accent transition-colors"
  >
            Login
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            If you want to use our warehouse system, contact us first. We will present the product,
            answer your questions, and create your user account for access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
    href={`mailto:${CONTACT_DETAILS.email}?subject=Warehouse%20System%20Inquiry`}
    className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
  >
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <h2 className="text-xl mb-1">Email</h2>
                <p className="text-muted-foreground">{CONTACT_DETAILS.email}</p>
              </div>
            </div>
          </a>

          <a
    href={`tel:${CONTACT_DETAILS.phone.replace(/\s+/g, "")}`}
    className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
  >
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-primary mt-1" />
              <div>
                <h2 className="text-xl mb-1">Phone</h2>
                <p className="text-muted-foreground">{CONTACT_DETAILS.phone}</p>
              </div>
            </div>
          </a>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h2 className="text-xl mb-1">Address</h2>
                <p className="text-muted-foreground">{CONTACT_DETAILS.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <h2 className="text-xl mb-1">Working Hours</h2>
                <p className="text-muted-foreground">{CONTACT_DETAILS.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
    to="/"
    className="text-muted-foreground hover:text-foreground transition-colors"
  >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>;
}

export {
  Contact
};
