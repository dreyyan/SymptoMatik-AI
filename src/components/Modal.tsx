type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

const Modal = ({ isOpen, onClose, title, message, confirmText }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 🔹 Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-[1] z-40"
        onClick={onClose}
      />

      {/* 🔹 Modal Box */}
      <div className="relative bg-white rounded-lg shadow-lg w-96 p-6 z-50">
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            {confirmText || "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
