import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StateContextProvider } from './Context/index.jsx'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import { AuthProvider, useAuth } from './Components/AuthContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <StateContextProvider>
      <ErrorBoundary>
        <AuthProvider>
        <App />
        </AuthProvider>
      </ErrorBoundary>
     </StateContextProvider>,
  </BrowserRouter>
)
