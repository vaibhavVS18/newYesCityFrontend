'use client';

import { useState, useEffect } from "react";

interface WishlistButtonProps {
  onModel: string;
  parentRef: string;
  cityName: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ onModel, parentRef, cityName }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1️⃣ Check if item is already in wishlist on mount
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist/check`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ onModel, parentRef, cityName }),
        });

        if (res.ok) {
          const data = await res.json();
          setIsInWishlist(data.exists || false);
        }
      } catch (err) {
        console.error("Wishlist check failed", err);
      }
    };

    checkWishlist();
  }, [onModel, parentRef, cityName]);

  // 2️⃣ Toggle wishlist (add or remove)
  const handleWishlistToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (loading) return;
    setLoading(true);

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ onModel, parentRef, cityName }),
        });

        if (res.ok) {
          setIsInWishlist(false);
          console.log("Removed from wishlist");
        } else {
          const data = await res.json();
          console.warn("Failed to remove:", data.message);
        }
      } else {
        // Add to wishlist
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ onModel, parentRef, cityName }),
        });

        if (res.ok) {
          setIsInWishlist(true);
          console.log("Added to wishlist");
        } else {
          const data = await res.json();
          console.warn("Failed to add:", data.message);
        }
      }
    } catch (err) {
      console.error("Wishlist operation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={loading}
      className={`absolute top-2 right-2 p-2 rounded-full text-xl transition-all duration-200 ${
        loading ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'
      }`}
      title={
        loading 
          ? "Updating..." 
          : isInWishlist 
            ? "Remove from wishlist" 
            : "Add to wishlist"
      }
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
      ) : isInWishlist ? (
        <span className="text-red-500 drop-shadow-sm">❤️</span>
      ) : (
        <span className="text-gray-400 hover:text-red-500 transition-colors">🤍</span>
      )}
    </button>
  );
};

export default WishlistButton;