import { supabase } from '../lib/supabase'
import { Load, Truck, User as AppUser, CreateLoadData, CreateTruckData } from '../types'

export class SupabaseService {
  // Loads
  static async getLoads(): Promise<Load[]> {
    const { data, error } = await supabase
      .from('loads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map(load => ({
      id: load.id,
      userId: load.user_id,
      type: 'load' as const,
      companyName: load.company_name,
      originCountry: load.origin_country,
      originCity: load.origin_city,
      destinationCountry: load.destination_country,
      destinationCity: load.destination_city,
      dateFrom: load.date_from,
      dateTo: load.date_to,
      truckType: load.truck_type,
      capacity: load.capacity,
      price: load.price,
      currency: load.currency,
      description: load.description,
      views: load.views,
      inquiries: load.inquiries,
      createdAt: load.created_at,
    }))
  }

  static async createLoad(userId: string, companyName: string, data: CreateLoadData): Promise<Load> {
    const { data: result, error } = await supabase
      .from('loads')
      .insert({
        user_id: userId,
        company_name: companyName,
        origin_country: data.originCountry,
        origin_city: data.originCity,
        destination_country: data.destinationCountry,
        destination_city: data.destinationCity,
        date_from: data.dateFrom,
        date_to: data.dateTo,
        truck_type: data.truckType,
        capacity: data.capacity,
        price: data.price,
        currency: data.currency,
        description: data.description,
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: result.id,
      userId: result.user_id,
      type: 'load',
      companyName: result.company_name,
      originCountry: result.origin_country,
      originCity: result.origin_city,
      destinationCountry: result.destination_country,
      destinationCity: result.destination_city,
      dateFrom: result.date_from,
      dateTo: result.date_to,
      truckType: result.truck_type,
      capacity: result.capacity,
      price: result.price,
      currency: result.currency,
      description: result.description,
      views: result.views,
      inquiries: result.inquiries,
      createdAt: result.created_at,
    }
  }

  // Trucks
  static async getTrucks(): Promise<Truck[]> {
    const { data, error } = await supabase
      .from('trucks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map(truck => ({
      id: truck.id,
      userId: truck.user_id,
      type: 'truck' as const,
      companyName: truck.company_name,
      originCountry: truck.origin_country,
      originCity: truck.origin_city,
      destinationCountry: truck.destination_country,
      destinationCity: truck.destination_city,
      dateFrom: truck.date_from,
      dateTo: truck.date_to,
      truckType: truck.truck_type,
      capacity: truck.capacity,
      description: truck.description,
      views: truck.views,
      inquiries: truck.inquiries,
      createdAt: truck.created_at,
    }))
  }

  static async createTruck(userId: string, companyName: string, data: CreateTruckData): Promise<Truck> {
    const { data: result, error } = await supabase
      .from('trucks')
      .insert({
        user_id: userId,
        company_name: companyName,
        origin_country: data.originCountry,
        origin_city: data.originCity,
        destination_country: data.destinationCountry,
        destination_city: data.destinationCity,
        date_from: data.dateFrom,
        date_to: data.dateTo,
        truck_type: data.truckType,
        capacity: data.capacity,
        description: data.description,
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: result.id,
      userId: result.user_id,
      type: 'truck',
      companyName: result.company_name,
      originCountry: result.origin_country,
      originCity: result.origin_city,
      destinationCountry: result.destination_country,
      destinationCity: result.destination_city,
      dateFrom: result.date_from,
      dateTo: result.date_to,
      truckType: result.truck_type,
      capacity: result.capacity,
      description: result.description,
      views: result.views,
      inquiries: result.inquiries,
      createdAt: result.created_at,
    }
  }

  // Users (for admin)
  static async getPendingUsers(): Promise<AppUser[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Fetch company data separately for each user
    const usersWithCompanies = await Promise.all(
      data.map(async (user) => {
        const { data: companyData } = await supabase
          .from('companies')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle()

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          plan: user.plan,
          rejectionReason: user.rejection_reason,
          jobTitle: user.job_title,
          directPhone: user.direct_phone,
          mobilePhone: user.mobile_phone,
          phoneCountryCode: user.phone_country_code,
          company: companyData ? {
            name: companyData.name,
            registrationNumber: companyData.registration_number,
            category: companyData.category,
            country: companyData.country,
            city: companyData.city,
            address: companyData.address,
            phone: companyData.phone,
            phoneCountryCode: companyData.phone_country_code,
            email: companyData.email,
            fax: companyData.fax,
            faxCountryCode: companyData.fax_country_code,
            website: companyData.website,
          } : undefined
        }
      })
    )

    return usersWithCompanies
  }

  static async getAllUsers(): Promise<AppUser[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Fetch company data separately for each user
    const usersWithCompanies = await Promise.all(
      data.map(async (user) => {
        const { data: companyData } = await supabase
          .from('companies')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle()

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          plan: user.plan,
          rejectionReason: user.rejection_reason,
          jobTitle: user.job_title,
          directPhone: user.direct_phone,
          mobilePhone: user.mobile_phone,
          phoneCountryCode: user.phone_country_code,
          company: companyData ? {
            name: companyData.name,
            registrationNumber: companyData.registration_number,
            category: companyData.category,
            country: companyData.country,
            city: companyData.city,
            address: companyData.address,
            phone: companyData.phone,
            phoneCountryCode: companyData.phone_country_code,
            email: companyData.email,
            fax: companyData.fax,
            faxCountryCode: companyData.fax_country_code,
            website: companyData.website,
          } : undefined
        }
      })
    )

    return usersWithCompanies
  }

  static async updateUserStatus(userId: string, status: 'approved' | 'rejected', approvedBy: string, rejectionReason?: string): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({
        status,
        approved_by: status === 'approved' ? approvedBy : null,
        approved_at: status === 'approved' ? new Date().toISOString() : null,
        rejection_reason: status === 'rejected' ? rejectionReason : null,
      })
      .eq('id', userId)

    if (error) throw error

    // Get user email for notifications
    const { data: userData } = await supabase
      .from('profiles')
      .select('email, name')
      .eq('id', userId)
      .single()

    if (!userData) return

    // Send email notification
    try {
      if (status === 'approved') {
        // Send approval email using Supabase Auth
        await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: userData.email,
          options: {
            redirectTo: `${window.location.origin}/#/login?approved=true`
          }
        })
        
        console.log(`Approval email sent to ${userData.email}`)
      } else if (status === 'rejected') {
        // For rejection, we'll use a simple approach since we can't send custom emails easily
        // In a real app, you'd use a proper email service like SendGrid, Mailgun, etc.
        console.log(`User ${userData.email} was rejected - in production, send rejection email here`)
        
        const reasonText = rejectionReason ? `\n\nRazlog odbijanja: ${rejectionReason}` : '';
        
        // You could also use Supabase Edge Functions to send custom emails
        // For now, we'll just log it
        alert(`Korisnik ${userData.name} (${userData.email}) je odbačen.${reasonText}\n\nU produkciji bi mu bio poslat email o odbacivanju sa razlogom.`)
      }
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError)
      // Don't throw error - user status is still updated even if email fails
    }
  }

  static async updateUserPlan(userId: string, plan: 'free' | 'standard' | 'pro'): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({ plan })
      .eq('id', userId)

    if (error) throw error
  }

  static async deleteUser(userId: string): Promise<void> {
    try {
      console.log('Deleting user completely (auth + profile):', userId);
      
      // Use the PostgreSQL function to completely delete the user
      const { data, error } = await supabase.rpc('admin_delete_user', {
        target_user_id: userId
      });
      
      if (error) {
        console.error('Error calling admin_delete_user:', error);
        throw error;
      }
      
      console.log('User deleted completely:', data);
      
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  }

  // Increment view count
  static async incrementViews(type: 'loads' | 'trucks', id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_views', {
      table_name: type,
      row_id: id
    })

    if (error) {
      // Fallback if RPC doesn't exist
      const { data, error: fetchError } = await supabase
        .from(type)
        .select('views')
        .eq('id', id)
        .single()

      if (fetchError) return

      const { error: updateError } = await supabase
        .from(type)
        .update({ views: (data.views || 0) + 1 })
        .eq('id', id)

      if (updateError) console.error('Error incrementing views:', updateError)
    }
  }

  // Add test data for development
  static async addTestData(): Promise<void> {
    // Add test loads
    const testLoads = [
      {
        user_id: '00000000-0000-0000-0000-000000000001', // Will be replaced with real admin ID
        company_name: 'TeretLink Transport',
        origin_country: 'Srbija',
        origin_city: 'Beograd',
        destination_country: 'Nemačka',
        destination_city: 'Berlin',
        date_from: '2025-01-15',
        date_to: '2025-01-17',
        truck_type: 'Mega trailer',
        capacity: '24 paleta',
        price: 1200,
        currency: 'EUR',
        description: 'Potreban mega trailer za transport robe iz Beograda do Berlina. Roba je pakovana na 24 palete.',
        views: 15,
        inquiries: 3
      },
      {
        user_id: '00000000-0000-0000-0000-000000000001',
        company_name: 'Balkan Logistics',
        origin_country: 'Srbija',
        origin_city: 'Novi Sad',
        destination_country: 'Austrija',
        destination_city: 'Beč',
        date_from: '2025-01-20',
        date_to: '2025-01-22',
        truck_type: 'Hladnjača',
        capacity: '20 tona',
        price: 800,
        currency: 'EUR',
        description: 'Transport zamrznutih proizvoda. Potrebna hladnjača sa temperaturom -18°C.',
        views: 8,
        inquiries: 1
      },
      {
        user_id: '00000000-0000-0000-0000-000000000001',
        company_name: 'Express Cargo',
        origin_country: 'Srbija',
        origin_city: 'Niš',
        destination_country: 'Italija',
        destination_city: 'Milano',
        date_from: '2025-01-25',
        date_to: '2025-01-27',
        truck_type: 'Cerada',
        capacity: '22 palete',
        price: 950,
        currency: 'EUR',
        description: 'Hitna pošiljka tekstila. Potreban pouzdan prevoznik.',
        views: 22,
        inquiries: 5
      }
    ];

    // Add test trucks
    const testTrucks = [
      {
        user_id: '00000000-0000-0000-0000-000000000001',
        company_name: 'Miloš Transport',
        origin_country: 'Srbija',
        origin_city: 'Kragujevac',
        destination_country: 'Francuska',
        destination_city: 'Pariz',
        date_from: '2025-01-18',
        date_to: '2025-01-20',
        truck_type: 'Mega trailer',
        capacity: '24 palete',
        description: 'Slobodan mega trailer vraća se iz Pariza. Mogu da primim teret za povratak.',
        views: 12,
        inquiries: 2
      },
      {
        user_id: '00000000-0000-0000-0000-000000000001',
        company_name: 'Danube Shipping',
        origin_country: 'Srbija',
        origin_city: 'Pančevo',
        destination_country: 'Holandija',
        destination_city: 'Amsterdam',
        date_from: '2025-01-22',
        date_to: '2025-01-24',
        truck_type: 'Hladnjača',
        capacity: '18 tona',
        description: 'Hladnjača slobodna za transport. Temperatura od -25°C do +25°C.',
        views: 18,
        inquiries: 4
      },
      {
        user_id: '00000000-0000-0000-0000-000000000001',
        company_name: 'Sava Logistics',
        origin_country: 'Srbija',
        origin_city: 'Subotica',
        destination_country: 'Mađarska',
        destination_city: 'Budimpešta',
        date_from: '2025-01-16',
        date_to: '2025-01-17',
        truck_type: 'Cerada',
        capacity: '20 paleta',
        description: 'Kratka relacija, brza dostava. Iskusni vozač.',
        views: 9,
        inquiries: 1
      }
    ];

    try {
      // Get the first admin user ID to use for test data
      const { data: adminUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .eq('status', 'approved')
        .limit(1)
        .single();

      if (!adminUser) {
        console.log('No admin user found, skipping test data creation');
        return;
      }

      // Update test data with real admin ID
      const loadsWithRealId = testLoads.map(load => ({
        ...load,
        user_id: adminUser.id
      }));

      const trucksWithRealId = testTrucks.map(truck => ({
        ...truck,
        user_id: adminUser.id
      }));

      // Insert test loads
      const { error: loadsError } = await supabase
        .from('loads')
        .insert(loadsWithRealId);

      if (loadsError) {
        console.error('Error inserting test loads:', loadsError);
      } else {
        console.log('Test loads inserted successfully');
      }

      // Insert test trucks
      const { error: trucksError } = await supabase
        .from('trucks')
        .insert(trucksWithRealId);

      if (trucksError) {
        console.error('Error inserting test trucks:', trucksError);
      } else {
        console.log('Test trucks inserted successfully');
      }

    } catch (error) {
      console.error('Error adding test data:', error);
    }
  }
}