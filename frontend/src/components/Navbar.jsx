import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-ink/10">
      <div className="container-x flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img 
            src="https://i.ibb.co.com/BdNRwJv/Messenger-creation-983-F7088-0-A31-4316-848-D-12-F9-FD43-A584.jpg" 
            alt="ANT Store Logo" 
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="font-display font-bold text-lg tracking-tight">ANT STORE</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="প্রোডাক্ট খুঁজুন..."
            className="input-field rounded-full text-sm"
          />
        </form>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {categories.slice(0, 3).map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="text-ink/70 hover:text-accent transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link to="/about" className="text-ink/70 hover:text-accent transition-colors">
            আমাদের সম্পর্কে
          </Link>
          <Link to="/contact" className="text-ink/70 hover:text-accent transition-colors">
            যোগাযোগ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2" aria-label="কার্ট">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-ink stroke-2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="মেনু খুলুন"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-ink/10 bg-white">
          <div className="container-x py-4 flex flex-col gap-4">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="প্রোডাক্ট খুঁজুন..."
                className="input-field rounded-full text-sm"
              />
            </form>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/category/${cat.slug}`}
                className="text-ink/70 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link to="/about" className="text-ink/70 font-medium" onClick={() => setMenuOpen(false)}>
              আমাদের সম্পর্কে
            </Link>
            <Link to="/contact" className="text-ink/70 font-medium" onClick={() => setMenuOpen(false)}>
              যোগাযোগ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;