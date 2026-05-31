import { Brain, Database, Cpu, CheckCircle2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 glassmorphism h-[72px] flex items-center px-6 justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white shadow-premium">
            <Brain className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-brand">
            FlashMind <span className="text-text-primary">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-text-secondary bg-brand-light px-3 py-1.5 rounded-full border border-brand/20 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse"></span>
            Phase 1: Active
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-success-light text-success border border-success/20 px-4 py-2 rounded-full mb-8 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold text-sm">Phase 1 (Project Setup) Configured Successfully!</span>
        </div>

        <h1 className="font-display font-extrabold text-5xl md:text-6xl text-text-primary tracking-tight mb-6">
          Elevate Your Study Sessions With <span className="text-brand">AI Tutoring</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
          A modern flashcard learning system supercharged with context-aware AI explanations, interactive active recall sessions, and auditory voice guidance.
        </p>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full text-left mb-12">
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center mb-4">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-text-primary">React & TypeScript</h3>
            <p className="text-text-secondary text-sm">
              Strict-mode typing, component modularity, and optimized rendering logic.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-text-primary">Supabase Database</h3>
            <p className="text-text-secondary text-sm">
              Persistent storage utilizing a structured PostgreSQL schema.
            </p>
          </div>

          <div className="bg-surface p-6 rounded-2xl border border-border shadow-soft hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-brand-light text-brand flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-text-primary">Groq AI API</h3>
            <p className="text-text-secondary text-sm">
              Llama 3 context-locked tutoring and real-time concept simplification.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border text-center text-sm text-text-secondary">
        &copy; {new Date().getFullYear()} FlashMind AI. Built with React, Vite, TypeScript, and Tailwind CSS.
      </footer>
    </div>
  );
}

export default App;
