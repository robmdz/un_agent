import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './button';
import '../styles/modal.css';

/**
 * Propiedades para el componente Modal.
 */
interface ModalProps {
  isOpen: boolean; // Si el modal está visible
  onClose: () => void; // Función para cerrar el modal
  title: string; // Título del modal
  children: React.ReactNode; // Contenido del modal
}

/**
 * Componente Modal reutilizable.
 * Utiliza React Portal para renderizarse fuera de la jerarquía DOM principal.
 */
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

