import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SpaceBackground } from './components/SpaceBackground';
import { InteractiveCursor } from './components/InteractiveCursor';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col bg-light-bg dark:bg-[#050508] text-light-text dark:text-dark-text transition-colors duration-300">
          <SpaceBackground />
          <InteractiveCursor />
          <div className="relative z-10 flex flex-col min-h-screen pointer-events-auto">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
