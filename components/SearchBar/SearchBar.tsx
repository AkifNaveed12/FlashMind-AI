import { Search } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

export function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-10">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your flashcards or ask AI..."
        className="w-full bg-white border border-slate-200 rounded-full py-4 pl-12 pr-6 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all duration-200 text-slate-800 hover:shadow-md"
      />
    </div>
  );
}
