import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, updateQty, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-2xl font-bold mb-3">আপনার কার্ট খালি</h1>
        <p className="text-muted mb-6">কেনাকাটা শুরু করতে প্রোডাক্ট পেজে যান।</p>
        <Link to="/" className="btn-primary inline-block">
          কেনাকাটা শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="text-2xl font-bold mb-6">আপনার কার্ট</h1>

      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <div className="bg-white border border-ink/10 rounded-2xl divide-y divide-ink/5">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 p-4">
              <img
                src={item.image || "https://placehold.co/100x100?text=ANT"}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover bg-base"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-accent font-semibold text-sm">৳{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.productId, item.qty - 1)}
                  className="w-7 h-7 rounded-full border border-ink/15 flex items-center justify-center hover:border-accent"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.productId, item.qty + 1)}
                  className="w-7 h-7 rounded-full border border-ink/15 flex items-center justify-center hover:border-accent"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-500 text-sm hover:underline ml-2"
              >
                সরান
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-6 h-fit">
          <h2 className="font-semibold mb-4">অর্ডার সারসংক্ষেপ</h2>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">সাবটোটাল</span>
            <span>৳{totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-muted">ডেলিভারি চার্জ</span>
            <span>যোগাযোগের সময় জানানো হবে</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-ink/10 pt-4 mb-5">
            <span>মোট</span>
            <span className="text-accent">৳{totalPrice}</span>
          </div>
          <button onClick={() => navigate("/checkout")} className="btn-primary w-full">
            চেকআউট করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
