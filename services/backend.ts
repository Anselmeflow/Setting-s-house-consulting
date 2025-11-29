
import { Lead, AppData } from '../types';

/**
 * BACKEND ABSTRACTION LAYER
 * This file serves as the interface between the Frontend and the Backend.
 * Currently using LocalStorage/Mock logic.
 * To deploy with a real backend (Firebase, Supabase, Node), update the methods below.
 */

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const BackendService = {
    // SYNC DATA
    async syncData(data: AppData): Promise<{success: boolean, message: string}> {
        await delay(1000);
        // In a real app, this would POST to an API endpoint
        console.log("Data synced to backend:", data);
        return { success: true, message: "Données synchronisées avec succès." };
    },

    // CONNECT EXTERNAL TOOLS (Google Sheets)
    async connectGoogleSheets(): Promise<{success: boolean}> {
        await delay(1500);
        // Authenticate with OAuth2 in real app
        return { success: true };
    },

    // CREATE DATABASE
    async createDatabase(name: string): Promise<{id: string, url: string}> {
        await delay(2000);
        return { 
            id: `db-${Date.now()}`, 
            url: `https://docs.google.com/spreadsheets/d/mock-id-${name}` 
        };
    }
};
