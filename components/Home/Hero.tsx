import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-shc-lightblue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-shc-orange/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-shc-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-shc-blue"></span>
              </span>
              <span className="text-xs font-bold text-shc-blue uppercase tracking-wide">SHC Consulting</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 leading-tight">
              Transformez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-shc-blue to-shc-lightblue">Activité</span> avec le Digital
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 font-serif italic text-gray-500 max-w-lg">
              De l'idée à la réalisation : No-Code, Intelligence Artificielle et Design pour les entrepreneurs qui osent.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-shc-orange hover:bg-orange-600 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                Démarrer un projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#services" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:text-shc-blue transition">
                Découvrir nos services
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative hidden md:block animate-fade-in-left">
            <div className="absolute inset-0 bg-gradient-to-tr from-shc-blue to-shc-green opacity-20 rounded-2xl transform rotate-3 scale-105"></div>
            <img 
              src="https://picsum.photos/id/3/800/600" 
              alt="Consulting Team" 
              className="relative rounded-2xl shadow-2xl object-cover w-full h-[500px]" 
            />
            
            {/* Floating Card 1 */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Résultats Clients</p>
                  <p className="text-lg font-bold text-gray-900">+150% de Leads</p>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute top-10 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
               <div className="flex items-center space-x-2">
                 <div className="flex -space-x-2">
                   <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/id/1005/50/50" alt="" />
                   <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/id/1027/50/50" alt="" />
                   <img className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/id/64/50/50" alt="" />
                 </div>
                 <span className="text-sm font-bold text-gray-700">Experts dédiés</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;