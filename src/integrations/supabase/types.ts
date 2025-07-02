export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      affiliate_links: {
        Row: {
          affiliate_url: string
          clicks: number | null
          conversions: number | null
          created_at: string | null
          id: string
          original_url: string
          program_id: string
          revenue: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          affiliate_url: string
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          id?: string
          original_url: string
          program_id: string
          revenue?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          affiliate_url?: string
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          id?: string
          original_url?: string
          program_id?: string
          revenue?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_links_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "affiliate_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_programs: {
        Row: {
          commission_rate: number
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          name: string
          platform: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          commission_rate: number
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          name: string
          platform: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          commission_rate?: number
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          platform?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      analytics: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          platform: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          platform?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          platform?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      api_credentials: {
        Row: {
          access_token: string | null
          additional_fields: Json | null
          api_key: string
          created_at: string | null
          id: string
          last_tested: string | null
          name: string
          platform: string
          refresh_token: string | null
          secret_key: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          additional_fields?: Json | null
          api_key: string
          created_at?: string | null
          id?: string
          last_tested?: string | null
          name: string
          platform: string
          refresh_token?: string | null
          secret_key?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          additional_fields?: Json | null
          api_key?: string
          created_at?: string | null
          id?: string
          last_tested?: string | null
          name?: string
          platform?: string
          refresh_token?: string | null
          secret_key?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      guest_reviews: {
        Row: {
          created_at: string
          email: string | null
          guest_name: string
          id: string
          image_url: string | null
          is_approved: boolean | null
          rating: number
          review_text: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          guest_name: string
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          rating: number
          review_text: string
        }
        Update: {
          created_at?: string
          email?: string | null
          guest_name?: string
          id?: string
          image_url?: string | null
          is_approved?: boolean | null
          rating?: number
          review_text?: string
        }
        Relationships: []
      }
      hotel_rooms: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_available: boolean | null
          price: number
          room_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean | null
          price: number
          room_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean | null
          price?: number
          room_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          additional_info: string | null
          alcohol_percentage: string | null
          category: string
          created_at: string
          description: string | null
          id: string
          is_available: boolean | null
          name: string
          price: number
          sort_order: number | null
          updated_at: string
          volume: string | null
        }
        Insert: {
          additional_info?: string | null
          alcohol_percentage?: string | null
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean | null
          name: string
          price: number
          sort_order?: number | null
          updated_at?: string
          volume?: string | null
        }
        Update: {
          additional_info?: string | null
          alcohol_percentage?: string | null
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean | null
          name?: string
          price?: number
          sort_order?: number | null
          updated_at?: string
          volume?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      restaurant_images: {
        Row: {
          caption: string | null
          category: string | null
          created_at: string
          id: string
          image_url: string
          is_active: boolean | null
          uploaded_by: string | null
        }
        Insert: {
          caption?: string | null
          category?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_active?: boolean | null
          uploaded_by?: string | null
        }
        Update: {
          caption?: string | null
          category?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_active?: boolean | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      restaurant_info: {
        Row: {
          content: string
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          content: string
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          content?: string
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      special_events: {
        Row: {
          booking_phone: string | null
          created_at: string
          current_participants: number | null
          description: string | null
          end_time: string | null
          event_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          max_participants: number | null
          price: number | null
          requires_booking: boolean | null
          start_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          booking_phone?: string | null
          created_at?: string
          current_participants?: number | null
          description?: string | null
          end_time?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          max_participants?: number | null
          price?: number | null
          requires_booking?: boolean | null
          start_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          booking_phone?: string | null
          created_at?: string
          current_participants?: number | null
          description?: string | null
          end_time?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          max_participants?: number | null
          price?: number | null
          requires_booking?: boolean | null
          start_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          category: string
          display_name: string
          id: string
          setting_key: string
          setting_type: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          category?: string
          display_name: string
          id?: string
          setting_key: string
          setting_type?: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          category?: string
          display_name?: string
          id?: string
          setting_key?: string
          setting_type?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      promote_first_admin: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      user_role: "admin" | "user" | "affiliate"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "user", "affiliate"],
    },
  },
} as const
