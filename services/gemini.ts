import { GoogleGenAI } from "@google/genai";
import { AppData } from "../types";

// Public AI Agent
export const generateAIResponse = async (history: {role: string, text: string}[], userMessage: string): Promise<string> => {
    // API Key must be obtained exclusively from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const systemInstruction = `
        Tu es l'assistant virtuel intelligent de Setting's House Consulting (SHC).
        SHC est une entreprise de consulting digital basée à Brazzaville (Congo), spécialisée dans l'accompagnement des particuliers et du secteur informel.
        
        TES OBJECTIFS :
        1. Orienter les visiteurs vers le bon service (No-Code, Développement Code, Agents IA, Automatisation, Design, Maintenance, Gestion de Projet).
        2. Rassurer sur le professionnalisme et la sécurité.
        3. Collecter des informations de contact (Nom, Email, Besoin) pour les commerciaux.
        
        TON TON :
        Professionnel, chaleureux, accessible, et sécurisant. Tu parles français.
        
        INFORMATIONS CLÉS SHC :
        - Équipe : 
            - Anselme Christopher (Manager en chef, dev IA, No-Code, Design)
            - Loukelo Khurt (Dev Web, Data Analyst)
            - Nakouzebi Deis (Dev web, Designer)
            - Ebikili Jeremy (Designer, Gestion Projet)
            - Colombe (Data Manager, No-Code)
            - Clairline (Admin Réseau, No-Code)
            - Bibila Jeremias (Manager Réseau Chef, Maintenance)
        - Contact : +242 056547399, settingshouseconsulting0@gmail.com
        - Localisation : Brazzaville, Congo.
        - Valeurs : Accessibilité, Innovation, Sécurité.
        - Public : Commerçants, artisans, particuliers, micro-entreprises.
        
        Si l'utilisateur semble intéressé, propose-lui de laisser ses coordonnées ou invite-le à utiliser le formulaire de contact qui envoie un mail direct.
        Essaie de faire des réponses concises (max 3 phrases sauf si on demande des détails).
        `;

        const model = 'gemini-2.5-flash';
        
        const contents = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        // Add current user message
        contents.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "Désolé, je n'ai pas compris.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Une erreur technique est survenue (Vérifiez la validité de la clé API).";
    }
};

// Admin AI Agent
export const generateAdminAIResponse = async (
    history: {role: string, text: string}[], 
    userMessage: string, 
    appData: AppData
): Promise<string> => {
    // API Key must be obtained exclusively from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const systemInstruction = `
        Tu es l'assistant personnel du Manager de SHC dans le tableau de bord Admin.
        Tu as accès aux données actuelles du site (Leads, Projets, Services, Équipe).
        
        INTEGRATION GOOGLE WORKSPACE:
        Tu es connecté (en simulation) à l'écosystème Google du compte 'settingshouseconsulting0@gmail.com'.
        Tu peux comprendre et simuler des actions sur :
        1. Google Calendar (Planifier des réunions, vérifier l'agenda).
        2. Google Forms (Créer des formulaires de satisfaction, sondages).
        3. Google Docs (Rédiger des contrats, des propositions commerciales).
        4. Google Drive (Organiser des fichiers, créer des dossiers clients).
        5. Gmail (Rédiger des brouillons, trier les mails).
        6. Google Sheets (Analyser des données, créer des CRM).

        CONTEXTE DONNÉES ACTUELLES (JSON):
        ${JSON.stringify(appData)}

        TES TÂCHES :
        - Analyser les leads.
        - Exécuter (simuler) les tâches demandées sur les outils Google.
        - Exemple : Si on demande "Ajoute un RDV avec le lead X dans l'agenda", confirme que c'est fait sur Google Calendar.
        - Exemple : Si on demande "Crée un formulaire de satisfaction", confirme la création sur Google Forms.
        
        TON TON :
        Analytique, précis, efficace. Tu es un outil d'aide à la décision et d'automatisation.
        `;

        const model = 'gemini-2.5-flash';
        
        const contents = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        // Add current user message
        contents.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        return response.text || "Analyse impossible.";
    } catch (error) {
        console.error("Gemini Admin Error:", error);
        return "Erreur d'analyse IA.";
    }
};