"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";


interface Activity {
  _id: string;
  cityName: string;
  reviews: any[];
  topActivities: string;
  bestPlaces: string;
  description: string;
  essentials: string;
  fee: string;
  images: string[];
  videos: string[];
  premium: string;
}

export default function ActivityPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/Activity/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch activity");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("Activity not found");
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
        setError("Error fetching activity");
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
        Activities in {data.cityName}
      </h1>

      <p className="text-gray-700 mb-6">{data.description}</p>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {data.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Activity ${index}`}
            className="rounded-lg shadow-md w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Videos */}
      {data.videos?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.videos.map((vid, index) => (
              <iframe
                key={index}
                src={vid}
                className="w-full h-64 rounded-lg shadow-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="bg-green-50 p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-green-700">Top Activities</h2>
          <p className="text-gray-700">{data.topActivities}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Best Places</h2>
          <p className="text-gray-700">{data.bestPlaces}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Essentials</h2>
          <p className="text-gray-700">{data.essentials}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Fee</h2>
          <p className="text-gray-700">{data.fee}</p>
        </div>
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="Activity"
            />
    </div>
  );
}
