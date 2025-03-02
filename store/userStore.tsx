import { create } from 'zustand';
import { login, logout } from '../api/userManagement';
import { Jury, User, LoginResponse } from '../lib/utils';

interface AuthState {
    user: User | null;
    jurys: Jury[];
    token: string | null;
    isAuthenticated: boolean;
    login: (matricule: string, password: string) => Promise<LoginResponse>; // Modifier ici
    logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    jurys: [],
    token: null,
    isAuthenticated: false,

    login: async (matricule: string, password: string) => {
        try {
            const response = await login(matricule, password);  
            set({
                user: response.data.user,
                jurys: response.data.jurys,
                token: response.data.token,
                isAuthenticated: true,
            });
            return response; // Retourner la réponse ici
        } catch (error) {
            throw error; // Gère l'erreur dans le composant
        }
    },
    
    logout: async () => {
        try {
            await logout();  
            set({
                user: null,
                jurys: [],
                token: null,
                isAuthenticated: false,
            });
        } catch (error) {
            throw error;  
        }
    },
}));

export default useAuthStore;