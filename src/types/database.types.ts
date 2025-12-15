export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      airlines: {
        Row: {
          country: string | null
          created_at: string | null
          iata_code: string | null
          icao_code: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          iata_code?: string | null
          icao_code?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
        }
        Update: {
          country?: string | null
          created_at?: string | null
          iata_code?: string | null
          icao_code?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      airports: {
        Row: {
          city: string
          country: string
          country_code: string | null
          created_at: string | null
          iata_code: string
          icao_code: string | null
          id: string
          is_active: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          timezone: string | null
        }
        Insert: {
          city: string
          country: string
          country_code?: string | null
          created_at?: string | null
          iata_code: string
          icao_code?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          timezone?: string | null
        }
        Update: {
          city?: string
          country?: string
          country_code?: string | null
          created_at?: string | null
          iata_code?: string
          icao_code?: string | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          timezone?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          request_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          request_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          request_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_requests: {
        Row: {
          booking_id: string
          completed_at: string | null
          created_at: string | null
          fee_amount: number | null
          id: string
          new_departure_date: string | null
          new_flight_details: Json | null
          new_return_date: string | null
          operator_notes: string | null
          price_difference: number | null
          processed_at: string | null
          processed_by: string | null
          reason: string | null
          refund_amount: number | null
          request_type: Database["public"]["Enums"]["request_type"]
          requested_by: string | null
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string | null
        }
        Insert: {
          booking_id: string
          completed_at?: string | null
          created_at?: string | null
          fee_amount?: number | null
          id?: string
          new_departure_date?: string | null
          new_flight_details?: Json | null
          new_return_date?: string | null
          operator_notes?: string | null
          price_difference?: number | null
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          refund_amount?: number | null
          request_type: Database["public"]["Enums"]["request_type"]
          requested_by?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string | null
        }
        Update: {
          booking_id?: string
          completed_at?: string | null
          created_at?: string | null
          fee_amount?: number | null
          id?: string
          new_departure_date?: string | null
          new_flight_details?: Json | null
          new_return_date?: string | null
          operator_notes?: string | null
          price_difference?: number | null
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          refund_amount?: number | null
          request_type?: Database["public"]["Enums"]["request_type"]
          requested_by?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_requests_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          amadeus_order_id: string | null
          base_price: number
          booking_reference: string
          cabin_class: Database["public"]["Enums"]["cabin_class"] | null
          cancellation_reason: string | null
          cancelled_at: string | null
          clinic_appointment_id: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          currency: string | null
          fare_class: string | null
          fare_rules: Json | null
          fees: number | null
          flight_search_id: string | null
          id: string
          outbound_airline_code: string
          outbound_airline_name: string | null
          outbound_arrival_datetime: string
          outbound_departure_datetime: string
          outbound_destination: string
          outbound_duration_minutes: number | null
          outbound_flight_number: string
          outbound_origin: string
          outbound_stops: number | null
          patient_id: string | null
          pnr: string | null
          return_airline_code: string | null
          return_airline_name: string | null
          return_arrival_datetime: string | null
          return_departure_datetime: string | null
          return_destination: string | null
          return_duration_minutes: number | null
          return_flight_number: string | null
          return_origin: string | null
          return_stops: number | null
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"]
          taxes: number | null
          ticketed_at: string | null
          total_price: number
          trip_type: Database["public"]["Enums"]["trip_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amadeus_order_id?: string | null
          base_price: number
          booking_reference: string
          cabin_class?: Database["public"]["Enums"]["cabin_class"] | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          clinic_appointment_id?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          currency?: string | null
          fare_class?: string | null
          fare_rules?: Json | null
          fees?: number | null
          flight_search_id?: string | null
          id?: string
          outbound_airline_code: string
          outbound_airline_name?: string | null
          outbound_arrival_datetime: string
          outbound_departure_datetime: string
          outbound_destination: string
          outbound_duration_minutes?: number | null
          outbound_flight_number: string
          outbound_origin: string
          outbound_stops?: number | null
          patient_id?: string | null
          pnr?: string | null
          return_airline_code?: string | null
          return_airline_name?: string | null
          return_arrival_datetime?: string | null
          return_departure_datetime?: string | null
          return_destination?: string | null
          return_duration_minutes?: number | null
          return_flight_number?: string | null
          return_origin?: string | null
          return_stops?: number | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          taxes?: number | null
          ticketed_at?: string | null
          total_price: number
          trip_type: Database["public"]["Enums"]["trip_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amadeus_order_id?: string | null
          base_price?: number
          booking_reference?: string
          cabin_class?: Database["public"]["Enums"]["cabin_class"] | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          clinic_appointment_id?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          currency?: string | null
          fare_class?: string | null
          fare_rules?: Json | null
          fees?: number | null
          flight_search_id?: string | null
          id?: string
          outbound_airline_code?: string
          outbound_airline_name?: string | null
          outbound_arrival_datetime?: string
          outbound_departure_datetime?: string
          outbound_destination?: string
          outbound_duration_minutes?: number | null
          outbound_flight_number?: string
          outbound_origin?: string
          outbound_stops?: number | null
          patient_id?: string | null
          pnr?: string | null
          return_airline_code?: string | null
          return_airline_name?: string | null
          return_arrival_datetime?: string | null
          return_departure_datetime?: string | null
          return_destination?: string | null
          return_duration_minutes?: number | null
          return_flight_number?: string | null
          return_origin?: string | null
          return_stops?: number | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          taxes?: number | null
          ticketed_at?: string | null
          total_price?: number
          trip_type?: Database["public"]["Enums"]["trip_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_clinic_appointment_id_fkey"
            columns: ["clinic_appointment_id"]
            isOneToOne: false
            referencedRelation: "clinic_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_flight_search_id_fkey"
            columns: ["flight_search_id"]
            isOneToOne: false
            referencedRelation: "flight_searches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      clinic_appointments: {
        Row: {
          appointment_date: string
          appointment_time: string | null
          clinic_id: string | null
          created_at: string | null
          id: string
          is_confirmed: boolean | null
          notes: string | null
          patient_id: string | null
          treatment_type: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time?: string | null
          clinic_id?: string | null
          created_at?: string | null
          id?: string
          is_confirmed?: boolean | null
          notes?: string | null
          patient_id?: string | null
          treatment_type?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string | null
          clinic_id?: string | null
          created_at?: string | null
          id?: string
          is_confirmed?: boolean | null
          notes?: string | null
          patient_id?: string | null
          treatment_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clinic_appointments_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinic_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      clinics: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          specializations: string[] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          specializations?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          specializations?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      flight_searches: {
        Row: {
          adults_count: number
          cabin_class: Database["public"]["Enums"]["cabin_class"] | null
          children_count: number | null
          clinic_appointment_id: string | null
          created_at: string | null
          departure_date: string
          destination_airport_code: string
          destination_city: string
          id: string
          infants_count: number | null
          origin_airport_code: string
          origin_city: string
          results_count: number | null
          return_date: string | null
          search_duration_ms: number | null
          search_results: Json | null
          session_id: string | null
          trip_type: Database["public"]["Enums"]["trip_type"]
          user_id: string | null
        }
        Insert: {
          adults_count?: number
          cabin_class?: Database["public"]["Enums"]["cabin_class"] | null
          children_count?: number | null
          clinic_appointment_id?: string | null
          created_at?: string | null
          departure_date: string
          destination_airport_code: string
          destination_city: string
          id?: string
          infants_count?: number | null
          origin_airport_code: string
          origin_city: string
          results_count?: number | null
          return_date?: string | null
          search_duration_ms?: number | null
          search_results?: Json | null
          session_id?: string | null
          trip_type?: Database["public"]["Enums"]["trip_type"]
          user_id?: string | null
        }
        Update: {
          adults_count?: number
          cabin_class?: Database["public"]["Enums"]["cabin_class"] | null
          children_count?: number | null
          clinic_appointment_id?: string | null
          created_at?: string | null
          departure_date?: string
          destination_airport_code?: string
          destination_city?: string
          id?: string
          infants_count?: number | null
          origin_airport_code?: string
          origin_city?: string
          results_count?: number | null
          return_date?: string | null
          search_duration_ms?: number | null
          search_results?: Json | null
          session_id?: string | null
          trip_type?: Database["public"]["Enums"]["trip_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flight_searches_clinic_appointment_id_fkey"
            columns: ["clinic_appointment_id"]
            isOneToOne: false
            referencedRelation: "clinic_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flight_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      passengers: {
        Row: {
          booking_id: string
          created_at: string | null
          date_of_birth: string
          email: string | null
          first_name: string
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          is_primary: boolean | null
          last_name: string
          nationality: string | null
          passenger_type: Database["public"]["Enums"]["passenger_type"]
          passport_country: string | null
          passport_expiry_date: string | null
          passport_number: string | null
          phone: string | null
          seat_outbound: string | null
          seat_return: string | null
          ticket_number: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          booking_id: string
          created_at?: string | null
          date_of_birth: string
          email?: string | null
          first_name: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          is_primary?: boolean | null
          last_name: string
          nationality?: string | null
          passenger_type?: Database["public"]["Enums"]["passenger_type"]
          passport_country?: string | null
          passport_expiry_date?: string | null
          passport_number?: string | null
          phone?: string | null
          seat_outbound?: string | null
          seat_return?: string | null
          ticket_number?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          date_of_birth?: string
          email?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          is_primary?: boolean | null
          last_name?: string
          nationality?: string | null
          passenger_type?: Database["public"]["Enums"]["passenger_type"]
          passport_country?: string | null
          passport_expiry_date?: string | null
          passport_number?: string | null
          phone?: string | null
          seat_outbound?: string | null
          seat_return?: string | null
          ticket_number?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          medical_notes: string | null
          nationality: string | null
          passport_country: string | null
          passport_expiry_date: string | null
          passport_number: string | null
          postal_code: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          medical_notes?: string | null
          nationality?: string | null
          passport_country?: string | null
          passport_expiry_date?: string | null
          passport_number?: string | null
          postal_code?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          medical_notes?: string | null
          nationality?: string | null
          passport_country?: string | null
          passport_expiry_date?: string | null
          passport_number?: string | null
          postal_code?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          currency: string | null
          failed_at: string | null
          failure_reason: string | null
          id: string
          invoice_url: string | null
          metadata: Json | null
          payment_method: string | null
          processed_at: string | null
          provider: string
          provider_customer_id: string | null
          provider_payment_id: string | null
          provider_payment_method_id: string | null
          receipt_url: string | null
          refund_reason: string | null
          refunded_amount: number | null
          refunded_at: string | null
          requires_3ds: boolean | null
          status: Database["public"]["Enums"]["payment_status"]
          three_ds_status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          invoice_url?: string | null
          metadata?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          provider: string
          provider_customer_id?: string | null
          provider_payment_id?: string | null
          provider_payment_method_id?: string | null
          receipt_url?: string | null
          refund_reason?: string | null
          refunded_amount?: number | null
          refunded_at?: string | null
          requires_3ds?: boolean | null
          status?: Database["public"]["Enums"]["payment_status"]
          three_ds_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          failed_at?: string | null
          failure_reason?: string | null
          id?: string
          invoice_url?: string | null
          metadata?: Json | null
          payment_method?: string | null
          processed_at?: string | null
          provider?: string
          provider_customer_id?: string | null
          provider_payment_id?: string | null
          provider_payment_method_id?: string | null
          receipt_url?: string | null
          refund_reason?: string | null
          refunded_amount?: number | null
          refunded_at?: string | null
          requires_3ds?: boolean | null
          status?: Database["public"]["Enums"]["payment_status"]
          three_ds_status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          language_preference:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean | null
          language_preference?:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          language_preference?:
            | Database["public"]["Enums"]["language_preference"]
            | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_reference: { Args: never; Returns: string }
      log_audit_event: {
        Args: {
          p_action: string
          p_entity_id: string
          p_entity_type: string
          p_metadata?: Json
          p_new_values?: Json
          p_old_values?: Json
          p_user_id: string
        }
        Returns: string
      }
      suggest_arrival_date: {
        Args: { appointment_date: string }
        Returns: string
      }
      suggest_departure_date: {
        Args: { appointment_date: string; days_after?: number }
        Returns: string
      }
    }
    Enums: {
      booking_status:
        | "pending"
        | "confirmed"
        | "ticketed"
        | "cancelled"
        | "refunded"
        | "changed"
      cabin_class: "economy" | "premium_economy" | "business" | "first"
      gender: "male" | "female" | "other"
      language_preference: "en" | "ar" | "ru" | "tr"
      passenger_type: "adult" | "child" | "infant"
      payment_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "refunded"
        | "partially_refunded"
      request_status:
        | "pending"
        | "processing"
        | "approved"
        | "rejected"
        | "completed"
      request_type: "change" | "cancel" | "refund"
      trip_type: "one_way" | "round_trip"
      user_role: "patient" | "operator" | "admin" | "clinic_partner"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: [
        "pending",
        "confirmed",
        "ticketed",
        "cancelled",
        "refunded",
        "changed",
      ],
      cabin_class: ["economy", "premium_economy", "business", "first"],
      gender: ["male", "female", "other"],
      language_preference: ["en", "ar", "ru", "tr"],
      passenger_type: ["adult", "child", "infant"],
      payment_status: [
        "pending",
        "processing",
        "completed",
        "failed",
        "refunded",
        "partially_refunded",
      ],
      request_status: [
        "pending",
        "processing",
        "approved",
        "rejected",
        "completed",
      ],
      request_type: ["change", "cancel", "refund"],
      trip_type: ["one_way", "round_trip"],
      user_role: ["patient", "operator", "admin", "clinic_partner"],
    },
  },
} as const

