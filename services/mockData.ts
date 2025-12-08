import { Load, Truck, User, UserRole, UserStatus, SubscriptionPlan, CompanyCategory } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    email: 'admin@loadboardx.com',
    name: 'System Admin',
    role: UserRole.ADMIN,
    status: UserStatus.APPROVED,
    plan: SubscriptionPlan.PRO,
    company: {
      name: 'LoadBoardX HQ',
      registrationNumber: '000000',
      category: CompanyCategory.OTHER,
      country: 'Serbia',
      city: 'Belgrade',
      address: 'Central Plaza 1',
      phone: '+381 11 000 000',
      email: 'admin@loadboardx.com'
    }
  },
  {
    id: 'u2',
    email: 'carrier@example.com',
    name: 'Marko Petrovic',
    role: UserRole.USER,
    status: UserStatus.APPROVED,
    plan: SubscriptionPlan.STANDARD,
    company: {
      name: 'Balkan Express Trans',
      registrationNumber: '12345678',
      category: CompanyCategory.CARRIER,
      country: 'Serbia',
      city: 'Novi Sad',
      address: 'Industrijska 5',
      phone: '+381 64 123 4567',
      email: 'info@balkanexpress.com'
    }
  },
  {
    id: 'u3',
    email: 'pending@example.com',
    name: 'Jovan Jovanovic',
    role: UserRole.USER,
    status: UserStatus.PENDING,
    plan: SubscriptionPlan.FREE,
    company: {
      name: 'New Logistics DOO',
      registrationNumber: '87654321',
      category: CompanyCategory.FORWARDER,
      country: 'Bosnia',
      city: 'Sarajevo',
      address: 'Glavna 10',
      phone: '+387 61 987 654',
      email: 'contact@newlogistics.ba'
    }
  }
];

export const MOCK_LOADS: Load[] = [
  {
    id: 'l1',
    userId: 'u2',
    type: 'load',
    companyName: 'Balkan Express Trans',
    originCountry: 'Serbia',
    originCity: 'Belgrade',
    destinationCountry: 'Germany',
    destinationCity: 'Munich',
    dateFrom: '2025-10-15',
    truckType: 'Tilt / Tautliner',
    capacity: '24t',
    price: 1200,
    currency: 'EUR',
    description: 'General cargo, pallets. Ready for loading from 08:00.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    views: 12,
    inquiries: 2
  },
  {
    id: 'l2',
    userId: 'u2',
    type: 'load',
    companyName: 'Balkan Express Trans',
    originCountry: 'Croatia',
    originCity: 'Zagreb',
    destinationCountry: 'Italy',
    destinationCity: 'Milan',
    dateFrom: '2025-10-16',
    truckType: 'Refrigerated',
    capacity: '20t',
    price: 950,
    currency: 'EUR',
    description: 'Frozen goods -18C.',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    views: 45,
    inquiries: 5
  },
   {
    id: 'l3',
    userId: 'u3',
    type: 'load',
    companyName: 'New Logistics DOO',
    originCountry: 'Serbia',
    originCity: 'Nis',
    destinationCountry: 'Slovenia',
    destinationCity: 'Ljubljana',
    dateFrom: '2025-10-18',
    truckType: 'Mega',
    capacity: '24t',
    price: 0,
    currency: 'EUR',
    description: 'Auto parts. Stackable.',
    createdAt: new Date(Date.now() - 8000000).toISOString(),
    views: 5,
    inquiries: 0
  }
];

export const MOCK_TRUCKS: Truck[] = [
  {
    id: 't1',
    userId: 'u2',
    type: 'truck',
    companyName: 'Balkan Express Trans',
    originCountry: 'Austria',
    originCity: 'Vienna',
    destinationCountry: 'Serbia',
    destinationCity: 'Any',
    dateFrom: '2025-10-20',
    dateTo: '2025-10-22',
    truckType: 'Tilt / Tautliner',
    capacity: '24t',
    description: 'Empty truck returning to Serbia. Flexible on destination.',
    createdAt: new Date(Date.now() - 100000).toISOString(),
    views: 8,
    inquiries: 1
  }
];