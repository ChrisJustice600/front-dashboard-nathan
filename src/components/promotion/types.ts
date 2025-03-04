export type Course = {
  courseId: string;
  courseName: string;
  score: number;
};

export type TeachingUnit = {
  unitId: string;
  unitName: string;
  credit: number;
  elements: {
    elementId: string;
    elementName: string;
    score: number;
  }[];
  average: number;
  isValidated: boolean;
};

export type Student = {
  id: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  matricule: string;
  stats: {
    percentage: number;
    validatedCredits: number;
    nonValidatedCredits: number;
    juryAppreciation: string;
  };
  teachingUnits: TeachingUnit[];
};

export type ScoreUpdate = {
  studentId: string;
  elementId: string;
  newScore: number;
};

export type Cote = {
  noteId: number;
  ecId: number;
  matiere: string;
  note: number;
  tp: number;
  td: number;
  examen: number;
  rattrapage: number;
  total: number;
  credit: number;
  ncnv: number;
  max: number;
  totalP: number;
};

export type Unite = {
  unite: string;
  code: string;
  matieres: Cote[];
  moyenne: number;
  totalCredit: number;
  isValidated: boolean;
};

export interface StudentNote {
  noteId: number | null;
  etudiantId: number;
  tp: number;
  td: number;
  examen: number;
  rattrapage: number | null;
  total: number;
  credit: number;
  ncnv: number;
}

export interface Matiere {
  ecId: number;
  matiere: string;
  credit: number;
  max: number;
  noteId?: number | null;
  tp?: number;
  td?: number;
  examen?: number;
  rattrapage?: number | null;
  total?: number;
  totalP?: number;
  ncnv?: number;
}

export type Etudiant = {
  etudiantId: number;
  name: string;
  notes: Unite[];
};

export type StudentPalmares = {
  id: number;
  user: {
    image: string;
    name: string;
    casseroles?: string;
  },
  ncv: number;
  ncnv: number;
  pourcentage: number;
  decison: "Passe" | "Double";
}
