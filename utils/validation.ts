export interface FlashcardValidationError {
  title?: string;
  question?: string;
  answer?: string;
  category?: string;
}

/**
 * Validates flashcard creation and editing input fields.
 * Rules:
 * - Title: Required, max 150 characters.
 * - Question: Required.
 * - Answer: Required.
 * - Category: Required.
 */
export function validateFlashcard(
  title: string,
  question: string,
  answer: string,
  category: string
): { isValid: boolean; errors: FlashcardValidationError } {
  const errors: FlashcardValidationError = {};

  // Title validation
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    errors.title = 'Title is required.';
  } else if (trimmedTitle.length > 150) {
    errors.title = 'Title must be 150 characters or less.';
  }

  // Question validation
  if (!question.trim()) {
    errors.question = 'Question is required.';
  }

  // Answer validation
  if (!answer.trim()) {
    errors.answer = 'Answer is required.';
  }

  // Category validation
  if (!category.trim()) {
    errors.category = 'Category is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
