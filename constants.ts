
import { AppData, Service, TeamMember, Project, Testimonial } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Développement No-Code',
    description: 'Créez vos applications web et mobiles 10x plus vite. Nous utilisons Glide, Bubble et FlutterFlow pour digitaliser vos processus métiers sans les coûts du développement traditionnel.',
    category: 'No-Code',
    icon: 'Smartphone',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', 
    priceRange: '150.000 - 500.000 FCFA'
  },
  {
    id: 's2',
    title: 'Développement Sur Mesure (Code)',
    description: 'Pour des besoins complexes, nous développons des solutions robustes en React, Node.js et Python. Applications web évolutives et sécurisées.',
    category: 'Dev',
    icon: 'Code',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    priceRange: 'Sur Devis'
  },
  {
    id: 's3',
    title: 'Création d\'Agents IA',
    description: 'Conception d\'assistants virtuels intelligents capables de gérer votre service client, analyser des documents ou automatiser des tâches complexes 24/7.',
    category: 'IA',
    icon: 'Bot',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    priceRange: '250.000 - 1.000.000 FCFA'
  },
  {
    id: 's4',
    title: 'Automatisation & Workflow',
    description: 'Connectez vos outils (Gmail, Sheets, WhatsApp) entre eux. Nous supprimons les tâches répétitives grâce à Make (Integromat) et Zapier.',
    category: 'Automatisation',
    icon: 'Workflow',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    priceRange: 'Dès 100.000 FCFA'
  },
  {
    id: 's5',
    title: 'Design UI/UX & Branding',
    description: 'Une identité visuelle forte pour vous démarquer. Nous concevons des logos, chartes graphiques et maquettes d\'interfaces ergonomiques.',
    category: 'Design',
    icon: 'Palette',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?q=80&w=2070&auto=format&fit=crop',
    priceRange: '100.000 - 350.000 FCFA'
  },
  {
    id: 's6',
    title: 'Maintenance & Réseaux',
    description: 'Installation de réseaux d\'entreprise, sécurisation des données, maintenance préventive du matériel informatique et support technique.',
    category: 'Maintenance',
    icon: 'Server',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=1935&auto=format&fit=crop',
    priceRange: 'Forfait mensuel dès 50.000 FCFA'
  },
  {
    id: 's7',
    title: 'Gestion de Projet Agile',
    description: 'Pilotage de vos projets digitaux de A à Z. Méthodologie Scrum/Agile pour garantir livrables, délais et budget maitrisé.',
    category: 'Gestion',
    icon: 'Briefcase',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    priceRange: 'Sur Devis'
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Anselme Christopher',
    role: 'Manager en Chef',
    bio: 'Lead Developer IA, Expert No-Code et Automatisation. Visionnaire technique garant de la stratégie digitale.',
    imageUrl: 'https://picsum.photos/id/1005/400/400',
    specialties: ['Dev IA', 'No-Code', 'Design', 'Automatisation']
  },
  {
    id: 't2',
    name: 'Loukelo Khurt',
    role: 'Dev Web & Data Analyst',
    bio: 'Expert en développement web et analyse de données. Il transforme vos chiffres en stratégies exploitables.',
    imageUrl: 'https://picsum.photos/id/1012/400/400',
    specialties: ['Dev Web', 'Data Analysis', 'Python']
  },
  {
    id: 't3',
    name: 'Nakouzebi Deis',
    role: 'Dev Web & Designer',
    bio: 'Créatif et technique, il transforme les concepts visuels en interfaces web fonctionnelles.',
    imageUrl: 'https://picsum.photos/id/338/400/400',
    specialties: ['Dev Web', 'Designer']
  },
  {
    id: 't4',
    name: 'Ebikili Jeremy',
    role: 'Gestionnaire de Projet',
    bio: 'Designer et chef d\'orchestre des projets, assurant le respect des délais et la qualité.',
    imageUrl: 'https://picsum.photos/id/1025/400/400',
    specialties: ['Designer', 'Gestion Projet']
  },
  {
    id: 't5',
    name: 'Colombe',
    role: 'Data Manager',
    bio: 'Spécialiste du traitement de données et développement No-Code pour structurer votre information.',
    imageUrl: 'https://picsum.photos/id/1027/400/400',
    specialties: ['Dev No-Code', 'Gestion Données']
  },
  {
    id: 't6',
    name: 'Clairline',
    role: 'Admin Réseau',
    bio: 'Experte en infrastructure réseau et solutions No-Code rapides.',
    imageUrl: 'https://picsum.photos/id/64/400/400',
    specialties: ['Dev No-Code', 'Admin Réseau']
  },
  {
    id: 't7',
    name: 'Bibila Jeremias',
    role: 'Manager Réseau en Chef',
    bio: 'Responsable de la maintenance matérielle et de la stabilité des infrastructures réseaux.',
    imageUrl: 'https://picsum.photos/id/91/400/400',
    specialties: ['Maintenancier', 'Manager Réseau']
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Gestion de Stock Automatisée',
    clientType: 'Commerçant de Brazzaville',
    description: 'Une application mobile permettant de scanner les produits et suivre les entrées/sorties en temps réel.',
    result: 'Réduction de 30% des pertes de stock en 3 mois.',
    mediaType: 'image',
    mediaUrl: 'https://picsum.photos/id/201/800/600',
    tags: ['Glide', 'Google Sheets', 'Automatisation']
  },
  {
    id: 'p2',
    title: 'Site Vitrine & Réservation',
    clientType: 'Salon de Coiffure',
    description: 'Plateforme de réservation en ligne avec rappels automatiques par WhatsApp.',
    result: 'Doublement des rendez-vous en ligne.',
    mediaType: 'image',
    mediaUrl: 'https://picsum.photos/id/180/800/600',
    tags: ['Web Design', 'WhatsApp API']
  },
  {
    id: 'p3',
    title: 'Assistant Virtuel SAV',
    clientType: 'PME Logistique',
    description: 'Chatbot IA pour répondre aux questions fréquentes des clients sur la livraison.',
    result: 'Support client disponible 24/7.',
    mediaType: 'video',
    mediaUrl: 'https://picsum.photos/id/4/800/600',
    tags: ['IA', 'Automation', 'Chatbot']
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'tm1',
    clientName: 'Marc A.',
    role: 'Entrepreneur BTP',
    content: "L'équipe SHC a transformé ma façon de gérer mes chantiers. L'outil est simple et efficace.",
    rating: 5
  },
  {
    id: 'tm2',
    clientName: 'Sophie M.',
    role: 'Boutique en ligne',
    content: "Le design de mon site est magnifique et mes ventes ont augmenté grâce à l'IA de recommandation.",
    rating: 5
  }
];

export const INITIAL_DATA: AppData = {
  services: INITIAL_SERVICES,
  team: INITIAL_TEAM,
  projects: INITIAL_PROJECTS,
  testimonials: INITIAL_TESTIMONIALS,
  leads: []
};

export const CONTACT_INFO = {
  phone: '+242 056547399',
  email: 'settingshouseconsulting0@gmail.com',
  address: 'Brazzaville, Congo',
  adminEmail: 'ngomaanselme38@gmail.com'
};
