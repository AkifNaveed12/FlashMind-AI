import { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, Square, X, Loader2, AlertCircle } from 'lucide-react';
import { Flashcard } from '../../types';
import { chatWithGroq, GroqMessage } from '../../services/groq';

interface VoicePlayerProps {
  card: Flashcard | null;
  onClose: () => void;
}

export function VoicePlayer({ card, onClose }: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  // Trigger explanation generation and playback when a card is selected
  useEffect(() => {
    if (!card) return;

    const generateAndPlay = async () => {
      setIsGenerating(true);
      setError(null);
      setIsPlaying(false);
      setIsPaused(false);

      if (synth) {
        synth.cancel();
      }

      try {
        // Groq explanation prompt
        const prompt: GroqMessage[] = [
          {
            role: 'system',
            content: 'You are an expert verbal tutor. Provide a clear, highly conversational spoken explanation of the flashcard concept. Explain the topic simply, use a real-world analogy if helpful, and keep it under 85 words.'
          },
          {
            role: 'user',
            content: `Category: ${card.category}\nTopic: ${card.title}\nQuestion: ${card.question}\nAnswer: ${card.answer}`
          }
        ];

        const explanation = await chatWithGroq(prompt);
        startPlayback(explanation);
      } catch (err: any) {
        console.error('Voice explanation generation failed:', err);
        setError(err.message || 'Failed to generate voice explanation.');
      } finally {
        setIsGenerating(false);
      }
    };

    generateAndPlay();

    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [card]);

  // Clean up synthesis on unmount
  useEffect(() => {
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, [synth]);

  const startPlayback = (text: string) => {
    if (!synth) {
      setError('Speech synthesis not supported in this browser.');
      return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower for better explanation comprehension
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis utterance error:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const handlePlayPause = () => {
    if (!synth || !utteranceRef.current) return;

    if (isPaused) {
      synth.resume();
      setIsPlaying(true);
      setIsPaused(false);
    } else if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
      setIsPaused(true);
    } else {
      // Restart playback if completed
      synth.speak(utteranceRef.current);
    }
  };

  const handleStopClick = () => {
    if (synth) {
      synth.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    onClose();
  };

  if (!card) return null;

  return (
    <div
      className="fixed bottom-6 right-6 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-4 z-40 flex flex-col gap-3 animate-slideUp"
      role="region"
      aria-label="Voice Explanation Player"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 text-indigo-600">
          <Volume2 className="w-5 h-5" />
          <span className="font-bold text-xs uppercase tracking-wider">Voice Guide</span>
        </div>
        <button
          onClick={handleStopClick}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none"
          title="Close player"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Info card details */}
      <div>
        <h4 className="font-semibold text-slate-800 text-sm truncate">{card.title}</h4>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{card.category}</span>
      </div>

      {/* Playback animation or state loader */}
      <div className="flex items-center justify-center py-4 bg-slate-50/50 rounded-xl min-h-[64px]">
        {isGenerating ? (
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
            <span>Drafting voice explanation...</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-600 text-xs px-2 text-center">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-2 leading-relaxed">{error}</span>
          </div>
        ) : isPlaying ? (
          <div className="flex items-center gap-1.5 h-6">
            <span className="w-1.5 h-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-1.5 h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            <span className="w-1.5 h-5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            <span className="w-1.5 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
        ) : isPaused ? (
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Playback Paused</span>
        ) : (
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Finished Explanation</span>
        )}
      </div>

      {/* Control buttons */}
      <div className="flex gap-2">
        <button
          onClick={handlePlayPause}
          disabled={isGenerating || !!error}
          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:bg-slate-100 disabled:text-slate-400 active:scale-95 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none"
          title={isPaused ? 'Resume playback' : 'Pause playback'}
        >
          {isPaused || (!isPlaying && !isPaused) ? (
            <>
              <Play className="w-4 h-4" />
              Play
            </>
          ) : (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          )}
        </button>

        <button
          onClick={handleStopClick}
          disabled={isGenerating}
          className="px-4 py-2 border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all disabled:border-slate-100 disabled:text-slate-300 disabled:hover:bg-transparent focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none"
          title="Stop and exit"
        >
          <Square className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
