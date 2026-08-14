import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import ResearchApp from './ResearchApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ResearchApp />
  </StrictMode>,
)
