# FlashMind AI

An AI-powered flashcard learning platform that combines traditional flashcard management with AI-assisted tutoring and voice-based explanations to help students study more effectively.

![FlashMind AI](./UiSampleScreens/dashboard.png)

---

## Features

| Feature | Description |
|---|---|
| **Flashcard CRUD** | Create, read, update, and delete flashcards with full validation |
| **Search** | Instant real-time search across titles, questions, and categories |
| **Category Filtering** | Filter cards by topic (AI, Programming, Mathematics, Science, etc.) |
| **Study Mode** | 3D flip-card interface with keyboard shortcuts for active recall |
| **AI Tutor** | Context-aware chat drawer powered by Groq (Llama 3.3-70B) |
| **Voice Guide** | AI-generated spoken explanations via Web Speech Synthesis API |
| **Persistent Storage** | All flashcards persist across sessions via Supabase PostgreSQL |
| **Responsive Design** | Fully usable on mobile, tablet, and desktop |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Database | Supabase (PostgreSQL) |
| AI Provider | Groq API (Llama 3.3-70B) |
| Voice | Web Speech Synthesis API (Browser native) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [Supabase](https://supabase.com/) account (free tier works)
- A [Groq](https://console.groq.com/) API key (free tier works)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AkifNaveed12/FlashMind-AI.git
cd FlashMind-AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Open `.env` and set the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
```

See [Environment Variables](#environment-variables) section for full details.

### 4. Set Up the Supabase Database

In your Supabase dashboard, open the **SQL Editor** and run the following migration:

```sql
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Allow all operations (no auth required for this project)
CREATE POLICY "Allow all operations" ON flashcards
  FOR ALL USING (true) WITH CHECK (true);
```

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Environment Variables

| Variable | Description | Where to Get It |
|---|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous (public) key | Supabase Dashboard → Settings → API |
| `VITE_GROQ_API_KEY` | Your Groq API key | [console.groq.com](https://console.groq.com/) → API Keys |

> **Important:** All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server at `http://localhost:5173` |
| `npm run build` | Type-check and build for production into `/dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all TypeScript files |

---

## Project Structure

```
FlashMind-AI/
│
├── components/               # Reusable UI components
│   ├── AiTutorDrawer/        # Slide-out AI chat panel
│   ├── CategoryFilter/       # Category tab navigation
│   ├── DeleteConfirm/        # Confirmation dialog
│   ├── EmptyState/           # Empty collection state
│   ├── FlashcardCard/        # Individual card component
│   ├── FlashcardForm/        # Create/Edit modal form
│   ├── FlashcardGrid/        # Cards grid layout
│   ├── Header/               # Navigation header
│   ├── LoadingState/         # Skeleton loader
│   ├── SearchBar/            # Search input
│   └── VoiceExplanation/     # Floating voice player
│
├── pages/
│   ├── Dashboard/            # Main flashcard management page
│   └── StudyMode/            # 3D flip-card study session
│
├── services/
│   ├── supabase.ts           # Supabase CRUD service layer
│   └── groq.ts               # Groq AI API client
│
├── hooks/
│   └── useFlashcards.ts      # Data fetching and state management hook
│
├── types/
│   └── index.ts              # TypeScript type definitions
│
├── utils/
│   └── validation.ts         # Form input validation utilities
│
├── src/
│   ├── App.tsx               # Root application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and custom utilities
│
├── docs/                     # Project documentation
│   ├── idea.md               # Product vision and feature specs
│   ├── planning.md           # Development phases and task breakdown
│   ├── architecture.md       # System and component architecture diagrams
│   ├── design.md             # UI/UX design decisions
│   ├── userflows.md          # User journey flows
│   ├── schema.md             # Database schema documentation
│   └── context.md            # Development progress log
│
├── .env.example              # Environment variable template
├── requirements.txt          # Dependency version reference
├── README.md                 # This file
├── ANSWERS.md                # Assessment Q&A
├── package.json              # Project metadata and dependencies
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build configuration
```

---

## Deployment to Vercel

### 1. Push to GitHub

Ensure your code is pushed to GitHub. The project uses a `main` → `dev` → `feature/*` branching strategy.

### 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com/) and sign in.
2. Click **Add New Project**.
3. Import your GitHub repository.
4. Vercel auto-detects Vite — no framework changes needed.

### 3. Configure Environment Variables on Vercel

In your Vercel project settings under **Environment Variables**, add:

```
VITE_SUPABASE_URL        = your_supabase_project_url
VITE_SUPABASE_ANON_KEY   = your_supabase_anon_key
VITE_GROQ_API_KEY        = your_groq_api_key
```

### 4. Deploy

Click **Deploy**. Vercel will build and deploy automatically. Future pushes to `main` trigger automatic redeployment.

---

## Usage Guide

### Creating a Flashcard

1. Click the **+ Create Card** button in the header.
2. Fill in: Title, Category, Question, and Answer.
3. Click **Create Flashcard** — the card is saved to Supabase.

### Studying Flashcards

1. Click the **Study** button on any card.
2. In Study Mode, press **Space** to flip the card.
3. Press **→** / **←** arrows to navigate between cards.
4. Your progress is tracked via the circular progress indicator.

### Using the AI Tutor

1. Click the **AI Tutor** button on any flashcard.
2. The drawer opens pre-loaded with the card's topic context.
3. Type your question and press Send — or use the **microphone** for voice input.
4. Click the **Listen** button on any AI response for text-to-speech playback.

### Using Voice Guide

1. Click the **speaker icon** on any flashcard in the dashboard.
2. The Voice Guide widget appears in the bottom-right corner.
3. The app calls Groq to generate a spoken explanation, then plays it aloud.
4. Use **Pause**, **Play**, and **Stop** controls as needed.

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Core CRUD | ✅ | ✅ | ✅ | ✅ |
| AI Tutor | ✅ | ✅ | ✅ | ✅ |
| Speech Synthesis (Voice Guide) | ✅ | ✅ | ✅ | ✅ |
| Speech Recognition (Voice Input) | ✅ | ❌ | ❌ | ✅ |

> Voice dictation input (microphone) requires Chrome or Edge due to `webkitSpeechRecognition` availability.

---

## License

This project was created as part of an academic assessment. All rights reserved.
