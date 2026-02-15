import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: 'user' | 'admin'
          status: 'pending' | 'approved' | 'rejected'
          plan: 'free' | 'standard' | 'pro'
          created_at: string
          updated_at: string
          approved_by: string | null
          approved_at: string | null
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: 'user' | 'admin'
          status?: 'pending' | 'approved' | 'rejected'
          plan?: 'free' | 'standard' | 'pro'
          created_at?: string
          updated_at?: string
          approved_by?: string | null
          approved_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'user' | 'admin'
          status?: 'pending' | 'approved' | 'rejected'
          plan?: 'free' | 'standard' | 'pro'
          created_at?: string
          updated_at?: string
          approved_by?: string | null
          approved_at?: string | null
        }
      }
      companies: {
        Row: {
          id: string
          user_id: string
          name: string
          registration_number: string
          category: 'Transport Company / Carrier' | 'Freight Forwarder' | 'Trading Company' | 'Other'
          country: string
          city: string
          address: string
          phone: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          registration_number: string
          category: 'Transport Company / Carrier' | 'Freight Forwarder' | 'Trading Company' | 'Other'
          country: string
          city: string
          address: string
          phone: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          registration_number?: string
          category?: 'Transport Company / Carrier' | 'Freight Forwarder' | 'Trading Company' | 'Other'
          country?: string
          city?: string
          address?: string
          phone?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      loads: {
        Row: {
          id: string
          user_id: string
          company_name: string
          origin_country: string
          origin_city: string
          destination_country: string | null
          destination_city: string | null
          date_from: string
          date_to: string | null
          truck_type: string
          capacity: string | null
          price: number | null
          currency: string | null
          description: string | null
          views: number
          inquiries: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          origin_country: string
          origin_city: string
          destination_country?: string | null
          destination_city?: string | null
          date_from: string
          date_to?: string | null
          truck_type: string
          capacity?: string | null
          price?: number | null
          currency?: string | null
          description?: string | null
          views?: number
          inquiries?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          origin_country?: string
          origin_city?: string
          destination_country?: string | null
          destination_city?: string | null
          date_from?: string
          date_to?: string | null
          truck_type?: string
          capacity?: string | null
          price?: number | null
          currency?: string | null
          description?: string | null
          views?: number
          inquiries?: number
          created_at?: string
          updated_at?: string
        }
      }
      trucks: {
        Row: {
          id: string
          user_id: string
          company_name: string
          origin_country: string
          origin_city: string
          destination_country: string | null
          destination_city: string | null
          date_from: string
          date_to: string | null
          truck_type: string
          capacity: string | null
          description: string | null
          views: number
          inquiries: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          origin_country: string
          origin_city: string
          destination_country?: string | null
          destination_city?: string | null
          date_from: string
          date_to?: string | null
          truck_type: string
          capacity?: string | null
          description?: string | null
          views?: number
          inquiries?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          origin_country?: string
          origin_city?: string
          destination_country?: string | null
          destination_city?: string | null
          date_from?: string
          date_to?: string | null
          truck_type?: string
          capacity?: string | null
          description?: string | null
          views?: number
          inquiries?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}