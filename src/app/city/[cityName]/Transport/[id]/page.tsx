"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";

interface Transport {
  _id: string;
  cityName: string;
  reviews: any[];
  from: string;
  to: string;
  autoPrice: string;
  cabPrice: string;
  bikePrice: string;
  premium: string;
}

export default function TransportPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<Transport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/Transport/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch transport info");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("Transport info not found");
        }
      } catch (err) {
        console.error("Error fetching transport info:", err);
        setError("Error fetching transport info");
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
        Transport in {data.cityName}
      </h1>

      {data.premium && (
        <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
          Premium
        </span>
      )}

      {/* Route Info */}
      <div className="bg-green-50 p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-green-700">Route</h2>
          <p className="text-gray-700">
            From <span className="font-medium">{data.from}</span> → To{" "}
            <span className="font-medium">{data.to}</span>
          </p>
        </div>

        {/* Prices */}
        <div>
          <h2 className="text-xl font-semibold text-green-700">Approximate Prices</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>🚖 Auto: {data.autoPrice}</li>
            <li>🚕 Cab: {data.cabPrice}</li>
            <li>🏍️ Bike: {data.bikePrice}</li>
          </ul>
        </div>

        {/* Reviews */}
        {data.reviews?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-green-700">Reviews</h2>
            <p className="text-gray-700">⭐ {data.reviews.length} reviews available</p>
          </div>
        )}
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="Transport"
            />      
    </div>
  );
}
