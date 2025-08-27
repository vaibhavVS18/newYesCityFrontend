import { BaseCardProps, CardBase } from "./shared/CardBase";
import WishlistButton from "@/components/wishlist/WishlistButton"; // ✅ import


type NearbySpotData = {
  places: string;
  description: string;
  distance?: string;
  premium?: boolean;
};

const NearbySpotCard: React.FC<BaseCardProps & { data: NearbySpotData }> = ({
  data,
  imageSrc,
  onImageError,
  category,
}) => {
  const nearbySpot = data;

  return (
    <CardBase
      imageSrc={imageSrc}
      onImageError={onImageError}
      category={category}
      premium={data.premium}
    >

      {/* ✅ Wishlist Button */}
      {nearbySpot._id && nearbySpot.cityName && (
        <WishlistButton
          onModel="NearbySpot"
          parentRef={nearbySpot._id}
          cityName={nearbySpot.cityName}
        />
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">📍</span>
          <h3 className="font-bold text-xl text-gray-900 leading-tight">
            {nearbySpot.places}
          </h3>
        </div>

        {/* Description */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border-l-4 border-teal-400">
          <p className="text-gray-800 leading-relaxed">
            {nearbySpot.description}
          </p>
        </div>

        {/* Distance */}
        {nearbySpot.distance && (
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
            <span className="text-gray-600 font-medium">Distance:</span>
            <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {nearbySpot.distance}
            </span>
          </div>
        )}
      </div>
    </CardBase>
  );
};

export default NearbySpotCard;
