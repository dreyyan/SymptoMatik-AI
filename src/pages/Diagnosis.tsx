import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import NodeContainer from "../components/NodeContainer";
import Modal from "../components/Modal.tsx";

type NodeType = {
  id: string;
  value: string;
  x: number;
  y: number;
  severity: "Low" | "Medium" | "High";
  classification: "Infectious" | "Allergic" | "Chronic";
};

interface ModalConfig {
  title: string;
  message: string;
  confirmText: string;
  inputValue?: string;
  onConfirm?: (value: string) => void;
  showCancel?: boolean;
}

const Diagnosis = () => {
  useEffect(() => {
    document.title = "SymptoMatik: Diagnosis";
  }, []);

  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [currentPatient, setCurrentPatient] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [patientFiles, setPatientFiles] = useState<Record<string, { fileName: string; nodes: NodeType[]; modified?: boolean }[]>>(() => {
    try {
      const saved = localStorage.getItem("patientFiles");
      return saved
        ? JSON.parse(saved)
        : {
            Adam: [{ fileName: "F1.ndg", nodes: [] }],
            Bob: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }],
            Charlie: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }, { fileName: "F3.ndg", nodes: [] }],
          };
    } catch (error) {
      console.error("Error parsing patientFiles from localStorage:", error);
      return {
        Adam: [{ fileName: "F1.ndg", nodes: [] }],
        Bob: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }],
        Charlie: [{ fileName: "F1.ndg", nodes: [] }, { fileName: "F2.ndg", nodes: [] }, { fileName: "F3.ndg", nodes: [] }],
      };
    }
  });
  const [modifiedFiles, setModifiedFiles] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
  });

  const addNode = (
    value: string,
    id: string,
    severity: string,
    classification: string
  ): boolean => {
    const validSeverities = ["Low", "Medium", "High"] as const;
    const validClassifications = ["Infectious", "Allergic", "Chronic"] as const;
    const validatedSeverity = validSeverities.includes(severity as never)
      ? severity
      : "Low";
    const validatedClassification = validClassifications.includes(classification as never)
      ? classification
      : "Infectious";

    const existingNode = nodes.find(
      (n) =>
        n.value === value &&
        n.severity === validatedSeverity &&
        n.classification === validatedClassification
    );
    if (existingNode) {
      console.log(
        `Node "${value}" already exists with severity "${validatedSeverity}" and classification "${validatedClassification}"`
      );
      return false;
    }

    setNodes((prev) => [
      ...prev,
      {
        id,
        value,
        x: Math.random() * 200 + 50,
        y: Math.random() * 200 + 50,
        severity: validatedSeverity as "Low" | "Medium" | "High",
        classification: validatedClassification as "Infectious" | "Allergic" | "Chronic",
      },
    ]);
    return true;
  };

  const loadNodes = (newNodes: NodeType[]) => {
    setNodes(newNodes);
  };

  const handleSave = () => {
    if (currentPatient && currentFile) {
      setPatientFiles((prev) => {
        const updatedFiles = prev[currentPatient].map((file) =>
          file.fileName === currentFile ? { ...file, nodes } : file
        );
        const updated = { ...prev, [currentPatient]: updatedFiles };
        localStorage.setItem("patientFiles", JSON.stringify(updated));
        return updated;
      });
      setModifiedFiles((prev) => ({
        ...prev,
        [`${currentPatient}-${currentFile}`]: false,
      }));
      console.log(`Saved ${currentFile} for ${currentPatient}`);
    }
  };

  const renameFile = () => {
    if (currentPatient && currentFile) {
      setModalConfig({
        title: "Rename File",
        message: `Enter new name for ${currentFile}:`,
        confirmText: "Rename",
        inputValue: "",
        showCancel: true,
        onConfirm: (newFileName: string) => {
          if (!newFileName.trim()) {
            setModalConfig({
              title: "Error",
              message: "Please enter a valid file name.",
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
            return;
          }
          const finalNewFileName = newFileName.endsWith(".ndg") ? newFileName : `${newFileName}.ndg`;
          if (patientFiles[currentPatient].some((file) => file.fileName === finalNewFileName)) {
            setModalConfig({
              title: "Error",
              message: "A file with this name already exists.",
              confirmText: "OK",
              showCancel: false,
            });
            setIsModalOpen(true);
            return;
          }
          setPatientFiles((prev) => {
            const updatedFiles = prev[currentPatient].map((file) =>
              file.fileName === currentFile ? { ...file, fileName: finalNewFileName } : file
            );
            const updated = { ...prev, [currentPatient]: updatedFiles };
            localStorage.setItem("patientFiles", JSON.stringify(updated));
            return updated;
          });
          setCurrentFile(finalNewFileName);
          setModifiedFiles((prev) => {
            const updated = { ...prev };
            if (updated[`${currentPatient}-${currentFile}`]) {
              updated[`${currentPatient}-${finalNewFileName}`] = updated[`${currentPatient}-${currentFile}`];
              delete updated[`${currentPatient}-${currentFile}`];
            }
            return updated;
          });
          setModalConfig({
            title: "File Renamed",
            message: `File ${currentFile} was successfully renamed to ${finalNewFileName}.`,
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
        },
      });
      setIsModalOpen(true);
    }
  };

  const handleDeleteFile = () => {
    if (currentPatient && currentFile) {
      setModalConfig({
        title: "Delete File",
        message: `Are you sure you want to delete ${currentFile} for ${currentPatient}?`,
        confirmText: "Delete",
        showCancel: true,
        onConfirm: () => {
          setPatientFiles((prev) => {
            const updatedFiles = prev[currentPatient].filter((file) => file.fileName !== currentFile);
            const updated = { ...prev, [currentPatient]: updatedFiles };
            localStorage.setItem("patientFiles", JSON.stringify(updated));
            return updated;
          });
          setCurrentFile(null);
          loadNodes([]);
          setModifiedFiles((prev) => {
            const updated = { ...prev };
            delete updated[`${currentPatient}-${currentFile}`];
            return updated;
          });
          setModalConfig({
            title: "File Deleted",
            message: `File ${currentFile} was successfully deleted.`,
            confirmText: "OK",
            showCancel: false,
          });
          setIsModalOpen(true);
        },
      });
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPatient, currentFile, nodes]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Sidebar */}
        <LeftSidebar
          addNode={addNode}
          nodes={nodes}
          loadNodes={loadNodes}
          setCurrentPatient={setCurrentPatient}
          setCurrentFile={setCurrentFile}
          patientFiles={patientFiles}
          setPatientFiles={setPatientFiles}
          modifiedFiles={modifiedFiles}
          setModifiedFiles={setModifiedFiles}
          currentPatient={currentPatient}
          currentFile={currentFile}
        />
        {/* Center: Droppable Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {currentFile && currentPatient && (
            <div className="bg-[var(--trust-blue)] p-4 shadow z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-xl inter-semibold text-[var(--clean-white)]">
                  {currentPatient} |
                </h2>
                <h3 className="text-sm inter-semibold text-[var(--clean-white)]">
                  {currentFile}
                </h3>
              </div>
              <div className="flex gap-1">
                <button
                  className="cursor-pointer flex items-center justify-center w-8 h-8 mr-6 rounded-full hover:opacity-70 transition-all duration-300"
                  onClick={handleDeleteFile}
                >
                  <img className="w-6" src="remove-file-icon.svg" alt="Remove Icon" />
                </button>
                <button
                  className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:opacity-70 transition-all duration-300"
                  onClick={renameFile}
                >
                  <img className="w-6" src="rename-file-icon.svg" alt="Rename Icon" />
                </button>
                <button
                  className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-full hover:opacity-70 transition-all duration-300"
                  onClick={handleSave}
                >
                  <img className="w-6" src="save-icon.svg" alt="Save Icon" />
                </button>
              </div>
            </div>
          )}
          <NodeContainer nodes={nodes} setNodes={setNodes} />
        </div>
        {/* Right: Sidebar */}
        <RightSidebar nodes={nodes} />
      </div>
      {/* Footer */}
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        inputValue={modalConfig.inputValue}
        onConfirm={modalConfig.onConfirm}
        showCancel={modalConfig.showCancel}
      />
    </div>
  );
};

export default Diagnosis;