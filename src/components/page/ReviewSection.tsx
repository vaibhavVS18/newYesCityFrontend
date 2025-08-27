"use client";

import { useState, useEffect } from "react";

interface Review {
  _id: string;
  rating: number;
  content: string;
  createdBy: { username: string; email: string };
  date: string;
}

interface ReviewSectionProps {
  parentId: string;    // e.g. Accommodation _id
  cityName: string;    // needed for POST
  onModel: string;     // e.g. "Accommodation", "Food", "Place"
}

export default function ReviewSection({ parentId, cityName, onModel }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews/${onModel}/${parentId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await res.json();
        if (result.success) setReviews(result.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    if (parentId && onModel) fetchReviews();
  }, [parentId, onModel]);

  // ✅ Submit new review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            rating,
            content: reviewContent,
            cityName,
            onModel,
            parentRef: parentId,
            }),
        }
      );

      const result = await res.json();
      if (result.success) {
        setReviews((prev) => [result.review, ...prev]);
        setReviewContent("");
        setRating(5);
      } else {
        alert(result.message || "Failed to post review");
      }
    } catch (err) {
      console.error("Error posting review:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Reviews</h2>

      {/* New Review Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2 font-medium">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded p-2 mb-4 w-24"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Your Review</label>
        <textarea
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          className="w-full border rounded p-3 mb-4"
          rows={3}
          placeholder="Write your review..."
        />

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* List of Reviews */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev._id} className="border-b pb-3">
              <p className="font-semibold text-blue-700">
                ⭐ {rev.rating} — {rev.createdBy?.username || "Anonymous"}
              </p>
              <p className="text-gray-700">{rev.content}</p>
              <p className="text-gray-500 text-sm">
                {new Date(rev.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}
