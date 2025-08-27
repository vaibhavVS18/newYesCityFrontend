import { BaseCardProps, CardBase } from "./shared/CardBase";
import { InfoRow } from "./shared/InfoRow";

type MiscData = {
  hospital?: string;
  Police?: string;
  parking?: string;
  publicWashrooms?: string;
  locker?: string;
  premium?: boolean;
};

const MiscCard: React.FC<BaseCardProps & { data: MiscData }> = ({
  data,
  imageSrc,
  onImageError,
  category,
}) => {
  const misc = data;

  const services = [
    { key: "hospital", label: "Hospital", icon: "🏥", value: misc.hospital },
    { key: "Police", label: "Police Station", icon: "👮‍♂️", value: misc.Police },
    { key: "parking", label: "Parking", icon: "🅿️", value: misc.parking },
    { key: "publicWashrooms", label: "Public Washrooms", icon: "🚻", value: misc.publicWashrooms },
    { key: "locker", label: "Locker Facility", icon: "🔒", value: misc.locker },
  ].filter(service => service.value);

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
          <span className="text-2xl">🏢</span>
          <h3 className="font-bold text-xl text-gray-900">Essential Services</h3>
        </div>

        {/* Services list */}
        {services.length > 0 ? (
          <div className="grid gap-3">
            {services.map(service => (
              <div
                key={service.key}
                className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <InfoRow
                  icon={service.icon}
                  label={service.label}
                  value={service.value}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No services information available
          </p>
        )}
      </div>
    </CardBase>
  );
};

export default MiscCard;
