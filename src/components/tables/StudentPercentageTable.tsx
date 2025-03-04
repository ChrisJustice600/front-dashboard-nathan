import React, { useState, useEffect, useMemo } from 'react';
import Input from '@/components/ui/input/ScoreInput';
import Button from '@/components/ui/button/Button';
import TestModal from '@/components/modals/TestModal';
import { Modal } from '../ui/modal';
import { useModal } from '@/hooks/useModal';
import { ResultsModal } from '../promotion/ResultsModal';

interface Student {
  etudiantId: number;
  nom: string;
  totalPondere: number;
  maxPondere: number;
  percentage: number;
  ncv: number;    // Nombre de crédits validés
  ncnv: number;   // Nombre de crédits non validés
  appreciation: string;
  decision: string;
}

const StudentPercentageTable = ({ data }: { data: any }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const {
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal
  } = useModal();
  
  const calculateStudentStats = () => {
    const studentStats = new Map<number, Student>();

    Object.values(data.unites).forEach((unite: any) => {
      Object.values(unite.matieres).forEach((matiere: any) => {
        const credit = matiere.credit;
        
        matiere.notes.forEach((note: any) => {
          const currentStats = studentStats.get(note.etudiantId) || {
            etudiantId: note.etudiantId,
            nom: note.nom,
            totalPondere: 0,
            maxPondere: data.moyennes,
            percentage: 0,
            ncv: 0,
            ncnv: 0,
            appreciation: '',
            decision: ''
          };

          currentStats.totalPondere += (note.total || 0) * credit;
          currentStats.maxPondere += 20 * credit;
          
          // Calcul des crédits validés et non validés
          if (note.ncnv === 0) {
            currentStats.ncv += credit;
          } else {
            currentStats.ncnv += credit;
          }

          studentStats.set(note.etudiantId, currentStats);
        });
      });
    });

    return Array.from(studentStats.values())
      .map(student => {
        const percentage = (student.totalPondere / student.maxPondere) * 100;
        
        // Déterminer l'appréciation
        let appreciation = '';
        if (percentage >= 80) appreciation = 'EXCELLENT';
        else if (percentage >= 70) appreciation = 'TRÈS BIEN';
        else if (percentage >= 60) appreciation = 'BIEN';
        else if (percentage >= 50) appreciation = 'ASSEZ-BIEN';
        else appreciation = 'ÉCHEC';

        const totalCredits = parseFloat(data.moyennes) / 20;
        // Déterminer la décision
        const ration = student.ncv * 100 / totalCredits;
        
        const decision = ration == 100.0 ? 'CAPITALISE' : (ration >= 75.0 ? 'CASSEROLE' : 'DOUBLE');

        return {
          ...student,
          percentage,
          appreciation,
          decision
        };
      })
      .sort((a, b) => b.percentage - a.percentage);
  };

  const students = useMemo(() => calculateStudentStats(), [data]);

  // Effet pour la recherche
  useEffect(() => {
    const filtered = students.filter(student =>
      student.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset page when search changes
  }, [searchTerm, students]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Barre de recherche et bouton */}
      <div className="w-full flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-4 flex-1">
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="text-sm text-gray-500">
            Total: {filteredStudents.length} étudiants
          </div>
        </div>
        <Button size='sm' variant='outline' onClick={openFullscreenModal}>
            Grille de délibération
        </Button>
      </div>

      {/* Table avec style amélioré */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">N°</th>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">NCV</th>
              <th className="px-6 py-3">NCNV</th>
              <th className="px-6 py-3">Pourcentage</th>
              <th className="px-6 py-3">Appréciation</th>
              <th className="px-6 py-3">Décision</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student, index) => (
              <tr 
                key={student.etudiantId}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">{startIndex + index + 1}</td>
                <td className="px-6 py-4">{student.nom}</td>
                <td className="px-6 py-4">{student.ncv}</td>
                <td className="px-6 py-4">{student.ncnv}</td>
                <td className="px-6 py-4 font-medium">
                  {student.percentage.toFixed(2)}%
                </td>
                <td className="px-6 py-4">{student.appreciation}</td>
                <td className={`px-6 py-4 font-medium ${
                  student.decision === 'ADMIS' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {student.decision}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination améliorée */}
      <div className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
        <div className="text-sm text-gray-700">
          Page {currentPage} sur {totalPages || 1}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      >
        <div>Modal content goes here</div>
      </Modal>
      <ResultsModal
        isOpen={isFullscreenModalOpen}
        onClose={closeFullscreenModal}
        data={data}  // Passez vos données ici
        onSave={() => console.log('Saving changes...')}
      />
    </div>
  );
};

export default StudentPercentageTable;