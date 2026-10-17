import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import api from "../../api";

const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const fetchOrders = () => {
    setLoading(true);
    api.get("/orders").then((res) => setOrders(res.data)).finally(() => setLoading(false));
  };

  useEffect(fetchOrders, []);

  const handleStatusChange = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  const handleDelete = async (id) => {
    if (!confirm("এই অর্ডারটি ডিলিট করতে চান?")) return;
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white border border-ink/10 rounded-2xl overflow-hidden">
        {loading ? (
          <p className="p-5 text-muted">লোড হচ্ছে...</p>
        ) : orders.length === 0 ? (
          <p className="p-5 text-muted">এখনো কোনো অর্ডার আসেনি।</p>
        ) : (
          <div className="divide-y divide-ink/5">
            {orders.map((order) => (
              <div key={order._id} className="p-4">
                <div
                  className="flex flex-wrap items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                >
                  <div>
                    <p className="font-medium">
                      {order.customerName} — <span className="text-muted">{order.phone}</span>
                    </p>
                    <p className="text-xs text-muted">
                      {new Date(order.createdAt).toLocaleString("bn-BD")} • {order.items.length} টি প্রোডাক্ট
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-accent">৳{order.totalAmount}</span>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {expanded === order._id && (
                  <div className="mt-4 pl-1 space-y-3">
                    <div className="text-sm text-ink/70">
                      <p>
                        <span className="font-medium text-ink">ঠিকানা:</span> {order.address}
                      </p>
                      {order.note && (
                        <p>
                          <span className="font-medium text-ink">নোট:</span> {order.note}
                        </p>
                      )}
                    </div>

                    <div className="border border-ink/10 rounded-lg overflow-hidden">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm px-4 py-2 border-b border-ink/5 last:border-0"
                        >
                          <span>
                            {item.name} × {item.qty}
                          </span>
                          <span>৳{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm font-medium">Status বদলান:</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="input-field w-auto text-sm py-1.5"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-500 text-sm hover:underline ml-auto"
                      >
                        ডিলিট করুন
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Orders;
