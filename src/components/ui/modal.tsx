"use client";
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isFullscreen?: boolean;
  showCloseButton?: boolean;
}

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  isFullscreen,
  showCloseButton 
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={cn(
        "fixed z-50",
        isFullscreen ? "inset-0" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      )}>
        {children}
      </div>
    </div>
  );
};