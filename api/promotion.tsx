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
                throw new Error('An unknown error occurred when to try getting data of grille');
            }
        }
    },
    changeCote : async ({value, justification, lastValue, agentId, coteId, type, token} : {value: Number, justification: String, lastValue: Number, agentId: Number, coteId: Number, type: String, token: String}) => {
        try {
            const resp = await fetch(`${api.baseURL}/promotions/cote/${coteId}/${type}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    value,
                    justification,
                    lastValue,
                    agentId
                })
            });
            if (resp.ok) {
                const response = await resp.json();
                return response.success ? response : [];
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred when to try changing cote of student')
            }
        }
    },
    insertCote : async ({value, justification, matiereId, etudiantId, anneeId, agentId, type, token} : {value: Number, justification: String, matiereId: Number, etudiantId: Number, anneeId: Number, agentId: Number, type: String, token: String}) => {
        try {
            const resp = await fetch(`${api.baseURL}/promotions/cote/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    value,
                    justification,
                    matiereId,
                    etudiantId,
                    type,
                    anneeId,
                    agentId
                })
            });
            if (resp.ok) {
                const response = await resp.json();
                return response.success ? response : [];
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('An unknown error occurred when to try changing cote of student')
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