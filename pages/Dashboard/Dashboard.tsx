import { useState, useEffect } from 'react';
import { Plus, AlertCircle, RefreshCw, PlayCircle, Shuffle } from 'lucide-react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { CategoryFilter } from '../../components/CategoryFilter/CategoryFilter';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { LoadingState } from '../../components/LoadingState/LoadingState';
import { FlashcardCard } from '../../components/FlashcardCard/FlashcardCard';
import { FlashcardFormModal } from '../../components/FlashcardForm/FlashcardFormModal';
import { getFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '../../services/supabase';
import { Flashcard } from '../../types';

interface DashboardProps {
  onStudySessionStart: (cards: Flashcard[]) => void;
  onAiTutorStart: (card: Flashcard) => void;
}

export function Dashboard({ onStudySessionStart, onAiTutorStart }: DashboardProps) {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dbError, setDbError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  // Load cards on mount
  const loadCards = async () => {
    setIsLoading(true);
    setDbError(null);
    try {
      const data = await getFlashcards();
      setCards(data);
    } catch (err: any) {
      setDbError(err.message || 'Failed to fetch flashcards from database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  // Form submission handler
  const handleFormSubmit = async (input: { title: string; category: string; question: string; answer: string }) => {
    if (editingCard) {
      // Update
      const updated = await updateFlashcard(editingCard.id, input);
      setCards(cards.map((c) => (c.id === editingCard.id ? updated : c)));
    } else {
      // Create
      const created = await createFlashcard(input);
      setCards([created, ...cards]);
    }
    setIsModalOpen(false);
    setEditingCard(null);
  };

  // Card deletion handler
  const handleDeleteClick = async (id: string) => {
    if (!(window as any).__SKIP_CONFIRM__ && !window.confirm('Are you sure you want to permanently delete this flashcard?')) {
      return;
    }
    setDbError(null);
    try {
      await deleteFlashcard(id);
      setCards(cards.filter((c) => c.id !== id));
      if (editingCard?.id === id) {
        setEditingCard(null);
      }
    } catch (err: any) {
      setDbError(err.message || 'Failed to delete flashcard.');
    }
  };

  // Action Click Handlers
  const handleCreateClick = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (card: Flashcard) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleStartStudyQueue = () => {
    if (cards.length > 0) {
      onStudySessionStart(cards);
    } else {
      alert('Please add some flashcards first before starting a study session.');
    }
  };

  const handleReviewRandom = () => {
    if (cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      onStudySessionStart([cards[randomIndex]]);
    } else {
      alert('No flashcards available to review.');
    }
  };

  // Categories derivation
  const categories = Array.from(new Set(cards.map((c) => c.category.trim()))).filter(Boolean);

  // Search & filter matching
  const filteredCards = cards.filter((card) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      card.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      card.title.toLowerCase().includes(query) ||
      card.question.toLowerCase().includes(query) ||
      card.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
      
      {/* Top Banner & Quick Actions */}
      <section className="mb-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-display font-bold text-3xl tracking-tight text-slate-800">
              Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your materials and verify your learning.
            </p>
          </div>
          <button
            onClick={loadCards}
            disabled={isLoading}
            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 bg-white transition-all duration-200"
            title="Refresh database"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Global DB Errors */}
        {dbError && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{dbError}</p>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-4 bg-indigo-600 text-white p-6 rounded-2xl shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Create Flashcard</h4>
              <p className="text-xs text-indigo-100 mt-0.5">Add new material to study</p>
            </div>
          </button>

          <button
            onClick={handleStartStudyQueue}
            className="flex items-center gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-indigo-600 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-slate-800">Start Study Session</h4>
              <p className="text-xs text-slate-500 mt-0.5">Jump back into your study queue</p>
            </div>
          </button>

          <button
            onClick={handleReviewRandom}
            className="flex items-center gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-indigo-600 hover:shadow-md transition-all text-left group"
          >
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Shuffle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-lg text-slate-800">Review Random Card</h4>
              <p className="text-xs text-slate-500 mt-0.5">Quick knowledge check</p>
            </div>
          </button>
        </div>
      </section>

      {/* Search Section */}
      <SearchBar query={searchQuery} onChange={setSearchQuery} />

      {/* Filter Section */}
      {!isLoading && cards.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {/* Main Grid View */}
      {isLoading ? (
        <LoadingState />
      ) : cards.length === 0 ? (
        <EmptyState onCreateClick={handleCreateClick} />
      ) : filteredCards.length === 0 ? (
        <EmptyState isSearchEmpty={true} onCreateClick={handleCreateClick} />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 w-full">
          {filteredCards.map((card) => (
            <FlashcardCard
              key={card.id}
              card={card}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              onStudyClick={(c) => onStudySessionStart([c])}
              onAiTutorClick={onAiTutorStart}
            />
          ))}
        </section>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleCreateClick}
        className="fixed bottom-8 right-8 h-14 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all z-40 group"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-bold text-sm">New Card</span>
      </button>

      {/* Form Modal overlay */}
      <FlashcardFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCard(null);
        }}
        onSubmit={handleFormSubmit}
        editingCard={editingCard}
        existingCards={cards}
      />
    </main>
  );
}
