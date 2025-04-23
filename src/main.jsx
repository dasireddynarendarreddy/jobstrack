import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import NavBar from './JobComp/NavBar.jsx';
import UI from './AllRoutes/UI.jsx';
createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <UI/>
 </BrowserRouter>
)
