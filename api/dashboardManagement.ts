import axios, { AxiosError } from 'axios';

// Configuration de base d'Axios
const api = axios.create({
  baseURL: 'https://jury-full.onrender.com/api/v1/dashboard', // URL de base de l'API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Récupérer le token du localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Ajouter le token dans les headers
  }
  return config;
});

// Fonction pour récupérer les résultats
export const getResults = async (promotionId: string, anneeId: string) => {
  try {
    const response = await api.get(`/resultat/${promotionId}/${anneeId}`);
    return response.data; // Retourner les données de la réponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des résultats');
    } else {
      throw new Error('Erreur inattendue lors de la récupération des résultats');
    }
  }
};

// Fonction pour récupérer les données de l'histogramme
export const getHistogram = async (promotionId: string) => {
  try {
    const response = await api.get(`/histogramme/${promotionId}`);
    return response.data; // Retourner les données de la réponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des données de l\'histogramme');
    } else {
      throw new Error('Erreur inattendue lors de la récupération des données de l\'histogramme');
    }
  }
};

// Fonction pour récupérer le meilleur pourcentage
export const getBestPercentage = async (anneeId: string, promotionId: string) => {
  try {
    const response = await api.get(`/bestPurcent/${anneeId}/${promotionId}`);
    return response.data; // Retourner les données de la réponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération du meilleur pourcentage');
    } else {
      throw new Error('Erreur inattendue lors de la récupération du meilleur pourcentage');
    }
  }
};

// Fonction pour récupérer les statistiques de vente
export const getSellingStats = async (promotionId: string) => {
  try {
    const response = await api.get(`/selling/${promotionId}`);
    return response.data; // Retourner les données de la réponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des statistiques de vente');
    } else {
      throw new Error('Erreur inattendue lors de la récupération des statistiques de vente');
    }
  }
};

// Fonction pour récupérer les données statistiques
export const getStatData = async (promotionId: string, anneeId: string) => {
  try {
    const response = await api.get(`/statData/${promotionId}/${anneeId}`);
    return response.data; // Retourner les données de la réponse
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des données statistiques');
    } else {
      throw new Error('Erreur inattendue lors de la récupération des données statistiques');
    }
  }
};
