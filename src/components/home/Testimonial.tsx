"use client";

import { useEffect, useState } from "react";

export default function Testimonial() {
    // define a Review type
    interface Review {
      createdBy?: {
        name: string;
      };
      content: string;
      rating: number;
    }

    // use it in state
    const [reviews, setReviews] = useState<Review[]>([]);


  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/yesCityReviews`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        setReviews(data.reviews);
        console.log(data.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }
    fetchReviews();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold text-[#1E88E5] text-[32px] text-center mt-8">
        What Our Travelers Say
      </h2>

      {/* Testimonials Grid */}
      <div className=" flex flex-wrap gap-10 h-[500px] mt-10 overflow-hidden ">
        {reviews.map((t, index) => {
          const name = t.createdBy?.name || "User";
          const firstLetter = name.charAt(0).toUpperCase();

          return (
            <div
              key={index}
              className="bg-white rounded-xl cursor-pointer shadow-lg w-[211px] h-[210px] relative p-4 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Avatar Circle: using same style area as image */}
              <div className="w-[60px] h-[60px] bg-gray-300 rounded-full mx-auto flex items-center justify-center text-[20px] font-bold text-[#0E2569]">
                {firstLetter}
              </div>

              <h3 className="mt-1 font-bold text-[#0E2569] text-[16px] h-[15px]">
                {name}
              </h3>

              <p className="text-sm text-gray-600 mt-3 text-[12px] w-[170px] h-[69px] clamp-by-height">
                {t.content}
              </p>

              <div className="flex justify-center mt-2 left-1/2 transform -translate-x-1/2  text-yellow-400 absolute bottom-2">
                {"★".repeat(t.rating)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
