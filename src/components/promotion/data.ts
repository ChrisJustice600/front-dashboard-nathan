import { Student } from './types';

export const mockData: Student[] = [
    {
      id: '1',
      photoUrl: '/images/user/user-01.jpg',
      firstName: 'John',
      lastName: 'Doe',
      matricule: '2024001',
      stats: {
        percentage: 78,
        validatedCredits: 45,
        nonValidatedCredits: 15,
        juryAppreciation: 'Assez Bien'
      },
      teachingUnits: [
        {
          unitId: '1',
          unitName: 'Mathématiques fondamentales',
          credit: 6,
          elements: [
            { elementId: '1', elementName: 'Algèbre', score: 15 },
            { elementId: '2', elementName: 'Analyse', score: 13 },
            { elementId: '3', elementName: 'Géométrie', score: 14 }
          ],
          average: 14,
          isValidated: true
        },
        {
          unitId: '2',
          unitName: 'Informatique',
          credit: 4,
          elements: [
            { elementId: '4', elementName: 'Algorithmique', score: 16 },
            { elementId: '5', elementName: 'Programmation', score: 12 }
          ],
          average: 14,
          isValidated: true
        },
        {
          unitId: '3',
          unitName: 'Physique',
          credit: 4,
          elements: [
            { elementId: '6', elementName: 'Mécanique', score: 5 },
            { elementId: '7', elementName: 'Thermodynamique', score: 3 }
          ],
          average: 4,
          isValidated: false
        },
        {
          unitId: '4',
          unitName: 'Chimie',
          credit: 4,
          elements: [
            { elementId: '8', elementName: 'Chimie organique', score: 10 },
            { elementId: '9', elementName: 'Chimie minérale', score: 12 }
          ],
          average: 11,
          isValidated: true
        },
        {
          unitId: '5',
          unitName: 'Langues vivantes',
          credit: 2,
          elements: [
            { elementId: '10', elementName: 'Anglais', score: 15 }
          ],
          average: 15,
          isValidated: true
        }, 
        {
          unitId: '6',
          unitName: 'Education physique',
          credit: 2,
          elements: [
            { elementId: '11', elementName: 'Natation', score: 15 }
          ],
          average: 15,
          isValidated: true
        },
        {
          unitId: '7',
          unitName: 'Sciences humaines',
          credit: 2,
          elements: [
            { elementId: '12', elementName: 'Histoire', score: 15 }
          ],
          average: 15,
          isValidated: true
        }
        // ... autres unités d'enseignement
      ]
    },
    {
      id: '2',
      photoUrl: '/images/user/user-02.jpg',
      firstName: 'Jane',
      lastName: 'Doe',
      matricule: '2024002',
      stats: {
        percentage: 65,
        validatedCredits: 36,
        nonValidatedCredits: 24,
        juryAppreciation: 'Assez Bien'
      },
      teachingUnits: [
        {
          unitId: '1',
          unitName: 'Mathématiques fondamentales',
          credit: 6,
          elements: [
            { elementId: '1', elementName: 'Algèbre', score: 12 },
            { elementId: '2', elementName: 'Analyse', score: 14 },
            { elementId: '3', elementName: 'Géométrie', score: 10 }
          ],
          average: 12,
          isValidated: false
        },
        {
          unitId: '2',
          unitName: 'Informatique',
          credit: 4,
          elements: [
            { elementId: '4', elementName: 'Algorithmique', score: 10 },
            { elementId: '5', elementName: 'Programmation', score: 12 }
          ],
          average: 11,
          isValidated: false
        },
        {
          unitId: '3',
          unitName: 'Physique',
          credit: 4,
          elements: [
            { elementId: '6', elementName: 'Mécanique', score: 8 },
            { elementId: '7', elementName: 'Thermodynamique', score: 10 }
          ],
          average: 9,
          isValidated: false
        },
        {
          unitId: '4',
          unitName: 'Chimie',
          credit: 4,
          elements: [
            { elementId: '8', elementName: 'Chimie organique', score: 10 },
            { elementId: '9', elementName: 'Chimie minérale', score: 12 }
          ],
          average: 11,
          isValidated: true
        },
        {
          unitId: '5',
          unitName: 'Langues vivantes',
          credit: 2,
          elements: [
            { elementId: '10', elementName: 'Anglais', score: 15 }
          ],
          average: 15,
          isValidated: true
        },
        {
          unitId: '6',
          unitName: 'Education physique',
          credit: 2,
          elements: [
            { elementId: '11', elementName: 'Natation', score: 15 }
          ],
          average: 15,
          isValidated: true
        },
        {
          unitId: '7',
          unitName: 'Sciences humaines',
          credit: 2,
          elements: [
            { elementId: '12', elementName: 'Histoire', score: 15 }
          ],
          average: 15,
          isValidated: true
        }
        // ... autres unités d'enseignement
      ]
    },
    {
      id: '3',
      photoUrl: '/images/user/user-03.jpg',
      firstName: 'Alice',
      lastName: 'Doe',
      matricule: '2024003',
      stats: {
        percentage: 45,
        validatedCredits: 25,
        nonValidatedCredits: 35,
        juryAppreciation: 'Insuffisant'
      },
      teachingUnits: [
        {
          unitId: '1',
          unitName: 'Mathématiques fondamentales',
          credit: 6,
          elements: [
            { elementId: '1', elementName: 'Algèbre', score: 8 },
            { elementId: '2', elementName: 'Analyse', score: 10 },
            { elementId: '3', elementName: 'Géométrie', score: 9 }
          ],
          average: 9,
          isValidated: false
        },
        {
          unitId: '2',
          unitName: 'Informatique',
          credit: 4,
          elements: [
            { elementId: '4', elementName: 'Algorithmique', score: 8 },
            { elementId: '5', elementName: 'Programmation', score: 10 }
          ],
          average: 9,
          isValidated: false
        },
        {
          unitId: '3',
          unitName: 'Physique',
          credit: 4,
          elements: [
            { elementId: '6', elementName: 'Mécanique', score: 5 },
            { elementId: '7', elementName: 'Thermodynamique', score: 3 }
          ],
          average: 4,
          isValidated: false
        },
        {
          unitId: '4',
          unitName: 'Chimie',
          credit: 4,
          elements: [
            { elementId: '8', elementName: 'Chimie organique', score: 10 },
            { elementId: '9', elementName: 'Chimie minérale', score: 12 }
          ],
          average: 11,
          isValidated: true
        },
        {
          unitId: '5',
          unitName: 'Langues vivantes',
          credit: 2,
          elements: [
            { elementId: '10', elementName: 'Anglais', score: 15 }
          ],
          average: 15,
          isValidated: true
        },
        {
          unitId: '6',
          unitName: 'Education physique',
          credit: 2,
          elements: [
            { elementId: '11', elementName: 'Natation', score: 15 }
          ],
          average: 15,
          isValidated: true
        },
        {
          unitId: '7',
          unitName: 'Sciences humaines',
          credit: 2,
          elements: [
            { elementId: '12', elementName: 'Histoire', score: 15 }
          ],
          average: 15,
          isValidated: true
        }
      ]
    },
    {
      id: '4',
      photoUrl: '/images/user/user-04.jpg',
      firstName: 'Bob',
      lastName: 'Doe',
      matricule: '2024004',
      stats: {
        percentage: 85,
        validatedCredits: 48,
        nonValidatedCredits: 12,
        juryAppreciation: 'Bien'
      },
      teachingUnits: [
        {
          unitId: '1',
          unitName: 'Mathématiques fondamentales',
          credit: 6,
          elements: [
            { elementId: '1', elementName: 'Algèbre', score: 18 },
            { elementId: '2', elementName: 'Analyse', score: 16 },
            { elementId: '3', elementName: 'Géométrie', score: 17 }
          ],
          average: 17,
          isValidated: true
        },
        {
          unitId: '2',
          unitName: 'Informatique',
          credit: 4,
          elements: [
            { elementId: '4', elementName: 'Algorithmique', score: 16 },
            { elementId: '5', elementName: 'Programmation', score: 18 }
          ],
          average: 17,
          isValidated: true
        },
        {
          unitId: '3',
          unitName: 'Physique',
          credit: 4,
          elements: [
            { elementId: '6', elementName: 'Mécanique', score: 15 },
            { elementId: '7', elementName: 'Thermodynamique', score: 13 }
          ],
          average: 14,
          isValidated: true
        },
        {
          unitId: '4',
          unitName: 'Chimie',
          credit: 4,
          elements: [
            { elementId: '8', elementName: 'Chimie organique', score: 15 },
            { elementId: '9', elementName: 'Chimie minérale', score: 17 }
          ],
          average: 16,
          isValidated: true
        },
        {
          unitId: '5',
          unitName: 'Langues vivantes',
          credit: 2,
          elements: [
            { elementId: '10', elementName: 'Anglais', score: 15 }
          ],
          average: 15,
          isValidated: true
        },
        {
          unitId: '6',
          unitName: 'Education physique',
          credit: 2,
          elements: [
            { elementId: '11', elementName: 'Natation', score: 15 }
          ],
          average: 15,
          isValidated: true
        },
        {
          unitId: '7',
          unitName: 'Sciences humaines',
          credit: 2,
          elements: [
            { elementId: '12', elementName: 'Histoire', score: 15 }
          ],
          average: 15,
          isValidated: true
        }
      ]
    },
    {
      id: '5',
      photoUrl: '/images/user/user-05.jpg',
      firstName: 'Eva',
      lastName: 'Doe',
      matricule: '2024005',
      stats: {
        percentage: 95,
        validatedCredits: 54,
        nonValidatedCredits: 6,
        juryAppreciation: 'Très Bien'
      },
      teachingUnits: [
        {
          unitId: '1',
          unitName: 'Mathématiques fondamentales',
          credit: 6,
          elements: [
            { elementId: '1', elementName: 'Algèbre', score: 19 },
            { elementId: '2', elementName: 'Analyse', score: 18 },
            { elementId: '3', elementName: 'Géométrie', score: 20 }
          ],
          average: 19,
          isValidated: true
        },
        {
          unitId: '2',
          unitName: 'Informatique',
          credit: 4,
          elements: [
            { elementId: '4', elementName: 'Algorithmique', score: 18 },
            { elementId: '5', elementName: 'Programmation', score: 20 }
          ],
          average: 19,
          isValidated: true
        },
        {
          unitId: '3',
          unitName: 'Physique',
          credit: 4,
          elements: [
            { elementId: '6', elementName: 'Mécanique', score: 18 },
            { elementId: '7', elementName: 'Thermodynamique', score: 17 }
          ],
          average: 17,
          isValidated: true
        },
        {
          unitId: '4',
          unitName: 'Chimie',
          credit: 4,
          elements: [
            { elementId: '8', elementName: 'Chimie organique', score: 18 },
            { elementId: '9', elementName: 'Chimie minérale', score: 19 }
          ],
          average: 18,
          isValidated: true
        },
        {
          unitId: '5',
          unitName: 'Langues vivantes',
          credit: 2,
          elements: [
            { elementId: '10', elementName: 'Anglais', score: 20 }
          ],
          average: 20,
          isValidated: true
        },
        {
          unitId: '6',
          unitName: 'Education physique',
          credit: 2,
          elements: [
            { elementId: '11', elementName: 'Natation', score: 20 }
          ],
          average: 20,
          isValidated: true
        },
        {
          unitId: '7',
          unitName: 'Sciences humaines',
          credit: 2,
          elements: [
            { elementId: '12', elementName: 'Histoire', score: 20 }
          ],
          average: 20,
          isValidated: true
        }
      ]
    }
    // ... autres étudiants
  ];
  