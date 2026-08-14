import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import TeamApp from './TeamApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TeamApp />
  </StrictMode>,
)
