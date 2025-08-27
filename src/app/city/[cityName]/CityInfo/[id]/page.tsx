"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";


interface CityInfo {
  _id: string;
  cityName: string;
  stateOrUT: string;
  alternateNames: string[];
  languagesSpoken: string[];
  climateInfo: string;
  bestTimeToVisit: string;
  cityHistory: string;
  coverImage: string;
  premium: string;
}

export default function CityInfoPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<CityInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/CityInfo/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch city info");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("City info not found");
        }
      } catch (err) {
        console.error("Error fetching city info:", err);
        setError("Error fetching city info");
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
        Welcome to {data.cityName}
      </h1>

      {/* Cover Image */}
      {data.coverImage && (
        <div className="mb-6">
          <img
            src={data.coverImage}
            alt={`${data.cityName} cover`}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* City Info */}
      <div className="bg-green-50 p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-green-700">State / UT</h2>
          <p className="text-gray-700">{data.stateOrUT}</p>
        </div>

        {data.alternateNames?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-green-700">
              Alternate Names
            </h2>
            <p className="text-gray-700">{data.alternateNames.join(", ")}</p>
          </div>
        )}

        {data.languagesSpoken?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-green-700">
              Languages Spoken
            </h2>
            <p className="text-gray-700">{data.languagesSpoken.join(", ")}</p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold text-green-700">
            Climate Information
          </h2>
          <p className="text-gray-700">{data.climateInfo}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">
            Best Time to Visit
          </h2>
          <p className="text-gray-700">{data.bestTimeToVisit}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">
            City History
          </h2>
          <p className="text-gray-700">{data.cityHistory}</p>
        </div>
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="CityInfo"
            />      
    </div>
  );
}
