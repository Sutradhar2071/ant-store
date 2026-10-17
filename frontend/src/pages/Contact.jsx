import React, { useState } from "react";
import siteConfig from "../siteConfig";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`ANT STORE - যোগাযোগ: ${form.name}`);
    const body = encodeURIComponent(`নাম: ${form.name}\nইমেইল: ${form.email}\n\nবার্তা:\n${form.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="container-x py-14">
      <h1 className="text-3xl font-bold mb-2">যোগাযোগ করুন</h1>
      <p className="text-muted mb-10">কোনো প্রশ্ন থাকলে নিচের ফর্ম পূরণ করুন অথবা সরাসরি যোগাযোগ করুন।</p>

      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-2xl p-6 space-y-4 h-fit">
          <div>
            <label className="text-sm font-medium block mb-1">আপনার নাম *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">ইমেইল *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">বার্তা *</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field"
              rows={5}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            বার্তা পাঠান
          </button>
        </form>

        <div className="space-y-5">
          <div className="bg-white border border-ink/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4">যোগাযোগের তথ্য</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span>📞</span>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-accent">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span>✉️</span>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span>📍</span>
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span>💬</span>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  WhatsApp এ মেসেজ করুন
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden border border-ink/10 h-56">
            <iframe
              title="ANT STORE লোকেশন"
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
