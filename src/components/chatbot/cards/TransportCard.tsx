import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";

type TransportData = {
  from: string;
  to: string;
  duration?: string;
  fare?: string;
  premium?: boolean;
};

const TransportCard: React.FC<BaseCardProps & { data: TransportData }> = ({
  data,
  imageSrc,
  onImageError,
  category,
}) => {
  const transport = data;

  return (
    <CardBase
      imageSrc={imageSrc}
      onImageError={onImageError}
      category={category}
      premium={data.premium}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🚌</span>
          <h3 className="font-bold text-xl text-gray-900">Transport Route</h3>
        </div>

        {/* Route visualization */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            {/* FROM */}
            <div className="text-center">
              <div className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold mb-2">
                FROM
              </div>
              <p className="text-gray-800 font-medium">{transport.from}</p>
            </div>

            {/* Arrow */}
            <div className="flex-1 px-4">
              <div className="border-t-2 border-dashed border-gray-400 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  →
                </div>
              </div>
            </div>

            {/* TO */}
            <div className="text-center">
              <div className="bg-red-500 text-white px-3 py-2 rounded-full text-sm font-semibold mb-2">
                TO
              </div>
              <p className="text-gray-800 font-medium">{transport.to}</p>
            </div>
          </div>
        </div>

        {/* Duration */}
        {transport.duration && (
          <InfoRow icon="⏰" label="Duration" value={transport.duration} />
        )}

        {/* Fare */}
        {transport.fare && (
          <InfoRow icon="💰" label="Fare" value={transport.fare} />
        )}
      </div>
    </CardBase>
  );
};

export default TransportCard;
