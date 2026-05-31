# FlashMind AI — Assessment Answers

## 1. How to Run

### Prerequisites

Install:

- Node.js (v18 or higher)
- npm

You will also need:

- A Supabase project
- A Groq API key

### Setup

Clone the repository:

```bash
git clone <repository-url>
cd FlashMind-AI
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` and add:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GROQ_API_KEY=
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

### Deployment

Deployed Application:

Paste deployed Vercel URL here

---

## 2. Stack Choice

I chose React, TypeScript, Supabase, and Tailwind CSS for this project.

React made it easy to build reusable components such as flashcards, forms, study mode, and the AI Tutor. TypeScript helped catch errors during development and made the code easier to maintain. Supabase provided a simple way to store flashcards permanently without building a separate backend. Tailwind CSS allowed me to create a responsive interface quickly while keeping the design consistent.

A worse choice for this project would have been introducing a large backend framework because the application mainly focuses on CRUD operations, persistence, and AI-powered learning features. It would have added unnecessary complexity for the scope of the assessment.

---

## 3. One Real Edge Case

One edge case I handled was preventing users from creating flashcards with empty required fields.

Location:

```txt
utils/validation.ts — Lines 16–51
```

Validation checks ensure that:

- Title is required — checked on **lines 25–27** (`if (!trimmedTitle)` → `errors.title = 'Title is required.'`)
- Title max 150 characters — checked on **lines 28–30** (`else if (trimmedTitle.length > 150)`)
- Question is required — checked on **lines 33–35** (`if (!question.trim())` → `errors.question = 'Question is required.'`)
- Answer is required — checked on **lines 38–40** (`if (!answer.trim())` → `errors.answer = 'Answer is required.'`)
- Category is required — checked on **lines 43–45** (`if (!category.trim())` → `errors.category = 'Category is required.'`)

The `validateFlashcard` function (lines 16–51) is called inside `components/FlashcardForm/FlashcardFormModal.tsx` on **lines 64–69** before any Supabase API call is made. If any field fails validation the form blocks submission and shows inline error messages on each invalid field.

Without this validation, incomplete flashcards could be saved to the database, leading to broken study sessions and poor user experience.

---

## 4. AI Usage

### ChatGPT

Used for:

- project planning
- feature brainstorming
- architecture discussions
- documentation drafting

What I asked:

I asked for help designing a flashcard learning application that satisfied the CRUD and persistence requirements while providing meaningful additional features.

What it gave:

Suggestions for Study Mode, AI Tutor functionality, voice explanations, architecture planning, and project documentation structure.

---

### Google Stitch

Used for:

- dashboard design inspiration
- study mode UI inspiration

What I asked:

I provided the project requirements and requested responsive educational SaaS-style interface designs.

What it gave:

Dashboard and study mode UI concepts that were used as visual references during implementation.

---

### Antigravity

Used for:

- implementation assistance
- component generation
- project scaffolding

What I asked:

I provided the project documentation and development plan and requested implementation support phase-by-phase.

What it gave:

Initial React component structures, layouts, service files, and implementation guidance.

---

### Changes I Made To AI Output

One issue in an AI-generated layout was that longer flashcard content caused text overflow and reduced readability on smaller screens.

I modified the layout and spacing so longer content remained visible and responsive across different screen sizes.

I also adjusted component spacing, alignment, and naming to better match the final project requirements and improve usability.

---

## 5. Honest Gap

One area that is not as polished as I would like is the AI Tutor experience.

Currently, the tutor is limited to the context of a single flashcard and provides helpful explanations, but the conversation is not persisted between sessions.

If I had another day, I would improve the tutor experience by adding conversation history, better prompt refinement, and more advanced learning assistance while still keeping the AI focused on the current flashcard topic.
