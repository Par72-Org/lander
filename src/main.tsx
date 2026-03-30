import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';

const Projects = lazy(() => import('./pages/Projects'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<div className="min-h-screen bg-white" />}>
              <Projects />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
