import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";
import WishlistButton from "@/components/wishlist/WishlistButton"; // ✅ import


type HiddenGemData = {
  hiddenGem: string;
  location?: string;
  premium?: boolean;
};

const HiddenGemCard: React.FC<BaseCardProps & { data: HiddenGemData }> = ({
  data,
  imageSrc,
  onImageError,
  category,
}) => {
  const hiddenGem = data;

  return (
    <CardBase
      imageSrc={imageSrc}
      onImageError={onImageError}
      category={category}
      premium={data.premium}
    >

    {/* ✅ Wishlist Button */}
      {hiddenGem._id && hiddenGem.cityName && (
        <WishlistButton
          onModel="HiddenGem"
          parentRef={hiddenGem._id}
          cityName={hiddenGem.cityName}
        />
      )}

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">💎</span>
          <h3 className="font-bold text-xl text-gray-900">Hidden Gem</h3>
        </div>

        {/* Highlight box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400">
          <p className="text-gray-800 leading-relaxed font-medium">
            {hiddenGem.hiddenGem}
          </p>
        </div>

        {/* Optional location */}
        {hiddenGem.location && (
          <InfoRow icon="📍" label="Location" value={hiddenGem.location} />
        )}
      </div>
    </CardBase>
  );
};

export default HiddenGemCard;
