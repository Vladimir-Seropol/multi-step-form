import React from "react";
import ReactDOM from "react-dom";
import type { ModalProps } from "../../types/types";
import Button from "./Button";

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  onClose,
  closeButtonText = "Закрыть",
  closeButtonProps = {},
}) => {
  if (!visible) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-backdrop fade show"
        style={{
          backdropFilter: "blur(5px)", 
        }}
      ></div>

  
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Закрыть"
                onClick={onClose}
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
    </>,
    modalRoot
  );
};

export default Modal;
