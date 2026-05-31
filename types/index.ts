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
        Row: Flashcard;
        Insert: CreateFlashcardInput;
        Update: UpdateFlashcardInput;
      };
    };
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
