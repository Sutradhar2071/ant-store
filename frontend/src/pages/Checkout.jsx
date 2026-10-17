import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  if (items.length === 0 && !placedOrder) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-2xl font-bold mb-3">কার্ট খালি</h1>
        <Link to="/" className="btn-primary inline-block">
          কেনাকাটা শুরু করুন
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("নাম, ফোন এবং ঠিকানা আবশ্যক");
      return;
    }
    setSubmitting(true);
    setError("");

    const payload = {
      ...form,
      items: items.map((i) => ({
        product: i.productId,
        name: i.name,
        price: i.price,
        qty: i.qty,
        image: i.image,
      })),
    };

    try {
      const res = await api.post("/orders", payload);
      setPlacedOrder(res.data);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.message || "অর্ডার সাবমিট করা যায়নি, আবার চেষ্টা করুন");
    } finally {
      setSubmitting(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="container-x py-20 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto text-3xl mb-5">
          ✓
        </div>
        <h1 className="text-2xl font-bold mb-2">অর্ডার সফল হয়েছে!</h1>
        <p className="text-muted mb-1">
          আপনার অর্ডার আইডি: <span className="font-mono text-ink">{placedOrder._id.slice(-8)}</span>
        </p>
        <p className="text-muted mb-6">
          মোট টাকা: <span className="font-semibold text-accent">৳{placedOrder.totalAmount}</span> — Cash on
          Delivery। আমরা শীঘ্রই আপনার দেওয়া নম্বরে যোগাযোগ করবো।
        </p>
        <Link to="/" className="btn-primary inline-block">
          হোমে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="text-2xl font-bold mb-6">চেকআউট</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold mb-1">ডেলিভারি তথ্য</h2>
          <div>
            <label className="text-sm font-medium block mb-1">পুরো নাম *</label>
            <input
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">মোবাইল নম্বর *</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input-field"
              placeholder="01XXXXXXXXX"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">সম্পূর্ণ ঠিকানা *</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="input-field"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">নোট (ঐচ্ছিক)</label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="input-field"
              rows={2}
            />
          </div>

          <div className="bg-base rounded-lg p-4 text-sm text-muted">
            💵 পেমেন্ট পদ্ধতি: <span className="font-medium text-ink">ক্যাশ অন ডেলিভারি</span> — পণ্য হাতে
            পেয়ে টাকা দেবেন।
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "সাবমিট হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
          </button>
        </form>

        <div className="bg-white border border-ink/10 rounded-2xl p-6 h-fit">
          <h2 className="font-semibold mb-4">অর্ডার সারসংক্ষেপ</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-muted">
                  {item.name} × {item.qty}
                </span>
                <span>৳{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-ink/10 pt-4">
            <span>মোট</span>
            <span className="text-accent">৳{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
