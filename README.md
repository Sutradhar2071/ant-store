# 🐜 ANT STORE

গ্যাজেট বিক্রির জন্য সম্পূর্ণ, স্ট্যান্ডার্ড MERN Stack ই-কমার্স ওয়েবসাইট — Admin Panel সহ।

**ফিচার সমূহ:**
- হোম পেজ, ক্যাটাগরি পেজ, প্রোডাক্ট ডিটেইলস পেজ
- 🛒 কার্ট (Add to Cart) ও চেকআউট (Cash on Delivery)
- Admin Panel থেকে Category ও Product যোগ/এডিট/ডিলিট
- Admin Panel এ সব Order দেখা ও status আপডেট করা (pending → confirmed → shipped → delivered)
- Contact পেজ (ফোন, ইমেইল, ঠিকানা, ম্যাপ) ও About পেজ
- ফ্লোটিং WhatsApp বাটন (সব পেজে থাকবে)
- সম্পূর্ণ Mobile-friendly ও সুন্দর ডিজাইন

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Admin login:** JWT দিয়ে সুরক্ষিত

---

## 📁 Folder Structure

```
ant-store/
├── backend/          → Express API সার্ভার
└── frontend/          → React ওয়েবসাইট (public store + admin panel)
```

---

## ১. প্রয়োজনীয় জিনিসপত্র (আগে থেকে ইন্সটল থাকতে হবে)

1. **Node.js** (v18 বা তার বেশি) → [nodejs.org](https://nodejs.org) থেকে ডাউনলোড করুন
2. **MongoDB Atlas** একাউন্ট (ফ্রি) → [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register)
3. **GitHub** একাউন্ট (Vercel এ deploy করতে লাগবে)
4. **Vercel** একাউন্ট (ফ্রি) → [vercel.com](https://vercel.com)

---

## ২. MongoDB Atlas সেটআপ করুন (একবারই করতে হবে)

1. [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register) এ গিয়ে ফ্রি একাউন্ট খুলুন।
2. একটা নতুন **Cluster** তৈরি করুন (Free/M0 টায়ার সিলেক্ট করুন)।
3. **Database Access** থেকে একটা user তৈরি করুন (username + password মনে রাখুন)।
4. **Network Access** থেকে "Allow access from anywhere" (0.0.0.0/0) সিলেক্ট করুন — এতে Vercel থেকে কানেক্ট করা যাবে।
5. **Connect → Drivers** এ গিয়ে connection string কপি করুন। এটা দেখতে এমন হবে:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. এর শেষে `/antstore` যোগ করে দিন (ডাটাবেসের নাম):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/antstore?retryWrites=true&w=majority
   ```

এই লিংকটাই হলো আপনার `MONGO_URI`।

---

## ৩. লোকালি রান করা (নিজের কম্পিউটারে টেস্ট করার জন্য)

### Backend চালু করুন

```bash
cd backend
npm install
cp .env.example .env
```

এখন `.env` ফাইলটা খুলে এই ৩টা জিনিস বসান:
- `MONGO_URI` → উপরে যেটা বানালেন
- `JWT_SECRET` → যেকোনো লম্বা random লেখা (যেমন: `antstore_super_secret_2026`)
- `ADMIN_EMAIL` ও `ADMIN_PASSWORD` → আপনার admin login এর জন্য

তারপর প্রথম Admin একাউন্ট তৈরি করুন:

```bash
npm run seed
```

এটা রান হলে টার্মিনালে email/password দেখাবে — এটা দিয়েই admin panel এ লগইন করবেন।

সার্ভার চালু করুন:

```bash
npm run dev
```

Backend এখন চলবে: `http://localhost:5000`

### Frontend চালু করুন (নতুন Terminal ট্যাবে)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend এখন চলবে: `http://localhost:5173`

ব্রাউজারে `http://localhost:5173` খুলুন — ওয়েবসাইট দেখতে পাবেন।
Admin panel এ যেতে: `http://localhost:5173/admin/login`

---

## ৪. দোকানের তথ্য (ফোন, ইমেইল, WhatsApp, ঠিকানা) বসান

`frontend/src/siteConfig.js` ফাইলটা খুলুন — এখানে আপনার দোকানের আসল তথ্য বসিয়ে দিন:

```js
const siteConfig = {
  storeName: "ANT STORE",
  phone: "+8801XXXXXXXXX",
  whatsappNumber: "8801XXXXXXXXX", // + বা ০০ ছাড়া, দেশের কোড সহ
  email: "support@antstore.com",
  address: "আপনার দোকানের ঠিকানা",
  facebook: "https://facebook.com/yourpage",
  instagram: "https://instagram.com/yourpage",
  mapEmbedUrl: "...", // Google Maps থেকে "Embed a map" লিংক
};
```

এই তথ্যগুলোই Footer, Contact পেজ এবং ফ্লোটিং WhatsApp বাটনে দেখানো হবে।

---

## ৫. Category ও Product কীভাবে যোগ করবেন

1. `/admin/login` এ গিয়ে লগইন করুন (seed করা email/password দিয়ে)।
2. **Categories** পেজে গিয়ে নতুন category যোগ করুন (যেমন: Mobile, Headphone, Smartwatch, Power Bank)।
3. **Products** পেজে গিয়ে product যোগ করুন — নাম, দাম, category সিলেক্ট, এবং ছবির URL দিন।
   - ছবি হোস্ট করার জন্য ফ্রি সাইট ব্যবহার করতে পারেন: [imgbb.com](https://imgbb.com) — ছবি আপলোড করে "Direct Link" কপি করে বসিয়ে দিন।
4. Category ডিলিট করতে চাইলে — আগে ওই category এর সব product ডিলিট বা অন্য category তে সরিয়ে নিতে হবে (এটা ইচ্ছাকৃতভাবে রাখা হয়েছে, যাতে ভুলে product হারিয়ে না যায়)।

নতুন category/product যোগ করার জন্য কোনো কোড পরিবর্তন করতে হবে না — সব কিছু admin panel থেকেই করা যাবে।

---

## ৬. Vercel এ Live করা (Deploy)

আপনার প্রজেক্টে দুইটা আলাদা অংশ আছে — Backend আর Frontend। দুইটাকেই আলাদা Vercel প্রজেক্ট হিসেবে deploy করতে হবে। প্রথমে পুরো `ant-store` ফোল্ডারটা একটা GitHub repository তে push করুন।

```bash
cd ant-store
git init
git add .
git commit -m "ANT STORE - initial commit"
```

GitHub এ নতুন একটা repository বানিয়ে push করুন (GitHub এর ওয়েবসাইটে "New repository" থেকে দেখানো instructions ফলো করুন)।

### ধাপ ১: Backend Deploy করুন

1. [vercel.com](https://vercel.com) এ লগইন করুন → **Add New → Project**
2. আপনার GitHub repo সিলেক্ট করুন।
3. **Root Directory** তে `backend` সিলেক্ট করুন (গুরুত্বপূর্ণ!)।
4. **Environment Variables** এ গিয়ে এগুলো যোগ করুন:
   - `MONGO_URI` → আপনার MongoDB connection string
   - `JWT_SECRET` → লম্বা random secret
   - `CLIENT_URL` → আপাতত `*` দিয়ে রাখুন (পরে frontend deploy হওয়ার পর আসল URL বসাবেন)
5. **Deploy** বাটনে ক্লিক করুন।
6. Deploy শেষ হলে একটা URL পাবেন, যেমন: `https://ant-store-backend.vercel.app`

Deploy হওয়ার পর, প্রথম Admin একাউন্ট তৈরি করতে **নিজের কম্পিউটার থেকে** এই কমান্ড চালান (`.env` ফাইলে ঐ একই `MONGO_URI` বসিয়ে):

```bash
cd backend
npm run seed
```

(এটা সরাসরি আপনার Atlas ডাটাবেসে admin একাউন্ট বানাবে, তাই আলাদা করে সার্ভারে রান করার দরকার নেই।)

### ধাপ ২: Frontend Deploy করুন

1. Vercel এ আবার **Add New → Project**
2. একই GitHub repo সিলেক্ট করুন।
3. **Root Directory** তে `frontend` সিলেক্ট করুন।
4. **Environment Variables** এ যোগ করুন:
   - `VITE_API_URL` → আপনার backend এর URL (ধাপ ১ থেকে পাওয়া, যেমন: `https://ant-store-backend.vercel.app`)
5. **Deploy** ক্লিক করুন।
6. Deploy শেষে একটা URL পাবেন, যেমন: `https://ant-store.vercel.app` — এটাই আপনার লাইভ ওয়েবসাইট!

### ধাপ ৩: CORS ঠিক করুন (Backend আপডেট করুন)

1. Backend এর Vercel প্রজেক্টে গিয়ে **Settings → Environment Variables**।
2. `CLIENT_URL` এর ভ্যালু বদলে frontend এর আসল URL বসান (যেমন: `https://ant-store.vercel.app`)।
3. **Redeploy** করুন (Deployments ট্যাব থেকে সর্বশেষ deployment এর পাশে "Redeploy" চাপুন)।

ব্যস! এখন আপনার সম্পূর্ণ ওয়েবসাইট লাইভ, এবং ভবিষ্যতে GitHub এ কোনো পরিবর্তন push করলেই Vercel অটোমেটিক আবার deploy করে দেবে।

---

## ৭. পরে নিজের Domain এ Transfer করা

1. আপনার domain কিনুন (Namecheap, GoDaddy, অথবা বাংলাদেশি কোনো provider থেকে)।
2. Frontend এর Vercel প্রজেক্টে যান → **Settings → Domains**
3. আপনার domain (যেমন: `antstore.com`) যোগ করুন।
4. Vercel যে DNS records (A record / CNAME) দেখাবে, সেগুলো আপনার domain provider এর DNS settings এ বসান।
5. কিছুক্ষণ পর (সাধারণত ১৫ মিনিট - ২৪ ঘণ্টা) domain টা কাজ করা শুরু করবে।

Backend এর জন্য domain লাগানো লাগবে না — এটা `.vercel.app` লিংকেই থাকবে, শুধু frontend এ কাস্টম domain লাগালেই যথেষ্ট।

---

## 🔒 নিরাপত্তা সংক্রান্ত পরামর্শ

- `JWT_SECRET` কখনো কাউকে শেয়ার করবেন না।
- প্রথম login এর পর admin password টা মনে রাখুন — চাইলে MongoDB Atlas এ গিয়ে সরাসরি `Admin` কালেকশনের ডকুমেন্ট এডিট করে নতুন hashed password বসাতে পারেন, অথবা ভবিষ্যতে "change password" ফিচার যোগ করে নিতে পারেন।
- `.env` ফাইল কখনো GitHub এ push করবেন না (এটা `.gitignore` তে আগে থেকেই বাদ দেওয়া আছে)।

---

## 🧩 ভবিষ্যতে যা যোগ করতে পারেন

- Product এ multiple ছবি drag-drop আপলোড (এখন শুধু URL দিয়ে কাজ করে, যাতে সহজ থাকে)
- অনলাইন পেমেন্ট (bKash/Nagad/Card) — এখন শুধু Cash on Delivery আছে
- গ্রাহক নিজের অর্ডার ট্র্যাক করার পেজ (এখন শুধু admin অর্ডার দেখতে পারে)
- একাধিক Admin ইউজার ও Admin password change ফিচার

---

কোনো সমস্যা হলে error message টা ভালো করে পড়ুন — বেশিরভাগ সময় `.env` ফাইলের ভুল ভ্যালুর কারণে সমস্যা হয় (বিশেষ করে `MONGO_URI`)। শুভকামনা, ANT STORE-এর জন্য! 🐜
