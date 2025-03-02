import axios, { AxiosError, AxiosResponse } from 'axios';

 

// Configuration de base d'Axios pour les années
const apiAnnees = axios.create({
  baseURL: 'https://jury-full.onrender.com/api/v1', // URL de base de l'API pour les années
  headers: {
    'Content-Type': 'application/json',
  },
});
 

// Intercepteur pour ajouter le token à chaque requête pour les années
apiAnnees.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Récupérer le token du localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Ajouter le token dans les headers
  }
  return config;
});

  
// Interface pour la réponse de l'API
interface Annee {
  id: number;
  debut: string;
  fin: string;
}

interface AnneesResponse {
  success: boolean;
  message: string;
  data: Annee[];
}

 

// Nouvelle fonction pour récupérer les années
// Utilisation de l'instance apiAnnees
export const getAnnees = async (): Promise<AnneesResponse> => {
  try {
    const response: AxiosResponse<AnneesResponse> = await apiAnnees.get(`/annees`);
    return response.data; // Retourne les données de la réponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Gestion des erreurs Axios
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des années');
    } else {
      // Gestion des autres erreurs
      throw new Error('Erreur inattendue lors de la récupération des années');
    }
  }
};
