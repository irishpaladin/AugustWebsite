// ------------------------------
```bash
# 1) Install dependencies
npm install


# 2) Start the dev server
npm run dev
# Open the URL shown in the terminal (usually http://localhost:5173)


# 3) Build for production
npm run build


# 4) Preview the production build locally
npm run preview
```


## Scripts
- `npm run dev` – start Vite dev server with HMR
- `npm run build` – production build to `dist/`
- `npm run preview` – serve the built site locally


## Tech Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Lucide icons
- Framer Motion (optional)


## Configuration
- **Tailwind colors** live in `tailwind.config.ts` under the `pastel-*` keys.
- Path alias `@/*` points to `src/*` (see `tsconfig.json` and `vite.config.ts`).


## Troubleshooting
### 1) `Cannot find module 'react'`
Install React and React DOM:
```bash
npm install react react-dom
```


### 2) `Cannot find package '@vitejs/plugin-react'`
Install the Vite React plugin (dev dependency):
```bash
npm install -D @vitejs/plugin-react
```
Ensure `vite.config.ts` has:
```ts
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
```