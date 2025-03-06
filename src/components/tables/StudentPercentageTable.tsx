import React, { useState, useEffect, useMemo } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from "file-saver";
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

const StudentPercentageTable = ({ data, anneeId }: { data: any, anneeId: number }) => {
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

  const handlePrintPalmares = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await fetch('/template/palmares.xlsx').then(res => res.arrayBuffer()));

      // 1. Configuration du palmarès (Feuille 2)
      const palmaresSheet = workbook.getWorksheet(1);
      let rowIndex = 8; // Commence à la ligne 8

      students.forEach((student, index) => {
        const row = palmaresSheet.getRow(rowIndex);
        
        // Configuration des cellules
        ['A', 'C', 'E', 'F', 'G', 'H', 'I'].forEach(col => {
          const cell = row.getCell(col);
          cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
          };
        });

        // Remplissage des données
        row.getCell('A').value = index + 1; // Place
        row.getCell('C').value = student.nom; // Etudiant
        row.getCell('E').value = student.ncv; // NCV
        row.getCell('F').value = student.ncnv; // NCNV
        row.getCell('G').value = { formula: `${student.percentage.toFixed(2)}%` }; // Pourcentage
        row.getCell('H').value = student.appreciation; // Appréciation
        row.getCell('I').value = student.decision; // Décision

        // Style conditionnel pour la décision  
        const decisionCell = row.getCell('I');
        if (student.decision === 'CAPITALISE') {
          decisionCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '90EE90' }
          };
        } else if (student.decision === 'CASSEROLE') {
          decisionCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD700' }
          };
        } else {
          decisionCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF6B6B' }
          };
        }

        rowIndex++;
      });

      // Générer et télécharger le fichier
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      saveAs(blob, `Deliberation_${new Date().toISOString().split('T')[0]}.xlsx`);

    } catch (error) {
      console.error('Erreur lors de la génération du fichier Excel:', error);
    }

  };


  const calculateUEStats = (unite: any, student: any) => {
    let totalPoints = 0;
    let totalUe = 0;
    let totalCredits = 0;
    let failedCredits = 0;
  
    Object.values(unite.matieres).forEach((matiere: any) => {
      const note = matiere.notes.find((n: any) => n.etudiantId === student.etudiantId);
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
  
  const handleSavingCote = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const templateBuffer = await fetch('/template/grille.xlsx').then((res) =>
        res.arrayBuffer()
      );
      await workbook.xlsx.load(templateBuffer);
  
      // Récupération de la feuille : si la feuille avec l'ID 1 n'existe pas, on prend la première
      let grilleSheet = workbook.getWorksheet(1);
      if (!grilleSheet) {
        grilleSheet = workbook.worksheets[0];
        if (!grilleSheet) {
          throw new Error("Aucune feuille trouvée dans le template");
        }
      }
  
      // === Configuration des en-têtes ===
      let currentCol = 3; // On commence à la colonne C pour les UEs
  
      // Fusionner N° et Etudiant sur les lignes 3 et 4
      grilleSheet.mergeCells('A3:A4');
      grilleSheet.mergeCells('B3:B4');
      grilleSheet.getCell('A3').value = 'N°';
      grilleSheet.getCell('B3').value = 'Etudiant';
  
      // Pour chaque UE, configurer les colonnes d'en-tête (ligne 3 et 4)
      Object.values(data.unites).forEach((unite: any) => {
        const matiereCount = Object.keys(unite.matieres).length;
        const totalColumns = matiereCount + 2; // +2 pour Total et Décision
  
        // Fusionner la cellule en ligne 3 couvrant toutes les colonnes de l'UE
        const startCol = currentCol;
        const endCol = currentCol + totalColumns - 1;
        grilleSheet.mergeCells(3, startCol, 3, endCol);
  
        // En-tête de l'UE (ligne 3)
        const ueCell = grilleSheet.getCell(3, startCol);
        ueCell.value = unite.code;
        ueCell.alignment = { horizontal: 'center', vertical: 'middle' };
  
        // Ligne 4 : en-têtes des matières (avec rotation de 90°)
        Object.values(unite.matieres).forEach((matiere: any, index) => {
          const cell = grilleSheet.getCell(4, currentCol + index);
          cell.value = matiere.designation;
          cell.alignment = { horizontal: 'center', vertical: 'middle', textRotation: 90 };
        });
  
        // Ligne 4 : colonnes Total et Décision pour l'UE
        grilleSheet.getCell(4, endCol - 1).value = 'Total';
        grilleSheet.getCell(4, endCol).value = 'Décision';
  
        currentCol = endCol + 1;
      });
  
      // ===== AJOUT DE LA SECTION SYNTHÈSES =====
      const synthesisColumns = 7; // NCV, NCNV, Pourcentage, Appréciation, Total Obtenu, Pourcentage, Décision
      const synthStartCol = currentCol;
      const synthEndCol = currentCol + synthesisColumns - 1;
      // Fusionner la cellule de la ligne 3 pour la synthèse
      grilleSheet.mergeCells(3, synthStartCol, 3, synthEndCol);
      grilleSheet.getCell(3, synthStartCol).value = 'Synthèses';
      grilleSheet.getCell(3, synthStartCol).alignment = { horizontal: 'center', vertical: 'middle' };
  
      // Ligne 4 : sous-en-têtes de la synthèse
      const synthHeaders = ['NCV', 'NCNV', 'Pourcentage', 'Appréciation', 'Total Obtenu', 'Pourcentage', 'Décision'];
      for (let i = 0; i < synthesisColumns; i++) {
        const cell = grilleSheet.getCell(4, synthStartCol + i);
        cell.value = synthHeaders[i];
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
      currentCol = synthEndCol + 1; // Mise à jour de la dernière colonne utilisée
  
      // === Remplissage des données à partir de la ligne 5 ===
      let dataRowIndex = 5;
      // On parcourt le tableau des étudiants (calculé par calculateStudentStats et stocké dans "students")
      students.forEach((student, studentIndex) => {
        const row = grilleSheet.getRow(dataRowIndex);
  
        // Colonne A et B : numéro et nom de l'étudiant
        row.getCell('A').value = studentIndex + 1;
        row.getCell('B').value = student.nom;
  
        // Remplissage des colonnes UE
        let currentColData = 3;
        Object.values(data.unites).forEach((unite: any) => {
          // Pour chaque matière de l'UE, insérer la note
          Object.values(unite.matieres).forEach((matiere: any) => {
            const note = matiere.notes.find((n: any) => n.etudiantId === student.etudiantId);
            row.getCell(currentColData).value = note ? note.total || 0 : '';
            currentColData++;
          });
          // Insérer Total et Décision pour l'UE
          const ueStats = calculateUEStats(unite, student);
          row.getCell(currentColData).value = ueStats.moyenne.toFixed(2);
          row.getCell(currentColData + 1).value = ueStats.decision;
          currentColData += 2;
        });
  
        // Remplissage de la section synthèse
        // Ici, nous utilisons les statistiques globales calculées pour l'étudiant (via calculateStudentStats)
        // Supposons que l'objet student possède déjà les propriétés ncv, ncnv, percentage, appreciation, totalPondere, decision
        row.getCell(currentColData).value = student.ncv;
        row.getCell(currentColData + 1).value = student.ncnv;
        row.getCell(currentColData + 2).value = student.percentage.toFixed(2) + '%';
        row.getCell(currentColData + 3).value = student.appreciation;
        row.getCell(currentColData + 4).value = student.totalPondere.toFixed(2);
        // Vous pouvez recalculer un pourcentage global si nécessaire ; ici on réutilise student.percentage
        row.getCell(currentColData + 5).value = student.percentage.toFixed(2) + '%';
        row.getCell(currentColData + 6).value = student.decision;
  
        dataRowIndex++;
      });
  
      // Déterminer la dernière colonne utilisée (currentCol déjà mis à jour après synthèse)
      const maxCol = currentCol - 1;
  
      // Appliquer des bordures uniquement aux cellules où une valeur est présente
      for (let r = 3; r < dataRowIndex; r++) {
        for (let c = 1; c <= maxCol; c++) {
          const cell = grilleSheet.getCell(r, c);
          if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
            cell.border = {
              top: { style: 'thin', color: { argb: '000000' } },
              left: { style: 'thin', color: { argb: '000000' } },
              bottom: { style: 'thin', color: { argb: '000000' } },
              right: { style: 'thin', color: { argb: '000000' } }
            };
          }
        }
      }
  
      // Générer et télécharger le fichier
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      saveAs(blob, `Deliberation_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Erreur lors de la génération du fichier Excel:', error);
    }
  };

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
        onSave={handleSavingCote}
        annee={anneeId}
      />
    </div>
  );
};

export default StudentPercentageTable;