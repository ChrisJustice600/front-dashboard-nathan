import api from './config';

export const getUser = async ({ matricule, password }: { matricule: string; password: string }) => {
    try {
        const response = await fetch(`${api.baseURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({matricule, password}),
        });
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erreur lors de la récupération du menu');
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}