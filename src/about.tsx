import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import AboutApp from './AboutApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AboutApp />
  </StrictMode>,
)
