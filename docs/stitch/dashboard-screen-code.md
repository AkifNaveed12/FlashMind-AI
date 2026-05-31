<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>FlashMind AI Dashboard</title>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<!-- Google Fonts: Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
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
                      "primary": "#4F46E5",
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
                      "xl": "1rem",
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
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            vertical-align: middle;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    .card-inner {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
        }
        .card-container:hover .card-inner {
            transform: translateY(-4px);
        }`</style>`

</head>
<body class="bg-background font-body text-text-primary min-h-screen">
<!-- TopNavBar (Simplified) -->
<header class="bg-surface docked full-width top-0 sticky z-50 border-b border-border">
<div class="flex justify-between items-center h-[72px] px-container-margin w-full max-w-max-width-desktop mx-auto">
<div class="flex items-center gap-8">
<span class="text-card-title font-card-title font-bold text-primary">FlashMind AI</span>
<nav class="flex items-center gap-6">
<a class="text-primary font-bold border-b-2 border-primary pb-1 font-body text-body whitespace-nowrap" href="#">Dashboard</a>
<a class="text-secondary hover:text-primary-hover transition-colors font-body text-body whitespace-nowrap" href="#">Study Mode</a>
</nav>
</div>
<div class="flex items-center gap-2 md:gap-4">
<button class="p-2 text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-surface-container-high ml-2 hidden sm:block">
<img alt="User profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpYUMji3xYYdyoO_Okd7-_7hWZfO0grhAyBjtNbI3ENKqrUwE63z_69YlPT7SPBd6pibuQKSBIbhjpOJehWUoexYx8mQvgY_LMW4BL72F4TkjOLdLFjrtrDU_-9RKWLQ9BtlHvKx0vRhr4ggKPoOzh5cxDTa8BjYFA30F8HrgMrwfX0JaK_czYLtYd3hQ0zR7kZcbYEmG9-AQRZboWrrsaHYm3-XW9J18FoF5krbLqWrBkHDpmP73-3TrSuteJaxJ_KIRr8P5kGyIX"/>
</div>
</div>
</div>
</header>
<main class="max-w-max-width-desktop mx-auto px-container-margin py-8">
<!-- Quick Actions Section -->
<section class="mb-12">
<h2 class="font-section-heading text-section-heading mb-6">Quick Actions</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
<button class="flex items-center gap-4 bg-primary text-on-primary p-6 rounded-xl shadow-sm hover:bg-primary-hover transition-all text-left">
<div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-[28px]" data-icon="add_circle">add_circle</span>
</div>
<div>
<h4 class="font-card-title text-card-title">Create Flashcard</h4>
<p class="text-sm opacity-90">Add new material to study</p>
</div>
</button>
<button class="flex items-center gap-4 bg-surface border border-border p-6 rounded-xl shadow-sm hover:border-primary hover:shadow-md transition-all text-left group">
<div class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-[28px]" data-icon="play_circle">play_circle</span>
</div>
<div>
<h4 class="font-card-title text-card-title">Start Study Session</h4>
<p class="text-secondary text-sm">Jump back into your queue</p>
</div>
</button>
<button class="flex items-center gap-4 bg-surface border border-border p-6 rounded-xl shadow-sm hover:border-primary hover:shadow-md transition-all text-left group">
<div class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined text-[28px]" data-icon="shuffle">shuffle</span>
</div>
<div>
<h4 class="font-card-title text-card-title">Review Random Card</h4>
<p class="text-secondary text-sm">Quick knowledge check</p>
</div>
</button>
</div>
</section>
<!-- Search Section -->
<section class="max-w-2xl mx-auto mb-10">
<div class="relative group">
<div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-secondary" data-icon="search">search</span>
</div>
<input class="w-full bg-surface border-border border rounded-full py-4 pl-12 pr-6 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 font-body text-body group-hover:shadow-md" placeholder="Search your flashcards or ask AI..." type="text"/>
</div>
</section>
<!-- Filter Section -->
<section class="mb-10">
<div class="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
<button class="px-6 py-2 bg-primary text-on-primary rounded-full font-small text-small whitespace-nowrap shadow-sm hover:bg-primary-hover transition-all">All</button>
<button class="px-6 py-2 bg-surface border border-border text-secondary rounded-full font-small text-small whitespace-nowrap hover:border-primary hover:text-primary transition-all">Computer Science</button>
<button class="px-6 py-2 bg-surface border border-border text-secondary rounded-full font-small text-small whitespace-nowrap hover:border-primary hover:text-primary transition-all">Biology</button>
<button class="px-6 py-2 bg-surface border border-border text-secondary rounded-full font-small text-small whitespace-nowrap hover:border-primary hover:text-primary transition-all">History</button>
<button class="px-6 py-2 bg-surface border border-border text-secondary rounded-full font-small text-small whitespace-nowrap hover:border-primary hover:text-primary transition-all">Languages</button>
<button class="px-6 py-2 bg-surface border border-border text-secondary rounded-full font-small text-small whitespace-nowrap hover:border-primary hover:text-primary transition-all">Physics</button>
<button class="px-6 py-2 bg-surface border border-border text-secondary rounded-full font-small text-small whitespace-nowrap hover:border-primary hover:text-primary transition-all">Psychology</button>
</div>
</section>
<!-- Flashcard Grid -->
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
<!-- Card 1 -->
<div class="card-container bg-surface rounded-xl p-6 shadow-sm border border-border flex flex-col justify-between card-inner transition-all hover:shadow-lg">
<div>
<div class="flex justify-between items-start mb-4">
<div class="flex items-center gap-2">
<span class="px-3 py-1 bg-primary-container/10 text-primary rounded-lg font-bold text-[12px]">Computer Science</span>
<span class="text-secondary font-medium text-[12px]">12 Cards</span>
</div>
<div class="flex gap-1.5 items-center">
<button class="text-secondary hover:text-primary transition-colors p-1" title="Voice Explanation">
<span class="material-symbols-outlined text-[20px]" data-icon="volume_up">volume_up</span>
</button>
<button class="text-secondary hover:text-primary transition-colors p-1">
<span class="material-symbols-outlined text-[20px]" data-icon="edit">edit</span>
</button>
<button class="text-secondary hover:text-error transition-colors p-1">
<span class="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
</div>
<h3 class="font-card-title text-card-title text-text-primary mb-3">Data Structures</h3>
<p class="text-secondary font-body text-body line-clamp-2">Explain the primary difference between an Array and a Linked List in terms of memory allocation.</p>
</div>
<div class="mt-8 flex gap-3">
<button class="flex-1 bg-primary text-on-primary py-2.5 rounded-lg font-small text-small font-bold hover:bg-primary-hover transition-all shadow-sm flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="school">school</span>
                    Study
                </button>
<button class="flex-1 border-2 border-primary/20 text-primary py-2.5 rounded-lg font-small text-small font-bold hover:bg-primary/5 hover:border-primary/40 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="smart_toy">smart_toy</span>
                    AI Tutor
                </button>
</div>
</div>
<!-- Card 2 -->
<div class="card-container bg-surface rounded-xl p-6 shadow-sm border border-border flex flex-col justify-between card-inner transition-all hover:shadow-lg">
<div>
<div class="flex justify-between items-start mb-4">
<div class="flex items-center gap-2">
<span class="px-3 py-1 bg-primary-container/10 text-primary rounded-lg font-bold text-[12px]">Computer Science</span>
<span class="text-secondary font-medium text-[12px]">8 Cards</span>
</div>
<div class="flex gap-1.5 items-center">
<button class="text-secondary hover:text-primary transition-colors p-1" title="Voice Explanation">
<span class="material-symbols-outlined text-[20px]" data-icon="volume_up">volume_up</span>
</button>
<button class="text-secondary hover:text-primary transition-colors p-1">
<span class="material-symbols-outlined text-[20px]" data-icon="edit">edit</span>
</button>
<button class="text-secondary hover:text-error transition-colors p-1">
<span class="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
</div>
<h3 class="font-card-title text-card-title text-text-primary mb-3">Time Complexity</h3>
<p class="text-secondary font-body text-body line-clamp-2">What is the Big O notation for a Binary Search algorithm and why?</p>
</div>
<div class="mt-8 flex gap-3">
<button class="flex-1 bg-primary text-on-primary py-2.5 rounded-lg font-small text-small font-bold hover:bg-primary-hover transition-all shadow-sm flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="school">school</span>
                    Study
                </button>
<button class="flex-1 border-2 border-primary/20 text-primary py-2.5 rounded-lg font-small text-small font-bold hover:bg-primary/5 hover:border-primary/40 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="smart_toy">smart_toy</span>
                    AI Tutor
                </button>
</div>
</div>
<!-- Card 3 -->
<div class="card-container bg-surface rounded-xl p-6 shadow-sm border border-border flex flex-col justify-between card-inner transition-all hover:shadow-lg">
<div>
<div class="flex justify-between items-start mb-4">
<div class="flex items-center gap-2">
<span class="px-3 py-1 bg-primary-container/10 text-primary rounded-lg font-bold text-[12px]">Computer Science</span>
<span class="text-secondary font-medium text-[12px]">15 Cards</span>
</div>
<div class="flex gap-1.5 items-center">
<button class="text-secondary hover:text-primary transition-colors p-1" title="Voice Explanation">
<span class="material-symbols-outlined text-[20px]" data-icon="volume_up">volume_up</span>
</button>
<button class="text-secondary hover:text-primary transition-colors p-1">
<span class="material-symbols-outlined text-[20px]" data-icon="edit">edit</span>
</button>
<button class="text-secondary hover:text-error transition-colors p-1">
<span class="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
</div>
<h3 class="font-card-title text-card-title text-text-primary mb-3">Graph Theory</h3>
<p class="text-secondary font-body text-body line-clamp-2">Define Dijkstra's Algorithm and its application in modern network routing.</p>
</div>
<div class="mt-8 flex gap-3">
<button class="flex-1 bg-primary text-on-primary py-2.5 rounded-lg font-small text-small font-bold hover:bg-primary-hover transition-all shadow-sm flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="school">school</span>
                    Study
                </button>
<button class="flex-1 border-2 border-primary/20 text-primary py-2.5 rounded-lg font-small text-small font-bold hover:bg-primary/5 hover:border-primary/40 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]" data-icon="smart_toy">smart_toy</span>
                    AI Tutor
                </button>
</div>
</div>
</section>
<!-- Empty State Section -->
<section class="py-16 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center bg-surface/50 mb-24">
<div class="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-4">
<span class="material-symbols-outlined text-outline text-[32px]" data-icon="style">style</span>
</div>
<h3 class="font-section-heading text-section-heading mb-2">No Flashcards Yet</h3>
<p class="text-secondary font-body text-body max-w-sm">Create your first flashcard to begin learning.</p>
<button class="mt-6 px-6 py-2.5 bg-primary text-on-primary rounded-lg font-bold text-small hover:bg-primary-hover transition-all shadow-sm">
            Create First Card
        </button>
</section>
</main>
<!-- Floating Action Button (Updated) -->
<button class="fixed bottom-8 right-8 h-16 px-6 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all z-40 group">
<span class="material-symbols-outlined text-[32px] group-hover:rotate-90 transition-transform duration-300" data-icon="add">add</span>
<span class="font-bold whitespace-nowrap">New Card</span>
</button>
<!-- Bottom Nav for Mobile -->
<footer class="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-6 py-3 flex justify-around items-center z-50">
<button class="flex flex-col items-center gap-1 text-primary">
<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="text-[10px] font-bold">Home</span>
</button>
<button class="flex flex-col items-center gap-1 text-secondary">
<span class="material-symbols-outlined" data-icon="play_circle">play_circle</span>
<span class="text-[10px]">Study</span>
</button>
<button class="flex flex-col items-center gap-1 text-secondary">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="text-[10px]">Settings</span>
</button>
</footer>
<script>
    // Micro-interaction for hover effects on cards
    const cards = document.querySelectorAll('.card-container');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('scale-[1.01]');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('scale-[1.01]');
        });
    });

    // Simple search feedback
    const searchInput = document.querySelector('input[type="text"]');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            if(e.target.value.length > 0) {
                searchInput.classList.add('border-primary');
            } else {
                searchInput.classList.remove('border-primary');
            }
        });
    }`</script>`

</body></html>
