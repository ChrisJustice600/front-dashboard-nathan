"use client";

import { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/modal';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isFullscreen>
      <div className='fixed inset-0 flex flex-col bg-white dark:bg-gray-900 p-6'>
        {/* En-tête avec recherche */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Grille de délibération</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>

        {/* Table avec scroll horizontal et première colonne fixe */}
        <div className="flex overflow-hidden">
          <div className="overflow-x-auto">
            <table className="relative min-w-full border">
              <thead>
                {/* En-tête des unités */}
                <tr className="bg-gray-50">
                  <th className="sticky left-0 z-20 px-4 py-2 border bg-gray-50 min-w-[300px]">
                    Étudiant
                  </th>
                  {Object.values(data?.unites || {}).map((unite: any) => (
                    <th 
                      key={unite.code} 
                      colSpan={Object.keys(unite.matieres).length + 2} // +2 for total and decision
                      className="px-4 py-2 border text-center font-semibold bg-gray-100"
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
              <tbody>
                {students.map((student: any) => (
                  <tr key={student.id}>
                    <td className="sticky left-0 z-10 px-4 py-2 border font-medium bg-white">
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
                                  className="w-20 px-2 py-1 text-center border rounded"
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
                                {moyenne.toFixed(2)}
                              </td>
                              <td className={`px-4 py-2 border text-center font-bold ${
                                decision === 'V' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {decision}
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

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onSave}>
            Enregistrer
          </Button>
        </div>
      </div>
    </Modal>
  );
};