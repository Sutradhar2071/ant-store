import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container-x py-16 text-muted">লোড হচ্ছে...</div>;
  if (!product) return <div className="container-x py-16 text-muted">Product পাওয়া যায়নি।</div>;

  const images = product.images?.length ? product.images : ["https://placehold.co/600x600?text=ANT+STORE"];
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  return (
    <div className="container-x py-10">
      <Link to="/" className="text-sm text-muted hover:text-accent">
        ← সব প্রোডাক্ট
      </Link>

      <div className="mt-6 grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-ink/10">
            <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    i === activeImg ? "border-accent" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category?.name && (
            <Link
              to={`/category/${product.category.slug}`}
              className="text-sm text-accent font-medium"
            >
              {product.category.name}
            </Link>
          )}
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-display font-semibold text-accent">
              ৳{product.price}
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted line-through">৳{product.oldPrice}</span>
            )}
          </div>

          <p className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">স্টকে আছে ({product.stock}টি)</span>
            ) : (
              <span className="text-red-500 font-medium">স্টকে নেই</span>
            )}
          </p>

          {product.description && (
            <p className="mt-6 text-ink/80 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}

          {product.stock > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">পরিমাণ:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full border border-ink/15 flex items-center justify-center hover:border-accent"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 rounded-full border border-ink/15 flex items-center justify-center hover:border-accent"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    addToCart(product, qty);
                    setAdded(true);
                    setTimeout(() => setAdded(false), 1500);
                  }}
                  className="btn-secondary"
                >
                  {added ? "কার্টে যোগ হয়েছে ✓" : "কার্টে যোগ করুন"}
                </button>
                <button
                  onClick={() => {
                    addToCart(product, qty);
                    navigate("/checkout");
                  }}
                  className="btn-primary"
                >
                  এখনই কিনুন
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
