import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import Team from '../components/Home/Team';
import Portfolio from '../components/Home/Portfolio';
import ContactForm from '../components/Contact/ContactForm';
import Footer from '../components/Layout/Footer';
import AIAgent from '../components/AI/AIAgent';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Team />
      <Portfolio />
      <ContactForm />
      <Footer />
      <AIAgent />
    </div>
  );
};

export default Home;