import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";

const CityInfoCard: React.FC<BaseCardProps> = ({ data, imageSrc, onImageError, category }) => {
  const cityInfo = data as any;

  return (
    <CardBase 
      imageSrc={imageSrc || cityInfo.coverImage} 
      onImageError={onImageError} 
      category={category} 
      premium={data.premium}
    >
      <div className="space-y-5">
        {/* Hero Section */}
        <div className="relative">
          <img 
            src={cityInfo.coverImage} 
            alt={cityInfo.cityName} 
            className="w-full h-48 object-cover rounded-xl shadow-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl flex items-end p-4">
            <div>
              <h3 className="text-3xl font-bold text-white">{cityInfo.cityName}</h3>
              <span className="inline-flex items-center gap-2 bg-white/80 text-blue-700 text-sm font-medium px-3 py-1 mt-2 rounded-full">
                📍 {cityInfo.stateOrUT}
              </span>
            </div>
          </div>
        </div>

        {/* Alternate Names */}
        {cityInfo.alternateNames?.length > 0 && (
          <div>
            <p className="text-gray-600 font-medium mb-2">Also known as:</p>
            <div className="flex flex-wrap gap-2">
              {cityInfo.alternateNames.map((name: string, idx: number) => (
                <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Info Stats */}
        <div className="grid grid-cols-2 gap-4">
          {cityInfo.population && (
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Population</p>
              <p className="text-lg font-semibold">{cityInfo.population.toLocaleString()}</p>
            </div>
          )}
          {cityInfo.area && (
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Area</p>
              <p className="text-lg font-semibold">{cityInfo.area}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition">
            Explore
          </button>
          <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-xl font-medium hover:bg-blue-50 transition">
            Hotels
          </button>
        </div>
      </div>
    </CardBase>
  );
};

export default CityInfoCard;
