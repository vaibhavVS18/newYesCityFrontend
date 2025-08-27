import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";
import { getBadgeColor } from "./shared/utils";
import WishlistButton from "@/components/wishlist/WishlistButton"; // ✅ import


type ShopData = {
  shops: string;
  flagship?: boolean;
  famousFor: string;
  specialty?: string;
  priceRange?: string;
  premium?: boolean;
};

const ShopCard: React.FC<BaseCardProps & { data: ShopData }> = ({
  data,
  imageSrc,
  onImageError,
  category,
}) => {
  const shop = data;

  return (
    <CardBase
      imageSrc={imageSrc}
      onImageError={onImageError}
      category={category}
      premium={data.premium}
    >

      {/* ✅ Wishlist Button */}
      {shop._id && shop.cityName && (
        <WishlistButton
          onModel="Shop"
          parentRef={shop._id}
          cityName={shop.cityName}
        />
      )}

      <div className="space-y-4">
        {/* Header with Flagship badge */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-2xl">🛍️</span>
            <h3 className="font-bold text-xl text-gray-900 leading-tight">
              {shop.shops}
            </h3>
          </div>

          {shop.flagship && (
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeColor(
                "flagship"
              )} ml-2`}
            >
              ⭐ Flagship
            </span>
          )}
        </div>

        {/* Famous For */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border-l-4 border-pink-400">
          <InfoRow icon="⭐" label="Famous For" value={shop.famousFor} />
        </div>

        {/* Specialty */}
        {shop.specialty && (
          <InfoRow icon="🎯" label="Specialty" value={shop.specialty} />
        )}

        {/* Price Range */}
        {shop.priceRange && (
          <InfoRow icon="💰" label="Price Range" value={shop.priceRange} />
        )}
      </div>
    </CardBase>
  );
};

export default ShopCard;
