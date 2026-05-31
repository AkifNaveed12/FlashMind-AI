# FlashMind AI — Design System Documentation

# Design Philosophy

FlashMind AI is designed as an educational AI-powered study platform.

The interface should feel:

- modern
- professional
- clean
- approachable
- educational
- focused

The design should reduce distractions and allow users to focus on learning.

---

# Core Design Principles

## Principle 1 — Clarity First

Every screen should prioritize:

- readability
- focus
- understanding

No visual element should distract from learning.

---

## Principle 2 — Learning-Centered Design

The flashcards and explanations are the primary content.

The interface exists to support learning.

---

## Principle 3 — Minimal Cognitive Load

Avoid:

- excessive colors
- unnecessary animations
- visual clutter
- complex navigation

---

## Principle 4 — AI Feels Helpful

The AI Tutor should feel like:

- a study assistant
- a tutor
- a mentor

not a generic chatbot.

---

# Brand Identity

## Product Name

FlashMind AI

---

## Brand Personality

The product should feel:

- intelligent
- educational
- trustworthy
- supportive
- modern

---

# Typography System

## Primary Font

Inter

Fallback:

```css
font-family: Inter, system-ui, sans-serif;
```

---

# Typography Scale

## Hero Heading

```txt
40px
Font Weight: 700
```

Used for:

- page titles

---

## Section Heading

```txt
24px
Font Weight: 600
```

Used for:

- dashboard sections
- study mode headings

---

## Card Title

```txt
18px
Font Weight: 600
```

---

## Body Text

```txt
16px
Font Weight: 400
```

---

## Small Text

```txt
14px
Font Weight: 400
```

---

## Helper Text

```txt
12px
Font Weight: 400
```

---

# Color System

## Primary Brand Color

```txt
#4F46E5
```

Indigo

Used for:

- primary actions
- active states

---

## Primary Hover

```txt
#4338CA
```

---

## Success Color

```txt
#10B981
```

---

## Warning Color

```txt
#F59E0B
```

---

## Error Color

```txt
#EF4444
```

---

## Background

```txt
#F8FAFC
```

---

## Surface

```txt
#FFFFFF
```

---

## Border

```txt
#E2E8F0
```

---

## Primary Text

```txt
#0F172A
```

---

## Secondary Text

```txt
#64748B
```

---

# Layout System

## Mobile First

The application must be designed mobile-first.

---

# Breakpoints

## Mobile

```txt
320px - 767px
```

---

## Tablet

```txt
768px - 1023px
```

---

## Desktop

```txt
1024px+
```

---

# Global Layout

## Mobile Layout

Structure:

```txt
Header

Search

Filter

Flashcard Grid

Floating Create Button
```

Single-column layout.

---

## Desktop Layout

Structure:

```txt
Header

Search + Filters + Create Button

Flashcard Grid

Study Mode

AI Features
```

Multi-column layout where appropriate.

---

# Dashboard Design

## Header

Contains:

- Logo
- Product Name
- Quick Actions

Height:

```txt
72px
```

Sticky header.

---

# Search Bar

Position:

Top of dashboard.

Features:

- icon
- rounded design
- instant search

---

# Category Filters

Display:

Pill buttons

Examples:

```txt
All
AI
Programming
Mathematics
Science
```

---

# Flashcard Grid

## Mobile

```txt
1 Column
```

---

## Tablet

```txt
2 Columns
```

---

## Desktop

```txt
3 Columns
```

---

# Flashcard Card Design

Each card contains:

- title
- category badge
- question preview
- actions

Actions:

- edit
- delete
- study
- AI tutor

---

# Flashcard Card Styling

Border Radius:

```txt
16px
```

Shadow:

```txt
Soft
```

Hover:

```txt
Slight elevation
```

---

# Create/Edit Modal

Purpose:

Create or edit flashcards.

Fields:

- title
- question
- answer
- category

Buttons:

- Save
- Cancel

---

# Validation Design

Errors appear:

- directly below field
- in red
- without layout jumping

No alert boxes.

No browser validation popups.

---

# Study Mode Design

Purpose:

Distraction-free learning.

---

# Study Layout

Desktop:

```txt
Centered Card
```

Mobile:

```txt
Full Width Card
```

---

# Flashcard Viewer

Displays:

- question side
- answer side

---

# Flip Animation

Animation:

```txt
3D Card Flip
```

Duration:

```txt
400ms
```

Easing:

```txt
ease-in-out
```

---

# Navigation Controls

Buttons:

- Previous
- Flip
- Next

---

# Progress Indicator

Example:

```txt
Card 3 of 12
```

---

# AI Tutor Design

## Position

Desktop:

```txt
Right Drawer
```

Mobile:

```txt
Bottom Sheet
```

---

# Tutor Layout

Contains:

- chat history
- prompt box
- send button

---

# AI Message Styling

User:

```txt
Right aligned
```

AI:

```txt
Left aligned
```

---

# AI Loading State

Show:

```txt
AI is thinking...
```

with animated dots.

---

# Voice Explanation Design

Button:

```txt
🔊 Explain with Voice
```

---

# Controls

Buttons:

- Play
- Pause
- Stop

---

# Search Experience

Search updates:

```txt
Instantly
```

while typing.

Debounce:

```txt
300ms
```

---

# Empty States

Examples:

No flashcards yet.

Create your first flashcard to start learning.

---

No search results.

Try another keyword.

---

# Loading States

Use:

- skeleton cards
- skeleton text
- loading indicators

Avoid:

```txt
Loading...
```

plain text only.

---

# Error States

Errors must:

- explain problem clearly
- suggest next action

Example:

```txt
Unable to connect to AI Tutor.
Please try again.
```

---

# Motion Design

Animations should feel:

- smooth
- subtle
- purposeful

---

# Approved Animations

## Button Hover

Scale:

```txt
1.02
```

---

## Card Hover

Translate:

```txt
-2px
```

---

## Modal Open

Fade + Scale

Duration:

```txt
200ms
```

---

## Drawer Open

Slide In

Duration:

```txt
250ms
```

---

## Study Card Flip

Duration:

```txt
400ms
```

---

# Accessibility Requirements

All interactive elements must support:

- keyboard navigation
- visible focus states
- screen readers
- sufficient contrast

---

# Focus States

All inputs and buttons:

```txt
2px Indigo Outline
```

---

# Touch Targets

Minimum:

```txt
44px × 44px
```

---

# Design Assets

UI inspiration screenshots will be stored in:

```txt
UiSampleScreens/
```

Files:

```txt
UiSampleScreens/mobile-screen.png

UiSampleScreens/desktop-screen.png
```

---

# Stitch Design References

The generated Google Stitch outputs must be:

- reviewed visually
- reviewed structurally
- reviewed for responsiveness

The corresponding Stitch-generated code and screenshots should be referenced during implementation.

The screenshots stored in:

```txt
UiSampleScreens/
```

are considered the primary visual reference.

Implementation should follow:

- this design document
- idea.md
- architecture.md
- userflows.md

rather than directly copying generated code.

---

## Responsive Design Strategy

The UI is designed using a single responsive design system.

Separate mobile and desktop applications will not be created.

Instead:

- Desktop uses multi-column layouts
- Tablet uses hybrid layouts
- Mobile uses stacked layouts

The same components, interactions, and visual language are reused across all screen sizes.

This approach improves:

- maintainability
- consistency
- accessibility
- development speed

The generated UI reference screens should be treated as responsive design references rather than separate platform-specific designs.

---

# UI Reference Screens

The FlashMind AI interface follows a single responsive design system.

The generated Google Stitch screens are used as visual references and implementation guides.

These screens represent the intended user experience, component hierarchy, spacing, and visual language of the application.

Implementation should remain faithful to these designs while maintaining responsiveness, accessibility, and usability.

---

# Reference Assets Location

All generated UI screenshots are stored in:

```txt
UiSampleScreens/
```

Current reference screens:

```txt
UiSampleScreens/dashboard-screen.png

UiSampleScreens/study-screen.png
```

---

# Dashboard Reference Screen

Purpose:

Primary application dashboard.

Contains:

- Header navigation
- Search functionality
- Category filters
- Flashcard grid
- CRUD actions
- Quick actions section
- Empty states
- Create flashcard actions

This screen serves as the visual reference for:

- Dashboard layout
- Flashcard cards
- Search experience
- Category filtering
- Empty states

---

# Study Reference Screen

Purpose:

Flashcard study experience.

Contains:

- Flashcard viewer
- Study navigation
- Progress indicator
- AI Tutor integration
- Voice explanation controls
- Study workflow

This screen serves as the visual reference for:

- Study mode
- AI Tutor UI
- Voice explanation controls
- Learning interactions
- Flashcard navigation

---

# Stitch Generated Code References

The code generated by Google Stitch should be stored and preserved for reference purposes.

Recommended location:

```txt
docs/stitch/
```

Example:

```txt
docs/stitch/dashboard-screen-code.md

docs/stitch/study-screen-code.md
```

These files are used only as UI references.

The production implementation should follow:

- idea.md
- planning.md
- architecture.md
- userflows.md
- schema.md
- design.md

rather than directly copying generated Stitch code.

---

# Responsive Implementation Strategy

FlashMind AI is implemented as a single responsive application.

Separate mobile and desktop applications will not be created.

Responsive behavior:

Desktop:

- Multi-column layouts
- Side-by-side content sections
- Expanded spacing

Tablet:

- Hybrid layouts
- Adaptive grid structures

Mobile:

- Stacked layouts
- Full-width components
- Touch-first interactions

The same components and functionality must be reused across all breakpoints.

---

# Implementation Flexibility

The Stitch screens are design references, not strict implementation blueprints.

Small implementation differences are acceptable when they improve:

- responsiveness
- accessibility
- usability
- performance
- maintainability

The final implementation should preserve the overall visual identity and user experience while following modern frontend development best practices.

---

# Design Success Criteria

The design is successful if:

- users can create flashcards easily
- studying feels intuitive
- AI tutoring feels natural
- voice explanations feel useful
- mobile experience feels polished
- desktop experience feels premium
- accessibility remains strong
- learning remains the primary focus

```

```
