import { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText: string;
  inputValue?: string;
  onConfirm?: (value: string) => void;
};

const Modal = ({ isOpen, onClose, title, message, confirmText, inputValue = "", onConfirm }: ModalProps) => {
  const [textInput, setTextInput] = useState(inputValue);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold text-[var(--trust-blue)] mb-4">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        {onConfirm && (
          <input
            className="w-full mb-4 px-4 py-2 rounded-full shadow-[0_0_4px_1px_rgba(0,0,0,0.1)] outline-none"
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter file name..."
          />
        )}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-[var(--trust-blue)] rounded hover:bg-[var(--dark-navy)]"
            onClick={() => {
              if (onConfirm) {
                onConfirm(textInput);
              }
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;