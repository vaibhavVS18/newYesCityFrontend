import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";
import { getBadgeColor } from "./shared/utils";
import WishlistButton from "@/components/wishlist/WishlistButton"; // ✅ import

// components/chatbot/cards/FoodCard.tsx
const FoodCard: React.FC<BaseCardProps> = ({ data, imageSrc, onImageError, category }) => {
  const food = data as any;
  
  return (
    <CardBase imageSrc={imageSrc} onImageError={onImageError} category={category} premium={data.premium}>
      {/* ✅ Wishlist Button */}
      {food._id && food.cityName && (
        <WishlistButton
          onModel="Food"   // ✅ Corrected
          parentRef={food._id}
          cityName={food.cityName}
        />
      )}

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-2xl">🍽️</span>
            <h3 className="font-bold text-xl text-gray-900 leading-tight">
              {food.foodPlace}
            </h3>
          </div>
          
          <div className="flex gap-2 ml-2">
            {food.vegOrNonVeg && (
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  food.vegOrNonVeg.toLowerCase() === "veg"
                    ? getBadgeColor("veg")
                    : getBadgeColor("nonveg")
                }`}
              >
                {food.vegOrNonVeg.toLowerCase() === "veg" ? "🌱 Veg" : "🍖 Non-Veg"}
              </span>
            )}
            {food.flagship && (
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(
                  "flagship"
                )}`}
              >
                ⭐ Flagship
              </span>
            )}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
          <InfoRow 
            icon="👨‍🍳" 
            label="Menu Special" 
            value={food.menuSpecial} 
          />
        </div>
        
        {food.cuisine && (
          <InfoRow 
            icon="🌍" 
            label="Cuisine" 
            value={food.cuisine} 
          />
        )}
        
        {food.priceRange && (
          <InfoRow 
            icon="💰" 
            label="Price Range" 
            value={food.priceRange} 
          />
        )}
      </div>
    </CardBase>
  );
};

export default FoodCard;
