"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";

interface Shop {
  _id: string;
  cityName: string;
  flagship: string;
  reviews: any[];
  shops: string;
  lat: number;
  lon: number;
  address: string;
  locationLink: string;
  famousFor: string;
  priceRange: string;
  openDay: string;
  openTime: string;
  phone: string;
  website: string;
  images: string[];
  premium: string;
}

export default function ShopPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/Shop/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch shop info");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("Shop not found");
        }
      } catch (err) {
        console.error("Error fetching shop info:", err);
        setError("Error fetching shop info");
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
        Shop – {data.shops} ({data.cityName})
      </h1>

      {data.flagship && (
        <p className="text-gray-600 italic mb-4">
          Flagship: {data.flagship}
        </p>
      )}

      {/* Images */}
      {data.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {data.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Shop ${index}`}
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
          ))}
        </div>
      )}

      {/* Details */}
      <div className="bg-green-50 p-6 rounded-lg shadow space-y-4">
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
          <p className="text-gray-500 text-sm">
            Lat: {data.lat}, Lon: {data.lon}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Famous For</h2>
          <p className="text-gray-700">{data.famousFor}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Price Range</h2>
          <p className="text-gray-700">{data.priceRange}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Opening Info</h2>
          <p className="text-gray-700">Days: {data.openDay}</p>
          <p className="text-gray-700">Time: {data.openTime}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Contact</h2>
          {data.phone && (
            <p className="text-gray-700">
              📞 <a href={`tel:${data.phone}`} className="text-blue-600 underline">{data.phone}</a>
            </p>
          )}
          {data.website && (
            <p className="text-gray-700">
              🌐 <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{data.website}</a>
            </p>
          )}
        </div>
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="Shop"
            />      
    </div>
  );
}
