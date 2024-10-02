import React from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ContextProvider } from './contexts/ContextProvider.jsx'
import ChatWidget from './components/ChatWidget.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <ContextProvider>
      <ChatWidget /> 
      <RouterProvider router={router} />
    </ContextProvider>
  
)
