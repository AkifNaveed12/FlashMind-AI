import { Brain, Bell } from 'lucide-react';

interface HeaderProps {
  currentTab: 'dashboard' | 'study';
  onTabChange: (tab: 'dashboard' | 'study') => void;
}

export function Header({ currentTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="flex justify-between items-center h-[72px] px-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Brain className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-indigo-600">
              FlashMind <span className="text-slate-800">AI</span>
            </span>
          </div>
          
          <nav className="flex items-center gap-6">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`pb-1 font-semibold text-sm transition-all duration-200 ${
                currentTab === 'dashboard'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onTabChange('study')}
              className={`pb-1 font-semibold text-sm transition-all duration-200 ${
                currentTab === 'study'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              Study Mode
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all" title="Notifications">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-100 hidden sm:block">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
