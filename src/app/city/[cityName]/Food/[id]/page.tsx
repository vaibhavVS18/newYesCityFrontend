"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";

interface Food {
  _id: string;
  cityName: string;
  flagship: string;
  reviews: any[];
  foodPlace: string;
  lat: number;
  lon: number;
  address: string;
  locationLink: string;
  category: string;
  vegOrNonVeg: string;
  valueForMoney: string;
  service: string;
  taste: string;
  hygiene: string;
  menuSpecial: string;
  menuLink: string;
  openDay: string;
  openTime: string;
  phone: string;
  website: string;
  description: string;
  images: string[];
  videos: string[];
  premium: string;
}

export default function FoodPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/Food/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch food info");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("Food info not found");
        }
      } catch (err) {
        console.error("Error fetching food info:", err);
        setError("Error fetching food info");
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
        Food Place: {data.foodPlace} ({data.cityName})
      </h1>

      {/* Cover Images */}
      {data.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {data.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Food ${index}`}
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

      {/* Food Details */}
      <div className="bg-green-50 p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-green-700">Category</h2>
          <p className="text-gray-700">{data.category} ({data.vegOrNonVeg})</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Specialties</h2>
          <p className="text-gray-700">{data.menuSpecial}</p>
          {data.menuLink && (
            <a
              href={data.menuLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Menu
            </a>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Quality</h2>
          <p className="text-gray-700">
            Taste: {data.taste} | Service: {data.service} | Hygiene: {data.hygiene} | Value for Money: {data.valueForMoney}
          </p>
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
          <h2 className="text-xl font-semibold text-green-700">Contact</h2>
          <p className="text-gray-700">📞 {data.phone}</p>
          {data.website && (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Visit Website
            </a>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Timings</h2>
          <p className="text-gray-700">
            {data.openDay} | {data.openTime}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Description</h2>
          <p className="text-gray-700">{data.description}</p>
        </div>
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="Food"
            />      
    </div>
  );
}
