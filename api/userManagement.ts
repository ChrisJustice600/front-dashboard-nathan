import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoginResponse } from '../lib/utils';

// Configuration de base d'Axios
const api = axios.create({
  baseURL: 'https://jury-full.onrender.com/api/v1/users', // URL de base de l'API
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Pour gérer les cookies si nécessaire
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('Erreur API :', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Fonction pour gérer la connexion
export const login = async (
  matricule: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post('/login', {
      matricule,
      password,
    });
    return response.data; // Retourne les données de la réponse (user, jurys, token)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Gestion des erreurs Axios
      throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    } else {
      // Gestion des autres erreurs
      throw new Error('Erreur inattendue lors de la connexion');
    }
  }
};

// Fonction pour gérer la déconnexion
export const logout = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await api.post('/logout');
    console.log('Déconnexion réussie :', response.data.message);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la déconnexion');
    } else {
      throw new Error('Erreur inattendue lors de la déconnexion');
    }
  }
};

// Export des fonctions
export const authService = {
  login,
  logout,
};