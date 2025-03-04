"use client";
import api from "./config";

const apiPromotion = {
    getCotes: async ({anneeId, promotionId, token} : {anneeId: Number, promotionId: Number, token : String}) => {
        try {
            const resp = await fetch(`${api.baseURL}/promotions/grilles/${anneeId}/${promotionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (resp.ok) {
                const response = await resp.json();

                return response.success ? response.data : [];
            }
            throw new Error('Erreur lors de la récupération des promotions');
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    },
    getPromotion: async (id: number) => {
        try {
            const response = await fetch(`${api.baseURL}/promotions/${id}`);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erreur lors de la récupération de la promotion');
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }
}

export default apiPromotion;