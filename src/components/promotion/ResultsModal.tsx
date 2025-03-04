"use client";

import { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/modal';
import { Search, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Student } from './types';
import { StudentCard } from './StudentCard';
import { TeachingUnitCell } from './TeachingUnitCell';
import Button from '@/components/ui/button/Button';

interface FormattedStudent {
  id: number;
  nom: string;
  unites: {
    code: string;
    designation: string;
    matieres: {
      id: number;
      designation: string;
      credit: number;
      notes: {
        tp: string;
        td: string;
        examen: string | null;
        total: number;
        ncnv: number;
      };
    }[];
  }[];
}

interface Note {
  noteId: number;
  etudiantId: number;
  nom: string;
  total: number;
  tp: string;
  td: string;
  examen: string | null;
  rattrapage: string | null;
  ncnv: number;
}

const calculateUEStats = (unite: any, student: any) => {
  let totalPoints = 0;
  let totalUe = 0;
  let totalCredits = 0;
  let failedCredits = 0;

  Object.values(unite.matieres).forEach((matiere: any) => {
    const note = matiere.notes.find((n: any) => n.etudiantId === student.id);
    if (note) {
      totalPoints += note.total * matiere.credit;
      totalUe += 20 * matiere.credit;
      totalCredits += matiere.credit;
      if (note.ncnv > 0) {
        failedCredits += matiere.credit;
      }
    }
  });

  const moyenne = totalUe > 0 ? totalPoints * 20/ totalUe : 0;
  const decision = moyenne >= 10 ? 'V' : 'NV';

  return { moyenne, decision };
};

export const ResultsModal = ({
  isOpen,
  onClose,
  data,
  onSave
}: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onSave: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Récupérer tous les étudiants uniques
  const students = useMemo(() => {
    const studentsMap = new Map();
    
    Object.values(data?.unites || {}).forEach((unite: any) => {
      Object.values(unite.matieres).forEach((matiere: any) => {
        matiere.notes.forEach((note: any) => {
          if (!studentsMap.has(note.etudiantId)) {
            studentsMap.set(note.etudiantId, {
              id: note.etudiantId,
              nom: note.nom,
            });
          }
        });
      });
    });
    
    return Array.from(studentsMap.values());
  }, [data]);

  // Filtrer les étudiants basés sur la recherche
  const filteredStudents = useMemo(() => {
    return students.filter(student => 
      student.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen>
      <div className='mt-20 bg-gray-50  dark:bg-gray-900'>
        {/* Header amélioré */}
        <div className="top-0 z-30 bg-white dark:bg-gray-800 shadow-sm">
          <div className="sticky px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Grille de délibération
            </h2>
            <div className="flex items-center gap-4">
              {/* Barre de recherche améliorée */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher un étudiant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 border rounded-lg 
                           bg-gray-50 dark:bg-gray-700
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           dark:border-gray-600 dark:text-gray-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
            </div>
          </div>
        </div>

        {/* Container principal avec padding et ombre */}
        <div className="flex-1 overflow-hidden overflow-y-auto pb-20 max-h-[800px] p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full divide-y  divide-gray-200 dark:divide-gray-700">
                <thead className="fixed sticky">
                  {/* En-tête des unités */}
                  <tr className="bg-gray-50">
                    <th className="sticky left-0 z-20 px-4 py-2 border bg-gray-50 min-w-[100px]">
                      Étudiant
                    </th>
                    {Object.values(data?.unites || {}).map((unite: any) => (
                      <th 
                        key={unite.code} 
                        colSpan={Object.keys(unite.matieres).length + 2} // +2 for total and decision
                        className="sticky px-4 py-2 border text-center font-semibold bg-gray-100"
                      >
                        {unite.designation} ({unite.code})
                      </th>
                    ))}
                  </tr>
                  {/* En-tête des matières */}
                  <tr className="bg-gray-50">
                    <th className="sticky left-0 z-20 px-4 py-2 border bg-gray-50"></th>
                    {Object.values(data?.unites || {}).map((unite: any) => (
                      <>
                        {Object.values(unite.matieres).map((matiere: any) => (
                          <th 
                            key={matiere.id} 
                            className="px-4 py-2 border min-w-[150px] font-normal"
                          >
                            {matiere.designation}
                            <div className="text-xs text-gray-500">
                              ({matiere.credit} cr.)
                            </div>
                          </th>
                        ))}
                        <th className="px-4 py-2 border min-w-[100px] font-semibold text-gray-600">
                          Moyenne
                        </th>
                        <th className="px-4 py-2 border min-w-[80px] font-semibold text-gray-600">
                          Décision
                        </th>
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStudents.map((student: any) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="sticky left-0 z-10 px-4 py-2 border font-medium bg-white dark:bg-gray-800">
                        {student.nom}
                      </td>
                      {Object.values(data?.unites || {}).map((unite: any) => (
                        <>
                          {Object.values(unite.matieres).map((matiere: any) => {
                            const note = matiere.notes.find(
                              (n: any) => n.etudiantId === student.id
                            );
                            return (
                              <td key={`${student.id}-${matiere.id}`} className="px-4 py-2 border">
                                {note ? (
                                  <input
                                    type="number"
                                    defaultValue={note.total}
                                    className="w-20 px-2 py-1 text-center border rounded-md
                                             focus:outline-none focus:ring-2 focus:ring-blue-500
                                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                  />
                                ) : '-'}
                              </td>
                            );
                          })}
                          {(() => {
                            const { moyenne, decision } = calculateUEStats(unite, student);
                            return (
                              <>
                                <td className="px-4 py-2 border text-center font-medium">
                                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                                    {moyenne.toFixed(2)}
                                  </span>
                                </td>
                                <td className={`px-4 py-2 border text-center`}>
                                  <span className={`px-3 py-1 rounded-full font-medium ${
                                    decision === 'V' 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  }`}>
                                    {decision}
                                  </span>
                                </td>
                              </>
                            );
                          })()}
                        </>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer amélioré */}
        <div className="sticky bottom-0 z-30 bg-white dark:bg-gray-800 shadow-lg-up border-t dark:border-gray-700">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {filteredStudents.length} étudiant(s) trouvé(s)
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button onClick={onSave}>
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};