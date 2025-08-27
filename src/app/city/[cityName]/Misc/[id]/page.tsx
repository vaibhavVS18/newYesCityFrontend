"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewSection from "@/components/page/ReviewSection";


interface Misc {
  _id: string;
  cityName: string;
  reviews: any[];
  localMap: string;
  emergencyContacts: string;
  hospital: string;
  hospitalLocationLink: string;
  hospitalLat: number;
  hospitalLon: number;
  Police: string;
  PoliceLocationLink: string;
  PoliceLat: number;
  PoliceLon: number;
  parking: string;
  parkingLocationLink: string;
  parkingLat: number;
  parkingLon: number;
  publicWashrooms: string;
  publicWashroomsLocationLink: string;
  publicWashroomsLat: number;
  publicWashroomsLon: number;
  locker: string;
  lockerLocationLink: string;
  lockerLat: number;
  lockerLon: number;
  premium: string;
}

export default function MiscPage() {
  const params = useParams<{ cityName: string; id: string }>();
  const cityName = decodeURIComponent(params.cityName);
  const id = params.id;

  const [data, setData] = useState<Misc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/city/${cityName}/Misc/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch misc info");
        }

        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError("Misc info not found");
        }
      } catch (err) {
        console.error("Error fetching misc info:", err);
        setError("Error fetching misc info");
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
        Miscellaneous Info – {data.cityName}
      </h1>

      {/* Local Map */}
      {data.localMap && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-green-700">Local Map</h2>
          <img
            src={data.localMap}
            alt={`${data.cityName} local map`}
            className="rounded-lg shadow-md w-full h-80 object-cover"
          />
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="bg-green-50 p-6 rounded-lg shadow space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-green-700">
            Emergency Contacts
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {data.emergencyContacts}
          </p>
        </div>

        {/* Hospital */}
        <div>
          <h2 className="text-xl font-semibold text-green-700">Hospital</h2>
          <p className="text-gray-700">{data.hospital}</p>
          {data.hospitalLocationLink && (
            <a
              href={data.hospitalLocationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Hospital on Map
            </a>
          )}
          <p className="text-gray-500 text-sm">
            Lat: {data.hospitalLat}, Lon: {data.hospitalLon}
          </p>
        </div>

        {/* Police */}
        <div>
          <h2 className="text-xl font-semibold text-green-700">Police</h2>
          <p className="text-gray-700">{data.Police}</p>
          {data.PoliceLocationLink && (
            <a
              href={data.PoliceLocationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Police Station on Map
            </a>
          )}
          <p className="text-gray-500 text-sm">
            Lat: {data.PoliceLat}, Lon: {data.PoliceLon}
          </p>
        </div>

        {/* Parking */}
        <div>
          <h2 className="text-xl font-semibold text-green-700">Parking</h2>
          <p className="text-gray-700">{data.parking}</p>
          {data.parkingLocationLink && (
            <a
              href={data.parkingLocationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Parking on Map
            </a>
          )}
          <p className="text-gray-500 text-sm">
            Lat: {data.parkingLat}, Lon: {data.parkingLon}
          </p>
        </div>

        {/* Public Washrooms */}
        <div>
          <h2 className="text-xl font-semibold text-green-700">
            Public Washrooms
          </h2>
          <p className="text-gray-700">{data.publicWashrooms}</p>
          {data.publicWashroomsLocationLink && (
            <a
              href={data.publicWashroomsLocationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Washrooms on Map
            </a>
          )}
          <p className="text-gray-500 text-sm">
            Lat: {data.publicWashroomsLat}, Lon: {data.publicWashroomsLon}
          </p>
        </div>

        {/* Lockers */}
        <div>
          <h2 className="text-xl font-semibold text-green-700">Lockers</h2>
          <p className="text-gray-700">{data.locker}</p>
          {data.lockerLocationLink && (
            <a
              href={data.lockerLocationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Lockers on Map
            </a>
          )}
          <p className="text-gray-500 text-sm">
            Lat: {data.lockerLat}, Lon: {data.lockerLon}
          </p>
        </div>
      </div>

            {/* Reviews */}
            <ReviewSection
              parentId={data._id}
              cityName={data.cityName}
              onModel="Misc"
            />      
    </div>
  );
}
