import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AppKitProvider } from './App.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppKitProvider>
        <App />
      </AppKitProvider>
  </StrictMode>
)
