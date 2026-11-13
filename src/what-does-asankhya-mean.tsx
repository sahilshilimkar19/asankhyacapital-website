import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import MeaningApp from './MeaningApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeaningApp />
  </StrictMode>,
)
