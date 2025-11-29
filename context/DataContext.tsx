import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, Lead, Project, Service, TeamMember, Testimonial } from '../types';
import { INITIAL_DATA } from '../constants';

interface DataContextType {
  data: AppData;
  updateService: (service: Service) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  updateTeamMember: (member: TeamMember) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addLead: (lead: Lead) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(INITIAL_DATA);

  // Load from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('shc_app_data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('shc_app_data', JSON.stringify(data));
  }, [data]);

  // --- SERVICES ---
  const updateService = (updatedService: Service) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === updatedService.id ? updatedService : s)
    }));
  };

  const addService = (service: Service) => {
    setData(prev => ({
      ...prev,
      services: [...prev.services, service]
    }));
  };

  const deleteService = (id: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  // --- TEAM ---
  const updateTeamMember = (updatedMember: TeamMember) => {
    setData(prev => ({
      ...prev,
      team: prev.team.map(t => t.id === updatedMember.id ? updatedMember : t)
    }));
  };

  const addTeamMember = (member: TeamMember) => {
    setData(prev => ({
      ...prev,
      team: [...prev.team, member]
    }));
  };

  const deleteTeamMember = (id: string) => {
    setData(prev => ({
      ...prev,
      team: prev.team.filter(t => t.id !== id)
    }));
  };

  // --- PROJECTS ---
  const updateProject = (updatedProject: Project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updatedProject.id ? updatedProject : p)
    }));
  };

  const addProject = (project: Project) => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, project]
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // --- LEADS & TESTIMONIALS ---
  const addLead = (lead: Lead) => {
    setData(prev => ({
      ...prev,
      leads: [lead, ...prev.leads]
    }));
  };
  
  const addTestimonial = (testimonial: Testimonial) => {
    setData(prev => ({
        ...prev,
        testimonials: [...prev.testimonials, testimonial]
    }))
  }

  const resetData = () => {
    setData(INITIAL_DATA);
  };

  return (
    <DataContext.Provider value={{ 
        data, 
        updateService, addService, deleteService,
        updateTeamMember, addTeamMember, deleteTeamMember,
        updateProject, addProject, deleteProject,
        addLead, 
        addTestimonial, 
        resetData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};