import { LoginResponse } from '../lib/utils';
import api from './config';

// Configuration de base d'Axios
// const api = axios.create({
//   baseURL: 'https://jury-full.onrender.com/api/v1/users', // URL de base de l'API
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // Pour gérer les cookies si nécessaire
// });

// // Intercepteur pour gérer les erreurs globales
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     console.error('Erreur API :', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// Fonction pour gérer la connexion
export const login = async (
  matricule: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${api.baseURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matricule, password }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la connexion");
    } else {
      const resp = await response.json();

      const data = resp;

      return data; // Retourne les données de la réponse (user, jurys, token)
    }

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw new Error('Erreur inattendue lors de la connexion');
  }
};

// Fonction pour gérer la déconnexion
export const logout = async (): Promise<void> => {
  // Suppression du token du localStorage
  await localStorage.removeItem("token");
};

// Export des fonctions
export const authService = {
  login,
  logout,
};