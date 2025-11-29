import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Play, Image as ImageIcon, X } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { data } = useData();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const activeProject = data.projects.find(p => p.id === selectedProject);

  return (
    <section id="projects" className="py-20 bg-shc-dark text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-shc-blue via-shc-orange to-shc-green"></div>
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-shc-blue font-bold tracking-wide uppercase text-sm mb-2">Réalisations</h2>
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Ils nous ont fait confiance
            </h3>
            <p className="text-gray-400">
              Découvrez comment nous avons aidé des entrepreneurs et particuliers à atteindre leurs objectifs grâce au digital.
            </p>
          </div>
          <a href="#contact" className="mt-4 md:mt-0 text-shc-orange hover:text-white transition font-bold text-sm flex items-center">
            Voir tous les projets <span className="ml-2">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project) => (
            <div 
                key={project.id} 
                className="group relative rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
            >
              <div className="aspect-video bg-gray-800">
                <img 
                    src={project.mediaUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500" 
                />
              </div>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition duration-300 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-full group-hover:scale-110 transition duration-300">
                    {project.mediaType === 'video' ? <Play className="text-white fill-current" /> : <ImageIcon className="text-white" />}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                <p className="text-shc-orange text-xs font-bold uppercase mb-1">{project.clientType}</p>
                <h4 className="text-xl font-bold font-heading text-white">{project.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Project Details */}
      {selectedProject && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
                <div className="md:w-1/2 h-64 md:h-auto bg-gray-900 relative">
                     <img 
                        src={activeProject.mediaUrl} 
                        alt={activeProject.title} 
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-shc-blue text-white text-xs px-2 py-1 rounded font-bold uppercase">
                            {activeProject.mediaType}
                        </span>
                    </div>
                </div>
                <div className="md:w-1/2 p-8 overflow-y-auto">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Client: {activeProject.clientType}</p>
                            <h3 className="text-2xl font-bold font-heading text-gray-900">{activeProject.title}</h3>
                        </div>
                        <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-900">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <h5 className="font-bold text-gray-900 mb-2">Le Défi</h5>
                            <p className="text-gray-600 text-sm">{activeProject.description}</p>
                        </div>
                        
                        <div>
                            <h5 className="font-bold text-gray-900 mb-2">La Solution & Résultat</h5>
                            <p className="text-gray-600 text-sm border-l-4 border-shc-green pl-4 italic">
                                {activeProject.result}
                            </p>
                        </div>

                        <div>
                            <h5 className="font-bold text-gray-900 mb-2">Technologies</h5>
                            <div className="flex flex-wrap gap-2">
                                {activeProject.tags.map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <button onClick={() => setSelectedProject(null)} className="w-full py-3 bg-shc-dark text-white rounded-lg hover:bg-gray-800 font-bold transition">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;