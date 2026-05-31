<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .perspective-1000 {
            perspective: 1000px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
        .backface-hidden {
            backface-visibility: hidden;
        }
        .rotate-y-180 {
            transform: rotateY(180deg);
        }
        .flip-card-inner {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .is-flipped {
            transform: rotateY(180deg);
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "border": "#E2E8F0",
                        "on-tertiary": "#ffffff",
                        "on-error-container": "#93000a",
                        "primary-fixed": "#e2dfff",
                        "tertiary-container": "#a44100",
                        "on-surface": "#1b1b24",
                        "warning": "#F59E0B",
                        "inverse-on-surface": "#f3effc",
                        "text-primary": "#0F172A",
                        "on-secondary-container": "#54647a",
                        "tertiary-fixed": "#ffdbcc",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-high": "#eae6f4",
                        "on-secondary-fixed-variant": "#38485d",
                        "on-primary-fixed": "#0f0069",
                        "on-background": "#1b1b24",
                        "secondary-fixed-dim": "#b7c8e1",
                        "error-container": "#ffdad6",
                        "inverse-surface": "#302f39",
                        "on-primary-container": "#dad7ff",
                        "secondary-fixed": "#d3e4fe",
                        "primary-hover": "#4338CA",
                        "primary": "#3525cd",
                        "secondary": "#505f76",
                        "background": "#F8FAFC",
                        "on-tertiary-container": "#ffd2be",
                        "on-primary": "#ffffff",
                        "on-primary-fixed-variant": "#3323cc",
                        "on-surface-variant": "#464555",
                        "success": "#10B981",
                        "surface-bright": "#fcf8ff",
                        "surface-dim": "#dcd8e5",
                        "inverse-primary": "#c3c0ff",
                        "surface-tint": "#4d44e3",
                        "tertiary-fixed-dim": "#ffb695",
                        "surface-container": "#f0ecf9",
                        "on-secondary": "#ffffff",
                        "secondary-container": "#d0e1fb",
                        "surface-container-low": "#f5f2ff",
                        "on-error": "#ffffff",
                        "primary-container": "#4f46e5",
                        "outline": "#777587",
                        "surface-container-highest": "#e4e1ee",
                        "primary-fixed-dim": "#c3c0ff",
                        "on-tertiary-fixed": "#351000",
                        "tertiary": "#7e3000",
                        "on-secondary-fixed": "#0b1c30",
                        "surface": "#FFFFFF",
                        "on-tertiary-fixed-variant": "#7b2f00",
                        "surface-variant": "#e4e1ee",
                        "outline-variant": "#c7c4d8",
                        "error": "#EF4444"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "header-height": "72px",
                        "container-margin": "1.5rem",
                        "max-width-desktop": "1200px",
                        "gutter": "1rem"
                    },
                    "fontFamily": {
                        "helper": ["Inter"],
                        "section-heading": ["Inter"],
                        "card-title": ["Inter"],
                        "body": ["Inter"],
                        "small": ["Inter"],
                        "headline-lg": ["Inter"]
                    },
                    "fontSize": {
                        "helper": ["12px", {"lineHeight": "16px", "fontWeight": "400"}],
                        "section-heading": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                        "card-title": ["18px", {"lineHeight": "24px", "fontWeight": "600"}],
                        "body": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                        "small": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                        "headline-lg": ["40px", {"lineHeight": "1.2", "fontWeight": "700"}]
                    }
                },
            },
        }
    </script>
</head>
<body class="bg-background font-body text-text-primary min-h-screen flex flex-col items-center justify-center">
<!-- Top Bar Navigation Shell Suppressed for Focus, replaced with Study Header -->
<nav class="fixed top-0 left-0 right-0 h-[72px] px-container-margin flex justify-between items-center z-50">
<!-- Close Button (Top Left) -->
<button class="group flex items-center space-x-2 text-secondary hover:text-primary transition-colors duration-200" onclick="window.history.back()">
<span class="material-symbols-outlined text-[24px]">close</span>
<span class="font-body text-body font-semibold">Exit Study</span>
</button>
<!-- Progress Indicator (Top Right) -->
<div class="flex items-center space-x-4">
<div class="flex flex-col items-end">
<span class="font-small text-small text-secondary">Advanced Algorithms</span>
<span class="font-body text-body font-bold text-primary">Card 3 of 12</span>
</div>
<div class="w-32 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-primary w-1/4 rounded-full transition-all duration-500"></div>
</div>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="w-full max-w-max-width-desktop px-container-margin flex flex-col items-center justify-center space-y-12">
<!-- Flashcard Container -->
<div class="perspective-1000 w-full max-w-xl aspect-[4/3] md:aspect-[3/2] cursor-pointer" onclick="flipCard()">
<div class="flip-card-inner preserve-3d relative w-full h-full" id="flashcard-inner">
<!-- Front Side: Question -->
<div class="backface-hidden absolute inset-0 bg-surface rounded-xl shadow-md border border-border flex flex-col items-center justify-center p-12 text-center">
<span class="bg-primary-container/10 text-primary px-3 py-1 rounded-full font-small text-small mb-8">Question</span>
<h2 class="font-section-heading text-section-heading md:text-headline-lg font-bold text-text-primary leading-tight">
                        What is the Time Complexity of Merge Sort?
                    </h2>
<div class="mt-12 text-secondary/60 flex flex-col items-center">
<span class="material-symbols-outlined text-[32px] mb-2 animate-bounce">touch_app</span>
<p class="font-small text-small">Tap to see answer</p>
</div>
</div>
<!-- Back Side: Answer -->
<div class="backface-hidden rotate-y-180 absolute inset-0 bg-surface rounded-xl shadow-md border border-border flex flex-col items-center justify-center p-12 text-center">
<span class="bg-success/10 text-success px-3 py-1 rounded-full font-small text-small mb-8">Correct Answer</span>
<h2 class="font-section-heading text-section-heading md:text-headline-lg font-bold text-primary leading-tight">
                        O(n log n)
                    </h2>
<p class="mt-6 font-body text-body text-secondary max-w-md mx-auto">
                        Merge Sort uses a divide-and-conquer approach. It divides the array into two halves, recursively sorts them, and then merges the sorted halves.
                    </p>
</div>
</div>
</div>
<!-- Controls Cluster -->
<div class="flex items-center space-x-6">
<!-- Previous Button -->
<button class="w-12 h-12 flex items-center justify-center rounded-full border border-border bg-surface text-secondary hover:bg-surface-container-low hover:text-primary transition-all duration-200">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<!-- Main Flip CTA -->
<button class="px-12 py-4 bg-primary text-on-primary rounded-xl font-body font-bold text-body shadow-lg hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center space-x-3" onclick="flipCard()">
<span class="material-symbols-outlined" id="flip-icon">refresh</span>
<span id="flip-text">Flip Card</span>
</button>
<!-- Next Button -->
<button class="w-12 h-12 flex items-center justify-center rounded-full border border-border bg-surface text-secondary hover:bg-surface-container-low hover:text-primary transition-all duration-200">
<span class="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<!-- Bottom Feedback (Knowledge Rating) -->
<div class="pt-8 flex flex-col items-center space-y-4">
<p class="font-small text-small text-secondary">How well did you know this?</p>
<div class="flex space-x-4">
<button class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:border-error hover:bg-error/5 transition-colors text-secondary hover:text-error">
<span class="material-symbols-outlined text-[20px]">sentiment_very_dissatisfied</span>
<span class="font-small text-small font-semibold">Forgot</span>
</button>
<button class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:border-warning hover:bg-warning/5 transition-colors text-secondary hover:text-warning">
<span class="material-symbols-outlined text-[20px]">sentiment_neutral</span>
<span class="font-small text-small font-semibold">Partial</span>
</button>
<button class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:border-success hover:bg-success/5 transition-colors text-secondary hover:text-success">
<span class="material-symbols-outlined text-[20px]">sentiment_very_satisfied</span>
<span class="font-small text-small font-semibold">Mastered</span>
</button>
</div>
</div>
</main>
<!-- Side Decoration (Minimalist Atmosphere) -->
<div class="fixed bottom-10 left-10 pointer-events-none opacity-10 hidden lg:block">
<div class="w-64 h-64 bg-primary rounded-full blur-[100px]"></div>
</div>
<div class="fixed top-20 right-10 pointer-events-none opacity-5 hidden lg:block">
<div class="w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
</div>
<!-- AI Tutor Mini-Drawer Hint -->
<div class="fixed bottom-8 right-8 z-50">
<button class="flex items-center space-x-3 bg-surface border border-border shadow-md px-6 py-3 rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
<div class="w-2 h-2 rounded-full bg-success animate-pulse"></div>
<span class="font-body text-body font-semibold text-text-primary">Ask AI Tutor</span>
<span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">smart_toy</span>
</button>
</div>
<script>
        function flipCard() {
            const card = document.getElementById('flashcard-inner');
            const flipText = document.getElementById('flip-text');
            const flipIcon = document.getElementById('flip-icon');

    card.classList.toggle('is-flipped');

    if (card.classList.contains('is-flipped')) {
                flipText.textContent = 'See Question';
                flipIcon.style.transform = 'rotate(180deg)';
            } else {
                flipText.textContent = 'Flip Card';
                flipIcon.style.transform = 'rotate(0deg)';
            }
        }

    // Add keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                flipCard();
            }
            if (e.code === 'ArrowRight') {
                // Logic for next card
                console.log('Next card');
            }
            if (e.code === 'ArrowLeft') {
                // Logic for previous card
                console.log('Previous card');
            }
        });`</script>`

</body></html>
