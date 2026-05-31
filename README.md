# FlashMind AI

FlashMind AI is an AI-powered flashcard learning platform that helps students create, organize, study, and better understand educational content.

The application combines traditional flashcard management with AI-assisted tutoring and voice-based explanations to create a more engaging learning experience.

---

## Features

### Flashcard Management

- Create flashcards
- View flashcards
- Edit flashcards
- Delete flashcards

### Study Mode

- Interactive flashcard review
- Card flip experience
- Progress tracking
- Keyboard-friendly navigation

### AI Tutor

- Context-aware flashcard explanations
- Question and answer support
- Educational learning assistance

### Voice Explanation

- AI-generated explanations
- Browser-based text-to-speech playback
- Play, pause, and stop controls

### Search & Filtering

- Real-time search
- Category filtering
- Faster flashcard discovery

### Persistence

- Flashcards stored in Supabase
- Data remains available after refreshes and restarts

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite

### Styling

- Tailwind CSS

### Database

- Supabase

### AI

- Groq API

### Voice

- Web Speech API

---

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd FlashMind-AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GROQ_API_KEY=
```

### 4. Configure Supabase

Create the required database table using the SQL schema provided in:

```txt
docs/schema.md
```

### 5. Start Development Server

```bash
npm run dev
```

Application URL:

```txt
http://localhost:5173
```

---

## Project Structure

```txt
FlashMind-AI/

├── src/
├── docs/
├── UiSampleScreens/
├── .env.example
├── README.md
├── ANSWERS.md
└── package.json
```

---

## Documentation

Project planning and design documents are available inside:

```txt
docs/
```

Including:

- idea.md
- planning.md
- architecture.md
- userflows.md
- schema.md
- design.md
- context.md

---

## Deployment

Deployed Application:

Paste deployed Vercel URL here

---

## Author

Muhammad Akif Naveed

LinkedIn:
[https://www.linkedin.com/in/akif-naveed-malik30](https://www.linkedin.com/in/akif-naveed-malik30)

GitHub:
[https://github.com/AkifNaveed12](https://github.com/AkifNaveed12)

Portfolio:
[https://portfolio-muhammad-akif-naveed.vercel.app/](https://portfolio-muhammad-akif-naveed.vercel.app/)

Email:
[hello.akifnaveed@gmail.com](mailto:hello.akifnaveed@gmail.com)
