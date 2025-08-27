"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";

interface Itinerary {
  _id: string;
  cityName: string;
  reviews: any[];
  day1: string;
  day2: string;
  day3: string;
  premium: string;
}

export default function ItineraryPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/Itinerary/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch itinerary");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("Itinerary not found");
        }
      } catch (err) {
        console.error("Error fetching itinerary:", err);
        setError("Error fetching itinerary");
      } finally {
        setLoading(false);
      }
    };

    if (cityName && id) fetchData();
  }, [cityName, id]);

  if (loading) return <div className="text-blue-500">Loading...</div>;
  if (error) return <div className="text-red-600">❌ {error}</div>;
  if (!data) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-800 mb-4">
        {data.cityName} – Suggested Itinerary
      </h1>

      {/* Itinerary Details */}
      <div className="bg-green-50 p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-green-700">Day 1</h2>
          <p className="text-gray-700">{data.day1}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Day 2</h2>
          <p className="text-gray-700">{data.day2}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Day 3</h2>
          <p className="text-gray-700">{data.day3}</p>
        </div>
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="Itinerary"
            />      
    </div>
  );
}
