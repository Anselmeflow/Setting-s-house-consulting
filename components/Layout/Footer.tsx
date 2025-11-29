
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-shc-dark text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-heading font-bold text-2xl text-white">SHC</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Accompagnement digital sur mesure pour le secteur informel et les particuliers. 
              Nous transformons vos idées en solutions numériques.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-shc-orange transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-shc-blue transition"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-shc-yellow">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-white transition">Développement No-Code</a></li>
              <li><a href="#services" className="hover:text-white transition">Agents IA & Automatisation</a></li>
              <li><a href="#services" className="hover:text-white transition">Design UI/UX</a></li>
              <li><a href="#services" className="hover:text-white transition">Maintenance Réseau</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-shc-yellow">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center"><Phone size={16} className="mr-2 text-shc-blue" /> +242 056547399</li>
              <li className="flex items-center"><Mail size={16} className="mr-2 text-shc-blue" /> settingshouseconsulting0@gmail.com</li>
              <li className="flex items-center"><MapPin size={16} className="mr-2 text-shc-blue" /> Brazzaville, Congo</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-shc-yellow">Sécurité</h3>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
               <div className="flex items-center mb-2">
                 <ShieldCheck className="text-shc-green mr-2" />
                 <span className="font-bold text-sm">Navigation Sécurisée</span>
               </div>
               <p className="text-xs text-gray-400">
                 Vos données sont protégées par des protocoles de sécurité avancés. SHC s'engage pour la confidentialité de vos projets.
               </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Setting's House Consulting. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-500">
            <a href="#" className="hover:text-white">Mentions Légales</a>
            <a href="#" className="hover:text-white">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
