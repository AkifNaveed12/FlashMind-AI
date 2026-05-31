import { Edit2, Trash2, Volume2, School, Bot } from 'lucide-react';
import { Flashcard } from '../../types';
import { truncateText } from '../../utils/helpers';

interface FlashcardCardProps {
  card: Flashcard;
  onEditClick: (card: Flashcard) => void;
  onDeleteClick: (id: string) => void;
  onStudyClick: (card: Flashcard) => void;
  onAiTutorClick: (card: Flashcard) => void;
  onVoiceClick?: (card: Flashcard) => void;
}

export function FlashcardCard({
  card,
  onEditClick,
  onDeleteClick,
  onStudyClick,
  onAiTutorClick,
  onVoiceClick,
}: FlashcardCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-[240px] group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100/50 text-indigo-600 rounded-lg font-bold text-[10px] uppercase tracking-wider">
              {card.category}
            </span>
          </div>
          
          <div className="flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {onVoiceClick && (
              <button
                onClick={() => onVoiceClick(card)}
                className="text-slate-400 hover:text-indigo-600 hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
                title="Listen to voice explanation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onEditClick(card)}
              className="text-slate-400 hover:text-indigo-600 hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
              title="Edit flashcard"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteClick(card.id)}
              className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
              title="Delete flashcard"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <h3 className="font-display font-semibold text-lg text-slate-800 mb-2 line-clamp-1">
          {card.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
          {truncateText(card.question, 120)}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onStudyClick(card)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-semibold text-xs shadow-sm hover:shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <School className="w-4 h-4" />
          Study
        </button>
        <button
          onClick={() => onAiTutorClick(card)}
          className="flex-1 border border-indigo-200 hover:border-indigo-400 text-indigo-600 bg-indigo-50/20 hover:bg-indigo-50/50 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Bot className="w-4 h-4" />
          AI Tutor
        </button>
      </div>
    </div>
  );
}
