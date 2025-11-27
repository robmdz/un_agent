import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './button';
import '../styles/modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (!isOpen) return null;

  return createPortal(
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-actions">
          <Button onClick={onClose}>Entendido</Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

