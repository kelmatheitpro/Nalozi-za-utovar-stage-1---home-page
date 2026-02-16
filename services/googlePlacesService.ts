// Google Places Autocomplete API service using JavaScript API
// Docs: https://developers.google.com/maps/documentation/javascript/places-autocomplete

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

// Load Google Maps JavaScript API
let googleMapsLoaded = false;
let googleMapsLoadPromise: Promise<void> | null = null;

const loadGoogleMapsAPI = (): Promise<void> => {
  if (googleMapsLoaded) return Promise.resolve();
  if (googleMapsLoadPromise) return googleMapsLoadPromise;

  googleMapsLoadPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not defined'));
      return;
    }

    // Check if already loaded
    if (window.google?.maps?.places) {
      googleMapsLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places&language=en`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      googleMapsLoaded = true;
      resolve();
    };
    
    script.onerror = () => {
      googleMapsLoadPromise = null;
      reject(new Error('Failed to load Google Maps API'));
    };
    
    document.head.appendChild(script);
  });

  return googleMapsLoadPromise;
};

// Search cities using Google Places Autocomplete Service
export const searchCitiesWithGoogle = async (query: string, country: string): Promise<City[]> => {
  if (!query || query.length < 2) return [];
  if (!GOOGLE_PLACES_API_KEY) {
    console.error('Google Places API key is missing');
    return [];
  }
  
  const countryCode = COUNTRY_CODES[country];
  if (!countryCode) return [];

  try {
    // Load Google Maps API if not already loaded
    await loadGoogleMapsAPI();

    // Create AutocompleteService
    const service = new google.maps.places.AutocompleteService();
    
    // Request predictions
    const request: google.maps.places.AutocompletionRequest = {
      input: query,
      componentRestrictions: { country: countryCode },
      language: 'en',
      // Removed types to include all localities (cities, towns, villages)
    };

    return new Promise((resolve) => {
      service.getPlacePredictions(request, async (predictions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
          console.log('Google Places status:', status);
          resolve([]);
          return;
        }

        // Filter to only include localities (cities, towns, villages)
        const localityPredictions = predictions.filter(pred => 
          pred.types.some(type => 
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
        
        resolve(cities);
      });
    });
  } catch (error) {
    console.error('Error fetching cities from Google Places:', error);
    return [];
  }
};

// Get postal code for a specific place using PlacesService
const getPostalCodeForPlace = async (placeId: string): Promise<string | null> => {
  if (!GOOGLE_PLACES_API_KEY) return null;
  
  try {
    await loadGoogleMapsAPI();

    // Create a dummy div for PlacesService (required by Google API)
    const dummyDiv = document.createElement('div');
    const service = new google.maps.places.PlacesService(dummyDiv);
    
    return new Promise((resolve) => {
      service.getDetails(
        {
          placeId: placeId,
          fields: ['address_components']
        },
        (place, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
            resolve(null);
            return;
          }

          const postalComponent = place.address_components?.find(
            component => component.types.includes('postal_code')
          );
          
          resolve(postalComponent?.long_name || null);
        }
      );
    });
  } catch (error) {
    console.error('Error fetching postal code:', error);
    return null;
  }
};
