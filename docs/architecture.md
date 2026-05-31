# FlashMind AI — Architecture Documentation

# System Overview

FlashMind AI is a React-based educational web application that combines traditional flashcard management with AI-powered tutoring and voice-assisted learning.

The architecture follows a frontend-centric design where:

- React handles UI rendering
- Supabase handles persistence
- Groq handles AI tutoring
- Browser Speech Synthesis handles voice explanations
- Vercel handles deployment

---

# High Level System Architecture

```mermaid
flowchart LR

A[User]
--> B[React Frontend]

B --> C[Supabase Database]

B --> D[Groq AI Service]

B --> E[Speech Synthesis API]

B --> F[Vercel Deployment]
```

---

# Application Layer Architecture

```mermaid
flowchart TD

A[React Application]

A --> B[Dashboard Page]
A --> C[Study Mode Page]

B --> D[Flashcard Form]
B --> E[Flashcard Grid]
B --> F[Search Bar]
B --> G[Category Filter]

C --> H[Study Session]
C --> I[AI Tutor]
C --> J[Voice Explanation]
```

---

# Frontend Component Hierarchy

```mermaid
flowchart TD

App

App --> Header

App --> DashboardPage

DashboardPage --> SearchBar
DashboardPage --> CategoryFilter
DashboardPage --> FlashcardGrid
DashboardPage --> FlashcardFormModal

FlashcardGrid --> FlashcardCard

FlashcardCard --> EditButton
FlashcardCard --> DeleteButton
FlashcardCard --> StudyButton

App --> StudyModePage

StudyModePage --> FlashcardViewer
StudyModePage --> ProgressTracker
StudyModePage --> NavigationControls
StudyModePage --> AITutorPanel
StudyModePage --> VoiceExplanationPanel
```

---

# Database Architecture

```mermaid
erDiagram

FLASHCARDS {

uuid id PK

string title

text question

text answer

string category

timestamp created_at

timestamp updated_at

}
```

---

# Database CRUD Flow

```mermaid
flowchart TD

A[User Action]

A --> B{Operation Type}

B -->|Create| C[Insert Flashcard]

B -->|Read| D[Fetch Flashcards]

B -->|Update| E[Update Flashcard]

B -->|Delete| F[Delete Flashcard]

C --> G[Supabase]

D --> G

E --> G

F --> G

G --> H[Refresh UI]
```

---

# Flashcard Creation Flow

```mermaid
flowchart TD

A[Open Create Modal]

A --> B[Enter Title]

B --> C[Enter Question]

C --> D[Enter Answer]

D --> E[Select Category]

E --> F{Validation}

F -->|Invalid| G[Show Error]

F -->|Valid| H[Save To Supabase]

H --> I[Update UI]

I --> J[Close Modal]
```

---

# Flashcard Editing Flow

```mermaid
flowchart TD

A[Select Flashcard]

A --> B[Open Edit Modal]

B --> C[Modify Fields]

C --> D[Validate Inputs]

D --> E[Update Supabase]

E --> F[Refresh Grid]

F --> G[Show Success]
```

---

# Flashcard Deletion Flow

```mermaid
flowchart TD

A[Delete Button]

A --> B[Confirmation Dialog]

B -->|Cancel| C[Abort]

B -->|Confirm| D[Delete Record]

D --> E[Refresh Grid]

E --> F[Show Updated State]
```

---

# Search Architecture

```mermaid
flowchart LR

A[Search Input]

A --> B[Search Logic]

B --> C[Title Match]

B --> D[Question Match]

B --> E[Category Match]

C --> F[Filtered Results]

D --> F

E --> F

F --> G[Update UI]
```

---

# Category Filter Flow

```mermaid
flowchart TD

A[Select Category]

A --> B[Apply Filter]

B --> C[Fetch Matching Cards]

C --> D[Update Grid]

D --> E[Display Results]
```

---

# Study Mode Architecture

```mermaid
flowchart TD

A[Enter Study Mode]

A --> B[Load Flashcards]

B --> C[Shuffle Cards]

C --> D[Display Question]

D --> E[Flip Card]

E --> F[Display Answer]

F --> G[Next Card]

G --> D
```

---

# Study Session State Flow

```mermaid
flowchart LR

CurrentCard

CurrentCard --> CardFlipped

CardFlipped --> NextCard

NextCard --> PreviousCard

PreviousCard --> CurrentCard
```

---

# AI Tutor Architecture

```mermaid
flowchart TD

A[User Opens Tutor]

A --> B[Current Flashcard Context]

B --> C[User Question]

C --> D[Prompt Builder]

D --> E[Groq API]

E --> F[AI Response]

F --> G[Display Answer]
```

---

# Context-Locked AI Flow

```mermaid
flowchart TD

A[Flashcard Title]

B[Flashcard Question]

C[Flashcard Answer]

A --> D[Prompt Context]

B --> D

C --> D

D --> E[Groq Request]

E --> F[Restricted Educational Response]
```

---

# Voice Explanation Architecture

```mermaid
flowchart TD

A[Current Flashcard]

A --> B[Generate AI Explanation]

B --> C[Speech Synthesis]

C --> D[Play Audio]

D --> E[Pause]

D --> F[Stop]
```

---

# AI + Voice Combined Flow

```mermaid
flowchart TD

A[Flashcard]

A --> B[Generate Explanation]

B --> C[Display Text Explanation]

B --> D[Generate Voice Playback]

C --> E[User Reads]

D --> F[User Listens]
```

---

# Validation Architecture

```mermaid
flowchart TD

A[User Input]

A --> B{Validation}

B -->|Valid| C[Update State]

B -->|Invalid| D[Display Error]

C --> E[Continue Process]

D --> F[Block Submission]
```

---

# Error Handling Architecture

```mermaid
flowchart TD

A[Operation]

A --> B{Success?}

B -->|Yes| C[Update UI]

B -->|No| D[Error Handler]

D --> E[User Friendly Message]

E --> F[Recovery Option]
```

---

# Loading State Architecture

```mermaid
flowchart TD

A[User Action]

A --> B[Show Loader]

B --> C[API Request]

C --> D{Completed}

D -->|Success| E[Render Data]

D -->|Failure| F[Render Error]

E --> G[Hide Loader]

F --> G
```

---

# Environment Configuration Architecture

```mermaid
flowchart TD

ENV[".env"]

ENV --> SUPABASE_URL

ENV --> SUPABASE_KEY

ENV --> GROQ_KEY

SUPABASE_URL --> APP

SUPABASE_KEY --> APP

GROQ_KEY --> APP
```

---

# Deployment Architecture

```mermaid
flowchart LR

Developer

Developer --> GitHub

GitHub --> Vercel

Vercel --> ReactApp

ReactApp --> Supabase

ReactApp --> Groq
```

---

# Production Data Flow

```mermaid
flowchart TD

User

User --> ReactFrontend

ReactFrontend --> Supabase

ReactFrontend --> Groq

Groq --> ReactFrontend

Supabase --> ReactFrontend

ReactFrontend --> User
```

---

# Folder Structure Architecture

```txt
flashmind-ai/

├── src/
│
├── components/
│   ├── Header/
│   ├── FlashcardForm/
│   ├── FlashcardGrid/
│   ├── FlashcardCard/
│   ├── SearchBar/
│   ├── CategoryFilter/
│   ├── StudyMode/
│   ├── AITutor/
│   └── VoiceExplanation/
│
├── pages/
│   ├── Dashboard/
│   └── StudyMode/
│
├── services/
│   ├── supabase.js
│   └── groq.js
│
├── hooks/
│
├── utils/
│
├── docs/
│
├── README.md
├── ANSWERS.md
└── package.json
```

---

# Architecture Principles

The architecture is designed around the following principles:

### Simplicity

Avoid unnecessary complexity.

### Maintainability

Keep components modular and reusable.

### Scalability

Allow future feature expansion without major rewrites.

### Responsiveness

Provide a consistent experience across devices.

### Accessibility

Support keyboard navigation and inclusive interactions.

### Reliability

Handle failures gracefully and preserve user data.

---

# Definition Of Architectural Success

The architecture is considered successful if:

- CRUD operations work reliably
- Data persists correctly
- Search performs efficiently
- Study mode remains intuitive
- AI tutor stays context-aware
- Voice explanations function consistently
- UI remains responsive
- Deployment works without modification
- Future features can be added cleanly

```

```
