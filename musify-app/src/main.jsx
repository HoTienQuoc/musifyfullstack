import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PlayerContextProvider } from './context/PlayerContext.jsx'
import { SearchContext } from './context/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PlayerContextProvider>
        <SearchContext>
          <App />
        </SearchContext>
      </PlayerContextProvider>
    </AuthProvider>
  </BrowserRouter>
)
