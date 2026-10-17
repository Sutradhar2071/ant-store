import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/orders", label: "Orders" },
];

const AdminLayout = ({ children }) => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 shrink-0 border-r border-ink/10 bg-white hidden md:flex flex-col">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-ink/10">
          <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold text-sm">
            A
          </span>
          <span className="font-display font-semibold">ANT STORE</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-accent/10 text-accent"
                  : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-ink/10">
          <p className="text-xs text-muted px-3 mb-2">{admin?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            লগআউট
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <div className="md:hidden flex items-center justify-between h-14 px-4 border-b border-ink/10 bg-white">
          <span className="font-display font-semibold">ANT STORE Admin</span>
          <button onClick={handleLogout} className="text-sm text-red-500 font-medium">
            লগআউট
          </button>
        </div>
        <div className="md:hidden flex overflow-x-auto border-b border-ink/10 bg-white">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-3 text-sm font-medium shrink-0 ${
                location.pathname === link.to ? "text-accent border-b-2 border-accent" : "text-ink/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
