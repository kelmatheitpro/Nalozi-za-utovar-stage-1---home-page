// Google Places Autocomplete API service
// Docs: https://developers.google.com/maps/documentation/places/web-service/autocomplete

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

// Country code mapping
const COUNTRY_CODES: Record<string, string> = {
  'Srbija': 'rs',
  'Hrvatska': 'hr',
  'Bosna i Hercegovina': 'ba',
  'Crna Gora': 'me',
  'Severna Makedonija': 'mk',
  'Slovenija': 'si',
};

export interface City {
  name: string;
  postalCode: string;
  country: string;
}

interface PlacePrediction {
  description: string;
  place_id: string;
  types?: string[];
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  terms: Array<{
    offset: number;
    value: string;
  }>;
}

interface PlaceDetails {
  result: {
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: string[];
    }>;
  };
}

// Search cities using Google Places Autocomplete API
export const searchCitiesWithGoogle = async (query: string, country: string): Promise<City[]> => {
  if (!query || query.length < 2) return [];
  if (!GOOGLE_PLACES_API_KEY) {
    console.error('Google Places API key is missing');
    return [];
  }
  
  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) return [];

  try {
    // Using Places Autocomplete API
    // Removed types=(cities) to include all localities (cities, towns, villages)
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?` +
      `input=${encodeURIComponent(query)}&` +
      `components=country:${countryCode}&` +
      `language=en&` +
      `key=${GOOGLE_PLACES_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch cities from Google Places');
    
    const data = await response.json();
    
    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', data.status, data.error_message);
      return [];
    }
    
    if (!data.predictions || data.predictions.length === 0) {
      return [];
    }
    
    // Filter to only include localities (cities, towns, villages)
    const localityPredictions = data.predictions.filter((pred: PlacePrediction) => 
      pred.types?.some(type => 
        type === 'locality' || 
        type === 'administrative_area_level_3' ||
        type === 'sublocality'
      )
    );
    
    // Get details for each place to extract postal code
    const cities: City[] = [];
    
    for (const prediction of localityPredictions.slice(0, 15)) {
      const cityName = prediction.structured_formatting.main_text;
      
      // Try to get postal code from place details
      const postalCode = await getPostalCodeForPlace(prediction.place_id);
      
      cities.push({
        name: cityName,
        postalCode: postalCode || '00000',
        country: country
      });
    }
    
    return cities;
  } catch (error) {
    console.error('Error fetching cities from Google Places:', error);
    return [];
  }
};

// Get postal code for a specific place
const getPostalCodeForPlace = async (placeId: string): Promise<string | null> => {
  if (!GOOGLE_PLACES_API_KEY) return null;
  
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?` +
      `place_id=${placeId}&` +
      `fields=address_components&` +
      `key=${GOOGLE_PLACES_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const data: PlaceDetails = await response.json();
    
    if (data.result && data.result.address_components) {
      const postalComponent = data.result.address_components.find(
        component => component.types.includes('postal_code')
      );
      
      if (postalComponent) {
        return postalComponent.long_name;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching postal code:', error);
    return null;
  }
};
