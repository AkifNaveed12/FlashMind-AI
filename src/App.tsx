import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { StudyMode } from '../pages/StudyMode/StudyMode';
import { Flashcard } from '../types';

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
          <StudyMode
            cards={selectedCards}
            onExit={() => {
              setSelectedCards([]);
              setCurrentTab('dashboard');
            }}
          />
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
