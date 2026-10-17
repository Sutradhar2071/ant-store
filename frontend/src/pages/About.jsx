import React from "react";
import siteConfig from "../siteConfig";

const About = () => (
  <div className="container-x py-14 max-w-3xl">
    <h1 className="text-3xl font-bold mb-6">আমাদের সম্পর্কে</h1>

    <div className="prose-none space-y-5 text-ink/80 leading-relaxed">
      <p>
        <strong>{siteConfig.storeName}</strong> একটি বিশ্বস্ত অনলাইন গ্যাজেট শপ, যেখানে আমরা সাশ্রয়ী দামে
        সেরা মানের ইলেকট্রনিক্স ও গ্যাজেট পণ্য সরবরাহ করি। আমাদের লক্ষ্য হলো গ্রাহকদের জন্য সহজ, নিরাপদ ও
        নির্ভরযোগ্য কেনাকাটার অভিজ্ঞতা তৈরি করা।
      </p>
      <p>
        আমরা মোবাইল অ্যাক্সেসরিজ, হেডফোন, স্মার্টওয়াচ, পাওয়ার ব্যাংক সহ নানা ধরনের গ্যাজেট নিয়ে কাজ করছি,
        এবং আমাদের পণ্যের তালিকা প্রতিনিয়ত বাড়ছে।
      </p>

      <div className="grid sm:grid-cols-3 gap-5 pt-4">
        <div className="bg-white border border-ink/10 rounded-2xl p-5">
          <p className="text-2xl mb-2">🚚</p>
          <h3 className="font-semibold mb-1">দ্রুত ডেলিভারি</h3>
          <p className="text-sm text-muted">সারাদেশে দ্রুত ও নির্ভরযোগ্য ডেলিভারি সেবা।</p>
        </div>
        <div className="bg-white border border-ink/10 rounded-2xl p-5">
          <p className="text-2xl mb-2">✅</p>
          <h3 className="font-semibold mb-1">অরিজিনাল পণ্য</h3>
          <p className="text-sm text-muted">১০০% অরিজিনাল ও মানসম্মত পণ্যের নিশ্চয়তা।</p>
        </div>
        <div className="bg-white border border-ink/10 rounded-2xl p-5">
          <p className="text-2xl mb-2">💬</p>
          <h3 className="font-semibold mb-1">সহজ যোগাযোগ</h3>
          <p className="text-sm text-muted">WhatsApp ও ফোনে সরাসরি সাপোর্ট পাবেন।</p>
        </div>
      </div>
    </div>
  </div>
);

export default About;
