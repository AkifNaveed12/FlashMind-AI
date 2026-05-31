import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  onCreateClick: () => void;
  message?: string;
  isSearchEmpty?: boolean;
}

export function EmptyState({ onCreateClick, message, isSearchEmpty }: EmptyStateProps) {
  return (
    <div className="py-16 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center bg-white/50 mb-24 max-w-2xl mx-auto w-full">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8" />
      </div>
      <h3 className="font-display font-semibold text-lg text-slate-800 mb-2">
        {isSearchEmpty ? 'No Results Found' : 'No Flashcards Yet'}
      </h3>
      <p className="text-slate-500 text-sm max-w-sm">
        {message || (isSearchEmpty 
          ? "We couldn't find any flashcards matching your criteria. Try adjusting your query or filter."
          : 'Create your first flashcard to begin learning.')}
      </p>
      {!isSearchEmpty && (
        <button
          onClick={onCreateClick}
          className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
        >
          Create First Card
        </button>
      )}
    </div>
  );
}
