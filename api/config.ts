const api = {
    baseURL: 'https://jury-full.onrender.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVsbWVzLXNvbHV0aW9uLnRlY2giLCJyb2xlIjoianVyeSIsImlhdCI6MTc0MDk3MTI2OCwiZXhwIjoxNzQxMDU3NjY4fQ.JpW0MUdhX6GMP3x9TP_Jwbips40EUj4yBGwVJcoLvbM`,
    user: {        
        id: 125,
        nom: "KIDIADI",
        post_nom: "LEMBHI",
        prenom: "paul",
        sexe: "M",
        matricule: "7.895.496 N",
        grade: "DOCTORAT",
        id_grade: 11,
        statut: "PERMANANT",
        telephone: "0998178099",
        adresse: "30, Rue TSHELA Q/PUNDA-C/NGALIEMA",
        e_mail: "admin@elmes-solution.tech",
        avatar: null,
        date_naiss: "1957-09-02T00:00:00.000Z",
        solde: null
    },
    jurys: [
        {
            id: 1,
            id_niveau: 2,
            id_jury: 1,
            id_annee: 3,
            id_section: 1,
            designation: "L1 HE",
            code: null,
            id_president: 125,
            id_secretaire: 20,
            autorisation: "false",
            id_membre: 71,
            orientation: "HE",
            vision: "0",
            description: "Bases scientifiques (mathématiques, physique, chimie) et aux enjeux de l’eau et de l’environnement."
        },
        {
            id: 2,
            id_niveau: 3,
            id_jury: 2,
            id_annee: 3,
            id_section: 1,
            designation: "L2 HE",
            code: null,
            id_president: 125,
            id_secretaire: 20,
            autorisation: "false",
            id_membre: 71,
            orientation: "HE",
            vision: "0",
            description: " Approfondissement des techniques hydrauliques et environnementales, avec des outils de modélisation."
        }
    ]
}

export default api;