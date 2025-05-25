import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PracticeProblems from './components/PracticeProblems';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PracticeProblems />
      <Footer />
    </main>
  );
} 