import { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { validateFlashcard, FlashcardValidationError } from '../../utils/validation';
import { Flashcard } from '../../types';

interface FlashcardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: { title: string; category: string; question: string; answer: string }) => Promise<void>;
  editingCard: Flashcard | null;
  existingCards: Flashcard[];
}

export function FlashcardFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingCard,
  existingCards,
}: FlashcardFormModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState<FlashcardValidationError>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sync state with editingCard
  useEffect(() => {
    if (editingCard) {
      setTitle(editingCard.title);
      setCategory(editingCard.category);
      setQuestion(editingCard.question);
      setAnswer(editingCard.answer);
    } else {
      setTitle('');
      setCategory('');
      setQuestion('');
      setAnswer('');
    }
    setErrors({});
    setSaveError(null);
  }, [editingCard, isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);

    // 1. Validation
    const { isValid, errors: validationErrors } = validateFlashcard(
      title,
      question,
      answer,
      category
    );

    // 2. Duplicate Check
    const duplicate = existingCards.find(
      (c) =>
        c.title.toLowerCase().trim() === title.toLowerCase().trim() &&
        c.id !== editingCard?.id
    );

    const finalErrors = { ...validationErrors };
    if (duplicate) {
      finalErrors.title = 'A flashcard with this title already exists.';
    }

    if (!isValid || duplicate) {
      setErrors(finalErrors);
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        category: category.trim(),
        question: question.trim(),
        answer: answer.trim(),
      });
      onClose();
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save flashcard.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl border border-slate-100 w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all duration-300 animate-slideUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-display font-bold text-lg text-slate-800">
            {editingCard ? 'Edit Flashcard' : 'Create Flashcard'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
          {saveError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl text-sm font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>{saveError}</p>
            </div>
          )}

          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dijkstra's Algorithm"
              disabled={isSaving}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:outline-none transition-all ${
                errors.title ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/20'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Computer Science"
              disabled={isSaving}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:outline-none transition-all ${
                errors.category ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/20'
              }`}
            />
            {errors.category && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Question */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What is Dijkstra's algorithm used for?"
              rows={3}
              disabled={isSaving}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:outline-none transition-all resize-none ${
                errors.question ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/20'
              }`}
            />
            {errors.question && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.question}
              </p>
            )}
          </div>

          {/* Answer */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="It is a graph search algorithm that finds the shortest path between nodes."
              rows={3}
              disabled={isSaving}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:outline-none transition-all resize-none ${
                errors.answer ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/20'
              }`}
            />
            {errors.answer && (
              <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.answer}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 active:scale-95"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : editingCard ? (
                'Save Changes'
              ) : (
                'Create Flashcard'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
