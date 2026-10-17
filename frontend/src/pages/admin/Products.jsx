import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  oldPrice: "",
  stock: "",
  category: "",
  images: "",
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    Promise.all([api.get("/products"), api.get("/categories")])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.data);
        setCategories(catRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchData, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      oldPrice: p.oldPrice || "",
      stock: p.stock,
      category: p.category?._id || "",
      images: (p.images || []).join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.category) {
      setError("নাম, দাম এবং category আবশ্যক");
      return;
    }
    setSubmitting(true);
    setError("");

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      stock: Number(form.stock) || 0,
      category: form.category,
      images: form.images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Product সেভ করা যায়নি");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (p) => {
    if (!confirm(`"${p.name}" ডিলিট করতে চান?`)) return;
    try {
      await api.delete(`/products/${p._id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "ডিলিট করা যায়নি");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid md:grid-cols-[380px_1fr] gap-6">
        <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-2xl p-5 h-fit space-y-4">
          <h2 className="font-semibold">{editingId ? "Product এডিট করুন" : "নতুন Product যোগ করুন"}</h2>

          <div>
            <label className="text-sm font-medium block mb-1">নাম *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="যেমন: Wireless Earbuds"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input-field"
              required
            >
              <option value="">নির্বাচন করুন</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">দাম (৳) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">আগের দাম (ঐচ্ছিক)</label>
              <input
                type="number"
                value={form.oldPrice}
                onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Stock পরিমাণ</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">বিবরণ</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">ছবির URL (একাধিক হলে কমা দিয়ে আলাদা করুন)</label>
            <textarea
              value={form.images}
              onChange={(e) => setForm({ ...form, images: e.target.value })}
              className="input-field"
              rows={2}
              placeholder="https://.../1.jpg, https://.../2.jpg"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2">
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? "সেভ হচ্ছে..." : editingId ? "আপডেট করুন" : "+ Product যোগ করুন"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                বাতিল
              </button>
            )}
          </div>
        </form>

        <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden overflow-x-auto">
          {loading ? (
            <p className="p-5 text-muted">লোড হচ্ছে...</p>
          ) : products.length === 0 ? (
            <p className="p-5 text-muted">এখনো কোনো product যোগ করা হয়নি।</p>
          ) : (
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-ink/10 text-left text-muted">
                  <th className="p-4 font-medium">নাম</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">দাম</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b border-ink/5 last:border-0">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4 text-muted">{p.category?.name || "-"}</td>
                    <td className="p-4">৳{p.price}</td>
                    <td className="p-4">{p.stock}</td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button onClick={() => handleEdit(p)} className="text-accent hover:underline font-medium mr-3">
                        এডিট
                      </button>
                      <button onClick={() => handleDelete(p)} className="text-red-500 hover:underline font-medium">
                        ডিলিট
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
