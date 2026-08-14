import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import ContactApp from './ContactApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContactApp />
  </StrictMode>,
)
