import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Flashcard } from '../types';
import { School, ArrowLeft } from 'lucide-react';

function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'study'>('dashboard');
  const [selectedCards, setSelectedCards] = useState<Flashcard[]>([]);

  const handleStudySessionStart = (cards: Flashcard[]) => {
    setSelectedCards(cards);
    setCurrentTab('study');
  };

  const handleAiTutorStart = (card: Flashcard) => {
    // Open AI Tutor drawer (can display an alert or a nice panel)
    alert(`AI Tutor requested for card: "${card.title}"\n(AI Tutor chat drawer will be fully unlocked in Phase 5)`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      <div className="flex-1">
        {currentTab === 'dashboard' ? (
          <Dashboard
            onStudySessionStart={handleStudySessionStart}
            onAiTutorStart={handleAiTutorStart}
          />
        ) : (
          /* Study Mode Placeholder */
          <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
              <School className="w-8 h-8" />
            </div>
            
            <h2 className="font-display font-bold text-2xl text-slate-800">Study Session Queue</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md">
              {selectedCards.length > 0
                ? `You have loaded ${selectedCards.length} flashcards into your queue. Study mode 3D flip card system is arriving in Phase 4!`
                : 'Your study queue is currently empty. Head back to the dashboard to select cards to study.'}
            </p>

            {selectedCards.length > 0 && (
              <div className="mt-6 border border-slate-200 bg-white rounded-2xl p-4 max-w-sm w-full text-left flex flex-col gap-2 mx-auto">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Queue Contents</span>
                <ul className="text-xs text-slate-600 space-y-1.5 divide-y divide-slate-100 max-h-[150px] overflow-y-auto pr-1">
                  {selectedCards.map((card) => (
                    <li key={card.id} className="pt-1.5 first:pt-0 flex justify-between">
                      <span className="font-semibold truncate pr-4">{card.title}</span>
                      <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{card.category}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedCards([]);
                setCurrentTab('dashboard');
              }}
              className="mt-8 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-sm text-slate-500 bg-white">
        &copy; {new Date().getFullYear()} FlashMind AI. Built with React, Vite, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;
