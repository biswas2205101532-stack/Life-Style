# LIFE STYLE
npm install · npm run dev · npm run build (output in dist/, static; uses HashRouter so any static host works: Netlify, Vercel, GitHub Pages).
Add a language: put its name in src/data/catalog.js (or use "Create custom learning path" in the app); opening it creates a 4-week roadmap you can edit.
Customize the C roadmap: edit src/data/seed.js. Data lives in localStorage key "lifestyle.v1" (src/utils/storage.js is the single place to swap for Supabase).
