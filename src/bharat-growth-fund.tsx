import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import FundApp from './FundApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FundApp />
  </StrictMode>,
)
