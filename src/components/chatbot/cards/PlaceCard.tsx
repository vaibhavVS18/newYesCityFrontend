import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";
import WishlistButton from "@/components/wishlist/WishlistButton"; // ✅ import


type PlaceData = {
  places: string;
  establishYear?: string;
  description: string;
  category?: string;
  premium?: boolean;
};

const PlaceCard: React.FC<BaseCardProps & { data: PlaceData }> = ({
  data,
  imageSrc,
  onImageError,
  category,
}) => {
  const place = data;

  return (
    <CardBase
      imageSrc={imageSrc}
      onImageError={onImageError}
      category={category}
      premium={data.premium}
    >

      {/* ✅ Wishlist Button */}
      {place._id && place.cityName && (
        <WishlistButton
          onModel="Place"
          parentRef={place._id}
          cityName={place.cityName}
        />
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏛️</span>
          <h3 className="font-bold text-xl text-gray-900 leading-tight">
            {place.places}
          </h3>
        </div>

        {/* Established Year */}
        {place.establishYear && (
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
            <span className="text-amber-600">🗓️</span>
            <span className="text-gray-600 font-medium">Established:</span>
            <span className="bg-amber-500 text-white px-2 py-1 rounded text-sm font-semibold">
              {place.establishYear}
            </span>
          </div>
        )}

        {/* Description */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-l-4 border-indigo-400">
          <p className="text-gray-800 leading-relaxed">
            {place.description}
          </p>
        </div>

        {/* Category */}
        {place.category && (
          <InfoRow 
            icon="🏷️"
            label="Category"
            value={place.category}
          />
        )}
      </div>
    </CardBase>
  );
};

export default PlaceCard;
