
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  imageUrl: string; // New field for service image
  priceRange?: string;
  category: 'No-Code' | 'IA' | 'Design' | 'Maintenance' | 'Network' | 'Automatisation' | 'Gestion' | 'Dev';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
}

export interface Project {
  id: string;
  title: string;
  clientType: string; // e.g., "Commerçant de Yaoundé"
  description: string;
  result: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  content: string;
  rating: number;
  role?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'contacted' | 'converted';
  date: string;
  source: 'form' | 'ai_agent';
}

export interface AppData {
  services: Service[];
  team: TeamMember[];
  projects: Project[];
  testimonials: Testimonial[];
  leads: Lead[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}
