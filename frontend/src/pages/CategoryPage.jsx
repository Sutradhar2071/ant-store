import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/categories").then((res) => {
      const found = res.data.find((c) => c.slug === slug);
      setCategory(found || null);

      if (found) {
        api
          .get("/products", { params: { category: found._id } })
          .then((r) => setProducts(r.data))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, [slug]);

  return (
    <div className="container-x py-10">
      <div className="mb-6">
        <Link to="/" className="text-sm text-muted hover:text-accent">
          ← সব প্রোডাক্ট
        </Link>
        <h1 className="text-2xl font-bold mt-2">{category ? category.name : "ক্যাটাগরি"}</h1>
      </div>

      {loading ? (
        <p className="text-muted">লোড হচ্ছে...</p>
      ) : products.length === 0 ? (
        <p className="text-muted py-16 text-center">এই ক্যাটাগরিতে কোনো প্রোডাক্ট নেই।</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
