import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, Volume2, Bot, HelpCircle, Loader2 } from 'lucide-react';
import { Flashcard } from '../../types';
import { chatWithGroq, GroqMessage } from '../../services/groq';

interface AiTutorDrawerProps {
  card: Flashcard | null;
  onClose: () => void;
}

export function AiTutorDrawer({ card, onClose }: AiTutorDrawerProps) {
  const [messages, setMessages] = useState<GroqMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Speech Recognition API setup
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize SpeechRecognition
  useEffect(() => {
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };
      rec.onend = () => {
        setIsListening(false);
      };
      rec.onerror = (e: any) => {
        console.error('Speech recognition error:', e);
        setSpeechError('Failed to capture audio. Please check microphone permissions.');
        setIsListening(false);
      };
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? prev + ' ' + transcript : transcript));
      };
      setRecognition(rec);
    }
  }, [SpeechRecognition]);

  // Load initial greeting message on card change
  useEffect(() => {
    if (card) {
      setMessages([
        {
          role: 'assistant',
          content: `Hi there! I am your AI Tutor. I can help explain the concept of "${card.title}" to you in simple terms. Ask me any questions you have about this card!`
        }
      ]);
      setInputText('');
      setError(null);
      setSpeechError(null);
    }
    // Cancel ongoing synthesis when card changes
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [card]);

  // Clean up speech synthesis when drawer unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll to the bottom of the chat list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  if (!card) return null;

  // Text-To-Speech playback trigger
  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        setSpeechError('Text-to-speech engine error.');
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeechError('Speech synthesis is not supported in this browser.');
    }
  };

  // Toggle voice capture dictation
  const handleMicToggle = () => {
    if (!recognition) {
      setSpeechError('Speech recognition is not supported in this browser.');
      return;
    }
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  // Chat message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;

    const userMsg: GroqMessage = { role: 'user', content: inputText.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    setIsGenerating(true);
    setError(null);

    // Context-loaded System Prompt instructions
    const systemPrompt: GroqMessage = {
      role: 'system',
      content: `You are FlashMind AI Tutor, a friendly, supportive virtual teacher.
Your goal is to explain concepts to the student in simple, clear terms, using analogies if helpful.
Keep your answers brief, engaging, and structured (under 150 words).

Here is the context of the flashcard the student is studying:
- Category: ${card.category}
- Topic: ${card.title}
- Question: ${card.question}
- Answer: ${card.answer}

Answer the student's questions directly in relation to this card. If they ask about unrelated topics, politely guide them back to the flashcard's subject.`
    };

    try {
      const reply = await chatWithGroq([systemPrompt, ...updatedMessages]);
      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setError(err.message || 'Failed to communicate with Groq AI Tutor.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer container panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between h-full border-l border-slate-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">AI Study Tutor</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold uppercase tracking-wider mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Ready
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              title="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Flashcard Context details */}
          <div className="px-6 py-4 border-b border-slate-100 bg-indigo-50/20 text-xs">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
              Tutor Context
            </span>
            <h4 className="font-bold text-slate-800 mt-1 truncate">
              {card.title}
            </h4>
            <p className="text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              <strong className="text-slate-700 font-semibold">Q:</strong> {card.question}
            </p>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={index}
                  className={`flex gap-3 max-w-[85%] ${
                    isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
                  }`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isAssistant
                          ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                          : 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {isAssistant && (
                      <button
                        onClick={() => handleSpeak(msg.content)}
                        className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-indigo-600 font-bold mt-1 transition-colors px-1"
                        title="Listen to response"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Listen
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isGenerating && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-xs flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                  <span className="text-[11px] text-slate-400 font-medium">Tutor is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom input area */}
          <div className="p-4 border-t border-slate-100 bg-white">
            {error && (
              <p className="text-[11px] text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg mb-3 flex items-center gap-1.5">
                <span className="font-semibold">Error:</span> {error}
              </p>
            )}

            {speechError && (
              <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg mb-3 flex items-center gap-1.5">
                <span className="font-semibold">Speech Alert:</span> {speechError}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <button
                type="button"
                onClick={handleMicToggle}
                className={`p-3 rounded-xl border transition-all flex items-center justify-center flex-shrink-0 ${
                  isListening
                    ? 'border-red-500 bg-red-50 text-red-600 animate-pulse'
                    : 'border-slate-200 hover:border-indigo-400 text-slate-500 hover:bg-slate-50'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice dictation'}
              >
                <Mic className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Tutor to explain this card..."
                disabled={isGenerating}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600 disabled:bg-slate-50 placeholder-slate-400"
              />

              <button
                type="submit"
                disabled={isGenerating || !inputText.trim()}
                className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:bg-slate-100 disabled:text-slate-400 transition-all flex items-center justify-center flex-shrink-0 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex justify-between items-center text-[10px] text-slate-400 mt-3 px-1">
              <span>Model: Llama 3.3 70B</span>
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                Speech Dictation Enabled
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
