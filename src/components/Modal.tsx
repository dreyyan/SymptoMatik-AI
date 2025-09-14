import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText: string;
};

const Modal = ({ isOpen, onClose, title, message, confirmText }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} // 40% opacity black
    >
      <div className="bg-white rounded-lg p-6 w-80 shadow-[0_0_4px_1px_rgba(0,0,0,0.2)]">
        <h3 className="text-lg font-bold text-[var(--trust-blue)] mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--trust-blue)] text-white rounded hover:bg-[var(--dark-navy)]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;