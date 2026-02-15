// Balkanske zemlje sa pozivnim brojevima
export const BALKAN_COUNTRIES = [
  { code: 'RS', name: 'Srbija', phoneCode: '+381' },
  { code: 'HR', name: 'Hrvatska', phoneCode: '+385' },
  { code: 'BA', name: 'Bosna i Hercegovina', phoneCode: '+387' },
  { code: 'ME', name: 'Crna Gora', phoneCode: '+382' },
  { code: 'MK', name: 'Severna Makedonija', phoneCode: '+389' },
  { code: 'SI', name: 'Slovenija', phoneCode: '+386' },
  { code: 'AL', name: 'Albanija', phoneCode: '+355' },
  { code: 'BG', name: 'Bugarska', phoneCode: '+359' },
  { code: 'RO', name: 'Rumunija', phoneCode: '+40' },
  { code: 'HU', name: 'Mađarska', phoneCode: '+36' },
  { code: 'GR', name: 'Grčka', phoneCode: '+30' },
  { code: 'TR', name: 'Turska', phoneCode: '+90' },
];

export const getPhoneCodeByCountry = (countryName: string): string => {
  const country = BALKAN_COUNTRIES.find(c => c.name === countryName);
  return country?.phoneCode || '+381';
};