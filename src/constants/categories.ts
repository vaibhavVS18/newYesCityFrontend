export const CATEGORIES = [
  'Accommodation',
  'Activity', 
//   'CityInfo',
//   'Connectivity',
  'Food',
  'HiddenGem',
//   'Itinerary',
//   'Misc',
  'NearbySpot',
  'Place',
  'Shop',
//   'Transport'
] as const;

export type CategoryType = typeof CATEGORIES[number];

// Category display names (optional - if you want different display names)
export const CATEGORY_LABELS: Record<CategoryType, string> = {
  Accommodation: 'Accommodation(Hotels)',
  Activity: 'Activities',
  Food: 'Food',
  HiddenGem: 'Hidden Gems',
  NearbySpot: 'Nearby Spots',
  Place: 'Places',
  Shop: 'Shopping',

};