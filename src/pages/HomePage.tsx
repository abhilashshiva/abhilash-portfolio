import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { NeuralPlayground } from '../components/NeuralPlayground';
import { AnomalyHunter } from '../components/AnomalyHunter';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Skills } from '../components/Skills';
import { EducationCertifications } from '../components/EducationCertifications';
import { Contact } from '../components/Contact';

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="w-full">
      <Hero />
      <FeaturedProjects />
      <NeuralPlayground />
      <AnomalyHunter />
      <About />
      <Experience />
      <Skills />
      <EducationCertifications />
      <Contact />
    </main>
  );
};
