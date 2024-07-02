import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { UserContextProvider } from './Context/AlluserContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
