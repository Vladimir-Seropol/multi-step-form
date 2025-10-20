import React from "react";
import type { ModalProps } from "../../types/types";
import Button from "./Button";

const Modal: React.FC<ModalProps> = ({ 
  visible, 
  title, 
  children, 
  onClose,
  closeButtonText = "Закрыть",
  closeButtonProps = {}
}) => {
  if (!visible) return null;

  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Закрыть"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button
              variant="primary"
              onClick={onClose}
              {...closeButtonProps}
            >
              {closeButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;