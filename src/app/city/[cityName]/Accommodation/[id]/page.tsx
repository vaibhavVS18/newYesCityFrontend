"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";

interface Accommodation {
  _id: string;
  cityName: string;
  flagship: boolean;
  reviews: any[];
  hotels: string;
  lat: number;
  lon: number;
  address: string;
  locationLink: string;
  category: string;
  roomTypes: string;
  facilities: string;
  images: string[];
  premium: string;
}

export default function AccommodationPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/Accommodation/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch accommodation");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data); // ✅ FIX: use `result.data` instead of `result`
        } else {
          setError("Accommodation not found");
        }
      } catch (err) {
        console.error("Error fetching accommodation:", err);
        setError("Error fetching accommodation");
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
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        {data.hotels}
      </h1>
      <p className="text-gray-600 mb-2">{data.category}</p>
      <p className="text-gray-700 mb-4">{data.address}</p>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {data.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={data.hotels}
            className="rounded-lg shadow-md w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Details */}
      <div className="bg-blue-50 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Facilities
        </h2>
        <p className="text-gray-700">{data.facilities}</p>

        <h2 className="text-xl font-semibold text-blue-700 mt-4 mb-2">
          Room Types
        </h2>
        <p className="text-gray-700">{data.roomTypes}</p>

        <a
          href={data.locationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          📍 View on Map
        </a>
      </div>

      {/* Reviews */}
      <ReviewSection
        parentId={data._id}
        cityName={data.cityName}
        onModel="Accommodation"
      />
    </div>
  );
}
