import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import PhilosophyApp from './PhilosophyApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PhilosophyApp />
  </StrictMode>,
)
