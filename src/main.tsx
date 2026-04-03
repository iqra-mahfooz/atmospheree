import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MoodProvider } from '@/hooks/useMood.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoodProvider>
      <App />
    </MoodProvider>
  </StrictMode>,
)
