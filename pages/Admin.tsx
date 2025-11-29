
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Folder, MessageSquare, LayoutGrid, Save, Shield, UserPlus, LogOut, Check, X, Lock, Bot, Database, Send, Loader2, FileSpreadsheet, Plus, Trash2, Image as ImageIcon, Calendar, Mail, FileText, HardDrive } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { generateAdminAIResponse } from '../services/gemini';
import { ChatMessage, TeamMember, Service, Project } from '../types';

// Simple mock for session persistence
const SESSION_KEY = 'shc_admin_session';
const MANAGER_PASSWORD = '@anselme2005';

const Admin: React.FC = () => {
  const { 
    data, 
    updateService, addService, deleteService,
    updateTeamMember, addTeamMember, deleteTeamMember,
    updateProject, addProject, deleteProject,
    resetData 
  } = useData();
  
  const [activeTab, setActiveTab] = useState<'services' | 'team' | 'projects' | 'leads' | 'settings' | 'ai_assistant'>('leads');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Super Admin role
  const [loginError, setLoginError] = useState('');
  
  // AI Assistant State
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const aiScrollRef = useRef<HTMLDivElement>(null);
  
  // Mock Google Sheets Connection State
  const [isWorkspaceConnected, setIsWorkspaceConnected] = useState(false);

  useEffect(() => {
      const savedSession = localStorage.getItem(SESSION_KEY);
      if (savedSession) {
          const session = JSON.parse(savedSession);
          // Re-verify super admin status on reload
          if (session.email.trim().toLowerCase() === CONTACT_INFO.adminEmail.toLowerCase()) {
              setIsAdmin(true);
          }
          setIsAuthenticated(true);
      }
  }, []);

  useEffect(() => {
      if (activeTab === 'ai_assistant' && aiMessages.length === 0) {
          setAiMessages([{
              id: 'init',
              role: 'model',
              text: "Bonjour Manager. Je suis connecté à l'écosystème Google Workspace de SHC. Je peux gérer votre Agenda, créer des Formulaires, organiser le Drive ou analyser vos Emails. Que voulez-vous faire ?",
              timestamp: new Date()
          }]);
      }
      if (activeTab === 'ai_assistant') {
          aiScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (password === MANAGER_PASSWORD) { 
      setIsAuthenticated(true);
      
      // Check if Super Admin
      if (email.trim().toLowerCase() === CONTACT_INFO.adminEmail.toLowerCase()) {
          setIsAdmin(true);
          localStorage.setItem(SESSION_KEY, JSON.stringify({ email: email, role: 'super_admin', timestamp: Date.now() }));
      } else {
          setIsAdmin(false);
          localStorage.setItem(SESSION_KEY, JSON.stringify({ email: email, role: 'admin', timestamp: Date.now() }));
      }
    } else {
      setLoginError('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setIsAdmin(false);
      localStorage.removeItem(SESSION_KEY);
      setEmail('');
      setPassword('');
  }

  const handleConnectWorkspace = () => {
      // Simulate Connection
      setIsWorkspaceConnected(true);
      setAiMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'model',
          text: "✅ Connexion à Google Workspace (Sheets, Drive, Calendar, Forms, Gmail) établie. Je suis prêt à exécuter vos tâches.",
          timestamp: new Date()
      }]);
  }

  const handleAiSend = async () => {
      if (!aiInput.trim()) return;

      const userMsg: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          text: aiInput,
          timestamp: new Date()
      };

      setAiMessages(prev => [...prev, userMsg]);
      setAiInput('');
      setAiLoading(true);

      // Context for AI
      const history = aiMessages.map(m => ({ role: m.role, text: m.text }));
      const response = await generateAdminAIResponse(history, userMsg.text, data);

      const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: response,
          timestamp: new Date()
      };

      setAiMessages(prev => [...prev, botMsg]);
      setAiLoading(false);
      aiScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // CRUD Handlers
  const handleAddMember = () => {
      const newMember: TeamMember = {
          id: Date.now().toString(),
          name: 'Nouveau Membre',
          role: 'Poste',
          bio: 'Biographie du membre...',
          imageUrl: 'https://picsum.photos/400/400',
          specialties: ['Compétence']
      };
      addTeamMember(newMember);
  };

  const handleAddService = () => {
      const newService: Service = {
          id: Date.now().toString(),
          title: 'Nouveau Service',
          description: 'Description du service...',
          category: 'No-Code',
          icon: 'Smartphone',
          imageUrl: 'https://picsum.photos/800/600',
          priceRange: '100.000 FCFA'
      };
      addService(newService);
  };

  const handleAddProject = () => {
      const newProject: Project = {
          id: Date.now().toString(),
          title: 'Nouveau Projet',
          clientType: 'Client Type',
          description: 'Description du projet...',
          result: 'Résultats...',
          mediaType: 'image',
          mediaUrl: 'https://picsum.photos/800/600',
          tags: ['Tag']
      };
      addProject(newProject);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-shc-blue relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-shc-blue via-shc-orange to-shc-green"></div>
          
          <div className="text-center mb-8">
             <div className="inline-block p-4 rounded-full bg-blue-50 mb-4 shadow-inner">
                 <Shield className="w-10 h-10 text-shc-blue" />
             </div>
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Administration SHC</h2>
            <p className="text-gray-500 text-sm mt-2">Accès sécurisé pour le management.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 tracking-wide">EMAIL PROFESSIONNEL</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@shc.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-shc-blue outline-none transition bg-gray-50 focus:bg-white text-gray-900"
                required
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-600 mb-1 tracking-wide">MOT DE PASSE</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-shc-blue outline-none transition bg-gray-50 focus:bg-white text-gray-900"
                required
                />
            </div>
            
            {loginError && (
                <div className="text-red-500 text-xs flex items-center justify-center">
                    <X size={12} className="mr-1" /> {loginError}
                </div>
            )}
            
            <button type="submit" className="w-full bg-shc-dark text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg mt-2 flex justify-center items-center">
              <Lock size={16} className="mr-2" /> Connexion Sécurisée
            </button>
            <Link to="/" className="block text-center text-sm text-gray-400 hover:text-shc-blue mt-6 transition">
              ← Retour au site public
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-shc-dark text-white hidden md:flex flex-col shadow-2xl z-10 sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold font-heading flex items-center">
             <Shield className="mr-2 text-shc-green" size={20} />
             SHC Admin
          </h2>
          <div className="mt-4 flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                  {isAdmin ? 'SA' : 'AD'}
              </div>
              <div className="overflow-hidden">
                  <p className="text-xs font-bold truncate w-32">
                      {isAdmin ? 'Anselme C.' : email.split('@')[0]}
                  </p>
                  <p className="text-[10px] text-shc-orange uppercase tracking-wider">
                      {isAdmin ? 'Super Admin' : 'Admin'}
                  </p>
              </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 py-6">
          <button 
            onClick={() => setActiveTab('ai_assistant')} 
            className={`w-full flex items-center p-3 rounded-lg transition text-sm font-bold ${activeTab === 'ai_assistant' ? 'bg-gradient-to-r from-shc-blue to-purple-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
          >
            <Bot size={18} className="mr-3" /> Assistant IA
          </button>
          <div className="h-px bg-gray-800 my-2 mx-2"></div>
          <button 
            onClick={() => setActiveTab('leads')} 
            className={`w-full flex items-center p-3 rounded-lg transition text-sm font-medium ${activeTab === 'leads' ? 'bg-gray-800 text-white shadow-lg border-l-4 border-shc-blue' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <MessageSquare size={18} className="mr-3" /> Leads & Messages
          </button>
          <button 
            onClick={() => setActiveTab('team')} 
            className={`w-full flex items-center p-3 rounded-lg transition text-sm font-medium ${activeTab === 'team' ? 'bg-gray-800 text-white shadow-lg border-l-4 border-shc-blue' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Users size={18} className="mr-3" /> Équipe
          </button>
          <button 
            onClick={() => setActiveTab('services')} 
            className={`w-full flex items-center p-3 rounded-lg transition text-sm font-medium ${activeTab === 'services' ? 'bg-gray-800 text-white shadow-lg border-l-4 border-shc-blue' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <LayoutGrid size={18} className="mr-3" /> Catalogue Services
          </button>
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`w-full flex items-center p-3 rounded-lg transition text-sm font-medium ${activeTab === 'projects' ? 'bg-gray-800 text-white shadow-lg border-l-4 border-shc-blue' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Folder size={18} className="mr-3" /> Projets
          </button>
        </nav>
        
        <div className="p-4 border-t border-gray-800 space-y-2">
             {isAdmin && (
                 <button 
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center text-xs p-2 rounded transition ${activeTab === 'settings' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                 >
                     <UserPlus size={14} className="mr-2" /> Gérer les Admins
                 </button>
             )}
            <button onClick={handleLogout} className="w-full flex items-center text-xs p-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 transition rounded">
                 <LogOut size={14} className="mr-2" /> Déconnexion
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen bg-gray-100 flex flex-col">
        <header className="flex justify-between items-center mb-8 shrink-0">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 capitalize font-heading flex items-center">
                    {activeTab === 'services' ? 'Catalogue & Services' : activeTab === 'ai_assistant' ? 'Assistant Manager IA' : activeTab}
                    {activeTab === 'ai_assistant' && <span className="ml-3 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200">Connecté</span>}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    {activeTab === 'ai_assistant' ? 'Contrôlez votre activité et vos données.' : 'Gérez le contenu de votre site vitrine en temps réel.'}
                </p>
            </div>
            <Link to="/" className="flex items-center text-shc-blue hover:text-shc-dark text-sm font-bold bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition">
                <ArrowLeft size={16} className="mr-2" /> Voir le site
            </Link>
        </header>

        {/* AI Assistant Tab */}
        {activeTab === 'ai_assistant' && (
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col animate-fade-in">
                {/* AI Header Actions - Google Workspace */}
                <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap justify-between items-center gap-4">
                     <div className="flex items-center space-x-2 text-xs text-gray-500 font-bold uppercase tracking-wider">
                        <span className="flex items-center"><Bot size={14} className="mr-1" /> Intégrations :</span>
                        <div className="flex space-x-1">
                            <span className="p-1.5 bg-white rounded shadow-sm" title="Google Calendar"><Calendar size={14} className="text-blue-500" /></span>
                            <span className="p-1.5 bg-white rounded shadow-sm" title="Gmail"><Mail size={14} className="text-red-500" /></span>
                            <span className="p-1.5 bg-white rounded shadow-sm" title="Google Sheets"><FileSpreadsheet size={14} className="text-green-500" /></span>
                            <span className="p-1.5 bg-white rounded shadow-sm" title="Google Drive"><HardDrive size={14} className="text-yellow-500" /></span>
                            <span className="p-1.5 bg-white rounded shadow-sm" title="Google Docs/Forms"><FileText size={14} className="text-blue-400" /></span>
                        </div>
                     </div>
                    <button 
                        onClick={handleConnectWorkspace}
                        disabled={isWorkspaceConnected}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${isWorkspaceConnected ? 'bg-green-100 text-green-700 cursor-default' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                    >
                        <Shield size={14} />
                        <span>{isWorkspaceConnected ? 'Google Workspace Connecté' : 'Autoriser Google Workspace'}</span>
                    </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/50">
                    {aiMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mx-2 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-gradient-to-br from-shc-blue to-purple-600 text-white'}`}>
                                    {msg.role === 'user' ? <Users size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl shadow-sm text-sm whitespace-pre-wrap ${
                                    msg.role === 'user' 
                                    ? 'bg-white border border-gray-200 text-gray-800 rounded-tr-none' 
                                    : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    {aiLoading && (
                         <div className="flex justify-start">
                             <div className="flex flex-row">
                                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-shc-blue to-purple-600 text-white flex items-center justify-center mx-2">
                                     <Loader2 size={16} className="animate-spin" />
                                 </div>
                                 <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none text-xs text-gray-500 italic">
                                     L'agent interroge les services Google...
                                 </div>
                             </div>
                         </div>
                    )}
                    <div ref={aiScrollRef} />
                </div>
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex space-x-2">
                        <input 
                            type="text" 
                            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-shc-blue outline-none bg-gray-50 focus:bg-white transition text-black font-medium"
                            placeholder="Ex: 'Crée un RDV demain à 14h', 'Analyse les derniers leads'..."
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                        />
                        <button 
                            onClick={handleAiSend}
                            disabled={aiLoading || !aiInput.trim()}
                            className="bg-shc-blue text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in flex flex-col h-full">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h3 className="font-bold text-gray-700">Demandes récentes</h3>
                    <span className="text-xs bg-shc-blue text-white px-3 py-1 rounded-full font-bold">{data.leads.length} messages</span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Heure</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Prospect</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.leads.length === 0 ? (
                        <tr><td colSpan={4} className="p-12 text-center text-gray-400 italic">Aucune demande reçue pour le moment.</td></tr>
                    ) : (
                        data.leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50 transition group">
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                <div className="font-bold">{new Date(lead.date).toLocaleDateString()}</div>
                                <div className="text-gray-400">{new Date(lead.date).toLocaleTimeString()}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-shc-blue to-shc-lightblue flex items-center justify-center text-white font-bold text-xs mr-3">
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">{lead.name}</div>
                                        <div className="text-xs text-gray-500">{lead.email}</div>
                                        {lead.phone && <div className="text-xs text-shc-orange">{lead.phone}</div>}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${lead.source === 'ai_agent' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                    {lead.source}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                                <p className="line-clamp-2 group-hover:line-clamp-none transition-all">{lead.message}</p>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
                </table>
            </div>
          </div>
        )}

        {/* Team Tab (Editable) */}
        {activeTab === 'team' && (
            <div className="space-y-6 animate-fade-in pb-10">
                <div className="flex justify-end">
                    <button 
                        onClick={handleAddMember}
                        className="flex items-center bg-shc-green text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition shadow-lg"
                    >
                        <Plus size={16} className="mr-2" /> Ajouter un membre
                    </button>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                    {data.team.map(member => (
                        <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-md transition relative group">
                             {/* Delete Button */}
                             <button 
                                onClick={() => deleteTeamMember(member.id)}
                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 z-10"
                                title="Supprimer ce membre"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="w-full md:w-40 h-40 rounded-xl overflow-hidden bg-gray-100 shadow-inner flex-shrink-0 relative group/img">
                                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition p-2">
                                    <ImageIcon size={16} className="text-white mb-2" />
                                    <span className="text-white text-[10px] font-bold mb-2">URL de la photo</span>
                                    <input 
                                        type="text" 
                                        className="w-full text-xs p-1 rounded bg-white/90 text-black outline-none"
                                        value={member.imageUrl}
                                        onChange={(e) => updateTeamMember({...member, imageUrl: e.target.value})}
                                        onClick={(e) => e.stopPropagation()}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div className="flex-1 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Nom Complet</label>
                                        <input 
                                            className="w-full border-b-2 border-gray-100 focus:border-shc-blue py-2 text-base font-bold text-gray-800 outline-none bg-transparent transition-colors"
                                            value={member.name}
                                            onChange={(e) => updateTeamMember({...member, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Poste / Rôle</label>
                                        <input 
                                            className="w-full border-b-2 border-gray-100 focus:border-shc-blue py-2 text-base text-gray-600 outline-none bg-transparent transition-colors"
                                            value={member.role}
                                            onChange={(e) => updateTeamMember({...member, role: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Biographie</label>
                                    <textarea 
                                        className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 focus:ring-2 focus:ring-shc-blue focus:border-transparent outline-none transition"
                                        rows={3}
                                        value={member.bio}
                                        onChange={(e) => updateTeamMember({...member, bio: e.target.value})}
                                    />
                                </div>
                                 <div className="flex justify-end">
                                    <button className="flex items-center text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                                        <Check size={12} className="mr-1" /> Enregistré
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Services Tab (Editable) */}
        {activeTab === 'services' && (
             <div className="space-y-6 animate-fade-in pb-10">
                 <div className="flex justify-end">
                    <button 
                        onClick={handleAddService}
                        className="flex items-center bg-shc-green text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition shadow-lg"
                    >
                        <Plus size={16} className="mr-2" /> Ajouter un service
                    </button>
                </div>

                 <div className="grid grid-cols-1 gap-6">
                 {data.services.map(service => (
                     <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group hover:border-shc-blue/30 transition">
                         <button 
                            onClick={() => deleteService(service.id)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 z-10"
                            title="Supprimer ce service"
                         >
                            <Trash2 size={16} />
                         </button>

                         <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative group/img">
                                <img src={service.imageUrl} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition p-2">
                                    <ImageIcon size={16} className="text-white mb-2" />
                                    <span className="text-white text-[10px] font-bold mb-1">Image URL</span>
                                    <input 
                                        type="text" 
                                        className="w-full text-xs p-1 rounded bg-white/90 text-black outline-none"
                                        value={service.imageUrl}
                                        onChange={(e) => updateService({...service, imageUrl: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                 <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Titre du service</label>
                                 <input 
                                     className="w-full font-bold text-lg text-gray-900 border-b-2 border-gray-100 focus:border-shc-blue outline-none py-2 transition-colors"
                                     value={service.title}
                                     onChange={(e) => updateService({...service, title: e.target.value})}
                                 />
                                 
                                 <div className="mt-4">
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Description</label>
                                    <textarea 
                                        className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 focus:ring-2 focus:ring-shc-blue outline-none"
                                        value={service.description}
                                        onChange={(e) => updateService({...service, description: e.target.value})}
                                        rows={2}
                                    />
                                 </div>
                            </div>
                            <div className="md:w-1/3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                 <label className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Tarif / Fourchette</label>
                                 <input 
                                     className="w-full bg-white text-lg text-shc-green font-bold border border-gray-200 rounded px-3 py-2 focus:ring-2 focus:ring-shc-green outline-none"
                                     value={service.priceRange || ''}
                                     onChange={(e) => updateService({...service, priceRange: e.target.value})}
                                     placeholder="ex: 100.000 FCFA"
                                 />
                                 <p className="text-[10px] text-gray-400 mt-2">Ce prix sera affiché bien en évidence sur le catalogue.</p>
                            </div>
                         </div>
                     </div>
                 ))}
                 </div>
             </div>
        )}
        
        {/* Projects Tab (Editable) */}
        {activeTab === 'projects' && (
             <div className="space-y-6 animate-fade-in pb-10">
                 <div className="flex justify-end">
                    <button 
                        onClick={handleAddProject}
                        className="flex items-center bg-shc-green text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition shadow-lg"
                    >
                        <Plus size={16} className="mr-2" /> Ajouter un projet
                    </button>
                </div>

                 <div className="grid grid-cols-1 gap-6">
                 {data.projects.map(project => (
                     <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 relative group">
                          <button 
                            onClick={() => deleteProject(project.id)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 z-10"
                            title="Supprimer ce projet"
                         >
                            <Trash2 size={16} />
                         </button>

                         <div className="w-full md:w-64 h-40 bg-gray-100 rounded-lg overflow-hidden relative group/img flex-shrink-0">
                            <img src={project.mediaUrl} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition p-2">
                                <span className="text-white text-xs font-bold mb-2">URL Media</span>
                                <input 
                                    type="text" 
                                    className="w-full text-xs p-1 rounded bg-white/90 text-black outline-none"
                                    value={project.mediaUrl}
                                    onChange={(e) => updateProject({...project, mediaUrl: e.target.value})}
                                />
                            </div>
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                                {project.mediaType}
                            </div>
                         </div>
                         <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                 <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Nom du projet</label>
                                    <input 
                                        className="w-full font-bold text-lg border-b border-gray-200 focus:border-shc-blue outline-none py-1"
                                        value={project.title}
                                        onChange={(e) => updateProject({...project, title: e.target.value})}
                                    />
                                 </div>
                                 <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Client Type</label>
                                    <input 
                                        className="w-full text-sm border-b border-gray-200 focus:border-shc-blue outline-none py-1"
                                        value={project.clientType}
                                        onChange={(e) => updateProject({...project, clientType: e.target.value})}
                                    />
                                 </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Description</label>
                                <textarea 
                                    className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 focus:ring-1 focus:ring-shc-blue outline-none h-20"
                                    value={project.description}
                                    onChange={(e) => updateProject({...project, description: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Résultat Obtenu</label>
                                <input 
                                    className="w-full text-sm text-shc-green italic border-b border-gray-200 focus:border-shc-green outline-none py-1"
                                    value={project.result}
                                    onChange={(e) => updateProject({...project, result: e.target.value})}
                                />
                            </div>
                         </div>
                     </div>
                 ))}
                 </div>
             </div>
        )}

        {/* Settings Tab (Super Admin Only) */}
        {activeTab === 'settings' && isAdmin && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <UserPlus className="mr-2" /> Gestion des Administrateurs
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                    En tant que Super Admin ({CONTACT_INFO.adminEmail}), vous seul pouvez nommer de nouveaux administrateurs.
                </p>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Shield className="h-5 w-5 text-shc-blue" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Admin Principal</h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>{CONTACT_INFO.adminEmail}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-bold text-sm text-gray-700 mb-4">Ajouter un collaborateur</h4>
                    <div className="flex gap-4">
                        <input 
                            type="email" 
                            placeholder="Email du nouvel admin" 
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-shc-blue outline-none"
                        />
                         <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-shc-blue outline-none">
                             <option value="editor">Admin (Accès contenu)</option>
                         </select>
                        <button className="bg-shc-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800">
                            Donner Accès
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 italic">L'utilisateur pourra se connecter avec le mot de passe Manager.</p>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
