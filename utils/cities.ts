// Cities database for Balkan countries with postal codes
export interface City {
  name: string;
  postalCode: string;
  country: string;
}

export const CITIES: City[] = [
  // Serbia
  { name: 'Beograd', postalCode: '11000', country: 'Srbija' },
  { name: 'Novi Sad', postalCode: '21000', country: 'Srbija' },
  { name: 'Niš', postalCode: '18000', country: 'Srbija' },
  { name: 'Kragujevac', postalCode: '34000', country: 'Srbija' },
  { name: 'Subotica', postalCode: '24000', country: 'Srbija' },
  { name: 'Zrenjanin', postalCode: '23000', country: 'Srbija' },
  { name: 'Pančevo', postalCode: '26000', country: 'Srbija' },
  { name: 'Čačak', postalCode: '32000', country: 'Srbija' },
  { name: 'Kruševac', postalCode: '37000', country: 'Srbija' },
  { name: 'Kraljevo', postalCode: '36000', country: 'Srbija' },
  { name: 'Smederevo', postalCode: '11300', country: 'Srbija' },
  { name: 'Leskovac', postalCode: '16000', country: 'Srbija' },
  { name: 'Užice', postalCode: '31000', country: 'Srbija' },
  { name: 'Vranje', postalCode: '17500', country: 'Srbija' },
  { name: 'Šabac', postalCode: '15000', country: 'Srbija' },
  { name: 'Valjevo', postalCode: '14000', country: 'Srbija' },
  { name: 'Novi Pazar', postalCode: '36300', country: 'Srbija' },
  { name: 'Sombor', postalCode: '25000', country: 'Srbija' },
  { name: 'Požarevac', postalCode: '12000', country: 'Srbija' },
  { name: 'Pirot', postalCode: '18300', country: 'Srbija' },
  
  // Croatia
  { name: 'Zagreb', postalCode: '10000', country: 'Hrvatska' },
  { name: 'Split', postalCode: '21000', country: 'Hrvatska' },
  { name: 'Rijeka', postalCode: '51000', country: 'Hrvatska' },
  { name: 'Osijek', postalCode: '31000', country: 'Hrvatska' },
  { name: 'Zadar', postalCode: '23000', country: 'Hrvatska' },
  { name: 'Pula', postalCode: '52100', country: 'Hrvatska' },
  { name: 'Slavonski Brod', postalCode: '35000', country: 'Hrvatska' },
  { name: 'Karlovac', postalCode: '47000', country: 'Hrvatska' },
  { name: 'Varaždin', postalCode: '42000', country: 'Hrvatska' },
  { name: 'Šibenik', postalCode: '22000', country: 'Hrvatska' },
  { name: 'Sisak', postalCode: '44000', country: 'Hrvatska' },
  { name: 'Dubrovnik', postalCode: '20000', country: 'Hrvatska' },
  { name: 'Velika Gorica', postalCode: '10410', country: 'Hrvatska' },
  { name: 'Vinkovci', postalCode: '32100', country: 'Hrvatska' },
  { name: 'Bjelovar', postalCode: '43000', country: 'Hrvatska' },
  
  // Bosnia and Herzegovina
  { name: 'Sarajevo', postalCode: '71000', country: 'Bosna i Hercegovina' },
  { name: 'Banja Luka', postalCode: '78000', country: 'Bosna i Hercegovina' },
  { name: 'Tuzla', postalCode: '75000', country: 'Bosna i Hercegovina' },
  { name: 'Zenica', postalCode: '72000', country: 'Bosna i Hercegovina' },
  { name: 'Mostar', postalCode: '88000', country: 'Bosna i Hercegovina' },
  { name: 'Bijeljina', postalCode: '76300', country: 'Bosna i Hercegovina' },
  { name: 'Brčko', postalCode: '76100', country: 'Bosna i Hercegovina' },
  { name: 'Prijedor', postalCode: '79101', country: 'Bosna i Hercegovina' },
  { name: 'Trebinje', postalCode: '89101', country: 'Bosna i Hercegovina' },
  { name: 'Cazin', postalCode: '77220', country: 'Bosna i Hercegovina' },
  
  // Montenegro
  { name: 'Podgorica', postalCode: '81000', country: 'Crna Gora' },
  { name: 'Nikšić', postalCode: '81400', country: 'Crna Gora' },
  { name: 'Pljevlja', postalCode: '84210', country: 'Crna Gora' },
  { name: 'Bijelo Polje', postalCode: '84000', country: 'Crna Gora' },
  { name: 'Cetinje', postalCode: '81250', country: 'Crna Gora' },
  { name: 'Bar', postalCode: '85000', country: 'Crna Gora' },
  { name: 'Herceg Novi', postalCode: '85340', country: 'Crna Gora' },
  { name: 'Berane', postalCode: '84300', country: 'Crna Gora' },
  { name: 'Budva', postalCode: '85310', country: 'Crna Gora' },
  { name: 'Kotor', postalCode: '85330', country: 'Crna Gora' },
  
  // North Macedonia
  { name: 'Skopje', postalCode: '1000', country: 'Severna Makedonija' },
  { name: 'Bitola', postalCode: '7000', country: 'Severna Makedonija' },
  { name: 'Kumanovo', postalCode: '1300', country: 'Severna Makedonija' },
  { name: 'Prilep', postalCode: '7500', country: 'Severna Makedonija' },
  { name: 'Tetovo', postalCode: '1200', country: 'Severna Makedonija' },
  { name: 'Veles', postalCode: '1400', country: 'Severna Makedonija' },
  { name: 'Ohrid', postalCode: '6000', country: 'Severna Makedonija' },
  { name: 'Gostivar', postalCode: '1230', country: 'Severna Makedonija' },
  { name: 'Štip', postalCode: '2000', country: 'Severna Makedonija' },
  { name: 'Strumica', postalCode: '2400', country: 'Severna Makedonija' },
  
  // Slovenia
  { name: 'Ljubljana', postalCode: '1000', country: 'Slovenija' },
  { name: 'Maribor', postalCode: '2000', country: 'Slovenija' },
  { name: 'Celje', postalCode: '3000', country: 'Slovenija' },
  { name: 'Kranj', postalCode: '4000', country: 'Slovenija' },
  { name: 'Velenje', postalCode: '3320', country: 'Slovenija' },
  { name: 'Koper', postalCode: '6000', country: 'Slovenija' },
  { name: 'Novo Mesto', postalCode: '8000', country: 'Slovenija' },
  { name: 'Ptuj', postalCode: '2250', country: 'Slovenija' },
  { name: 'Kamnik', postalCode: '1241', country: 'Slovenija' },
  { name: 'Nova Gorica', postalCode: '5000', country: 'Slovenija' },
];

// Search cities by name and country
export const searchCities = (query: string, country?: string): City[] => {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return CITIES.filter(city => {
    const matchesQuery = city.name.toLowerCase().includes(normalizedQuery);
    const matchesCountry = !country || city.country === country;
    return matchesQuery && matchesCountry;
  }).slice(0, 10); // Limit to 10 results
};

// Get city by exact name and country
export const getCityByName = (name: string, country: string): City | undefined => {
  return CITIES.find(city => 
    city.name.toLowerCase() === name.toLowerCase() && 
    city.country === country
  );
};
