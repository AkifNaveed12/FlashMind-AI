import { useState, useEffect } from 'react';
import { Flashcard } from '../../types';
import { ArrowLeft, Shuffle, HelpCircle, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface StudyModeProps {
  cards: Flashcard[];
  onExit: () => void;
}

export function StudyMode({ cards, onExit }: StudyModeProps) {
  const [studyList, setStudyList] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Initialize the local study list
  useEffect(() => {
    setStudyList([...cards]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsShuffled(false);
  }, [cards]);

  // Keyboard shortcut event listener
  useEffect(() => {
    if (studyList.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Space flips the card
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      }
      // ArrowRight/ArrowDown goes to next
      else if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      }
      // ArrowLeft/ArrowUp goes to previous
      else if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [studyList, currentIndex]);

  const handleNext = () => {
    if (studyList.length === 0) return;
    setIsFlipped(false);
    // Allow small timeout so front turns face-up before shifting content
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % studyList.length);
    }, 150);
  };

  const handlePrev = () => {
    if (studyList.length === 0) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + studyList.length) % studyList.length);
    }, 150);
  };

  const handleShuffle = () => {
    if (studyList.length === 0) return;
    
    if (isShuffled) {
      // Restore original order
      setStudyList([...cards]);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsShuffled(false);
    } else {
      // Shuffle list
      const listCopy = [...studyList];
      for (let i = listCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [listCopy[i], listCopy[j]] = [listCopy[j], listCopy[i]];
      }
      setStudyList(listCopy);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsShuffled(true);
    }
  };

  if (studyList.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="font-display font-bold text-2xl text-slate-800">Empty Study Queue</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-sm">
          No flashcards loaded in this session. Go back to the dashboard to select materials to review.
        </p>
        <button
          onClick={onExit}
          className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 active:scale-95 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </main>
    );
  }

  const currentCard = studyList[currentIndex];
  const progressPercent = ((currentIndex + 1) / studyList.length) * 100;

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6 items-center">
      
      {/* Top Header controls */}
      <div className="w-full flex justify-between items-center mb-4">
        <button
          onClick={onExit}
          className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit Session
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleShuffle}
            className={`px-4 py-2 border rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              isShuffled
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
            }`}
            title="Toggle shuffle order"
          >
            <Shuffle className="w-4 h-4" />
            {isShuffled ? 'Shuffled' : 'Shuffle'}
          </button>

          <button
            onClick={() => setShowHelp((h) => !h)}
            className={`p-2 border rounded-xl transition-all ${
              showHelp
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
            }`}
            title="Keyboard Shortcuts"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full max-w-xl flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Progress</span>
          <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-mono">
            {currentIndex + 1} of {studyList.length} Cards
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Flashcard Viewport with 3D Flip */}
      <div
        className="w-full max-w-xl h-[380px] perspective-1000 my-4"
        onClick={() => setIsFlipped((f) => !f)}
      >
        <div
          className={`w-full h-full transform-style-3d transition-transform duration-500 cursor-pointer relative ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face: Question */}
          <div className="absolute w-full h-full backface-hidden bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col justify-between items-center text-center">
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {currentCard.category}
            </span>
            
            <div className="flex-1 flex items-center justify-center max-w-md">
              <h2 className="font-display font-bold text-2xl text-slate-800 leading-snug">
                {currentCard.question}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Click card or press [Space] to flip</span>
            </div>
          </div>

          {/* Back Face: Answer */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-900 border border-slate-800 rounded-3xl shadow-lg p-8 flex flex-col justify-between items-center text-center text-white">
            <span className="text-[10px] font-bold text-indigo-400 bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Answer Key
            </span>

            <div className="flex-1 flex items-center justify-center max-w-md text-balance">
              <p className="text-lg text-slate-200 leading-relaxed font-medium">
                {currentCard.answer}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Click card or press [Space] to see question</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-6 mt-2">
        <button
          onClick={handlePrev}
          className="w-12 h-12 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 active:scale-90 transition-all"
          title="Previous card"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setIsFlipped((f) => !f)}
          className="px-6 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-bold text-sm flex items-center gap-2 active:scale-95 transition-all animate-none"
        >
          <RotateCw className="w-4 h-4" />
          Reveal Answer
        </button>

        <button
          onClick={handleNext}
          className="w-12 h-12 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 active:scale-90 transition-all"
          title="Next card"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Keyboard shortcuts panel */}
      {showHelp && (
        <div className="w-full max-w-xl bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-4 transition-all duration-300">
          <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2.5">
            Keyboard Shortcuts
          </h4>
          <div className="grid grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-slate-400">Flip Card</span>
              <span className="bg-white border border-slate-200 px-2 py-1 rounded font-mono text-[10px] w-fit shadow-xs">
                [Space]
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-slate-400">Next Card</span>
              <span className="bg-white border border-slate-200 px-2 py-1 rounded font-mono text-[10px] w-fit shadow-xs font-bold">
                [→] or [↓]
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-slate-400">Previous Card</span>
              <span className="bg-white border border-slate-200 px-2 py-1 rounded font-mono text-[10px] w-fit shadow-xs font-bold">
                [←] or [↑]
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
