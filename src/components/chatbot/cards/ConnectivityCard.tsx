import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";

type ConnectivityData = {
  nearestAirportStationBusStand: string;
  distance: string;
  travelTime?: string;
  premium?: boolean;
};

const ConnectivityCard: React.FC<BaseCardProps & { data: ConnectivityData }> = ({
  data,
  imageSrc,
  onImageError,
  category,
}) => {
  const connectivity = data;

  return (
    <CardBase
      imageSrc={imageSrc}
      onImageError={onImageError}
      category={category}
      premium={data.premium}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🚊</span>
          <h3 className="font-bold text-xl text-gray-900">Transportation Hub</h3>
        </div>

        {/* Nearest hub + distance */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg space-y-3">
          <InfoRow
            icon="🎯"
            label="Nearest Hub"
            value={connectivity.nearestAirportStationBusStand}
          />
          <div className="flex items-center justify-between pt-2 border-t border-green-200">
            <span className="text-gray-600 font-medium">Distance:</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {connectivity.distance}
            </span>
          </div>
        </div>

        {/* Travel time */}
        {connectivity.travelTime && (
          <InfoRow
            icon="⏱️"
            label="Travel Time"
            value={connectivity.travelTime}
          />
        )}
      </div>
    </CardBase>
  );
};

export default ConnectivityCard;
