'use client';

import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";
import WishlistButton from "@/components/wishlist/WishlistButton"; // ✅ import

// components/chatbot/cards/ActivityCard.tsx
const ActivityCard: React.FC<BaseCardProps> = ({ data, imageSrc, onImageError, category }) => {
  const activity = data as any;
  
  return (
    <CardBase imageSrc={imageSrc} onImageError={onImageError} category={category} premium={data.premium}>
      {/* ✅ Wishlist Button */}
      {activity._id && activity.cityName && (
        <WishlistButton
          onModel="Activity"
          parentRef={activity._id}
          cityName={activity.cityName}
        />
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🎯</span>
          <h3 className="font-bold text-xl text-gray-900">Activities</h3>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <p className="text-gray-800 font-medium leading-relaxed">
            {activity.topActivities}
          </p>
        </div>
        
        {activity.duration && (
          <InfoRow 
            icon="⏰" 
            label="Duration" 
            value={activity.duration} 
          />
        )}
        {activity.difficulty && (
          <InfoRow 
            icon="📊" 
            label="Difficulty Level" 
            value={activity.difficulty} 
          />
        )}
      </div>
    </CardBase>
  );
};

export default ActivityCard;
