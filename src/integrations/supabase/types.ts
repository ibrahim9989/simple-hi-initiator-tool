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
      aq10_questions: {
        Row: {
          age_group: string
          created_at: string | null
          id: string
          question_text: string
        }
        Insert: {
          age_group: string
          created_at?: string | null
          id: string
          question_text: string
        }
        Update: {
          age_group?: string
          created_at?: string | null
          id?: string
          question_text?: string
        }
        Relationships: []
      }
      assessment_questions: {
        Row: {
          age_group: string
          correct_answer: number
          created_at: string
          id: string
          options: Json
          scam_number: number
          scenario_description: string
          scenario_number: number
          scenario_title: string
          theme: string
        }
        Insert: {
          age_group: string
          correct_answer: number
          created_at?: string
          id?: string
          options: Json
          scam_number?: number
          scenario_description: string
          scenario_number: number
          scenario_title: string
          theme: string
        }
        Update: {
          age_group?: string
          correct_answer?: number
          created_at?: string
          id?: string
          options?: Json
          scam_number?: number
          scenario_description?: string
          scenario_number?: number
          scenario_title?: string
          theme?: string
        }
        Relationships: []
      }
      assessment_results: {
        Row: {
          age_group: string
          completed_at: string
          correct_answers: number
          id: string
          responses: Json
          risk_level: string
          scam_results: Json | null
          score_percentage: number
          total_questions: number
        }
        Insert: {
          age_group: string
          completed_at?: string
          correct_answers: number
          id?: string
          responses: Json
          risk_level: string
          scam_results?: Json | null
          score_percentage: number
          total_questions: number
        }
        Update: {
          age_group?: string
          completed_at?: string
          correct_answers?: number
          id?: string
          responses?: Json
          risk_level?: string
          scam_results?: Json | null
          score_percentage?: number
          total_questions?: number
        }
        Relationships: []
      }
      chat_sessions: {
        Row: {
          child_age: number | null
          created_at: string | null
          current_step: string | null
          id: string
          screening_result_id: string | null
          session_data: Json | null
          updated_at: string | null
        }
        Insert: {
          child_age?: number | null
          created_at?: string | null
          current_step?: string | null
          id?: string
          screening_result_id?: string | null
          session_data?: Json | null
          updated_at?: string | null
        }
        Update: {
          child_age?: number | null
          created_at?: string | null
          current_step?: string | null
          id?: string
          screening_result_id?: string | null
          session_data?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_screening_result_id_fkey"
            columns: ["screening_result_id"]
            isOneToOne: false
            referencedRelation: "screening_results"
            referencedColumns: ["id"]
          },
        ]
      }
      screening_results: {
        Row: {
          aq10_responses: Json
          child_age_group: string
          created_at: string | null
          id: string
          screening_result: string
          total_score: number
          updated_at: string | null
        }
        Insert: {
          aq10_responses: Json
          child_age_group: string
          created_at?: string | null
          id?: string
          screening_result: string
          total_score: number
          updated_at?: string | null
        }
        Update: {
          aq10_responses?: Json
          child_age_group?: string
          created_at?: string | null
          id?: string
          screening_result?: string
          total_score?: number
          updated_at?: string | null
        }
        Relationships: []
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
    Enums: {},
  },
} as const
