import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = search ? { search } : {};
    api
      .get("/products", { params })
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div>
      {!search && (
        <section className="border-b border-ink/10 bg-white">
          <div className="container-x py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                আপনার পরবর্তী <span className="text-accent">গ্যাজেট</span> এখানেই
              </h1>
              <p className="mt-5 text-muted text-lg max-w-md">
                সেরা মানের ইলেকট্রনিক্স ও গ্যাজেট, সাশ্রয়ী দামে — ANT STORE এ।
              </p>
              <a href="#products" className="btn-primary inline-block mt-7">
                প্রোডাক্ট দেখুন
              </a>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-accent/15 to-ink/5 flex items-center justify-center">
                <img 
                  src="https://i.ibb.co.com/BdNRwJv/Messenger-creation-983-F7088-0-A31-4316-848-D-12-F9-FD43-A584.jpg" 
                  alt="ANT Store Hero" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {categories.length > 0 && !search && (
        <section className="container-x py-10">
          <h2 className="text-xl font-semibold mb-5">ক্যাটাগরি সমূহ</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/category/${cat.slug}`}
                className="shrink-0 px-5 py-3 rounded-full border border-ink/10 bg-white hover:border-accent hover:text-accent transition-colors font-medium text-sm"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="products" className="container-x py-10">
        <h2 className="text-xl font-semibold mb-5">
          {search ? `"${search}" এর জন্য ফলাফল` : "সব প্রোডাক্ট"}
        </h2>

        {loading ? (
          <p className="text-muted">লোড হচ্ছে...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <p>কোনো প্রোডাক্ট পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;