import { useEffect, useRef } from "react";
import "../App.css";

export default function Modal({ open, onClose, type, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (open) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [open]);

  function handleCloseModal() {
    if (onClose) {
      onClose();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleCloseModal();
    }
  }

  return (
    <dialog
      className={type === "info" ? "infoModal" : "modal"}
      ref={modalRef}
      onKeyDown={handleKeyDown}
      onMouseDown={() => handleCloseModal()}
    >
      {children}
    </dialog>
  );
}
