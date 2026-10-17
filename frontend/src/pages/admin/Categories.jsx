import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = () => {
    setLoading(true);
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(fetchCategories, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await api.post("/categories", { name, image });
      setName("");
      setImage("");
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Category যোগ করা যায়নি");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!confirm(`"${cat.name}" ডিলিট করতে চান?`)) return;
    try {
      await api.delete(`/categories/${cat._id}`);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "ডিলিট করা যায়নি");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <div className="grid md:grid-cols-[320px_1fr] gap-6">
        <form onSubmit={handleAdd} className="bg-white border border-ink/10 rounded-2xl p-5 h-fit space-y-4">
          <h2 className="font-semibold">নতুন Category যোগ করুন</h2>
          <div>
            <label className="text-sm font-medium block mb-1">নাম *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="যেমন: Mobile Phone"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">ছবির URL (ঐচ্ছিক)</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input-field"
              placeholder="https://..."
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "যোগ হচ্ছে..." : "+ Category যোগ করুন"}
          </button>
        </form>

        <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden">
          {loading ? (
            <p className="p-5 text-muted">লোড হচ্ছে...</p>
          ) : categories.length === 0 ? (
            <p className="p-5 text-muted">এখনো কোনো category যোগ করা হয়নি।</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left text-muted">
                  <th className="p-4 font-medium">নাম</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Slug</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id} className="border-b border-ink/5 last:border-0">
                    <td className="p-4 font-medium">{cat.name}</td>
                    <td className="p-4 text-muted hidden sm:table-cell">{cat.slug}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(cat)}
                        className="text-red-500 hover:underline font-medium"
                      >
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

export default Categories;
