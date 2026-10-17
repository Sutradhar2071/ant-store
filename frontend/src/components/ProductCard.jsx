import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const image = product.images?.[0] || "https://placehold.co/500x500?text=ANT+STORE";
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-ink/10 hover:border-accent/40 hover:shadow-lg hover:shadow-ink/5 transition-all duration-200"
    >
      <div className="aspect-square overflow-hidden bg-base relative">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        {product.category?.name && (
          <p className="text-xs text-muted mb-1">{product.category.name}</p>
        )}
        <h3 className="font-medium text-ink line-clamp-1">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-display font-semibold text-accent">৳{product.price}</span>
          {hasDiscount && (
            <span className="text-sm text-muted line-through">৳{product.oldPrice}</span>
          )}
        </div>
        {product.stock === 0 ? (
          <span className="inline-block mt-2 text-xs text-red-500 font-medium">Stock নেই</span>
        ) : (
          <button
            onClick={handleAdd}
            className="mt-3 w-full text-sm font-medium border border-ink/15 rounded-full py-2 hover:border-accent hover:text-accent transition-colors"
          >
            কার্টে যোগ করুন
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
