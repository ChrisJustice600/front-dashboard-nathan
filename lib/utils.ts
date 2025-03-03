export interface User {
  id: number;
  nom: string;
  post_nom: string;
  prenom: string;
  sexe: string;
  matricule: string;
  grade: string;
  id_grade: number;
  statut: string;
  telephone: string;
  adresse: string;
  e_mail: string;
  avatar: string | null;
  date_naiss: string;
  solde: number | null;
}

export interface Jury {
  id: number;
  id_niveau: number;
  id_jury: number;
  id_annee: number;
  id_section: number;
  designation: string;
  code: string | null;
  id_president: number;
  id_secretaire: number;
  autorisation: string;
  id_membre: number;
  orientation: string;
  vision: string;
  description: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
      user: User;
      jurys: Jury[];
      token: string;
  };
}