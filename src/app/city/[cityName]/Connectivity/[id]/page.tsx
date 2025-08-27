"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";


interface Connectivity {
  _id: string;
  cityName: string;
  reviews: any[];
  nearestAirportStationBusStand: string;
  distance: string;
  lat: number;
  lon: number;
  locationLink: string;
  majorFlightsTrainsBuses: string;
  premium: string;
}

export default function ConnectivityPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<Connectivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/Connectivity/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch connectivity info");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("Connectivity info not found");
        }
      } catch (err) {
        console.error("Error fetching connectivity:", err);
        setError("Error fetching connectivity");
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
        Connectivity of {data.cityName}
      </h1>

      {/* Connectivity Details */}
      <div className="bg-green-50 p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-green-700">
            Nearest Airport / Station / Bus Stand
          </h2>
          <p className="text-gray-700">{data.nearestAirportStationBusStand}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Distance</h2>
          <p className="text-gray-700">{data.distance}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Major Flights / Trains / Buses</h2>
          <p className="text-gray-700">{data.majorFlightsTrainsBuses}</p>
        </div>

        {/* Location Map Link */}
        {data.locationLink && (
          <div>
            <h2 className="text-xl font-semibold text-green-700">Location</h2>
            <a
              href={data.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View on Map
            </a>
          </div>
        )}

        {/* Coordinates */}
        <div>
          <h2 className="text-xl font-semibold text-green-700">Coordinates</h2>
          <p className="text-gray-700">
            Latitude: {data.lat}, Longitude: {data.lon}
          </p>
        </div>
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="Connectivity"
            />      
    </div>
  );
}
