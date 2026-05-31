import { createClient } from '@supabase/supabase-js';
import { Database, Flashcard, CreateFlashcardInput, UpdateFlashcardInput } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing from environment variables.');
}

export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

/**
 * Fetches all flashcards from the Supabase database.
 * Ordered by creation timestamp descending.
 */
export async function getFlashcards(): Promise<Flashcard[]> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message || 'Failed to retrieve flashcards.');
    }

    return data || [];
  } catch (error: any) {
    console.error('getFlashcards error:', error);
    throw new Error(error.message || 'Network error: Unable to connect to Supabase.');
  }
}

/**
 * Inserts a new flashcard into the database.
 */
export async function createFlashcard(input: CreateFlashcardInput): Promise<Flashcard> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .insert([input])
      .select()
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to create flashcard.');
    }

    if (!data) {
      throw new Error('No data returned from database insert.');
    }

    return data;
  } catch (error: any) {
    console.error('createFlashcard error:', error);
    throw new Error(error.message || 'Network error: Failed to save flashcard.');
  }
}

/**
 * Updates an existing flashcard in the database.
 */
export async function updateFlashcard(
  id: string,
  input: UpdateFlashcardInput
): Promise<Flashcard> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || 'Failed to update flashcard.');
    }

    if (!data) {
      throw new Error('No data returned from database update.');
    }

    return data;
  } catch (error: any) {
    console.error('updateFlashcard error:', error);
    throw new Error(error.message || 'Network error: Failed to apply flashcard updates.');
  }
}

/**
 * Deletes a flashcard from the database by ID.
 */
export async function deleteFlashcard(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message || 'Failed to delete flashcard.');
    }
  } catch (error: any) {
    console.error('deleteFlashcard error:', error);
    throw new Error(error.message || 'Network error: Failed to remove flashcard.');
  }
}
