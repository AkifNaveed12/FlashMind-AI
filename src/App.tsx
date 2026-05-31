import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { StudyMode } from '../pages/StudyMode/StudyMode';
import { AiTutorDrawer } from '../components/AiTutorDrawer/AiTutorDrawer';
import { VoicePlayer } from '../components/VoiceExplanation/VoicePlayer';
import { Flashcard } from '../types';

function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'study'>('dashboard');
  const [selectedCards, setSelectedCards] = useState<Flashcard[]>([]);
  const [aiTutorCard, setAiTutorCard] = useState<Flashcard | null>(null);
  const [voiceExplanationCard, setVoiceExplanationCard] = useState<Flashcard | null>(null);

  const handleStudySessionStart = (cards: Flashcard[]) => {
    setSelectedCards(cards);
    setCurrentTab('study');
  };

  const handleAiTutorStart = (card: Flashcard) => {
    setAiTutorCard(card);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      <div className="flex-1">
        {currentTab === 'dashboard' ? (
          <Dashboard
            onStudySessionStart={handleStudySessionStart}
            onAiTutorStart={handleAiTutorStart}
            onVoiceClick={setVoiceExplanationCard}
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

      {/* AI Tutor Drawer Overlay */}
      <AiTutorDrawer card={aiTutorCard} onClose={() => setAiTutorCard(null)} />

      {/* Voice Explanation Player Floating Overlay */}
      <VoicePlayer card={voiceExplanationCard} onClose={() => setVoiceExplanationCard(null)} />

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-sm text-slate-500 bg-white">
        &copy; {new Date().getFullYear()} FlashMind AI. Built with React, Vite, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;
