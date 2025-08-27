"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type City = {
  _id: string;
  cityName: string;
  ["cover-image"]: string;
  content: string;
};

const CitySearch: React.FC = () => {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  // Fetch data from API with token
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/city`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await res.json();
        setCities(data.data || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Continuous rotation animation
  useEffect(() => {
    const filteredCities = cities.filter((city) =>
      city.cityName.toLowerCase().includes(search.toLowerCase())
    );
    
    if (filteredCities.length === 0 || isPaused) return;
    
    const animate = () => {
      setRotation(prev => prev + 0.2); // Smooth increment for continuous rotation
    };

    const animationFrame = setInterval(animate, 16); // ~60fps

    return () => clearInterval(animationFrame);
  }, [cities, search, isPaused]);

  // Filter cities by search input
  const filteredCities = cities.filter((city) =>
    city.cityName.toLowerCase().includes(search.toLowerCase())
  );

  // Handle card click
  const handleCardClick = (cityName: string): void => {
    localStorage.setItem("selectedCity", cityName);
    router.push(`/chatbot/${encodeURIComponent(cityName)}`);
  };

  // Get current front card based on rotation
  const getCurrentCard = (): City | undefined => {
    if (filteredCities.length === 0) return undefined;
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const cardAngle = 360 / filteredCities.length;
    const currentIndex = Math.round(normalizedRotation / cardAngle) % filteredCities.length;
    return filteredCities[currentIndex];
  };

  // Pause/Resume rotation on hover
  const handleMouseEnter = (): void => {
    setIsPaused(true);
  };

  const handleMouseLeave = (): void => {
    setIsPaused(false);
  };

 // Slide controls
  const prevSlide = () => {
    if (filteredCities.length === 0) return;
    const cardAngle = 360 / filteredCities.length;
    setRotation((prev) => prev - cardAngle);
  };

  const nextSlide = () => {
    if (filteredCities.length === 0) return;
    const cardAngle = 360 / filteredCities.length;
    setRotation((prev) => prev + cardAngle);
  };

  return (
    <div className="w-fit mx-auto text-center px-4">
      <Image
        src="/images/flybie.png"
        width={700}
        height={200}
        alt="Flybie Chatbot"
        className="mx-auto hover:scale-102 duration-300 aspect-7/3 mb-0"
      />

      {/* Search box */}
      <input
        type="text"
        placeholder="Search city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rgba(160,210,243,0.3) shadow-[0_0_20px_rgba(255,255,255,0.8)]
             w-full md:w-[200px] mb-6 p-3 rounded-[30px]
             text-[#00000080] border-[#8CA0DB] border-[1px]
             items-center gap-2 backdrop-blur-sm mx-auto"
      />

      {loading ? (
        <p className="text-gray-500">Loading cities...</p>
      ) : filteredCities.length === 0 ? (
        <p className="text-center w-full text-gray-500">No cities found.</p>
      ) : (
        <div className="relative w-full max-w-4xl mx-auto">
          {/* 3D Carousel Container */}
          <div 
            className="relative h-80 w-full"
            style={{ perspective: '1000px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${-rotation}deg)`, // Continuous rotation
                transition: isPaused ? 'transform 0.3s ease-out' : 'none',
              }}
            >
              {filteredCities.map((city, index) => {
                const angle = (index * 360) / filteredCities.length;
                const radius = 280; // Distance from center
                
                return (
                  <div
                    key={city._id}
                    onClick={() => handleCardClick(city.cityName)}
                    className="absolute w-48 h-64 cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      transformStyle: 'preserve-3d',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-96px', // Half of width (w-48 = 192px)
                      marginTop: '-128px', // Half of height (h-64 = 256px)
                    }}
                  >
                    {/* Card */}
                    <div className="w-full h-full rounded-xl border shadow-2xl bg-white overflow-hidden relative group">
                      {/* City image */}
                      <img
                        src={city["cover-image"]}
                        alt={city.cityName}
                        className="h-40 w-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
                      />

                      {/* Info box */}
                      <div className="p-3 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
                        <h2 className="text-sm font-semibold text-white truncate mb-1">
                          {city.cityName}
                        </h2>
                        <p 
                          className="text-xs text-gray-200 overflow-hidden"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical' as const,
                          }}
                        >
                          {city.content}
                        </p>
                      </div>
                      
                      {/* Glow effect for front card */}
                      <div 
                        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
                        style={{
                          boxShadow: Math.abs(((rotation + angle) % 360) - 180) < 30 
                            ? '0 0 30px rgba(59, 130, 246, 0.5)' 
                            : 'none'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={prevSlide}
              type="button"
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {filteredCities.map((_, index) => {
                const cardAngle = 360 / filteredCities.length;
                const normalizedRotation = ((rotation % 360) + 360) % 360;
                const currentIndex = Math.round(normalizedRotation / cardAngle) % filteredCities.length;
                const isActive = index === currentIndex;
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      const targetRotation = index * cardAngle;
                      setRotation(targetRotation);
                    }}
                    type="button"
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive 
                        ? 'bg-blue-500 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={nextSlide}
              type="button"
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Current city display */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 transition-all duration-300">
              {getCurrentCard()?.cityName || 'Rotating...'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto transition-all duration-300">
              {getCurrentCard()?.content || 'Explore amazing cities around the world'}
            </p>
          </div>

          {/* Rotation indicator */}
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-100"
                style={{
                  width: `${((rotation % 360) / 360) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;