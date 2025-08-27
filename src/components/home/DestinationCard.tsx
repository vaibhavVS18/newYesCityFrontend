type DestinationCardProps = {
  name: string;
  description: string;
  image: string;
  rating: number;
};

export default function DestinationCard({ name, description, image, rating }: DestinationCardProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md relative">
      <img src={image} alt={name} className="w-full h-56 object-cover" />
      <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-md text-sm">
        {name} {rating}
      </div>
      <div className="p-4 bg-white">
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}
