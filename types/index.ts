export interface Flashcard {
  id: string;
  title: string;
  question: string;
  answer: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export type CreateFlashcardInput = Omit<Flashcard, 'id' | 'created_at' | 'updated_at'>;
export type UpdateFlashcardInput = Partial<CreateFlashcardInput>;

export interface Database {
  public: {
    Tables: {
      flashcards: {
        Row: {
          id: string;
          title: string;
          question: string;
          answer: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          question: string;
          answer: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          question?: string;
          answer?: string;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
