import api from './config';

const apiAnnees = {
    getAnnees: async () => {
        try {
            const response = await fetch(`${api.baseURL}/annees`);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erreur lors de la récupération des années');
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    },
    getCurrentAnnee: async () => {
        try {
            const response = await fetch(`${api.baseURL}/current_annee`);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erreur lors de la récupération de l\'année en cours');
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
}

export default apiAnnees;