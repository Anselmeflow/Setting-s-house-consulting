
import React from 'react';
import { useData } from '../../context/DataContext';
import { Smartphone, Bot, Palette, Server, Download, CheckCircle, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Smartphone': <Smartphone size={28} />,
  'Bot': <Bot size={28} />,
  'Palette': <Palette size={28} />,
  'Server': <Server size={28} />,
};

const Services: React.FC = () => {
  const { data } = useData();

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-shc-blue font-bold tracking-wide uppercase text-sm mb-2">Catalogue des Prestations</h2>
          <h3 className="font-heading text-4xl font-bold text-gray-900 mb-6">
            Nos Solutions
          </h3>
          <p className="text-gray-600 text-lg">
            Découvrez nos domaines d'expertise pour digitaliser votre activité.
          </p>
        </div>

        <div className="space-y-24 mb-24">
          {data.services.map((service, index) => (
            <div key={service.id} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group">
                    <div className={`absolute inset-0 bg-gradient-to-tr opacity-20 rounded-3xl transform rotate-3 transition duration-500 group-hover:rotate-6 ${index % 2 === 0 ? 'from-shc-blue to-transparent' : 'from-shc-orange to-transparent'}`}></div>
                    <img 
                        src={service.imageUrl} 
                        alt={service.title} 
                        className="relative rounded-3xl shadow-2xl w-full h-[350px] object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-3">
                        <div className={`p-3 rounded-full ${index % 2 === 0 ? 'bg-blue-50 text-shc-blue' : 'bg-orange-50 text-shc-orange'}`}>
                            {iconMap[service.icon]}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Budget estimé</p>
                            <p className="text-sm font-bold text-gray-900">{service.priceRange}</p>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6">
                    <h4 className="text-3xl font-heading font-bold text-gray-900 leading-tight">
                        {service.title}
                    </h4>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {service.description}
                    </p>
                    <ul className="space-y-3">
                        {['Accompagnement personnalisé', 'Technologie de pointe', 'Support réactif'].map((item, i) => (
                            <li key={i} className="flex items-center text-gray-700">
                                <CheckCircle className="text-shc-green mr-3" size={18} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="pt-4">
                        <a href="#contact" className="inline-flex items-center text-shc-blue font-bold hover:text-shc-dark transition">
                            Demander un devis pour ce service <ArrowRight size={18} className="ml-2" />
                        </a>
                    </div>
                </div>

            </div>
          ))}
        </div>

        {/* Download Catalogue Section */}
        <div className="bg-shc-dark rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl text-center md:text-left">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-shc-orange/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-shc-blue/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">Catalogue Complet 2025</h3>
                    <p className="text-gray-400 max-w-xl">
                        Téléchargez notre brochure PDF détaillée incluant toutes nos offres, nos processus de travail et nos tarifs standards.
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <button 
                        onClick={() => alert("Le téléchargement du catalogue PDF démarrerait ici.")}
                        className="flex items-center bg-white text-shc-dark hover:bg-gray-100 px-8 py-4 rounded-xl font-bold transition transform hover:-translate-y-1 shadow-lg"
                    >
                        <Download size={20} className="mr-3" />
                        Télécharger PDF
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
