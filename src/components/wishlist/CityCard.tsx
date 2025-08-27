import { useRouter } from 'next/navigation';

interface CityCardProps {
  _id: string;
  cityName: string;
  'cover-image': string;
  content: string;
}

export default function CityCard({ _id, cityName, 'cover-image': coverImage, content }: CityCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/wishlist/${encodeURIComponent(cityName)}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={coverImage}
          alt={cityName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{cityName}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{content}</p>
      </div>
    </div>
  );
}