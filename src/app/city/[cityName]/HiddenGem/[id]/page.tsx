"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";

interface HiddenGem {
  _id: string;
  cityName: string;
  reviews: any[];
  hiddenGem: string;
  category: string;
  lat: number;
  lon: number;
  address: string;
  locationLink: string;
  openDay: string;
  openTime: string;
  guideAvailability: string;
  establishYear: string;
  fee: string;
  description: string;
  essential: string;
  story: string;
  images: string[];
  videos: string[];
  premium: string;
}

export default function HiddenGemPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<HiddenGem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/HiddenGem/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch hidden gem");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("Hidden gem not found");
        }
      } catch (err) {
        console.error("Error fetching hidden gem:", err);
        setError("Error fetching hidden gem");
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
        Hidden Gem: {data.hiddenGem} ({data.cityName})
      </h1>

      {/* Images */}
      {data.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {data.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hidden Gem ${index}`}
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
          ))}
        </div>
      )}

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
          <h2 className="text-xl font-semibold text-green-700">Category</h2>
          <p className="text-gray-700">{data.category}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Address</h2>
          <p className="text-gray-700">{data.address}</p>
          {data.locationLink && (
            <a
              href={data.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View on Map
            </a>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Coordinates</h2>
          <p className="text-gray-700">
            Latitude: {data.lat}, Longitude: {data.lon}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Timings</h2>
          <p className="text-gray-700">
            {data.openDay} | {data.openTime}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">
            Guide Availability
          </h2>
          <p className="text-gray-700">{data.guideAvailability}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Establish Year</h2>
          <p className="text-gray-700">{data.establishYear}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Fee</h2>
          <p className="text-gray-700">{data.fee}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Description</h2>
          <p className="text-gray-700">{data.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Essential Info</h2>
          <p className="text-gray-700">{data.essential}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Story</h2>
          <p className="text-gray-700">{data.story}</p>
        </div>
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="HiddenGem"
            />      
    </div>
  );
}
