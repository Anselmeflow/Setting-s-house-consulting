
import React from 'react';
import { useData } from '../../context/DataContext';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const Team: React.FC = () => {
  const { data } = useData();

  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-shc-blue font-bold tracking-wide uppercase text-sm mb-2">L'équipe SHC</h2>
            <h3 className="font-heading text-4xl font-bold text-gray-900">
                Nos Experts
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.team.map((member) => (
            <div key={member.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
               <div className="relative h-80 overflow-hidden bg-gray-200">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition duration-300">
                      <p className="text-shc-orange font-bold text-xs uppercase tracking-widest mb-1">{member.role}</p>
                      <h4 className="text-2xl font-heading font-bold text-white mb-4">{member.name}</h4>
                      
                      <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition duration-500 delay-100">
                          <a href="#" className="p-2 bg-white/20 hover:bg-shc-blue text-white rounded-full backdrop-blur-sm transition">
                              <Linkedin size={16} />
                          </a>
                          <a href={`mailto:${member.id}@shc.com`} className="p-2 bg-white/20 hover:bg-shc-orange text-white rounded-full backdrop-blur-sm transition">
                              <Mail size={16} />
                          </a>
                      </div>
                  </div>
               </div>
               
               <div className="p-6 flex-1 flex flex-col justify-between">
                   <p className="text-gray-600 text-sm leading-relaxed mb-4">
                       {member.bio}
                   </p>
                   <div className="flex flex-wrap gap-2">
                       {member.specialties.slice(0, 3).map((tag, idx) => (
                           <span key={idx} className="text-[10px] uppercase font-bold text-gray-400 border border-gray-100 px-2 py-1 rounded">
                               {tag}
                           </span>
                       ))}
                   </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
