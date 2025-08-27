'use client';

import { CategoryData, CATEGORIES_WITHOUT_IMAGES, DEFAULT_IMAGE } from '@/types';
import AccommodationCard from '@/components/chatbot/cards/AccommodationCard';
import ActivityCard from '@/components/chatbot/cards/ActivityCard';
import CityInfoCard from '@/components/chatbot/cards/CityInfoCard';
import ConnectivityCard from '@/components/chatbot/cards/ConnectivityCard';
import FoodCard from '@/components/chatbot/cards/FoodCard';
import HiddenGemCard from '@/components/chatbot/cards/HiddenGemCard';
import ItineraryCard from '@/components/chatbot/cards/ItineraryCard';
import MiscCard from '@/components/chatbot/cards/MiscCard';
import NearbySpotCard from '@/components/chatbot/cards/NearbySpotCard';
import PlaceCard from '@/components/chatbot/cards/PlaceCard';
import ShopCard from '@/components/chatbot/cards/ShopCard';
import TransportCard from '@/components/chatbot/cards/TransportCard';

interface DataCardProps {
  data: CategoryData & {
    cityName?: string;
    onModel?: string;
    _id?: string;
  };
  category: string;
}

const DataCard: React.FC<DataCardProps> = ({ data, category }) => {
  const getImageSrc = () => {
    if ('images' in data && data.images && data.images.length > 0) {
      return data.images[0];
    }

    if ('coverImage' in data && data.coverImage) {
      return data.coverImage;
    }

    if (CATEGORIES_WITHOUT_IMAGES.includes(category as any)) {
      return DEFAULT_IMAGE;
    }

    return DEFAULT_IMAGE;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.src !== DEFAULT_IMAGE) {
      target.src = DEFAULT_IMAGE;
    }
  };

  const commonProps = {
    data,
    imageSrc: getImageSrc(),
    onImageError: handleImageError,
    category,
  };

  const categoryComponents: Record<string, React.ComponentType<any>> = {
    Accommodation: AccommodationCard,
    Activity: ActivityCard,
    CityInfo: CityInfoCard,
    Connectivity: ConnectivityCard,
    Food: FoodCard,
    HiddenGem: HiddenGemCard,
    Itinerary: ItineraryCard,
    Misc: MiscCard,
    NearbySpot: NearbySpotCard,
    Place: PlaceCard,
    Shop: ShopCard,
    Transport: TransportCard,
  };

  const CardComponent = categoryComponents[category];

const handleClick = () => {
  if (data.cityName && category && data._id) {
    const url = `/city/${encodeURIComponent(data.cityName)}/${encodeURIComponent(
      category
    )}/${encodeURIComponent(data._id)}`;
    window.open(url, "_blank");
  } else {
    console.warn("Missing fields in data:", { 
      cityName: data.cityName, 
      onModel: category, 
      _id: data._id 
    });
  }
};


  if (CardComponent) {
    return (
      <div
        onClick={handleClick}
        className="relative cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <CardComponent {...commonProps} />
      </div>
    );
  }

  // Fallback for unknown categories
  return (
    <div
      onClick={handleClick}
      className="relative bg-white rounded-xl shadow-lg p-6 cursor-pointer"
    >
      <h3 className="font-bold text-gray-800 mb-2">
        Unknown Category: {category}
      </h3>
      <pre className="text-sm text-gray-600 overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default DataCard;
