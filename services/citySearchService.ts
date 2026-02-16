// OpenStreetMap Nominatim API service for fetching cities
// Free and open-source alternative to Google Places
// Docs: https://nominatim.org/release-docs/latest/api/Search/

interface NominatimPlace {
  place_id: number;
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    postcode?: string;
    country?: string;
  };
}

// Country code mapping
const COUNTRY_CODES: Record<string, string> = {
  'Srbija': 'RS',
  'Hrvatska': 'HR',
  'Bosna i Hercegovina': 'BA',
  'Crna Gora': 'ME',
  'Severna Makedonija': 'MK',
  'Slovenija': 'SI',
};

export interface City {
  name: string;
  postalCode: string;
  country: string;
}

// Search cities using OpenStreetMap Nominatim API
export const searchCitiesOnline = async (query: string, country: string): Promise<City[]> => {
  if (!query || query.length < 2) return [];
  
  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) return [];

  try {
    // Using Nominatim search API - searches for cities, towns, villages
    const url = `https://nominatim.openstreetmap.org/search?` + 
      `q=${encodeURIComponent(query)}&` +
      `countrycodes=${countryCode}&` +
      `format=json&` +
      `addressdetails=1&` +
      `limit=15&` +
      `featuretype=settlement`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TeretLink/1.0' // Nominatim requires User-Agent
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch cities');
    
    const data: NominatimPlace[] = await response.json();
    
    // Transform to our City format and remove duplicates
    const cities: City[] = [];
    const seen = new Set<string>();
    
    for (const place of data) {
      const cityName = place.address.city || 
                      place.address.town || 
                      place.address.village || 
                      place.address.municipality;
      
      if (cityName) {
        const postalCode = place.address.postcode || '00000';
        const key = `${cityName}-${postalCode}`;
        
        if (!seen.has(key)) {
          seen.add(key);
          cities.push({
            name: cityName,
            postalCode: postalCode,
            country: country
          });
        }
      }
    }
    
    return cities;
  } catch (error) {
    console.error('Error fetching cities from Nominatim:', error);
    return [];
  }
};

// Get postal code for a specific city (fallback method)
export const getCityPostalCode = async (cityName: string, country: string): Promise<string | null> => {
  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) return null;

  try {
    const url = `https://nominatim.openstreetmap.org/search?` +
      `q=${encodeURIComponent(cityName)}&` +
      `countrycodes=${countryCode}&` +
      `format=json&` +
      `addressdetails=1&` +
      `limit=1`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TeretLink/1.0'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch postal code');
    
    const data: NominatimPlace[] = await response.json();
    
    if (data.length > 0 && data[0].address.postcode) {
      return data[0].address.postcode;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching postal code:', error);
    return null;
  }
};
