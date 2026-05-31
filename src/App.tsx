import React, { useState, useEffect } from 'react';
import { Brain, Database, Plus, Trash2, Edit2, Loader2, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { getFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '../services/supabase';
import { validateFlashcard, FlashcardValidationError } from '../utils/validation';
import { truncateText, formatDate } from '../utils/helpers';
import { Flashcard } from '../types';

function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string | null>(null);
  
  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
  // Editing state
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  
  // Form validation errors
  const [errors, setErrors] = useState<FlashcardValidationError>({});

  // Load cards
  const loadCards = async () => {
    setIsLoading(true);
    setDbError(null);
    try {
      const data = await getFlashcards();
      setCards(data);
    } catch (err: any) {
      setDbError(err.message || 'Failed to fetch flashcards.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleResetForm = () => {
    setTitle('');
    setCategory('');
    setQuestion('');
    setAnswer('');
    setEditingCardId(null);
    setErrors({});
  };

  const handleEditClick = (card: Flashcard) => {
    setTitle(card.title);
    setCategory(card.category);
    setQuestion(card.question);
    setAnswer(card.answer);
    setEditingCardId(card.id);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbError(null);
    
    // 1. Validation
    const { isValid, errors: validationErrors } = validateFlashcard(
      title,
      question,
      answer,
      category
    );
    
    // 2. Check duplicates
    const duplicate = cards.find(
      (c) => c.title.toLowerCase().trim() === title.toLowerCase().trim() && c.id !== editingCardId
    );
    
    const finalErrors = { ...validationErrors };
    if (duplicate) {
      finalErrors.title = 'A flashcard with this title already exists.';
    }

    if (!isValid || duplicate) {
      setErrors(finalErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const cardInput = {
        title: title.trim(),
        category: category.trim(),
        question: question.trim(),
        answer: answer.trim()
      };

      if (editingCardId) {
        // Update operation
        const updated = await updateFlashcard(editingCardId, cardInput);
        setCards(cards.map((c) => (c.id === editingCardId ? updated : c)));
      } else {
        // Create operation
        const created = await createFlashcard(cardInput);
        setCards([created, ...cards]);
      }
      handleResetForm();
    } catch (err: any) {
      setDbError(err.message || 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!(window as any).__SKIP_CONFIRM__ && !window.confirm('Are you sure you want to permanently delete this flashcard?')) {
      return;
    }
    
    setDbError(null);
    try {
      await deleteFlashcard(id);
      setCards(cards.filter((c) => c.id !== id));
      if (editingCardId === id) {
        handleResetForm();
      }
    } catch (err: any) {
      setDbError(err.message || 'Failed to delete the card.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 glassmorphism h-[72px] flex items-center px-6 justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-premium">
            <Brain className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-brand">
            FlashMind <span className="text-text-primary">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={loadCards} 
            disabled={isLoading}
            className="p-2 rounded-xl text-text-secondary hover:text-brand hover:bg-brand-light transition-all duration-200"
            title="Refresh database"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <span className="text-sm font-medium text-text-secondary bg-brand-light px-3 py-1.5 rounded-full border border-brand/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
            Database Layer Active
          </span>
        </div>
      </header>

      {/* Main Panel */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 flex flex-col gap-8">
        
        {/* Verification Success Banner */}
        <div className="flex items-center gap-3 bg-success-light text-success border border-success/20 p-4 rounded-2xl shadow-soft">
          <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
          <div>
            <h4 className="font-bold font-display text-sm md:text-base">Phase 2 Verification Portal</h4>
            <p className="text-xs md:text-sm opacity-90">Supabase CRUD layer is operational. You can create, read, update, and delete cards below.</p>
          </div>
        </div>

        {/* Global Database Error Message */}
        {dbError && (
          <div className="flex items-center justify-between gap-3 bg-error-light text-error border border-error/20 p-4 rounded-2xl shadow-soft animate-shake">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{dbError}</p>
            </div>
            <button onClick={() => setDbError(null)} className="p-1 rounded-full hover:bg-error/10">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CRUD Form (Left Column) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-border shadow-soft flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl flex items-center gap-2">
                <Database className="w-5 h-5 text-brand" />
                {editingCardId ? 'Edit Flashcard' : 'Create Flashcard'}
              </h2>
              {editingCardId && (
                <button
                  onClick={handleResetForm}
                  className="text-xs text-text-secondary hover:text-error bg-slate-100 hover:bg-error-light px-2.5 py-1 rounded-lg transition-all"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Title input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Gradient Descent"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-[#F8FAFC] focus:outline-none transition-all ${
                    errors.title ? 'border-error focus:border-error' : 'border-border focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-error font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Category input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Artificial Intelligence"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-[#F8FAFC] focus:outline-none transition-all ${
                    errors.category ? 'border-error focus:border-error' : 'border-border focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                  }`}
                />
                {errors.category && (
                  <p className="text-xs text-error font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Question input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Question
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. What is Gradient Descent?"
                  rows={3}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-[#F8FAFC] focus:outline-none transition-all resize-none ${
                    errors.question ? 'border-error focus:border-error' : 'border-border focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                  }`}
                />
                {errors.question && (
                  <p className="text-xs text-error font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.question}
                  </p>
                )}
              </div>

              {/* Answer input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Answer
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="e.g. It is an optimization algorithm used to minimize..."
                  rows={3}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-[#F8FAFC] focus:outline-none transition-all resize-none ${
                    errors.answer ? 'border-error focus:border-error' : 'border-border focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20'
                  }`}
                />
                {errors.answer && (
                  <p className="text-xs text-error font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.answer}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-brand hover:bg-brand-dark text-white font-semibold py-3 px-4 rounded-xl shadow-premium hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving to Supabase...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    {editingCardId ? 'Save Changes' : 'Create Flashcard'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Flashcards List (Right Column) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h2 className="font-display font-bold text-xl flex items-center gap-2 px-1">
              <span>Database Records</span>
              <span className="text-xs font-medium text-text-secondary bg-slate-200/80 px-2 py-0.5 rounded-full">
                {cards.length} Total
              </span>
            </h2>

            {isLoading ? (
              /* Loading Spinner Card */
              <div className="bg-white p-12 rounded-2xl border border-border shadow-soft flex flex-col items-center justify-center gap-3 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand" />
                <p className="text-sm font-medium text-text-secondary">Loading flashcards from Supabase database...</p>
              </div>
            ) : cards.length === 0 ? (
              /* Empty state */
              <div className="bg-white p-12 rounded-2xl border border-border shadow-soft flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base">No flashcards found</h3>
                  <p className="text-xs text-text-secondary mt-1">Use the form on the left to add your first database record.</p>
                </div>
              </div>
            ) : (
              /* Flashcards List */
              <div className="flex flex-col gap-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white p-5 rounded-2xl border border-border shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-brand bg-brand-light border border-brand/10 uppercase tracking-wider px-2 py-0.5 rounded-md self-start">
                          {card.category}
                        </span>
                        <h3 className="font-display font-bold text-lg text-text-primary mt-1">
                          {card.title}
                        </h3>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditClick(card)}
                          className="p-2 rounded-xl text-text-secondary hover:text-brand hover:bg-brand-light transition-all duration-200"
                          title="Edit Card"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(card.id)}
                          className="p-2 rounded-xl text-text-secondary hover:text-error hover:bg-error-light transition-all duration-200"
                          title="Delete Card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Question</span>
                        <p className="text-sm font-medium text-text-primary mt-0.5 break-words">
                          {truncateText(card.question, 120)}
                        </p>
                      </div>
                      <div className="border-t md:border-t-0 md:border-l border-slate-200/60 pt-3 md:pt-0 md:pl-4">
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Answer</span>
                        <p className="text-sm text-text-secondary mt-0.5 break-words">
                          {truncateText(card.answer, 120)}
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] text-text-secondary flex items-center justify-between px-1">
                      <span>ID: {card.id}</span>
                      <span>Created: {formatDate(card.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border text-center text-sm text-text-secondary bg-white">
        &copy; {new Date().getFullYear()} FlashMind AI. Built with React, Vite, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;
