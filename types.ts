export enum UserRole {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum SubscriptionPlan {
  FREE = 'free',
  STANDARD = 'standard',
  PRO = 'pro',
}

export enum CompanyCategory {
  CARRIER = 'Transportna firma / Autoprevoznik',
  FORWARDER = 'Špediterska firma / Špediter',
  LOGISTICS = 'Transportna / Špediterska firma / Logistička firma',
  MANUFACTURER = 'Trgovinska firma / Proizvođač',
  IMPORTER_EXPORTER = 'Trgovinska firma / Uvoznik, izvoznik',
  MOVING = 'Firme za prevoz i selidbe robe',
  OTHER = 'Drugo',
}

export interface PersonalContact {
  jobTitle?: string;
  directPhone?: string;
  mobilePhone?: string;
  phoneCountryCode?: string;
}

export interface Company {
  name: string;
  registrationNumber: string;
  category: CompanyCategory;
  country: string;
  city: string;
  address: string;
  phone: string;
  phoneCountryCode?: string;
  email: string;
  fax?: string;
  faxCountryCode?: string;
  website?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  plan: SubscriptionPlan;
  company?: Company;
  rejectionReason?: string;
  // Personal contact info
  jobTitle?: string;
  directPhone?: string;
  mobilePhone?: string;
  phoneCountryCode?: string;
}

export interface Listing {
  id: string;
  userId: string;
  companyName: string;
  createdAt: string;
  
  // Origin
  originCountry: string;
  originCity: string;
  
  // Destination (for loads) or current location (for trucks)
  destinationCountry?: string;
  destinationCity?: string;
  
  // Dates
  dateFrom: string;
  dateTo?: string; // Optional for trucks availability range

  // Specs
  truckType: string;
  capacity?: string; // Weight or dimensions
  price?: number;
  currency?: string;
  description?: string;
  
  // Meta
  views: number;
  inquiries: number;
}

export interface Load extends Listing {
  type: 'load';
}

export interface Truck extends Listing {
  type: 'truck';
}

// Helper types for forms
export type CreateLoadData = Omit<Load, 'id' | 'userId' | 'createdAt' | 'companyName' | 'views' | 'inquiries' | 'type'>;
export type CreateTruckData = Omit<Truck, 'id' | 'userId' | 'createdAt' | 'companyName' | 'views' | 'inquiries' | 'type'>;
