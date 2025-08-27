import { BaseCardProps, CardBase } from "./shared/CardBase";

// components/chatbot/cards/ItineraryCard.tsx
const ItineraryCard: React.FC<BaseCardProps> = ({ data, imageSrc, onImageError, category }) => {
  const itinerary = data as any;
  
  return (
    <CardBase imageSrc={imageSrc} onImageError={onImageError} category={category} premium={data.premium}>
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🗓️</span>
          <h3 className="font-bold text-xl text-gray-900">3-Day Itinerary</h3>
        </div>
        
        <div className="space-y-4">
          {[
            { day: 'Day 1', activities: itinerary.day1, color: 'from-blue-50 to-cyan-50 border-blue-400' },
            { day: 'Day 2', activities: itinerary.day2, color: 'from-green-50 to-emerald-50 border-green-400' },
            { day: 'Day 3', activities: itinerary.day3, color: 'from-purple-50 to-indigo-50 border-purple-400' }
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-r ${item.color} p-4 rounded-lg border-l-4`}>
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-700 text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1">{item.day}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.activities}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardBase>
  );
};

export default ItineraryCard;