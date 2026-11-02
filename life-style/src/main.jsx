import React from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'
import App from './App'
import {Provider} from './context/Store'
import './index.css'
createRoot(document.getElementById('root')).render(<HashRouter><Provider><App/></Provider></HashRouter>)
