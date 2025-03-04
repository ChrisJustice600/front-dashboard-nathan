import React from 'react';
interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestModal = ({ isOpen, onClose }: TestModalProps) => {
  return (
    <div className="grid gap-4 py-4">
        {/* Contenu du modal ici */}
    </div>
  );
};

export default TestModal;