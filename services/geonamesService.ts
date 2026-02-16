// GeoNames API service for fetching cities
// Free API - no API key required for basic usage
// Docs: https://www.geonames.org/export/web-services.html

interface GeoNamesCity {
  name: string;
  adminName1: string; // Region/State
  countryCode: string;
  countryName: string;
  population: number;
  postalCodes?: Array<{ postalCode: string }>;
}

interface GeoNamesResponse {
  geonames: GeoNamesCity[];
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

// Search cities using GeoNames API
export const searchCitiesOnline = async (query: string, country: string): Promise<City[]> => {
  if (!query || query.length < 2) return [];
  
  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) return [];

  try {
    // Using GeoNames search API
    const url = `https://secure.geonames.org/searchJSON?name_startsWith=${encodeURIComponent(query)}&country=${countryCode}&maxRows=10&username=demo&featureClass=P&orderby=population`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch cities');
    
    const data: GeoNamesResponse = await response.json();
    
    // Transform to our City format
    return data.geonames.map(city => ({
      name: city.name,
      postalCode: city.postalCodes?.[0]?.postalCode || '00000',
      country: country
    }));
  } catch (error) {
    console.error('Error fetching cities from GeoNames:', error);
    return [];
  }
};

// Get postal code for a specific city
export const getCityPostalCode = async (cityName: string, country: string): Promise<string | null> => {
  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) return null;

  try {
    const url = `https://secure.geonames.org/postalCodeSearchJSON?placename=${encodeURIComponent(cityName)}&country=${countryCode}&maxRows=1&username=demo`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch postal code');
    
    const data = await response.json();
    
    if (data.postalCodes && data.postalCodes.length > 0) {
      return data.postalCodes[0].postalCode;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching postal code:', error);
    return null;
  }
};
