import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

const Dashboard = () => {
  const [stats, setStats] = useState({ categories: 0, products: 0, outOfStock: 0, orders: 0, pendingOrders: 0 });

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products"), api.get("/orders")]).then(
      ([catRes, prodRes, orderRes]) => {
        setStats({
          categories: catRes.data.length,
          products: prodRes.data.length,
          outOfStock: prodRes.data.filter((p) => p.stock === 0).length,
          orders: orderRes.data.length,
          pendingOrders: orderRes.data.filter((o) => o.status === "pending").length,
        });
      }
    );
  }, []);

  const cards = [
    { label: "মোট Category", value: stats.categories, to: "/admin/categories" },
    { label: "মোট Product", value: stats.products, to: "/admin/products" },
    { label: "মোট Order", value: stats.orders, to: "/admin/orders" },
    { label: "Pending Order", value: stats.pendingOrders, to: "/admin/orders" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="bg-white border border-ink/10 rounded-2xl p-6 hover:border-accent/40 transition-colors"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p className="text-3xl font-display font-bold mt-2">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white border border-ink/10 rounded-2xl p-6">
        <h2 className="font-semibold mb-3">দ্রুত শুরু করুন</h2>
        <ol className="list-decimal list-inside text-sm text-ink/70 space-y-1">
          <li>প্রথমে "Categories" থেকে category তৈরি করুন (যেমন: Mobile, Headphone, Smartwatch)</li>
          <li>তারপর "Products" থেকে সেই category তে product যোগ করুন</li>
          <li>প্রোডাক্টের ছবি হিসেবে ইমেজ URL ব্যবহার করুন (imgbb.com থেকে ফ্রি আপলোড করতে পারেন)</li>
        </ol>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
