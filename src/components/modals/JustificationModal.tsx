"use client";

import { useState, useMemo } from 'react';
import { Modal } from '@/components/ui/modal';
import Button from '@/components/ui/button/Button';


interface JustificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (justification: string) => void;
  etudiantNom: string;
  matiere: string;
}

export const JustificationModal = ({
  isOpen,
  onClose,
  onConfirm,
  etudiantNom,
  matiere
}: JustificationModalProps) => {
  const [justification, setJustification] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Justification de modification</h3>
        <p className="text-sm text-gray-600 mb-4">
          Modification de la note pour l'étudiant <strong>{etudiantNom}</strong> dans <strong>{matiere}</strong>
        </p>
        <textarea
          className="w-full p-2 border rounded-md mb-4 min-h-[100px]"
          placeholder="Veuillez justifier cette modification..."
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={() => onConfirm(justification)}
            disabled={!justification.trim()}
          >
            Confirmer
          </Button>
        </div>
      </div>
    </Modal>
  );
};