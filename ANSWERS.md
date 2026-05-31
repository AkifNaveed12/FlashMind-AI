# FlashMind AI — Assessment Answers

---

## Q1. What is the purpose of your application?

FlashMind AI is an AI-powered flashcard learning platform designed to help students create, organize, study, and deeply understand educational content.

The application goes beyond a basic CRUD tool by combining:

- **Flashcard Management** — users can create, read, update, and delete flashcards.
- **Study Mode** — an interactive 3D flip-card experience for active recall.
- **AI Tutor** — a context-locked conversational AI that answers questions specifically about the card being studied.
- **Voice Guide** — an AI-generated audio explanation of any flashcard, read aloud through browser speech synthesis.

The goal is to transform static flashcard data into an active, engaging learning experience.

---

## Q2. What CRUD operations does your application support?

FlashMind AI implements all four CRUD operations:

| Operation | Description | Implementation |
|---|---|---|
| **Create** | User fills in Title, Category, Question, and Answer and submits the form | `supabase.from('flashcards').insert(...)` in `services/supabase.ts` |
| **Read** | All flashcards are fetched on application load | `supabase.from('flashcards').select(...)` in `hooks/useFlashcards.ts` |
| **Update** | User opens the edit modal, modifies fields, and saves | `supabase.from('flashcards').update(...).eq('id', ...)` in `services/supabase.ts` |
| **Delete** | User clicks the delete button, confirms, and the record is removed | `supabase.from('flashcards').delete().eq('id', ...)` in `services/supabase.ts` |

All operations reflect immediately in the UI and persist permanently in Supabase.

---

## Q3. How does your application persist data?

Data persistence is handled through **Supabase**, a cloud-hosted PostgreSQL database.

### Database Table

```sql
CREATE TABLE flashcards (
  id         UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT  NOT NULL,
  question   TEXT  NOT NULL,
  answer     TEXT  NOT NULL,
  category   TEXT  NOT NULL DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Persistence Behavior

- All flashcards are stored in Supabase on creation.
- Data survives browser refreshes, tab closures, and application restarts.
- The Supabase client is initialized once in `services/supabase.ts` using environment variables.
- The custom `useFlashcards` hook fetches all cards on mount and keeps local state synchronized with the database after every mutation.

---

## Q4. What additional features have you implemented beyond CRUD?

### Feature 1 — Study Mode

A dedicated study session page that presents flashcards one at a time using a **3D CSS flip animation**:

- Question side shown first.
- User presses **Space** to flip and reveal the answer.
- **→** and **←** arrow keys navigate between cards.
- A circular progress indicator tracks how many cards have been reviewed.
- Scroll events are suppressed during navigation to prevent page interference.

### Feature 2 — AI Tutor

A slide-out chat drawer powered by the **Groq API** (Llama 3.3-70B model):

- Opens pre-loaded with the selected card's topic context.
- Sends a context-restricted system prompt to ensure the AI only discusses the flashcard's subject.
- Supports voice input via the browser **Speech Recognition API** (Chrome/Edge).
- Supports text-to-speech playback of AI responses via **Speech Synthesis API**.
- Displays a thinking indicator while the AI is generating a reply.

### Feature 3 — Voice Guide

A floating audio player widget:

- Calls Groq to generate a concise spoken explanation (under 85 words) tailored to the card's topic.
- Reads the explanation aloud using the browser **Speech Synthesis API**.
- Provides Play, Pause, and Stop controls.
- Displays an animated equalizer while speaking.
- Appears as a bottom-right floating widget that can be dismissed at any time.

### Feature 4 — Search

Real-time search that filters cards by:

- Title
- Question text
- Category name

Search updates instantly on every keystroke with 300ms debounce handling.

### Feature 5 — Category Filtering

Clickable category pill tabs allow users to filter the flashcard grid to a single topic. Categories are auto-detected from the cards in the database.

---

## Q5. What is your technology stack and why did you choose each technology?

### React + TypeScript

**Why:** React provides a component-based architecture ideal for building reusable UI elements like the flashcard grid, modals, and drawers. TypeScript adds type safety, catching bugs at compile time before they reach users.

### Vite

**Why:** Vite delivers extremely fast hot module replacement during development and optimized production builds. It requires zero configuration for React and TypeScript projects.

### Tailwind CSS

**Why:** Tailwind's utility-first classes allow rapid UI development without maintaining a separate CSS file for each component. The design system enforces visual consistency through shared spacing, color, and typography scales.

### Supabase

**Why:** Supabase provides a managed PostgreSQL database with a JavaScript client library that simplifies CRUD operations significantly. The free tier is generous enough for an assessment project, and it requires no backend server code.

### Groq API

**Why:** Groq provides extremely fast LLM inference at low latency. The Llama 3.3-70B model is capable of producing contextual, educational responses suitable for the AI Tutor and Voice Guide features.

### Web Speech API

**Why:** The browser's native Speech Synthesis API requires no additional dependencies, backend services, or API costs. It is supported in all modern browsers and provides sufficient quality for flashcard explanations.

---

## Q6. How does your AI Tutor maintain context-awareness?

The AI Tutor is context-restricted by design. When a user opens the drawer for a specific flashcard, a **system prompt** is constructed containing:

```
You are FlashMind AI Tutor.
Flashcard Context:
- Category: [card.category]
- Topic: [card.title]
- Question: [card.question]
- Answer: [card.answer]

Answer the student's questions directly in relation to this card.
If they ask about unrelated topics, politely guide them back to the flashcard's subject.
```

This system prompt is prepended to every API call, ensuring the model always has the card's full context and stays educationally relevant.

---

## Q7. How does your application handle errors and edge cases?

### Form Validation

- All four fields (title, category, question, answer) are required before submission.
- Duplicate flashcard titles are detected and blocked with an inline error message.
- Validation runs before any API call is made.

### Database Errors

- All Supabase operations are wrapped in try/catch blocks.
- User-facing error messages are displayed inline (e.g., "Failed to save flashcard.").
- The application never crashes silently.

### AI API Errors

- Groq API failures display a clear error message inside the drawer or voice player.
- The AI Tutor shows "Failed to communicate with Groq AI Tutor." on network failures.
- The Voice Guide shows an inline error if generation fails.

### Speech API Fallbacks

- If Speech Synthesis is not supported, an error message is shown to the user.
- If Speech Recognition is unavailable, the microphone button remains but shows an alert on click.

### Empty States

- When no flashcards exist, a styled empty state with a "Create First Card" button is shown.
- When a search returns no results, a "No Results Found" empty state is displayed.

---

## Q8. How is your application deployed?

The application is deployed on **Vercel** connected to the GitHub repository. Every push to the `main` branch triggers an automatic redeployment.

### Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready, deployed to Vercel |
| `dev` | Integration branch — tested features merge here |
| `feature/*` | Individual feature development branches |

### Environment Configuration

Environment variables are configured in the Vercel project dashboard:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GROQ_API_KEY`

These variables are embedded at build time by Vite via the `VITE_` prefix convention.

---

## Q9. How does your application support accessibility?

- **Keyboard navigation** — All interactive elements (buttons, inputs, drawers) are Tab-focusable with visible `focus-visible` outline rings in indigo.
- **ARIA roles** — Modal dialogs use `role="dialog"` and `aria-modal="true"`. The Voice Player uses `role="region"` and `aria-label`.
- **Semantic HTML** — Correct heading hierarchy (`h1` → `h2` → `h3`) throughout all pages.
- **Disabled states** — Buttons visually indicate disabled states during loading.
- **Error messaging** — Validation errors are displayed with icons and readable text, not just color alone.

---

## Q10. What did you learn building this project?

### Technical Learnings

- **React state management patterns** — Learned to lift shared state up to App-level to share between sibling components (e.g., the active flashcard for both the AI Tutor and Voice Player).
- **TypeScript strict typing** — Caught several bugs at compile time, particularly around Groq API message role types (`'user' | 'assistant' | 'system'`).
- **CSS 3D transforms** — Implemented card flip animations using `perspective`, `transform-style: preserve-3d`, and `backface-visibility: hidden`.
- **Web Speech API** — Learned the nuances of SpeechSynthesis (needing to cancel before re-speaking) and SpeechRecognition (browser support limitations).

### Design Learnings

- **Progressive disclosure** — Complex features (AI Tutor, Voice Guide) are hidden until the user explicitly requests them, keeping the main dashboard clean.
- **Feedback is critical** — Every async operation (saving, generating AI, voice loading) needs visible loading indicators to prevent users from thinking the app is broken.
- **focus-visible vs focus** — Using `focus-visible` instead of `focus` ensures keyboard users see clear focus rings while mouse users are not visually disrupted.
