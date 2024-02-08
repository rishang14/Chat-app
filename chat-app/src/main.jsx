import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import {BrowserRouter} from "react-router-dom"
import './index.css'
import { AuthProvider } from './Context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render( 
    <AuthProvider>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
)
