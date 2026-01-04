// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { TaskProvider } from './context/TaskContext';

// createRoot(document.getElementById("root")).render(
//   // <StrictMode>
//   //   <App />
//   // </StrictMode>

//     <React.StrictMode>
//     <TaskProvider>
//       <App />
//     </TaskProvider>
//   </React.StrictMode>
// );



import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TaskProvider } from './context/TaskContext'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
)